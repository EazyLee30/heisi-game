# Deployment Guide

## 🚀 Deployment Process

### Prerequisites
- Access to the deployment server
- SSH key configured
- Nginx installed on the server

### Server Requirements
- Node.js v14 or higher
- Nginx
- Sufficient disk space
- Proper firewall configuration

## 📦 Deployment Steps

1. **Prepare the Build**
```bash
npm run build
```

2. **Configure Nginx**
- Copy the `nginx.conf` to the server
- Place it in `/etc/nginx/conf.d/heisi-game.conf`

3. **Run Deployment Script**
```bash
./deploy.sh
```

## 🔧 Nginx Configuration

The project includes a basic Nginx configuration (`nginx.conf`) that:
- Serves static files
- Handles client-side routing
- Configures proper caching
- Sets up security headers

## 🛠️ Manual Deployment

If you need to deploy manually:

1. Build the application:
```bash
npm run build
```

2. Copy files to server:
```bash
scp -r build/* user@server:/var/www/heisi-game/
```

3. Set permissions:
```bash
ssh user@server "chown -R www-data:www-data /var/www/heisi-game"
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version
   - Verify all dependencies are installed
   - Check for syntax errors

2. **Deployment Fails**
   - Verify SSH access
   - Check server permissions
   - Ensure Nginx is running

3. **Application Not Loading**
   - Check Nginx configuration
   - Verify file permissions
   - Check server logs

## 📝 Post-Deployment Checklist

- [ ] Verify application is accessible
- [ ] Check all routes are working
- [ ] Test all features
- [ ] Monitor server resources
- [ ] Set up monitoring and logging 