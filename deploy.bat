@echo off
echo 🚀 Starting deployment process...

echo 📦 Building frontend...
cd frontend
call npm install
call npm run build
echo ✅ Frontend built successfully!

echo 🔧 Preparing backend...
cd ..\backend
pip install -r requirements.txt
python manage.py collectstatic --noinput
echo ✅ Backend prepared successfully!

echo 🎉 Ready for deployment!
echo.
echo Next steps:
echo 1. Deploy backend to Railway/Heroku
echo 2. Deploy frontend dist folder to Netlify/Vercel  
echo 3. Update CORS settings with your production URLs
echo 4. Set up email credentials in production environment
echo.
echo See DEPLOYMENT_GUIDE.md for detailed instructions!
pause