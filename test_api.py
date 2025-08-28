import requests
import json

# Test API endpoints
API_BASE = 'http://localhost:8000/api'

def test_api():
    print("Testing Agency Backend API...")
    
    # Test health endpoint
    try:
        response = requests.get(f'{API_BASE}/health/')
        print(f"Health check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Health check failed: {e}")
    
    # Test projects endpoint
    try:
        response = requests.get(f'{API_BASE}/projects/')
        data = response.json()
        print(f"Projects: {response.status_code} - Found {len(data['results'])} projects")
    except Exception as e:
        print(f"Projects test failed: {e}")
    
    # Test services endpoint
    try:
        response = requests.get(f'{API_BASE}/services/')
        data = response.json()
        print(f"Services: {response.status_code} - Found {len(data)} services")
    except Exception as e:
        print(f"Services test failed: {e}")
    
    # Test testimonials endpoint
    try:
        response = requests.get(f'{API_BASE}/testimonials/')
        data = response.json()
        print(f"Testimonials: {response.status_code} - Found {len(data['results'])} testimonials")
    except Exception as e:
        print(f"Testimonials test failed: {e}")
    
    # Test contact endpoint
    try:
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Message",
            "message": "This is a test message to verify the contact form is working properly."
        }
        response = requests.post(f'{API_BASE}/contact/quick/', 
                               json=contact_data,
                               headers={'Content-Type': 'application/json'})
        print(f"Contact form: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Contact form test failed: {e}")

if __name__ == "__main__":
    test_api()