# Resources & Documentation Links

This document contains links to all official documentation for technologies used in this project.

---

## 📚 Table of Contents

1. [Frontend Technologies](#frontend-technologies)
2. [AWS Services](#aws-services)
3. [Development Tools](#development-tools)
4. [Testing & Quality](#testing--quality)
5. [Learning Resources](#learning-resources)
6. [Community & Support](#community--support)

---

## Frontend Technologies

### React

- **Official Documentation**: https://react.dev/
- **Learn React**: https://react.dev/learn
- **API Reference**: https://react.dev/reference/react
- **React Hooks**: https://react.dev/reference/react/hooks
- **React Router**: https://reactrouter.com/

### TypeScript

- **Official Documentation**: https://www.typescriptlang.org/docs/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/intro.html
- **TypeScript for React**: https://react-typescript-cheatsheet.netlify.app/
- **TypeScript Playground**: https://www.typescriptlang.org/play

### Vite

- **Official Documentation**: https://vitejs.dev/
- **Getting Started**: https://vitejs.dev/guide/
- **Config Reference**: https://vitejs.dev/config/
- **Plugin API**: https://vitejs.dev/guide/api-plugin.html

### Tailwind CSS

- **Official Documentation**: https://tailwindcss.com/docs
- **Installation**: https://tailwindcss.com/docs/installation
- **Utility Classes**: https://tailwindcss.com/docs/utility-first
- **Customization**: https://tailwindcss.com/docs/configuration
- **Tailwind UI Components**: https://tailwindui.com/

---

## AWS Services

### AWS General

- **AWS Documentation Home**: https://docs.aws.amazon.com/
- **AWS Free Tier**: https://aws.amazon.com/free/
- **AWS Console**: https://console.aws.amazon.com/
- **AWS CLI Documentation**: https://docs.aws.amazon.com/cli/
- **AWS SDK for JavaScript**: https://docs.aws.amazon.com/sdk-for-javascript/

### AWS Lambda

- **Developer Guide**: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
- **Getting Started**: https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html
- **Node.js Runtime**: https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html
- **Best Practices**: https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
- **Error Handling**: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-exceptions.html
- **Environment Variables**: https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html
- **Lambda Pricing**: https://aws.amazon.com/lambda/pricing/

### Amazon DynamoDB

- **Developer Guide**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/
- **Getting Started**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStartedDynamoDB.html
- **Best Practices**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html
- **Data Modeling**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html
- **Query and Scan**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html
- **Global Secondary Indexes**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html
- **DynamoDB Pricing**: https://aws.amazon.com/dynamodb/pricing/

### Amazon API Gateway

- **Developer Guide**: https://docs.aws.amazon.com/apigateway/latest/developerguide/
- **Getting Started**: https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html
- **REST API**: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html
- **CORS Configuration**: https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
- **Lambda Integration**: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-integrations.html
- **Authorizers**: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html
- **API Gateway Pricing**: https://aws.amazon.com/api-gateway/pricing/

### Amazon Cognito

- **Developer Guide**: https://docs.aws.amazon.com/cognito/latest/developerguide/
- **User Pools**: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html
- **Getting Started**: https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-create-user-pool.html
- **Authentication Flow**: https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html
- **JWT Tokens**: https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html
- **Cognito with API Gateway**: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html
- **Cognito Pricing**: https://aws.amazon.com/cognito/pricing/

### Amazon Bedrock

- **User Guide**: https://docs.aws.amazon.com/bedrock/latest/userguide/
- **Getting Started**: https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html
- **Claude 3 Haiku** (Recommended for this project):
  - **Model ID**: `anthropic.claude-3-haiku-20240307-v1:0`
  - **Documentation**: https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-claude.html
  - **Pricing**: ~$0.25 per 1M input tokens, ~$1.25 per 1M output tokens
  - **Why Haiku**: Fast, cost-effective, perfect for book recommendations
- **Inference API**: https://docs.aws.amazon.com/bedrock/latest/userguide/api-methods-run.html
- **Prompt Engineering**: https://docs.anthropic.com/claude/docs/introduction-to-prompt-design
- **Best Practices**: https://docs.aws.amazon.com/bedrock/latest/userguide/best-practices.html
- **Bedrock Pricing**: https://aws.amazon.com/bedrock/pricing/

### Amazon S3

- **Developer Guide**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/
- **Getting Started**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html
- **Static Website Hosting**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html
- **Bucket Policies**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html
- **CORS Configuration**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html
- **S3 Pricing**: https://aws.amazon.com/s3/pricing/

### Amazon CloudFront

- **Developer Guide**: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/
- **Getting Started**: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html
- **S3 Origin**: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html
- **Custom Domain**: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html
- **SSL/TLS**: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https.html
- **CloudFront Pricing**: https://aws.amazon.com/cloudfront/pricing/

### AWS CloudWatch

- **User Guide**: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/
- **CloudWatch Logs**: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/
- **Lambda Logs**: https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html
- **Logs Insights**: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html
- **Alarms**: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html

### AWS IAM

- **User Guide**: https://docs.aws.amazon.com/IAM/latest/UserGuide/
- **Best Practices**: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
- **Policies**: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html
- **Roles**: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
- **Least Privilege**: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege

---

## Development Tools

### AWS Amplify

- **Official Documentation**: https://docs.amplify.aws/
- **JavaScript Library**: https://docs.amplify.aws/javascript/
- **Authentication**: https://docs.amplify.aws/javascript/build-a-backend/auth/
- **Getting Started**: https://docs.amplify.aws/javascript/start/getting-started/introduction/
- **API Reference**: https://aws-amplify.github.io/amplify-js/api/

### AWS SDK for JavaScript

- **v3 Documentation**: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/
- **Getting Started**: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html
- **DynamoDB Client**: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/
- **Bedrock Runtime Client**: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-bedrock-runtime/

### AWS CLI

- **User Guide**: https://docs.aws.amazon.com/cli/latest/userguide/
- **Installation**: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- **Configuration**: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html
- **Command Reference**: https://awscli.amazonaws.com/v2/documentation/api/latest/index.html

### Git & GitHub

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Docs**: https://docs.github.com/
- **Git Basics**: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- **GitHub Flow**: https://docs.github.com/en/get-started/quickstart/github-flow

### Node.js & npm

- **Node.js Documentation**: https://nodejs.org/docs/
- **npm Documentation**: https://docs.npmjs.com/
- **package.json**: https://docs.npmjs.com/cli/v10/configuring-npm/package-json
- **npm CLI**: https://docs.npmjs.com/cli/v10/commands

---

## Testing & Quality

### Vitest

- **Official Documentation**: https://vitest.dev/
- **Getting Started**: https://vitest.dev/guide/
- **API Reference**: https://vitest.dev/api/
- **Configuration**: https://vitest.dev/config/
- **Coverage**: https://vitest.dev/guide/coverage.html

### React Testing Library

- **Official Documentation**: https://testing-library.com/docs/react-testing-library/intro/
- **Queries**: https://testing-library.com/docs/queries/about
- **User Events**: https://testing-library.com/docs/user-event/intro
- **Best Practices**: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

### ESLint

- **Official Documentation**: https://eslint.org/docs/latest/
- **Getting Started**: https://eslint.org/docs/latest/use/getting-started
- **Rules**: https://eslint.org/docs/latest/rules/
- **Configuration**: https://eslint.org/docs/latest/use/configure/

### Prettier

- **Official Documentation**: https://prettier.io/docs/en/
- **Options**: https://prettier.io/docs/en/options.html
- **Configuration**: https://prettier.io/docs/en/configuration.html
- **Integrations**: https://prettier.io/docs/en/editors.html

---

## Learning Resources

### AWS Training

- **AWS Skill Builder**: https://skillbuilder.aws/
- **AWS Training**: https://aws.amazon.com/training/
- **AWS Educate**: https://aws.amazon.com/education/awseducate/
- **AWS Workshops**: https://workshops.aws/
- **AWS Architecture Center**: https://aws.amazon.com/architecture/

### React Learning

- **React Tutorial**: https://react.dev/learn/tutorial-tic-tac-toe
- **React Patterns**: https://reactpatterns.com/
- **React TypeScript Cheatsheet**: https://react-typescript-cheatsheet.netlify.app/

### TypeScript Learning

- **TypeScript for Beginners**: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
- **TypeScript Deep Dive**: https://basarat.gitbook.io/typescript/

### Serverless Architecture

- **Serverless Framework**: https://www.serverless.com/framework/docs
- **AWS Serverless Application Model (SAM)**: https://docs.aws.amazon.com/serverless-application-model/
- **Serverless Patterns**: https://serverlessland.com/patterns

### DynamoDB Learning

- **DynamoDB Guide**: https://www.dynamodbguide.com/
- **NoSQL Workbench**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html

---

## Community & Support

### AWS Community

- **AWS Forums**: https://repost.aws/
- **AWS Reddit**: https://www.reddit.com/r/aws/
- **AWS Blog**: https://aws.amazon.com/blogs/
- **AWS YouTube**: https://www.youtube.com/user/AmazonWebServices

### React Community

- **React Discord**: https://discord.gg/react
- **React Reddit**: https://www.reddit.com/r/reactjs/
- **React Spectrum**: https://spectrum.chat/react

### Stack Overflow

- **AWS Tag**: https://stackoverflow.com/questions/tagged/amazon-web-services
- **React Tag**: https://stackoverflow.com/questions/tagged/reactjs
- **TypeScript Tag**: https://stackoverflow.com/questions/tagged/typescript
- **DynamoDB Tag**: https://stackoverflow.com/questions/tagged/amazon-dynamodb

### GitHub

- **AWS Samples**: https://github.com/aws-samples
- **AWS Labs**: https://github.com/awslabs
- **React Examples**: https://github.com/facebook/react/tree/main/fixtures

---

## Quick Reference Cards

### AWS CLI Quick Reference

- **Lambda**: https://docs.aws.amazon.com/cli/latest/reference/lambda/
- **DynamoDB**: https://docs.aws.amazon.com/cli/latest/reference/dynamodb/
- **S3**: https://docs.aws.amazon.com/cli/latest/reference/s3/
- **Cognito**: https://docs.aws.amazon.com/cli/latest/reference/cognito-idp/

### HTTP Status Codes

- **MDN HTTP Status**: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

### REST API Design

- **REST API Tutorial**: https://restfulapi.net/
- **HTTP Methods**: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

---

## Troubleshooting Resources

### AWS Troubleshooting

- **Lambda Troubleshooting**: https://docs.aws.amazon.com/lambda/latest/dg/lambda-troubleshooting.html
- **DynamoDB Troubleshooting**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.Errors.html
- **API Gateway Troubleshooting**: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-troubleshooting.html
- **Cognito Troubleshooting**: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-using-import-tool-troubleshooting.html

### Error Messages

- **AWS Error Codes**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.Errors.html
- **HTTP Status Codes**: https://httpstatuses.com/

---

## Security Best Practices

### AWS Security

- **AWS Security Best Practices**: https://aws.amazon.com/architecture/security-identity-compliance/
- **IAM Best Practices**: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
- **S3 Security**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html
- **Lambda Security**: https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html

### Web Security

- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **Content Security Policy**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- **CORS**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

## Cost Management

### AWS Pricing

- **AWS Pricing Calculator**: https://calculator.aws/
- **AWS Free Tier**: https://aws.amazon.com/free/
- **Cost Management**: https://aws.amazon.com/aws-cost-management/
- **Billing Dashboard**: https://console.aws.amazon.com/billing/

### Cost Optimization

- **Cost Optimization Pillar**: https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html
- **AWS Trusted Advisor**: https://aws.amazon.com/premiumsupport/technology/trusted-advisor/

---

## Additional Tools

### API Testing

- **Postman**: https://www.postman.com/
- **curl Documentation**: https://curl.se/docs/
- **HTTPie**: https://httpie.io/

### Database Tools

- **NoSQL Workbench**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html
- **DynamoDB Local**: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

### Monitoring & Debugging

- **Chrome DevTools**: https://developer.chrome.com/docs/devtools/
- **React DevTools**: https://react.dev/learn/react-developer-tools
- **AWS X-Ray**: https://docs.aws.amazon.com/xray/

---

## Useful Cheat Sheets

- **AWS CLI Cheat Sheet**: https://docs.aws.amazon.com/cli/latest/reference/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **React Cheat Sheet**: https://react-typescript-cheatsheet.netlify.app/
- **TypeScript Cheat Sheet**: https://www.typescriptlang.org/cheatsheets
- **Tailwind CSS Cheat Sheet**: https://nerdcave.com/tailwind-cheat-sheet

---

**💡 Tip**: Bookmark this page for quick access to all documentation!

**📚 Remember**: Official documentation is always the most up-to-date and reliable source of information.

---

_Last Updated: November 25, 2025_
