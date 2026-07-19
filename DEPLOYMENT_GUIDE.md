# Deployment Guide: Azure VPS with DuckDNS Domain

## Prerequisites

- Azure VPS with Linux (Ubuntu recommended)
- DuckDNS domain: `tanvir-sifat.duckdns.org`
- SSH access to your VPS
- Git installed (optional but recommended)

---

## Step 1: Prepare Your Project for Production

### 1.1 Build Your React Project Locally

```bash
npm install  # If not already done
npm run build
```

This creates a `dist/` folder with production-ready files.

### 1.2 Verify Build Output

The `dist/` folder should contain:

- `index.html`
- `assets/` folder with CSS and JS files
- Other static files

---

## Step 2: Set Up Your Azure VPS

### 2.1 SSH into Your VPS

```bash
ssh username@your-vps-ip
```

### 2.2 Update System Packages

```bash
sudo apt update
sudo apt upgrade -y
```

### 2.3 Install Required Software

#### Install Node.js (Optional - for running Node-based backend)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### Install Nginx (Web Server)

```bash
sudo apt install -y nginx
```

#### Install Certbot for SSL Certificate (Let's Encrypt - Free)

```bash
sudo apt install -y certbot python3-certbot-nginx
```

---

## Step 3: Deploy Your Project Files

### Option A: Using Git (Recommended)

#### 3.1 Set Up Git Repository on VPS

```bash
# Create project directory
sudo mkdir -p /var/www/portfolio
cd /var/www/portfolio

# Clone your repository (if you have it on GitHub/GitLab)
sudo git clone https://github.com/yourusername/sifat-portfolio.git .
# Or initialize if deploying locally
```

#### 3.2 Build on VPS

```bash
cd /var/www/portfolio
npm install
npm run build
```

### Option B: Using SCP (Copy Files Directly)

#### 3.1 From Your Local Machine

```bash
# Build locally
npm run build

# Copy dist folder to VPS
scp -r dist/ username@your-vps-ip:/tmp/portfolio-dist/

# Then on VPS:
# sudo cp -r /tmp/portfolio-dist/* /var/www/portfolio/
```

---

## Step 4: Configure Nginx

### 4.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

### 4.2 Add This Configuration

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name tanvir-sifat.duckdns.org;

    root /var/www/portfolio/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/json;

    # Cache static assets
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - serve index.html for all non-file requests
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Block access to certain files
    location ~ /\. {
        deny all;
    }
}
```

### 4.3 Enable the Configuration

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

## Step 5: Set Up DuckDNS Domain

### 5.1 Get Your DuckDNS Token

- Go to https://www.duckdns.org/
- Log in (create account if needed)
- Copy your token

### 5.2 Set Up Dynamic DNS Update

#### Option A: Using Cron Job (Automatic Updates)

```bash
# Create update script
sudo nano /usr/local/bin/duckdns-update.sh
```

Add this content:

```bash
#!/bin/bash
DUCKDNS_DOMAIN="tanvir-sifat"
DUCKDNS_TOKEN="your-duckdns-token-here"

curl "https://www.duckdns.org/update?domains=$DUCKDNS_DOMAIN&token=$DUCKDNS_TOKEN&ip="
```

Make it executable and add to cron:

```bash
sudo chmod +x /usr/local/bin/duckdns-update.sh
sudo crontab -e
```

Add this line:

```
*/5 * * * * /usr/local/bin/duckdns-update.sh
```

This updates DuckDNS every 5 minutes.

#### Option B: Manual Update

Simply visit this URL (replace with your token):

```
https://www.duckdns.org/update?domains=tanvir-sifat&token=YOUR_TOKEN&ip=
```

---

## Step 6: Set Up SSL Certificate (Free with Let's Encrypt)

### 6.1 Install Certificate

```bash
sudo certbot --nginx -d tanvir-sifat.duckdns.org
```

Follow the prompts to:

- Enter your email
- Accept terms
- Choose redirect option (recommend automatic redirect)

### 6.2 Set Up Auto-Renewal

```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

Check renewal status:

```bash
sudo certbot renew --dry-run
```

---

## Step 7: Verify Deployment

### 7.1 Test Your Domain

```bash
# From any machine
curl http://tanvir-sifat.duckdns.org
# Or access in browser: https://tanvir-sifat.duckdns.org
```

### 7.2 Check Nginx Status

```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/access.log  # View access logs
sudo tail -f /var/log/nginx/error.log   # View error logs
```

### 7.3 Verify Certificate

```bash
sudo certbot certificates
```

---

## Step 8: Continuous Deployment (Optional)

### 8.1 Set Up Auto-Deployment from Git

Create a deployment script on VPS:

```bash
sudo nano /usr/local/bin/deploy-portfolio.sh
```

```bash
#!/bin/bash
cd /var/www/portfolio
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
echo "Portfolio deployed at $(date)"
```

Make it executable:

```bash
sudo chmod +x /usr/local/bin/deploy-portfolio.sh
```

### 8.2 Set Up GitHub Webhook (Advanced)

You can automate deployments when you push to GitHub using webhooks + a simple Node.js server.

---

## Troubleshooting

### Domain not connecting

- Verify DuckDNS IP is updated: `https://www.duckdns.org/` dashboard
- Check your firewall allows port 80 & 443
- Verify Nginx is running: `sudo systemctl status nginx`

### SSL certificate issues

```bash
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

### Build files not showing

- Verify files in `/var/www/portfolio/dist/`
- Check Nginx configuration: `sudo nginx -t`
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### SPA routing not working

- Ensure Nginx config has `try_files $uri $uri/ /index.html;`
- Reload Nginx: `sudo systemctl reload nginx`

---

## Security Best Practices

1. **Firewall**: Only open ports 22 (SSH), 80 (HTTP), 443 (HTTPS)

   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

2. **Update Regularly**

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

3. **Disable Root Login**
   Edit `/etc/ssh/sshd_config`:

   ```
   PermitRootLogin no
   ```

4. **Use SSH Keys** instead of passwords
   ```bash
   ssh-keygen -t rsa -b 4096
   # Copy public key to VPS ~/.ssh/authorized_keys
   ```

---

## Quick Deployment Commands Summary

```bash
# Build locally
npm run build

# SSH to VPS
ssh username@vps-ip

# Deploy using Git (on VPS)
cd /var/www/portfolio && git pull && npm install && npm run build

# Or deploy using SCP (from local machine)
scp -r dist/ username@vps-ip:/var/www/portfolio/

# Reload Nginx
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
curl https://tanvir-sifat.duckdns.org
```

---

## Next Steps

1. ✅ Build your project: `npm run build`
2. ✅ Upload to VPS (Git or SCP)
3. ✅ Configure Nginx
4. ✅ Set up DuckDNS
5. ✅ Install SSL certificate
6. ✅ Test your domain
7. ✅ Set up auto-updates (optional)

Good luck! 🚀
