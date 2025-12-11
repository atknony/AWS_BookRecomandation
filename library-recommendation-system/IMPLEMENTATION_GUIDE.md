# AWS Implementation Guide

## Overview

This guide will help you implement the AWS serverless backend for the Library Recommendation System. You'll build the infrastructure from scratch, learning AWS services as you go.

**Prerequisites**:

- AWS Account with Free Tier access
- AWS CLI installed and configured
- Basic understanding of REST APIs
- Node.js 20+ installed

---

## 📋 Table of Contents

1. [Week 1: AWS Setup & First Lambda](#week-1-aws-setup--first-lambda)
2. [Week 2: DynamoDB & Books API](#week-2-dynamodb--books-api)
3. [Week 3: Authentication with Cognito](#week-3-authentication-with-cognito)
4. [Week 4: AI Recommendations & Deployment](#week-4-ai-recommendations--deployment)

---

## Week 1: AWS Setup & First Lambda

### Day 1-2: AWS Account Setup

#### Step 1: Create AWS Account

1. Go to https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Follow the registration process
4. Set up billing alerts (IMPORTANT!)

#### Step 2: Set Up Billing Alerts

```bash
# Create a billing alarm to avoid unexpected charges
# Go to AWS Console > CloudWatch > Alarms > Create Alarm
# Set threshold: $10 USD
# Add your email for notifications
```

#### Step 3: Install AWS CLI

```bash
# macOS
brew install awscli

# Verify installation
aws --version

# Configure AWS CLI
aws configure
# Enter your Access Key ID
# Enter your Secret Access Key
# Default region: us-east-1
# Default output format: json
```

#### Step 4: Create IAM User for Development

1. Go to IAM Console
2. Create new user: `library-app-dev`
3. Attach policies:
   - `AWSLambda_FullAccess`
   - `AmazonDynamoDBFullAccess`
   - `AmazonAPIGatewayAdministrator`
   - `AmazonCognitoPowerUser`
4. Create access keys and save them securely

### Day 3-4: Your First Lambda Function

#### Create a "Hello World" Lambda

1. **Go to AWS Lambda Console**
2. **Click "Create function"**
3. **Configure**:
   - Function name: `hello-world-test`
   - Runtime: Node.js 20.x
   - Architecture: arm64 (cheaper)
   - Execution role: Create new role

4. **Replace the code**:

```javascript
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      timestamp: new Date().toISOString(),
    }),
  };

  return response;
};
```

5. **Deploy and Test**
   - Click "Deploy"
   - Click "Test" tab
   - Create test event with empty JSON: `{}`
   - Run test and verify response

#### Create API Gateway Endpoint

1. **Go to API Gateway Console**
2. **Create REST API**:
   - Choose "REST API" (not private)
   - API name: `library-api-test`
   - Endpoint type: Regional

3. **Create Resource**:
   - Click "Actions" > "Create Resource"
   - Resource name: `hello`
   - Resource path: `/hello`

4. **Create Method**:
   - Select `/hello` resource
   - Click "Actions" > "Create Method"
   - Choose `GET`
   - Integration type: Lambda Function
   - Select your `hello-world-test` function
   - Save and grant permissions

5. **Enable CORS**:
   - Select `/hello` resource
   - Click "Actions" > "Enable CORS"
   - Use default settings
   - Click "Enable CORS and replace existing CORS headers"

6. **Deploy API**:
   - Click "Actions" > "Deploy API"
   - Deployment stage: `dev`
   - Note your Invoke URL (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com/dev`)

7. **Test with curl**:

```bash
curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/hello
```

**Expected Response**:

```json
{
  "message": "Hello from Lambda!",
  "timestamp": "2024-11-25T10:30:00.000Z"
}
```

### Create GitHub Repository (Important!)

Set up your GitHub repository now so you can commit progress throughout the project.

1. **Create repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `library-recommendation-system`
   - Description: "AI-powered library book recommendation system (CENG413 Project)"
   - Choose **Public** (for portfolio)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

2. **Initialize Git locally**:

```bash
cd library-recommendation-system
git init
git add .
git commit -m "Initial commit: Week 1 complete - Frontend + first Lambda"
```

3. **Push to GitHub**:

```bash
git remote add origin https://github.com/YOUR-USERNAME/library-recommendation-system.git
git branch -M main
git push -u origin main
```

4. **Add repository metadata**:
   - Add topics: `aws`, `react`, `typescript`, `serverless`, `bedrock`, `student-project`
   - Update description if needed

5. **Commit regularly**:

```bash
# After completing each major task
git add .
git commit -m "Week 2: Implemented Books API with DynamoDB"
git push
```

**Benefits of early GitHub setup**:

- ✅ Version control from day 1
- ✅ Backup of your work
- ✅ Track your progress
- ✅ Portfolio piece from the start
- ✅ Easy collaboration with team members

✅ **Week 1 Checkpoint**: You should have a working Lambda function accessible via API Gateway and your project on GitHub!

---

## Week 2: DynamoDB & Books API

### Day 1-2: Create DynamoDB Tables

#### Create Books Table

1. **Go to DynamoDB Console**
2. **Click "Create table"**
3. **Configure Books Table**:
   - Table name: `Books`
   - Partition key: `id` (String)
   - Table settings: Use default settings (On-demand)
   - Click "Create table"

4. **Load Sample Data**:

Create a file `books-data.json`:

```json
{
  "Books": [
    {
      "PutRequest": {
        "Item": {
          "id": { "S": "1" },
          "title": { "S": "The Midnight Library" },
          "author": { "S": "Matt Haig" },
          "genre": { "S": "Fiction" },
          "description": { "S": "Between life and death there is a library..." },
          "coverImage": { "S": "/book-covers/midnight-library.jpg" },
          "rating": { "N": "4.5" },
          "publishedYear": { "N": "2020" },
          "isbn": { "S": "978-0525559474" }
        }
      }
    }
  ]
}
```

Load data:

```bash
aws dynamodb batch-write-item --request-items file://books-data.json
```

**TIP**: Copy all 10 books from `src/services/mockData.ts` and convert to DynamoDB JSON format.

#### Create ReadingLists Table

1. **Create table**:
   - Table name: `ReadingLists`
   - Partition key: `userId` (String)
   - Sort key: `id` (String)
   - Click "Create table"

2. **Create Global Secondary Index**:
   - Go to table > Indexes tab
   - Click "Create index"
   - Partition key: `id` (String)
   - Index name: `id-index`
   - Click "Create index"

### Day 3-4: Implement Books API Lambda Functions

#### Lambda Function: get-books

1. **Create Lambda function**:
   - Name: `library-get-books`
   - Runtime: Node.js 20.x
   - Create new execution role

2. **Add DynamoDB permissions to role**:
   - Go to IAM > Roles
   - Find your Lambda execution role
   - Attach policy: `AmazonDynamoDBReadOnlyAccess`

3. **Function code**:

```javascript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const command = new ScanCommand({
      TableName: 'Books',
    });

    const response = await docClient.send(command);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(response.Items),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch books' }),
    };
  }
};
```

4. **Deploy and test**

5. **Add to API Gateway**:
   - Create resource: `/books`
   - Create method: `GET`
   - Integrate with `library-get-books` Lambda
   - Enable CORS
   - Deploy to `dev` stage

6. **Test**:

```bash
curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/books
```

#### Lambda Function: get-book (single book)

1. **Create Lambda**: `library-get-book`
2. **Code**:

```javascript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const bookId = event.pathParameters.id;

    const command = new GetCommand({
      TableName: 'Books',
      Key: { id: bookId },
    });

    const response = await docClient.send(command);

    if (!response.Item) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Book not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(response.Item),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch book' }),
    };
  }
};
```

3. **Add to API Gateway**:
   - Create resource: `/books/{id}`
   - Create method: `GET`
   - Integrate with `library-get-book` Lambda
   - Enable CORS
   - Deploy

4. **Test**:

```bash
curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/books/1
```

### Day 5-7: Implement Reading Lists API

Follow the same pattern to create:

- `library-get-reading-lists` (GET /reading-lists)
- `library-create-reading-list` (POST /reading-lists)
- `library-update-reading-list` (PUT /reading-lists/{id})
- `library-delete-reading-list` (DELETE /reading-lists/{id})

**Hint**: Use `QueryCommand` for reading lists (query by userId)

✅ **Week 2 Checkpoint**: All Books and Reading Lists endpoints working!

---

## Week 3: Authentication with Cognito

### Day 1-2: Set Up Cognito User Pool

#### Create User Pool

1. **Go to Cognito Console**
2. **Click "Create user pool"**
3. **Configure sign-in**:
   - Sign-in options: Email
   - Click "Next"

4. **Configure security**:
   - Password policy: Cognito defaults
   - MFA: No MFA (for simplicity)
   - Click "Next"

5. **Configure sign-up**:
   - Self-registration: Enabled
   - Required attributes: name, email
   - Click "Next"

6. **Configure message delivery**:
   - Email provider: Send email with Cognito
   - Click "Next"

7. **Integrate your app**:
   - User pool name: `library-users`
   - App client name: `library-web-client`
   - Client secret: Don't generate
   - Click "Next"

8. **Review and create**

9. **Note these values**:
   - User Pool ID (e.g., `us-east-1_abc123`)
   - App Client ID (e.g., `1a2b3c4d5e6f7g8h9i0j`)

#### Update Frontend Environment Variables

Update `.env`:

```bash
VITE_API_BASE_URL=https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev
VITE_AWS_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=us-east-1_abc123
VITE_COGNITO_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j
```

### Day 3-4: Integrate Cognito with Frontend

#### Install AWS Amplify

```bash
cd library-recommendation-system
npm install aws-amplify
```

#### Configure Amplify

Update `src/main.tsx`:

```typescript
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    },
  },
});
```

#### Update AuthContext

Update `src/contexts/AuthContext.tsx`:

```typescript
import { signIn, signUp, signOut, getCurrentUser } from 'aws-amplify/auth';

// Replace TODO in login function:
const login = async (email: string, password: string) => {
  try {
    const { isSignedIn } = await signIn({ username: email, password });
    if (isSignedIn) {
      const user = await getCurrentUser();
      setUser({
        id: user.userId,
        email: email,
        name: user.username,
        role: 'user',
        createdAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Replace TODO in signup function:
const signup = async (email: string, password: string, name: string) => {
  try {
    await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Replace TODO in logout function:
const logout = async () => {
  try {
    await signOut();
    setUser(null);
  } catch (error) {
    console.error('Logout error:', error);
  }
};
```

#### Test Authentication

1. Start your frontend: `npm run dev`
2. Go to Signup page
3. Create a new account
4. Check your email for verification code
5. Verify account in Cognito Console
6. Try logging in

### Day 5-7: Add Cognito Authorizer to API Gateway

#### Create Cognito Authorizer

1. **Go to API Gateway Console**
2. **Select your API**
3. **Click "Authorizers"**
4. **Create New Authorizer**:
   - Name: `CognitoAuthorizer`
   - Type: Cognito
   - Cognito User Pool: Select your pool
   - Token Source: `Authorization`
   - Click "Create"

#### Protect API Endpoints

1. **For each method** (except GET /books):
   - Click on the method
   - Click "Method Request"
   - Authorization: Select `CognitoAuthorizer`
   - Click save

2. **Deploy API** to `dev` stage

#### Update Frontend API Calls

Update `src/services/api.ts`:

```typescript
import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function getAuthHeaders() {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  } catch {
    return {
      'Content-Type': 'application/json',
    };
  }
}

// Update getBooks function:
export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
}

// Update createReadingList function:
export async function createReadingList(
  list: Omit<ReadingList, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ReadingList> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/reading-lists`, {
    method: 'POST',
    headers,
    body: JSON.stringify(list),
  });
  if (!response.ok) throw new Error('Failed to create reading list');
  return response.json();
}
```

✅ **Week 3 Checkpoint**: Users can register, login, and make authenticated API calls!

---

## Week 4: AI Recommendations & Deployment

### Day 1-2: Implement AI Recommendations with Bedrock

#### Enable Bedrock Model Access

1. **Go to Bedrock Console**
2. **Click "Model access"**
3. **Request access to**:
   - **Claude 3 Haiku** (anthropic.claude-3-haiku-20240307-v1:0)
   - This is the recommended model: fast, cost-effective, and perfect for this project
   - Click "Save changes"
4. **Wait for approval** (usually instant)

**Why Claude 3 Haiku?**

- **Cost**: ~$0.25 per 1M input tokens, ~$1.25 per 1M output tokens
- **Speed**: Fast response times (<1 second)
- **Quality**: Excellent for book recommendations
- **Free Tier**: Your $200 credits cover thousands of recommendations

#### Create Recommendations Lambda

1. **Create Lambda**: `library-get-recommendations`
2. **Increase timeout**: Configuration > General > Timeout: 30 seconds
3. **Add Bedrock permissions**:
   - Attach policy: `AmazonBedrockFullAccess`

4. **Function code**:

```javascript
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const client = new BedrockRuntimeClient({ region: 'us-east-1' });

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const userQuery = body.query;

    const prompt = `You are a helpful librarian AI. A user is looking for book recommendations.

User query: "${userQuery}"

Based on this query, recommend 3 books with:
1. Book title and author
2. Brief reason why it matches their interest
3. Confidence score (0-1)

Respond in JSON format:
{
  "recommendations": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "reason": "Why this book matches",
      "confidence": 0.95
    }
  ]
}`;

    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-haiku-20240307-v1:0', // Claude 3 Haiku
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const aiResponse = responseBody.content[0].text;

    // Parse AI response
    const recommendations = JSON.parse(aiResponse);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(recommendations),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to get recommendations' }),
    };
  }
};
```

5. **Add to API Gateway**:
   - Create resource: `/recommendations`
   - Create method: `POST`
   - Add Cognito authorizer
   - Deploy

6. **Update frontend** `src/services/api.ts`:

```typescript
export async function getRecommendations(query: string): Promise<Recommendation[]> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/recommendations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error('Failed to get recommendations');
  const data = await response.json();
  return data.recommendations;
}
```

### Day 3-4: Deploy Frontend with CI/CD Pipeline

#### Step 1: Create S3 Bucket

1. **Go to S3 Console**
2. **Create bucket**:
   - Name: `library-app-frontend-[your-name]` (must be globally unique)
   - Region: us-east-1
   - Uncheck "Block all public access"
   - Acknowledge warning
   - Click "Create bucket"

3. **Enable static website hosting**:
   - Go to bucket > Properties
   - Scroll to "Static website hosting"
   - Click "Edit"
   - Enable
   - Index document: `index.html`
   - Error document: `index.html`
   - Save

4. **Add bucket policy**:
   - Go to Permissions tab
   - Bucket Policy > Edit
   - Add:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::library-app-frontend-[your-name]/*"
    }
  ]
}
```

#### Step 2: Create CloudFront Distribution

1. **Go to CloudFront Console**
2. **Create distribution**:
   - Origin domain: Select your S3 bucket
   - Origin access: Public
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Default root object: `index.html`
   - Click "Create distribution"

3. **Wait for deployment** (10-15 minutes)

4. **Note your CloudFront URL**: `https://d123abc.cloudfront.net`

5. **Update CORS in API Gateway**:
   - Add CloudFront URL to allowed origins

#### Step 3: Set Up CI/CD with CodePipeline

1. **Create buildspec.yml** in your project root:

```yaml
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - echo Installing dependencies...
      - npm install
  build:
    commands:
      - echo Building application...
      - npm run build
artifacts:
  files:
    - '**/*'
  base-directory: dist
cache:
  paths:
    - 'node_modules/**/*'
```

2. **Commit and push buildspec.yml**:

```bash
git add buildspec.yml
git commit -m "Add CodeBuild buildspec for CI/CD"
git push
```

3. **Go to CodePipeline Console**

4. **Create pipeline**:
   - Pipeline name: `library-frontend-pipeline`
   - Service role: New service role
   - Click "Next"

5. **Add source stage**:
   - Source provider: **GitHub (Version 2)**
   - Click "Connect to GitHub"
   - Connection name: `github-connection`
   - Authorize AWS Connector for GitHub
   - Click "Connect"
   - Repository name: Select your `library-recommendation-system` repo
   - Branch name: `main`
   - Change detection options: **Start the pipeline on source code change** (webhooks)
   - Output artifact format: CodePipeline default
   - Click "Next"

6. **Add build stage**:
   - Build provider: **AWS CodeBuild**
   - Click "Create project"
   - Project name: `library-frontend-build`
   - Environment:
     - Environment image: **Managed image**
     - Operating system: **Ubuntu**
     - Runtime: **Standard**
     - Image: **aws/codebuild/standard:7.0** (latest)
     - Image version: **Always use the latest**
     - Service role: **New service role**
   - Buildspec: **Use a buildspec file** (buildspec.yml)
   - Click "Continue to CodePipeline"
   - Click "Next"

7. **Add deploy stage**:
   - Deploy provider: **Amazon S3**
   - Region: us-east-1
   - Bucket: Select your S3 bucket
   - **Check "Extract file before deploy"** (important!)
   - Click "Next"

8. **Review and create**:
   - Review all settings
   - Click "Create pipeline"

9. **Watch the pipeline execute**:
   - Source stage: Pulls code from GitHub
   - Build stage: Runs npm install and npm run build
   - Deploy stage: Uploads dist/ contents to S3
   - Should complete in 3-5 minutes

10. **Test the deployment**:
    - Visit your CloudFront URL
    - App should load successfully

#### Step 4: Test CI/CD Pipeline

1. **Make a change to your frontend**:

```bash
# Edit src/pages/Home.tsx or any component
# Make a visible change (e.g., update text)
```

2. **Commit and push**:

```bash
git add .
git commit -m "Test CI/CD pipeline"
git push
```

3. **Watch CodePipeline**:
   - Go to CodePipeline Console
   - Your pipeline should automatically start
   - Watch it progress through Source → Build → Deploy
   - Takes 3-5 minutes

4. **Verify changes**:
   - Wait for pipeline to complete
   - Visit CloudFront URL
   - Your changes should be live!

**🎉 You now have automated CI/CD!** Every push to main automatically deploys to production.

### Day 5-6: Testing & Polish

#### End-to-End Testing Checklist

- [ ] User can register and verify email
- [ ] User can login and logout
- [ ] Books page displays all books from DynamoDB
- [ ] Book detail page works
- [ ] User can create reading lists
- [ ] User can add books to reading lists
- [ ] User can delete reading lists
- [ ] AI recommendations work
- [ ] Admin can add new books (if implemented)
- [ ] All API calls include authentication
- [ ] Error messages display properly
- [ ] Loading states work
- [ ] Mobile responsive design works

#### Performance Optimization

1. **Add caching to API Gateway**:
   - Go to API Gateway > Stages > dev
   - Enable caching for GET /books (TTL: 300 seconds)

2. **Optimize Lambda cold starts**:
   - Use arm64 architecture
   - Minimize dependencies
   - Keep functions small

3. **Add CloudWatch monitoring**:
   - Set up alarms for Lambda errors
   - Monitor API Gateway 4xx/5xx errors

### Day 7: Documentation & Presentation

#### Update README

Document:

- Live application URL
- API endpoints
- Architecture diagram
- Setup instructions
- Team member contributions

#### Create Architecture Diagram

Include:

- Frontend (S3 + CloudFront)
- API Gateway
- Lambda functions
- DynamoDB tables
- Cognito User Pool
- Bedrock integration

#### Share Project on GitHub

1. **Create .gitignore file**:

```bash
# Create .gitignore in project root
cat > .gitignore << EOF
node_modules/
.env
.env.local
dist/
.DS_Store
*.log
.aws-sam/
.vscode/
coverage/
*.tsbuildinfo
EOF
```

2. **Initialize Git and commit**:

```bash
git init
git add .
git commit -m "Initial commit: Library Recommendation System"
```

3. **Create GitHub repository**:
   - Go to https://github.com/new
   - Repository name: `library-recommendation-system`
   - Description: "AI-powered library book recommendation system built with React, AWS Lambda, DynamoDB, and Bedrock (Claude 3 Haiku)"
   - Choose **Public** (for portfolio)
   - Don't initialize with README
   - Click "Create repository"

4. **Push to GitHub**:

```bash
git remote add origin https://github.com/YOUR-USERNAME/library-recommendation-system.git
git branch -M main
git push -u origin main
```

5. **Update Repository**:
   - Add topics: `aws`, `react`, `typescript`, `serverless`, `bedrock`, `dynamodb`, `lambda`, `cognito`
   - Add website URL (your CloudFront URL)
   - Add LICENSE file (MIT or Apache 2.0)

6. **Add GitHub badges to README** (optional):

```markdown
![AWS](https://img.shields.io/badge/AWS-Serverless-orange)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)
```

**⚠️ Important - Never commit**:

- ❌ `.env` files with credentials
- ❌ `node_modules/`
- ❌ AWS access keys
- ❌ Cognito secrets
- ❌ Any sensitive data

#### Prepare Demo

1. **Demo script**:
   - Show homepage
   - Register new user
   - Browse books
   - Create reading list
   - Get AI recommendations
   - Show admin features

2. **Talking points**:
   - Serverless architecture benefits
   - Cost optimization (Free Tier usage)
   - Security (Cognito, IAM)
   - Scalability
   - Challenges faced and solutions

✅ **Week 4 Complete**: Fully deployed application!

---

## 🎯 Success Metrics

By the end of 4 weeks, you should have:

- ✅ Working frontend deployed on CloudFront
- ✅ REST API with 8+ endpoints
- ✅ DynamoDB tables with data
- ✅ Cognito authentication
- ✅ AI recommendations with Bedrock (Claude 3 Haiku)
- ✅ >70% test coverage
- ✅ Complete documentation
- ✅ Architecture diagram
- ✅ Project shared on GitHub (public repository)
- ✅ Demo presentation ready
- ✅ Architecture diagram
- ✅ Demo video/presentation

---

## 💰 Cost Estimation

**Expected Monthly Cost**: $0-5 USD (within Free Tier)

- Lambda: 1M requests/month free
- DynamoDB: 25GB storage free
- API Gateway: 1M requests/month free
- Cognito: 50,000 MAU free
- Bedrock: Pay per use (~$0.01 per recommendation)
- S3: 5GB storage free
- CloudFront: 1TB transfer free

**Tips to stay in Free Tier**:

- Delete resources when not testing
- Use on-demand pricing for DynamoDB
- Limit Bedrock calls during development
- Monitor usage in AWS Billing Dashboard

---

## 🆘 Troubleshooting

### Common Issues

**Lambda timeout errors**:

- Increase timeout in Configuration
- Check CloudWatch Logs for errors
- Verify IAM permissions

**CORS errors**:

- Enable CORS in API Gateway
- Add OPTIONS method
- Check allowed origins

**Cognito authentication fails**:

- Verify User Pool ID and Client ID
- Check user is verified in Cognito Console
- Clear browser cache and try again

**DynamoDB access denied**:

- Check Lambda execution role has DynamoDB permissions
- Verify table names match exactly

**Bedrock model not available**:

- Request model access in Bedrock Console
- Wait for approval (usually instant)
- Check region (Bedrock not available in all regions)

---

## 📚 Additional Resources

- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- [API Gateway CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)
- [Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
- [Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)

---

**Good luck with your implementation! Remember: Read error messages carefully, test frequently, and ask for help when stuck.** 🚀
