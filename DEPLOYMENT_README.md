# Deployment Files Reference

This directory contains all files needed to deploy your portfolio to Azure VPS with DuckDNS domain.

## 📁 Files Overview

### 1. **DEPLOYMENT_GUIDE.md** 📖

Comprehensive step-by-step guide covering:

- Project preparation
- VPS setup
- Nginx configuration
- DuckDNS configuration
- SSL certificate setup
- Continuous deployment
- Troubleshooting

**When to use:** Read this first! It has all the details and explanations.

---

### 2. **vps-setup.sh** 🚀

Automated VPS setup script - installs everything needed in one command.

**How to use:**

```bash
# On your VPS (as root):
wget https://raw.githubusercontent.com/yourusername/sifat-portfolio/main/vps-setup.sh
chmod +x vps-setup.sh
sudo ./vps-setup.sh
```

**What it does:**

- ✅ Updates system packages
- ✅ Installs Node.js
- ✅ Installs Nginx
- ✅ Installs Certbot (SSL)
- ✅ Creates project directory
- ✅ Configures firewall
- ✅ Creates deployment scripts
- ✅ Sets up DuckDNS auto-updates

**After running:** Edit `/usr/local/bin/duckdns-update.sh` and add your DuckDNS token

---

### 3. **deploy.sh** 💻

Local build script - prepares your project for deployment from your computer.

**How to use:**

```bash
chmod +x deploy.sh
./deploy.sh
```

**What it does:**

- ✅ Checks Node.js installation
- ✅ Installs dependencies
- ✅ Runs ESLint
- ✅ Builds production files
- ✅ Shows build output
- ✅ Displays next steps

---

### 4. **nginx.conf** ⚙️

Complete Nginx configuration with SSL, compression, caching, and security headers.

**How to use:**

```bash
# On your VPS:
sudo cp nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Features:**

- HTTPS with HTTP/2
- Gzip compression
- Static asset caching
- SPA routing (React Router support)
- Security headers
- Rate limiting (optional)

---

## 🚀 Quick Start Deployment

### First Time Setup

**Step 1: Local Setup**

```bash
# On your local machine
npm install
./deploy.sh  # This builds your project
```

**Step 2: VPS Setup**

```bash
# On your VPS (SSH as root)
wget https://your-repo-raw-url/vps-setup.sh
chmod +x vps-setup.sh
sudo ./vps-setup.sh
```

**Step 3: Upload Project**

Option A (Using Git - Recommended):

```bash
# On your VPS
cd /var/www/portfolio
git clone https://github.com/yourusername/sifat-portfolio.git .
```

Option B (Using SCP):

```bash
# On your local machine
scp -r dist/ root@your-vps-ip:/var/www/portfolio/
```

**Step 4: Deploy**

```bash
# On your VPS
/usr/local/bin/deploy-portfolio.sh
```

**Step 5: SSL Certificate**

```bash
# On your VPS
sudo certbot --nginx -d tanvir-sifat.duckdns.org
```

**Step 6: Update DuckDNS Token**

```bash
# On your VPS
sudo nano /usr/local/bin/duckdns-update.sh
# Replace YOUR_TOKEN_HERE with your token from duckdns.org
```

**Step 7: Test**

```bash
curl https://tanvir-sifat.duckdns.org
# Or visit in browser: https://tanvir-sifat.duckdns.org
```

---

### Subsequent Deployments

```bash
# On your local machine
./deploy.sh
git push  # If using Git

# On your VPS
/usr/local/bin/deploy-portfolio.sh
```

---

## 🔧 Deployment Commands Reference

### Local Commands

```bash
# Build production files
npm run build

# Preview build
npm run preview

# Check for linting errors
npm run lint

# Automated setup
./deploy.sh
```

### VPS Commands

```bash
# Deploy (after git push or file upload)
/usr/local/bin/deploy-portfolio.sh

# Update DuckDNS manually
/usr/local/bin/duckdns-update.sh

# Check Nginx status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/portfolio_access.log
sudo tail -f /var/log/nginx/portfolio_error.log

# Reload Nginx after config changes
sudo systemctl reload nginx

# Renew SSL certificate
sudo certbot renew

# Check SSL certificate details
sudo certbot certificates
```

---

## 📊 Project Structure After Deployment

```
/var/www/portfolio/
├── dist/                 # Production build files
│   ├── index.html
│   ├── assets/
│   └── ...
├── src/                  # Source code
├── package.json
├── vite.config.js
└── .git/                 # If using Git
```

---

## 🔐 Security Checklist

Before going live:

- [ ] Update DuckDNS token in `/usr/local/bin/duckdns-update.sh`
- [ ] Install SSL certificate: `sudo certbot --nginx -d tanvir-sifat.duckdns.org`
- [ ] Configure firewall: `sudo ufw enable`
- [ ] Disable SSH root login: edit `/etc/ssh/sshd_config`
- [ ] Set up SSH keys: `ssh-keygen -t rsa -b 4096`
- [ ] Check Nginx headers: visit https://securityheaders.com/?q=tanvir-sifat.duckdns.org
- [ ] Test SSL: visit https://www.ssllabs.com/ssltest/

---

## ❓ Troubleshooting

### Domain not working?

```bash
# Check if DuckDNS is updated
curl "https://www.duckdns.org/update?domains=tanvir-sifat&token=YOUR_TOKEN&ip="

# Verify DNS
nslookup tanvir-sifat.duckdns.org

# Check Nginx
sudo nginx -t
sudo systemctl status nginx
```

### Can't access Nginx?

```bash
# Check firewall
sudo ufw status

# Check if port 80/443 is open
sudo netstat -tuln | grep -E ':80|:443'
```

### SSL certificate issues?

```bash
# Renew certificate
sudo certbot renew --force-renewal

# Check certificate
sudo certbot certificates

# View Nginx SSL config
sudo nginx -T | grep ssl
```

---

## 📚 Additional Resources

- **Vite Documentation:** https://vitejs.dev/
- **Nginx Documentation:** https://nginx.org/
- **Let's Encrypt:** https://letsencrypt.org/
- **DuckDNS:** https://www.duckdns.org/
- **Azure:** https://azure.microsoft.com/

---

## 💡 Tips

1. **Keep backups:** Backup your dist/ folder before updates
2. **Monitor logs:** Regularly check `/var/log/nginx/`
3. **Update regularly:** Keep your VPS packages updated
4. **Use Git:** Makes deployment much easier
5. **Test locally:** Test your build with `npm run preview` before deploying
6. **Version control:** Always push changes to Git before deploying

---

**Last Updated:** May 2, 2026
**Portfolio:** tanvir-sifat.duckdns.org
