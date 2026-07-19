#!/bin/bash

# VPS Deployment Setup Script
# Run this ONCE on your Azure VPS to set up everything

set -e  # Exit on error

echo "========================================="
echo "Azure VPS Setup - Portfolio Deployment"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root or with sudo
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

echo -e "${YELLOW}Step 1: Update system packages${NC}"
apt update
apt upgrade -y
echo -e "${GREEN}✅ System updated${NC}\n"

echo -e "${YELLOW}Step 2: Install Node.js${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
echo -e "${GREEN}✅ Node.js installed: $(node -v)${NC}\n"

echo -e "${YELLOW}Step 3: Install Nginx${NC}"
apt install -y nginx
systemctl enable nginx
systemctl start nginx
echo -e "${GREEN}✅ Nginx installed and running${NC}\n"

echo -e "${YELLOW}Step 4: Install Certbot for SSL${NC}"
apt install -y certbot python3-certbot-nginx
echo -e "${GREEN}✅ Certbot installed${NC}\n"

echo -e "${YELLOW}Step 5: Create project directory${NC}"
mkdir -p /var/www/portfolio
chown -R www-data:www-data /var/www/portfolio
echo -e "${GREEN}✅ Project directory created${NC}\n"

echo -e "${YELLOW}Step 6: Configure firewall${NC}"
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
echo -e "${GREEN}✅ Firewall configured${NC}\n"

echo -e "${YELLOW}Step 7: Create deployment script${NC}"
cat > /usr/local/bin/deploy-portfolio.sh << 'DEPLOY_SCRIPT'
#!/bin/bash
set -e

PROJECT_DIR="/var/www/portfolio"
DOMAIN="tanvir-sifat.duckdns.org"

echo "========================================="
echo "Deploying Portfolio Application"
echo "========================================="

if [ -d "$PROJECT_DIR/.git" ]; then
    echo "📥 Pulling latest code..."
    cd $PROJECT_DIR
    git pull origin main
else
    echo "⚠️  Git repository not found. Please clone your repository first:"
    echo "   git clone <your-repo-url> $PROJECT_DIR"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install --production

echo "🔨 Building project..."
npm run build

echo "🔄 Reloading Nginx..."
systemctl reload nginx

echo "✅ Deployment complete!"
echo "🌐 Visit: https://$DOMAIN"

DEPLOY_SCRIPT

chmod +x /usr/local/bin/deploy-portfolio.sh
echo -e "${GREEN}✅ Deployment script created${NC}\n"

echo -e "${YELLOW}Step 8: Create DuckDNS update script${NC}"
cat > /usr/local/bin/duckdns-update.sh << 'DUCKDNS_SCRIPT'
#!/bin/bash

# DuckDNS Configuration
DUCKDNS_DOMAIN="tanvir-sifat"
DUCKDNS_TOKEN="YOUR_TOKEN_HERE"  # Replace with your token

# Update DuckDNS
curl -s "https://www.duckdns.org/update?domains=$DUCKDNS_DOMAIN&token=$DUCKDNS_TOKEN&ip=" > /dev/null

echo "DuckDNS updated at $(date)" >> /var/log/duckdns-update.log

DUCKDNS_SCRIPT

chmod +x /usr/local/bin/duckdns-update.sh
echo -e "${GREEN}✅ DuckDNS update script created${NC}\n"

echo -e "${YELLOW}Step 9: Setup cron job for DuckDNS updates${NC}"
(crontab -l 2>/dev/null | grep -v duckdns-update; echo "*/5 * * * * /usr/local/bin/duckdns-update.sh") | crontab -
echo -e "${GREEN}✅ Cron job added (runs every 5 minutes)${NC}\n"

echo "========================================="
echo -e "${GREEN}VPS Setup Complete!${NC}"
echo "========================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Configure DuckDNS token:"
echo "   sudo nano /usr/local/bin/duckdns-update.sh"
echo "   (Replace YOUR_TOKEN_HERE with your token from duckdns.org)"
echo ""
echo "2️⃣  Upload your project:"
echo "   Option A (Git):"
echo "     git clone <your-repo> /var/www/portfolio"
echo ""
echo "   Option B (SCP):"
echo "     scp -r dist/ root@<vps-ip>:/var/www/portfolio/"
echo ""
echo "3️⃣  Deploy the project:"
echo "   /usr/local/bin/deploy-portfolio.sh"
echo ""
echo "4️⃣  Set up SSL certificate:"
echo "   certbot --nginx -d tanvir-sifat.duckdns.org"
echo ""
echo "5️⃣  Verify deployment:"
echo "   curl https://tanvir-sifat.duckdns.org"
echo ""
echo "========================================="
