# Student Implementation Checklist

Use this checklist to track your progress through the 4-week project.

## Week 1: Frontend & AWS Basics ⏰ 5-7 hours

### Environment Setup

- [ ] Install Node.js 20+ (`node --version`)
- [ ] Install npm 10+ (`npm --version`)
- [ ] Clone project repository
- [ ] Run `npm install` successfully
- [ ] Run `npm run dev` and see app at http://localhost:5173
- [ ] Explore all pages (Home, Books, Recommendations, Reading Lists, Admin)
- [ ] Read QUICK_START.md
- [ ] Read PROJECT_TIMELINE_4WEEKS.md

### AWS Account Setup

- [ ] Create AWS account at https://aws.amazon.com
- [ ] Set up billing alert for $10 USD
- [ ] Create IAM user for development
- [ ] Install AWS CLI (`aws --version`)
- [ ] Configure AWS CLI (`aws configure`)
- [ ] Verify AWS CLI works (`aws sts get-caller-identity`)

### First Lambda Function

- [ ] Create Lambda function: `hello-world-test`
- [ ] Deploy and test Lambda in AWS Console
- [ ] Create API Gateway REST API
- [ ] Create `/hello` resource and GET method
- [ ] Enable CORS on API Gateway
- [ ] Deploy API to `dev` stage
- [ ] Test with curl: `curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/hello`
- [ ] See successful response with message and timestamp

### Create GitHub Repository

- [ ] Create public GitHub repository: `library-recommendation-system`
- [ ] Initialize git in project: `git init`
- [ ] Verify .gitignore exists (already provided in project)
- [ ] Make initial commit: `git add . && git commit -m "Initial commit: Week 1 complete"`
- [ ] Push to GitHub: `git remote add origin <your-repo-url> && git push -u origin main`
- [ ] Add repository description: "AI-powered library book recommendation system (CENG413 Project)"
- [ ] Add topics: `aws`, `react`, `typescript`, `serverless`, `student-project`
- [ ] Commit your progress daily throughout the project

**✅ Week 1 Complete!** You have a working Lambda function and your project is on GitHub.

---

## Week 2: Backend API ⏰ 8-10 hours

### DynamoDB Setup

- [ ] Create DynamoDB table: `Books`
  - Partition key: `id` (String)
  - On-demand pricing
- [ ] Create DynamoDB table: `ReadingLists`
  - Partition key: `userId` (String)
  - Sort key: `id` (String)
  - On-demand pricing
- [ ] Create Global Secondary Index on ReadingLists: `id-index`
- [ ] Copy books from `src/services/mockData.ts`
- [ ] Convert to DynamoDB JSON format
- [ ] Load books into DynamoDB using AWS CLI
- [ ] Verify data in DynamoDB Console

### Books API Lambda Functions

- [ ] Create Lambda: `library-get-books`
- [ ] Add DynamoDB read permissions to Lambda role
- [ ] Deploy get-books code (see IMPLEMENTATION_GUIDE.md)
- [ ] Test Lambda in AWS Console
- [ ] Create API Gateway resource: `/books`
- [ ] Create GET method, integrate with Lambda
- [ ] Enable CORS
- [ ] Deploy API
- [ ] Test: `curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/books`
- [ ] See array of books from DynamoDB

- [ ] Create Lambda: `library-get-book`
- [ ] Deploy get-book code
- [ ] Create API Gateway resource: `/books/{id}`
- [ ] Create GET method, integrate with Lambda
- [ ] Enable CORS
- [ ] Deploy API
- [ ] Test: `curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev/books/1`
- [ ] See single book details

### Reading Lists API Lambda Functions

- [ ] Create Lambda: `library-get-reading-lists`
- [ ] Deploy code with DynamoDB Query by userId
- [ ] Create API Gateway resource: `/reading-lists`
- [ ] Create GET method
- [ ] Enable CORS
- [ ] Deploy API

- [ ] Create Lambda: `library-create-reading-list`
- [ ] Deploy code with DynamoDB PutItem
- [ ] Create POST method on `/reading-lists`
- [ ] Enable CORS
- [ ] Deploy API

- [ ] Create Lambda: `library-update-reading-list`
- [ ] Deploy code with DynamoDB UpdateItem
- [ ] Create PUT method on `/reading-lists/{id}`
- [ ] Enable CORS
- [ ] Deploy API

- [ ] Create Lambda: `library-delete-reading-list`
- [ ] Deploy code with DynamoDB DeleteItem
- [ ] Create DELETE method on `/reading-lists/{id}`
- [ ] Enable CORS
- [ ] Deploy API

### Connect Frontend to API

- [ ] Note your API Gateway URL
- [ ] Create `.env` file in project root
- [ ] Add `VITE_API_BASE_URL=https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/dev`
- [ ] Uncomment `API_BASE_URL` in `src/services/api.ts`
- [ ] Update `getBooks()` function to call real API
- [ ] Update `getBook()` function to call real API
- [ ] Test frontend - books should load from DynamoDB
- [ ] Verify in browser console - no mock data messages

**✅ Week 2 Complete!** You have a working REST API connected to your frontend.

---

## Week 3: Authentication ⏰ 6-8 hours

### Cognito Setup

- [ ] Go to AWS Cognito Console
- [ ] Create User Pool: `library-users`
- [ ] Configure sign-in: Email
- [ ] Configure password policy: Cognito defaults
- [ ] Disable MFA (for simplicity)
- [ ] Enable self-registration
- [ ] Required attributes: name, email
- [ ] Create app client: `library-web-client`
- [ ] Don't generate client secret
- [ ] Note User Pool ID (e.g., `us-east-1_abc123`)
- [ ] Note App Client ID (e.g., `1a2b3c4d5e6f7g8h9i0j`)

### Frontend Integration

- [ ] Install AWS Amplify: `npm install aws-amplify`
- [ ] Update `.env` file:
  ```
  VITE_COGNITO_USER_POOL_ID=us-east-1_abc123
  VITE_COGNITO_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j
  VITE_AWS_REGION=us-east-1
  ```
- [ ] Add Amplify configuration to `src/main.tsx` (see IMPLEMENTATION_GUIDE.md)
- [ ] Import Cognito functions in `src/contexts/AuthContext.tsx`
- [ ] Replace `login()` function with Cognito signIn
- [ ] Replace `logout()` function with Cognito signOut
- [ ] Replace `signup()` function with Cognito signUp
- [ ] Update `useEffect` to check Cognito session
- [ ] Remove localStorage mock code
- [ ] Test signup flow - create new user
- [ ] Check email for verification code
- [ ] Verify user in Cognito Console
- [ ] Test login flow
- [ ] Test logout flow
- [ ] Verify user state persists on page refresh

### API Authorization

- [ ] Go to API Gateway Console
- [ ] Create Cognito Authorizer
- [ ] Select your User Pool
- [ ] Token source: `Authorization`
- [ ] Test authorizer with a token
- [ ] Add authorizer to POST /reading-lists
- [ ] Add authorizer to PUT /reading-lists/{id}
- [ ] Add authorizer to DELETE /reading-lists/{id}
- [ ] Add authorizer to POST /recommendations
- [ ] Deploy API to `dev` stage

- [ ] Update `src/services/api.ts`
- [ ] Implement `getAuthHeaders()` function (see IMPLEMENTATION_GUIDE.md)
- [ ] Update `createReadingList()` to use auth headers
- [ ] Update `updateReadingList()` to use auth headers
- [ ] Update `deleteReadingList()` to use auth headers
- [ ] Test creating reading list while logged in
- [ ] Test that API calls fail when logged out
- [ ] Verify JWT token in browser Network tab

**✅ Week 3 Complete!** You have full authentication with protected APIs.

---

## Week 4: AI & Deployment ⏰ 8-10 hours

### AI Recommendations

- [ ] Go to AWS Bedrock Console
- [ ] Click "Model access"
- [ ] Request access to Claude 3 Haiku
- [ ] Wait for approval (usually instant)
- [ ] Create Lambda: `library-get-recommendations`
- [ ] Set timeout to 30 seconds
- [ ] Add Bedrock permissions to Lambda role
- [ ] Deploy recommendations code (see IMPLEMENTATION_GUIDE.md)
- [ ] Test Lambda with sample query
- [ ] Create API Gateway resource: `/recommendations`
- [ ] Create POST method
- [ ] Add Cognito authorizer
- [ ] Enable CORS
- [ ] Deploy API

- [ ] Update `src/services/api.ts`
- [ ] Update `getRecommendations()` function signature to accept query
- [ ] Replace mock code with real API call
- [ ] Update `src/pages/Recommendations.tsx` to pass query to API
- [ ] Test recommendations page
- [ ] Try different queries
- [ ] Verify AI responses are relevant

### Frontend Deployment with CI/CD

**Step 1: Create S3 Bucket and CloudFront**

- [ ] Go to S3 Console
- [ ] Create bucket: `library-app-frontend-[your-name]`
- [ ] Uncheck "Block all public access"
- [ ] Enable static website hosting
  - Index document: `index.html`
  - Error document: `index.html`
- [ ] Add bucket policy for public read access
- [ ] Go to CloudFront Console
- [ ] Create distribution
  - Origin: Your S3 bucket
  - Redirect HTTP to HTTPS
  - Default root object: `index.html`
- [ ] Wait for CloudFront deployment (10-15 minutes)
- [ ] Update CORS in API Gateway to allow CloudFront URL

**Step 2: Set Up CI/CD Pipeline with CodePipeline**

- [ ] Go to CodePipeline Console
- [ ] Create new pipeline: `library-frontend-pipeline`
- [ ] Configure source stage:
  - Source provider: GitHub (Version 2)
  - Connect to GitHub account
  - Select your repository: `library-recommendation-system`
  - Branch: `main`
  - Change detection: GitHub webhooks
- [ ] Configure build stage:
  - Build provider: AWS CodeBuild
  - Create new build project: `library-frontend-build`
  - Environment: Managed image, Ubuntu, Standard runtime, Latest image
  - Service role: Create new service role
- [ ] Configure deploy stage:
  - Deploy provider: Amazon S3
  - Bucket: Your S3 bucket name
  - Extract files before deploy: Yes
- [ ] Review and create pipeline

**Step 3: Create buildspec.yml**

- [ ] Create `buildspec.yml` in project root with:

```yaml
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - npm install
  build:
    commands:
      - npm run build
artifacts:
  files:
    - '**/*'
  base-directory: dist
```

- [ ] Commit and push buildspec.yml to GitHub
- [ ] Watch pipeline execute automatically
- [ ] Verify build succeeds
- [ ] Verify deployment to S3
- [ ] Test CloudFront URL - app should load

**Step 4: Test CI/CD**

- [ ] Make a small change to frontend (e.g., update homepage text)
- [ ] Commit and push to GitHub
- [ ] Watch CodePipeline automatically trigger
- [ ] Verify changes appear on CloudFront URL
- [ ] CI/CD is working! 🎉

### Testing & Polish

- [ ] Test user registration flow
- [ ] Test login/logout
- [ ] Test browsing books
- [ ] Test book detail pages
- [ ] Test creating reading lists
- [ ] Test adding books to lists
- [ ] Test deleting reading lists
- [ ] Test AI recommendations with various queries
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Fix any bugs found
- [ ] Run `npm test` - verify tests pass
- [ ] Run `npm run lint` - fix any errors
- [ ] Check test coverage: `npm run test:coverage`
- [ ] Verify >70% coverage

### Documentation & Presentation

- [ ] Update README.md with:
  - Live application URL
  - API endpoints list
  - Team member contributions
  - Setup instructions
- [ ] Create architecture diagram showing:
  - Frontend (S3/CloudFront)
  - API Gateway
  - Lambda functions
  - DynamoDB tables
  - Cognito User Pool
  - Bedrock integration
- [ ] Share project on GitHub:
  - Create public GitHub repository
  - Push all code (frontend + documentation)
  - Add .gitignore (exclude node_modules, .env, AWS credentials)
  - Write comprehensive README with setup instructions
  - Add LICENSE file (MIT or Apache 2.0 recommended)
  - Include architecture diagram in repository
  - Add live demo URL to repository description
- [ ] Take screenshots of:
  - Homepage
  - Books page
  - Recommendations page
  - Reading lists page
  - Admin page (if implemented)
- [ ] Record demo video (5-10 minutes)
- [ ] Prepare presentation slides
- [ ] Practice demo
- [ ] Prepare to discuss:
  - Architecture decisions
  - Challenges faced
  - Solutions implemented
  - What you learned

**✅ Week 4 Complete!** You have a fully deployed, production-ready application! 🎉

---

## Final Checklist

### Technical Requirements

- [ ] Frontend deployed and accessible via URL
- [ ] All API endpoints working
- [ ] User authentication functional
- [ ] AI recommendations working
- [ ] > 70% test coverage
- [ ] No critical security vulnerabilities
- [ ] Code follows TypeScript strict mode (no `any` types)
- [ ] All commits have clear messages

### Documentation

- [ ] README.md updated
- [ ] Architecture diagram created
- [ ] API documentation complete
- [ ] Team contributions documented
- [ ] Setup instructions clear
- [ ] Project shared on GitHub (public repository)
- [ ] GitHub repository has proper .gitignore
- [ ] GitHub repository includes LICENSE file

### Presentation

- [ ] Demo video recorded
- [ ] Presentation slides prepared
- [ ] Can explain architecture
- [ ] Can discuss challenges and solutions
- [ ] Can demonstrate all features

### Cleanup (Important!)

- [ ] Delete test Lambda functions
- [ ] Keep only production resources
- [ ] Verify AWS costs are within Free Tier
- [ ] Document any ongoing costs

---

## Tips for Success

✅ **Start early** - Don't wait until the last day  
✅ **Test frequently** - Test each Lambda as you create it  
✅ **Commit often** - Small commits with clear messages  
✅ **Read errors carefully** - Error messages usually tell you what's wrong  
✅ **Use CloudWatch Logs** - Essential for debugging Lambda functions  
✅ **Ask for help** - No question is too simple  
✅ **Work together** - Pair program on complex features  
✅ **Stay organized** - Keep track of your AWS resources  
✅ **Monitor costs** - Check AWS billing dashboard regularly  
✅ **Have fun!** - You're building something awesome!

---

## Resources

- **QUICK_START.md** - First-time setup
- **IMPLEMENTATION_GUIDE.md** - Detailed AWS instructions
- **PROJECT_TIMELINE_4WEEKS.md** - Weekly breakdown
- **AWS Documentation** - https://docs.aws.amazon.com/

---

**Good luck! You've got this! 🚀**
