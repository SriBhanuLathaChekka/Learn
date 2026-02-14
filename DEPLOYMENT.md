# LearnHub Deployment Guide

This guide covers deploying LearnHub to production environments.

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Client Browsers / Devices                   │
└────────────────────┬────────────────────────────────────┘
                     │
          ┌──────────▼──────────┐
          │   Frontend (Vite)   │
          │  React SPA hosted   │
          │  on CDN/Web Server  │
          │  (Vercel/Netlify)   │
          └──────────┬──────────┘
                     │
                     │ (HTTPS API calls)
                     │
          ┌──────────▼──────────┐
          │  Backend API Tier   │
          │  Express.js Server  │
          │  (Heroku/Railway)   │
          └──────────┬──────────┘
                     │
          ┌──────────▼──────────┐
          │   MongoDB Atlas     │
          │  (Cloud Database)   │
          └─────────────────────┘
```

---

## Prerequisites

- Accounts on hosting platforms
- MongoDB Atlas account (for cloud database)
- Git repository (GitHub, GitLab)
- Environment variables configured
- SSL certificates (auto-provided by most platforms)

---

## Part 1: Prepare Application for Production

### 1.1 Update Environment Variables

**Backend (.env.production)**
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/learnhub-prod
JWT_SECRET=your_very_long_secret_key_here_min_32_chars
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### 1.2 Update Frontend Configuration

**frontend/src/api/apiClient.js**
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.yourdomain.com/api'
  : 'http://localhost:5000/api';
```

### 1.3 Build Frontend for Production

```bash
cd frontend
npm run build
```

This creates an optimized `dist/` folder.

---

## Part 2: Deploy Backend

### Option A: Deploy on Heroku

#### 1. Install Heroku CLI
```bash
# Windows: Download from heroku.com or use chocolatey
choco install heroku-cli

# Verify installation
heroku --version
```

#### 2. Login to Heroku
```bash
heroku login
```

#### 3. Create Heroku App
```bash
cd backend
heroku create learnhub-api
```

#### 4. Set Environment Variables
```bash
heroku config:set MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/learnhub-prod"
heroku config:set JWT_SECRET="your_secret_key"
heroku config:set NODE_ENV="production"
```

#### 5. Deploy
```bash
git push heroku main  # or your branch name
```

#### 6. Check Logs
```bash
heroku logs --tail
```

**Your API will be at:** `https://learnhub-api.herokuapp.com`

---

### Option B: Deploy on Railway.app

#### 1. Create Railway Account
Visit [railway.app](https://railway.app) and sign up

#### 2. Create New Project
- Click "New Project"
- Connect GitHub repository
- Select backend folder

#### 3. Configure Environment Variables
In Railway dashboard:
- Add `MONGODB_URI`
- Add `JWT_SECRET`
- Add `NODE_ENV=production`

#### 4. Deploy
Railway automatically deploys on git push

**Your API will be at:** `https://your-app.up.railway.app`

---

### Option C: Deploy on AWS EC2

#### 1. Launch EC2 Instance
- Choose Ubuntu 20.04 LTS
- Create security group (allow ports 80, 443, 5000)

#### 2. SSH into Instance
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

#### 3. Install Dependencies
```bash
sudo apt update
sudo apt install nodejs npm git nginx
```

#### 4. Clone Repository
```bash
cd /home/ubuntu
git clone https://github.com/your-repo/learnhub.git
cd learnhub/backend
```

#### 5. Install and Build
```bash
npm install
npm run build  # if applicable
```

#### 6. Configure PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 start index.js --name "learnhub-api"
pm2 startup
pm2 save
```

#### 7. Configure Nginx Reverse Proxy
```bash
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 8. Restart Nginx
```bash
sudo nginx -s reload
```

---

## Part 3: Deploy Frontend

### Option A: Deploy on Vercel (Recommended)

#### 1. Create Vercel Account
Visit [vercel.com](https://vercel.com) and sign up with GitHub

#### 2. Import Project
- Click "New Project"
- Import GitHub repository
- Select frontend folder as root

#### 3. Configure Build Settings
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: Add as needed

#### 4. Deploy
Vercel automatically deploys on git push

**Your app will be at:** `https://your-app.vercel.app`

---

### Option B: Deploy on Netlify

#### 1. Create Netlify Account
Visit [netlify.com](https://netlify.com)

#### 2. Connect GitHub
- Click "New site from Git"
- Authorize Netlify
- Select your repository

#### 3. Configure Build Settings
- Build command: `npm run build`
- Publish directory: `dist`

#### 4. Environment Variables
In Netlify dashboard → Settings → Build & deploy:
- Add API base URL environment variables

#### 5. Deploy
Click "Deploy"

---

### Option C: Deploy on AWS S3 + CloudFront

#### 1. Create S3 Bucket
```bash
aws s3 mb s3://your-learnhub-app
```

#### 2. Build and Upload
```bash
cd frontend
npm run build
aws s3 sync dist/ s3://your-learnhub-app --delete
```

#### 3. Create CloudFront Distribution
- Use S3 bucket as origin
- Set default root object to `index.html`
- Create custom domain

---

## Part 4: Configure MongoDB Atlas

### 1. Create Cluster
- Visit [mongodb.com/cloud](https://mongodb.com/cloud)
- Create free cluster
- Choose region closest to your users

### 2. Create Database User
- Go to Database Access
- Create user with strong password
- Save credentials

### 3. Get Connection String
- Go to Clusters → Connect
- Copy connection string
- Replace `<password>` with your password
- Use this as `MONGODB_URI` in backend

---

## Part 5: Setup Custom Domain

### 1. Register Domain
- Use Namecheap, GoDaddy, or your preferred registrar
- Common domain: `learnhub.app` or `yourbrand-courses.com`

### 2. Point to Your Server

**For Vercel/Netlify:**
- Go to project Settings
- Add domain
- Update DNS records (CNAME/A records)

**For AWS/Custom Server:**
- Update A record to point to your IP or CloudFront domain
- Setup SSL certificate (Let's Encrypt via Certbot)

---

## Part 6: Setup SSL/HTTPS

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### AWS Certificate Manager
- Free SSL certificates
- Auto-renewal
- Use with CloudFront

---

## Part 7: Monitoring and Maintenance

### 1. Setup Logging

**Backend Logging (Winston or Morgan)**
```javascript
const morgan = require('morgan');
app.use(morgan('combined')); // Log HTTP requests
```

### 2. Monitor Performance
- Use New Relic, Datadog, or Sentry
- Set up alerts for errors
- Monitor API response times

### 3. Database Backups
```bash
# MongoDB Atlas automatic backups
# Configure in MongoDB Atlas dashboard
# Backup retention: 3-90 days
```

### 4. Regular Updates
```bash
# Keep dependencies updated
npm audit
npm update
```

---

## Part 8: Production Checklist

- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] Database backups enabled
- [ ] SSL/HTTPS enabled
- [ ] Error logging setup
- [ ] Performance monitoring active
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] Authentication tokens secure
- [ ] Database passwords secured
- [ ] API keys not committed to git
- [ ] Security headers configured
- [ ] Database indexed properly
- [ ] Frontend build optimized
- [ ] CDN configured for static assets

---

## Part 9: Troubleshooting Deployment

### Backend Won't Start
```bash
# Check logs
heroku logs --tail  # or equivalent for your platform
# Verify environment variables
heroku config       # or check deployment platform
```

### Database Connection Error
```bash
# Verify connection string
echo $MONGODB_URI
# Check IP whitelist in MongoDB Atlas
# Allow connection from your server IP
```

### CORS Errors
```bash
# Update CORS settings in backend
// backend/index.js
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### Frontend Not Loading
```bash
# Check build was successful
npm run build
# Verify build output in deployment
# Check for 404 errors in browser DevTools
```

---

## Part 10: Scaling for Production

### 1. Database Optimization
- Add indexes to frequently queried fields
- Use MongoDB aggregation for complex queries
- Enable compression

### 2. Caching
```javascript
// Redis caching example
const redis = require('redis');
const cache = redis.createClient();

app.get('/courses', async (req, res) => {
  const cached = await cache.get('all-courses');
  if (cached) return res.json(JSON.parse(cached));
  
  const courses = await Course.find();
  await cache.setEx('all-courses', 3600, JSON.stringify(courses));
  res.json(courses);
});
```

### 3. Load Balancing
- Use Nginx or AWS Load Balancer
- Deploy multiple backend instances
- Auto-scaling based on demand

### 4. CDN for Static Assets
- CloudFront (AWS)
- Cloudflare
- Fastly

---

## Part 11: Cost Optimization

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Vercel | $0 | 100GB bandwidth |
| Netlify | $0 | 100GB bandwidth |
| Heroku | ENDED | ~$7/month dyno |
| Railway | $5/month | Pay as you go |
| MongoDB Atlas | $0 | 512MB database |
| AWS EC2 | 1 year free | Then ~$10/month |

---

## Security Best Practices

1. **Environment Variables**
   - Never commit secrets to git
   - Use `.env.example` for templates
   - Rotate tokens periodically

2. **Database Security**
   - Use strong passwords (32+ characters)
   - IP whitelist your servers
   - Enable encryption at rest

3. **API Security**
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS only
   - Set secure CORS policies

4. **Code Security**
   - Keep dependencies updated
   - Run `npm audit` regularly
   - Use security linters

---

## Quick Deployment Summary

### 1. Prepare
```bash
# Backend
cd backend
npm install
npm run build

# Frontend
cd frontend
npm install
npm run build
```

### 2. Deploy Backend (Heroku example)
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI="..."
git push heroku main
```

### 3. Deploy Frontend (Vercel example)
```bash
cd frontend
npm install -g vercel
vercel --prod
```

### 4. Update Frontend API Endpoint
- Configure backend URL in `src/api/apiClient.js`
- Rebuild and redeploy frontend

---

## Support

For deployment issues:
- Check platform-specific documentation
- Review error logs
- Consult the main README.md
- Open an issue on GitHub

---

**Happy Deploying! 🚀**
