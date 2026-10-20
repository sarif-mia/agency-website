from datetime import timedelta
from unittest.mock import patch
from django.contrib.auth.models import User
from django.core.cache import cache
from django.test import override_settings
from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .models import MeetingRequest, ContactMessage, JobPosition


@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
class AccountTests(APITestCase):
    def setUp(self):
        cache.clear()
        self.credentials = {'email': 'hello@example.com', 'first_name': 'Alex',
                            'last_name': '', 'company': 'Example Studio',
                            'password': 'a-strong!studio-pass-473',
                            'confirm_password': 'a-strong!studio-pass-473'}

    def register(self, **overrides):
        return self.client.post('/api/auth/register/', {**self.credentials, **overrides}, format='json')

    def test_registration_normalizes_email_and_supports_single_name(self):
        response = self.register(email='Hello@EXAMPLE.com')
        self.assertEqual(response.status_code, 201)
        user = User.objects.get(email='hello@example.com')
        self.assertNotEqual(user.password, self.credentials['password'])
        self.assertEqual(user.userprofile.company, 'Example Studio')
        self.assertFalse(user.is_staff)
        self.assertTrue(response.data['token'])
        self.assertEqual(self.register(email='HELLO@example.com').status_code, 400)

    def test_weak_passwords_and_mismatch_are_rejected(self):
        for password in ['password', '123456789', 'short']:
            with self.subTest(password=password):
                self.assertEqual(self.register(password=password, confirm_password=password).status_code, 400)
        self.assertEqual(self.register(confirm_password='different').status_code, 400)
        self.assertFalse(User.objects.exists())

    def test_login_case_insensitive_and_logout_revokes_token(self):
        response = self.register()
        token = response.data['token']
        result = self.client.post('/api/auth/login/', {'email':'HELLO@EXAMPLE.COM', 'password': self.credentials['password']},format='json')
        self.assertEqual(result.status_code, 200)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
        self.assertEqual(self.client.get('/api/auth/me/').status_code, 200)
        self.assertEqual(self.client.post('/api/auth/logout/').status_code, 204)
        self.assertEqual(self.client.get('/api/auth/me/').status_code, 401)
        self.assertFalse(Token.objects.filter(key=token).exists())

    def test_bad_credentials_and_anonymous_private_access(self):
        self.register()
        self.assertEqual(self.client.post('/api/auth/login/', {'email':'hello@example.com','password':'incorrect'},format='json').status_code, 400)
        for endpoint in ['/api/auth/me/', '/api/client/overview/', '/api/meetings/', '/api/dashboard/stats/']:
            self.assertEqual(self.client.get(endpoint).status_code, 401)

    def test_stale_token_does_not_block_new_login(self):
        self.register()
        self.client.credentials(HTTP_AUTHORIZATION='Token stale-token')
        self.assertEqual(self.client.post('/api/auth/login/', {'email':'hello@example.com','password':self.credentials['password']},format='json').status_code, 200)

    def test_disabled_account_cannot_login(self):
        self.register()
        User.objects.update(is_active=False)
        self.assertEqual(self.client.post('/api/auth/login/', {'email':'hello@example.com','password':self.credentials['password']},format='json').status_code,400)

    def test_registration_rate_is_limited(self):
        with patch('rest_framework.throttling.ScopedRateThrottle.get_rate', return_value='2/minute'):
            for _ in range(2):
                self.assertEqual(self.client.post('/api/auth/login/',{},format='json').status_code,400)
            self.assertEqual(self.client.post('/api/auth/login/',{},format='json').status_code,429)

    def test_client_meetings_are_owned_by_authenticated_user(self):
        result=self.register()
        user=User.objects.get(email=self.credentials['email'])
        other=User.objects.create_user(username='other',email='other@example.com',password='a-strong!other-pass')
        fields={'name':'Alex','email':self.credentials['email'],'meeting_type':'consultation',
                'preferred_date':str((timezone.now()+timedelta(days=2)).date()),'preferred_time':'10:00',
                'project_description':'A website for our growing independent studio.'}
        MeetingRequest.objects.create(**fields,user=other)
        MeetingRequest.objects.create(**fields)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {result.data['token']}")
        response=self.client.post('/api/meetings/request/',fields,format='json')
        self.assertEqual(response.status_code,201)
        self.assertEqual(MeetingRequest.objects.get(pk=response.data['data']['id']).user,user)
        overview=self.client.get('/api/client/overview/')
        self.assertEqual(overview.status_code,200)
        self.assertIn('no-store', overview['Cache-Control'])
        self.assertEqual(overview.data['meeting_count'],1)
        self.assertEqual(overview.data['pending_count'],1)
        self.assertEqual(len(overview.data['meetings']),1)
        self.assertEqual(self.client.get('/api/meetings/').status_code,403)
        self.assertEqual(self.client.get('/api/dashboard/stats/').status_code,403)

    def test_contact_submission_persists_and_rejects_short_messages(self):
        fields={'name':'Alex','email':'alex@example.com','subject':'New project','message':'A thoughtful website for our studio.'}
        self.assertEqual(self.client.post('/api/contact/',{**fields,'message':'short'},format='json').status_code,400)
        self.assertEqual(self.client.post('/api/contact/',fields,format='json').status_code,201)
        self.assertEqual(ContactMessage.objects.count(),1)

    def test_expired_jobs_are_not_advertised(self):
        JobPosition.objects.create(title='Expired role',department='Design',job_type='full-time',experience_level='mid',description='A past opportunity',application_deadline=(timezone.now()-timedelta(days=1)).date())
        response=self.client.get('/api/careers/')
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.data['count'],0)

    def test_sitemap_uses_request_origin_and_excludes_private_pages(self):
        response=self.client.get('/sitemap.xml',HTTP_HOST='localhost')
        self.assertEqual(response.status_code,200)
        text=response.content.decode()
        self.assertIn('http://localhost/services',text)
        self.assertNotIn('/dashboard',text)
        self.assertNotIn('/client-portal',text)
        robots=self.client.get('/robots.txt',HTTP_HOST='localhost')
        self.assertIn('Disallow: /dashboard',robots.content.decode())
