# AWS Free Tier Account Setup Guide

## 📋 Overview

This guide walks you through creating an AWS Free Tier account for the Library Recommendation System project. The new AWS Free Tier (v2) offers up to **$200 in credits** and **6 months** of free access to explore AWS services.

**Important**: This guide applies to accounts created **after July 15, 2025**.

---

## 🎁 What You Get with AWS Free Tier v2

### Sign-Up Credits

- **$100 USD** - Automatically credited upon account creation
- **$100 USD** - Additional credits earned by completing activities (see below)

### Free Account Plan Features

- **Duration**: 6 months OR until credits are fully used (whichever comes first)
- **Access**: 30+ AWS services with monthly free usage limits
- **Cost**: $0 - No charges during the free period
- **Upgrade**: Can upgrade to Paid plan anytime

### Services Included in This Project

All services used in this project are included in the Free Tier:

- ✅ AWS Lambda (1M requests/month free)
- ✅ Amazon DynamoDB (25GB storage free)
- ✅ Amazon API Gateway (1M requests/month free)
- ✅ Amazon Cognito (50,000 MAU free)
- ✅ Amazon Bedrock (pay-per-use, ~$0.01 per recommendation)
- ✅ Amazon S3 (5GB storage free)
- ✅ Amazon CloudFront (1TB transfer free)

**Expected Cost for This Project**: $0-5 USD/month (well within Free Tier limits)

---

## 🚀 Step-by-Step Account Creation

### Prerequisites

Before you start, have ready:

- ✅ Valid email address
- ✅ Phone number (for verification)
- ✅ Credit/debit card (required for verification, won't be charged)
- ✅ Valid government-issued ID or passport (may be required)

---

### Step 1: Navigate to AWS Free Tier

1. Open your web browser
2. Go to: **https://aws.amazon.com/free/**
3. Click the **"Create a Free Account"** button

---

### Step 2: Create Your AWS Account

#### 2.1 Enter Account Information

Fill in the following:

- **Email address**: Use a valid email you can access
- **AWS account name**: Choose a descriptive name (e.g., "Library-Project-Dev")
- **Password**: Create a strong password (min 8 characters, uppercase, lowercase, numbers, symbols)
- **Confirm password**: Re-enter your password

Click **"Continue"**

#### 2.2 Contact Information

Choose account type:

- **Personal** - For individual learning/development (recommended for students)
- **Business** - For company/organization use

Fill in:

- **Full name**: Your legal name
- **Phone number**: Include country code
- **Country/Region**: Your location
- **Address**: Complete mailing address
- **City**: Your city
- **State/Province**: Your state/province
- **Postal code**: Your postal/ZIP code

✅ Check the box: "I have read and agree to the terms of the AWS Customer Agreement"

Click **"Continue"**

---

### Step 3: Payment Information

#### 3.1 Add Credit/Debit Card

**Important**: Your card is for verification only. You won't be charged during the Free Tier period.

Enter:

- **Card number**: 16-digit card number
- **Expiration date**: MM/YY
- **Cardholder name**: Name on card
- **Billing address**: Use same as contact address or enter different

Click **"Verify and Continue"**

#### 3.2 Verification Charge

AWS will place a temporary $1 USD authorization hold on your card:

- This verifies your card is valid
- The hold will be released within 3-5 business days
- You will NOT be charged this amount

---

### Step 4: Identity Verification

#### 4.1 Phone Verification

Choose verification method:

- **Text message (SMS)** - Recommended
- **Voice call** - If SMS not available

Enter:

- **Phone number**: Must be able to receive calls/texts
- **Security check**: Enter the CAPTCHA code

Click **"Send SMS"** or **"Call me now"**

#### 4.2 Enter Verification Code

- Check your phone for a 4-digit code
- Enter the code in the verification field
- Click **"Verify Code"**

---

### Step 5: Choose Your Support Plan

You'll see three options:

#### Basic Support (Free) ✅ Recommended for Students

- **Cost**: $0/month
- **Includes**:
  - Customer Service 24/7
  - Documentation and forums
  - AWS Trusted Advisor (7 core checks)
  - AWS Personal Health Dashboard

**Select "Basic Support"** and click **"Complete sign up"**

#### Developer Support ($29/month)

- For development/testing environments
- Business hours email support
- Not needed for this project

#### Business Support ($100/month)

- For production workloads
- 24/7 phone/email/chat support
- Not needed for this project

---

### Step 6: Choose Your Account Plan

**Important**: This is where you choose between Free and Paid plans.

#### Free Account Plan ✅ Recommended for This Project

**Choose this if**:

- You're learning AWS
- Building proof of concepts
- Working on this course project
- Want to avoid any charges

**Features**:

- $200 in credits ($100 immediate + $100 earned)
- 6 months duration
- No charges during free period
- Access to 30+ services
- Can upgrade anytime

**Limitations**:

- Some services not available (won't affect this project)
- Expires after 6 months or when credits depleted

**Click "Choose Free Account Plan"**

#### Paid Account Plan

**Choose this if**:

- Building production applications
- Need access to all AWS services
- Expect to exceed Free Tier limits

**Features**:

- $200 in credits (same as Free plan)
- Pay-as-you-go pricing after credits
- Access to all AWS services
- No expiration

**For this project, choose Free Account Plan**

---

### Step 7: Welcome to AWS! 🎉

You should see a confirmation screen:

- ✅ Account created successfully
- ✅ $100 credits added to your account
- ✅ Free Tier activated

**Next Steps**:

1. Check your email for AWS welcome message
2. Sign in to AWS Console
3. Set up billing alerts (see below)
4. Earn additional $100 in credits

---

## 💰 Earning Additional $100 in Credits

Complete these activities to earn the additional $100:

### Activity 1: Launch an EC2 Instance

- **Credits**: $25
- **How**: Launch any EC2 instance (t2.micro recommended)
- **Time**: 5-10 minutes
- **Guide**: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html

### Activity 2: Use Amazon Bedrock

- **Credits**: $25
- **How**: Make API calls to Bedrock (you'll do this in Week 4!)
- **Time**: Part of project
- **Guide**: https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

### Activity 3: Create an RDS Database

- **Credits**: $25
- **How**: Launch an RDS database instance
- **Time**: 5-10 minutes
- **Guide**: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.html

### Activity 4: Use AWS Lambda

- **Credits**: $25
- **How**: Create and invoke Lambda functions (you'll do this in Week 1!)
- **Time**: Part of project
- **Guide**: https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html

**Note**: You'll naturally complete Activities 2 and 4 during this project!

---

## 🔔 Setting Up Billing Alerts (CRITICAL!)

**Do this immediately after account creation to avoid unexpected charges.**

### Step 1: Enable Billing Alerts

1. Sign in to AWS Console: https://console.aws.amazon.com/
2. Click your account name (top right) → **"Account"**
3. Scroll to **"Billing preferences"**
4. Check these boxes:
   - ✅ **"Receive Free Tier Usage Alerts"**
   - ✅ **"Receive Billing Alerts"**
5. Enter your email address
6. Click **"Save preferences"**

### Step 2: Create a Budget Alert

1. Go to AWS Budgets: https://console.aws.amazon.com/billing/home#/budgets
2. Click **"Create budget"**
3. Choose **"Use a template (simplified)"**
4. Select **"Zero spend budget"**
5. Enter:
   - **Budget name**: "Free-Tier-Alert"
   - **Email recipients**: Your email address
6. Click **"Create budget"**

This will alert you if you incur ANY charges.

### Step 3: Create a Cost Alert (Optional but Recommended)

1. In AWS Budgets, click **"Create budget"** again
2. Choose **"Customize (advanced)"**
3. Select **"Cost budget"**
4. Set:
   - **Budget name**: "Monthly-Cost-Alert"
   - **Period**: Monthly
   - **Budgeted amount**: $10 USD
5. Configure alert:
   - **Alert threshold**: 80% of budgeted amount ($8)
   - **Email recipients**: Your email
6. Click **"Create budget"**

### Step 4: Set Up CloudWatch Billing Alarm

1. Go to CloudWatch: https://console.aws.amazon.com/cloudwatch/
2. **Important**: Change region to **US East (N. Virginia)** - billing metrics only available here
3. Click **"Alarms"** → **"Create alarm"**
4. Click **"Select metric"**
5. Choose **"Billing"** → **"Total Estimated Charge"**
6. Select the checkbox next to **"EstimatedCharges"**
7. Click **"Select metric"**
8. Configure:
   - **Threshold type**: Static
   - **Whenever EstimatedCharges is**: Greater than
   - **Than**: 5 (USD)
9. Click **"Next"**
10. Configure notification:
    - **Select an SNS topic**: Create new topic
    - **Topic name**: "Billing-Alerts"
    - **Email endpoint**: Your email
11. Click **"Create topic"**
12. Check your email and confirm the SNS subscription
13. Click **"Next"**
14. Enter alarm name: "Billing-Alert-5USD"
15. Click **"Create alarm"**

**You're now protected from unexpected charges!** 🛡️

---

## 🔐 Security Best Practices

### Step 1: Enable Multi-Factor Authentication (MFA)

1. Go to IAM Console: https://console.aws.amazon.com/iam/
2. Click **"Dashboard"** → **"Add MFA"** (under Security recommendations)
3. Choose MFA device:
   - **Virtual MFA device** (recommended) - Use Google Authenticator or Authy
   - **Hardware MFA device** - Physical token
4. Follow the setup wizard
5. Scan QR code with your authenticator app
6. Enter two consecutive MFA codes
7. Click **"Assign MFA"**

### Step 2: Create an IAM User (Don't Use Root Account)

1. In IAM Console, click **"Users"** → **"Create user"**
2. Enter username: "library-project-admin"
3. Check **"Provide user access to the AWS Management Console"**
4. Choose **"I want to create an IAM user"**
5. Set password or auto-generate
6. Click **"Next"**
7. Attach policies:
   - ✅ **AdministratorAccess** (for learning purposes)
   - For production, use more restrictive policies
8. Click **"Next"** → **"Create user"**
9. **Save the sign-in URL, username, and password**
10. Sign out and sign in with your new IAM user

**From now on, use your IAM user, not the root account!**

### Step 3: Install AWS CLI

#### macOS:

```bash
# Using Homebrew
brew install awscli

# Verify installation
aws --version
```

#### Windows:

1. Download: https://awscli.amazonaws.com/AWSCLIV2.msi
2. Run the installer
3. Open Command Prompt and verify: `aws --version`

#### Linux:

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

### Step 4: Configure AWS CLI

1. Create access keys for your IAM user:

   - Go to IAM Console → Users → Your user
   - Click **"Security credentials"** tab
   - Scroll to **"Access keys"**
   - Click **"Create access key"**
   - Choose **"Command Line Interface (CLI)"**
   - Check the confirmation box
   - Click **"Next"** → **"Create access key"**
   - **Download the .csv file** (you can't retrieve this later!)

2. Configure CLI:

```bash
aws configure
```

Enter:

- **AWS Access Key ID**: From your downloaded .csv
- **AWS Secret Access Key**: From your downloaded .csv
- **Default region name**: us-east-1
- **Default output format**: json

3. Test configuration:

```bash
aws sts get-caller-identity
```

You should see your account information.

---

## 📊 Monitoring Your Free Tier Usage

### AWS Free Tier Dashboard

1. Go to: https://console.aws.amazon.com/billing/home#/freetier
2. View your usage for each service
3. See how much of your credits remain
4. Check when your Free Tier expires

### Key Metrics to Monitor

- **Credits Remaining**: Check weekly
- **Service Usage**: Monitor Lambda invocations, DynamoDB storage
- **Estimated Charges**: Should be $0 during Free Tier
- **Free Tier Expiration**: Note your 6-month deadline

### Setting Up Usage Alerts

1. Go to Billing Preferences
2. Enable **"Receive Free Tier Usage Alerts"**
3. You'll get emails when you approach limits:
   - 85% of Free Tier limit
   - 100% of Free Tier limit

---

## 💡 Tips for Staying Within Free Tier

### Do's ✅

- ✅ Use t2.micro or t3.micro EC2 instances
- ✅ Keep DynamoDB tables small (<25GB)
- ✅ Use on-demand pricing for DynamoDB
- ✅ Delete resources when not using them
- ✅ Monitor usage weekly
- ✅ Set up billing alerts
- ✅ Use Lambda instead of EC2 when possible
- ✅ Enable S3 lifecycle policies

### Don'ts ❌

- ❌ Leave EC2 instances running 24/7
- ❌ Store large files in S3 unnecessarily
- ❌ Make excessive Bedrock API calls
- ❌ Use expensive instance types
- ❌ Ignore billing alerts
- ❌ Create resources in multiple regions
- ❌ Leave unused resources running

### For This Project Specifically

**Expected Usage**:

- Lambda: ~1,000 invocations/month (well under 1M limit)
- DynamoDB: ~100MB storage (well under 25GB limit)
- API Gateway: ~1,000 requests/month (well under 1M limit)
- Cognito: ~10 users (well under 50,000 limit)
- Bedrock: ~50 recommendations (cost: ~$0.50)
- S3: ~100MB (well under 5GB limit)
- CloudFront: ~1GB transfer (well under 1TB limit)

**Total Expected Cost**: $0-2 USD/month

---

## 🆘 Troubleshooting

### Issue: Card Declined During Verification

**Solutions**:

- Ensure card has international transactions enabled
- Try a different card
- Contact your bank to authorize AWS charges
- Use a debit card instead of credit card

### Issue: Phone Verification Not Working

**Solutions**:

- Try voice call instead of SMS
- Use a different phone number
- Ensure phone can receive international calls
- Wait 5 minutes and try again

### Issue: Can't See Free Tier Dashboard

**Solutions**:

- Wait 24 hours after account creation
- Clear browser cache
- Try a different browser
- Sign out and sign in again

### Issue: Billing Alert Not Working

**Solutions**:

- Confirm SNS subscription email
- Check spam folder for confirmation email
- Ensure billing alerts are enabled in preferences
- Wait 24 hours for alerts to activate

### Issue: Credits Not Showing

**Solutions**:

- Wait 24-48 hours after account creation
- Check Credits page: https://console.aws.amazon.com/billing/home#/credits
- Ensure you chose Free Account Plan
- Contact AWS Support if still not showing

---

## 📞 Getting Help

### AWS Support (Free Tier)

- **Documentation**: https://docs.aws.amazon.com/
- **Forums**: https://repost.aws/
- **Support Center**: https://console.aws.amazon.com/support/

### For Account Issues

- **AWS Support**: Create a case in Support Center
- **Billing Questions**: https://console.aws.amazon.com/billing/

### For This Project

- Ask your instructor
- Check IMPLEMENTATION_GUIDE.md
- Review RESOURCES.md for documentation links

---

## ✅ Account Setup Checklist

Before starting the project, ensure you've completed:

- [ ] Created AWS account with Free Account Plan
- [ ] Verified email address
- [ ] Verified phone number
- [ ] Added payment method
- [ ] Received $100 sign-up credits
- [ ] Enabled billing alerts
- [ ] Created zero-spend budget
- [ ] Set up CloudWatch billing alarm
- [ ] Enabled MFA on root account
- [ ] Created IAM user for daily use
- [ ] Installed AWS CLI
- [ ] Configured AWS CLI with access keys
- [ ] Tested AWS CLI connection
- [ ] Bookmarked Free Tier dashboard
- [ ] Reviewed Free Tier limits

**Once all items are checked, you're ready to start Week 1!** 🚀

---

## 📚 Additional Resources

### Official AWS Documentation

- **AWS Free Tier**: https://aws.amazon.com/free/
- **Free Tier FAQs**: https://aws.amazon.com/free/free-tier-faqs/
- **Billing Documentation**: https://docs.aws.amazon.com/awsaccountbilling/
- **Account Management**: https://docs.aws.amazon.com/accounts/

### Cost Management

- **AWS Pricing Calculator**: https://calculator.aws/
- **Cost Explorer**: https://console.aws.amazon.com/cost-management/home
- **AWS Budgets**: https://console.aws.amazon.com/billing/home#/budgets

### Security

- **IAM Best Practices**: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
- **MFA Setup**: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html

---

## 🎯 Next Steps

After completing account setup:

1. ✅ **Verify everything works**:

   ```bash
   aws sts get-caller-identity
   ```

2. ✅ **Check your credits**:

   - Go to: https://console.aws.amazon.com/billing/home#/credits
   - Confirm you have $100 credits

3. ✅ **Review Free Tier dashboard**:

   - Go to: https://console.aws.amazon.com/billing/home#/freetier
   - Familiarize yourself with the interface

4. ✅ **Start Week 1 of the project**:
   - Read: `library-recommendation-system/README.md`
   - Follow: `IMPLEMENTATION_GUIDE.md` - Week 1

---

**Congratulations! Your AWS Free Tier account is ready for the Library Recommendation System project!** 🎉

---

_Last Updated: November 25, 2025_  
_AWS Free Tier Version: v2 (after July 15, 2025)_
