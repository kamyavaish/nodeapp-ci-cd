# DevSecOps Microservice Deployment - Node.js Application

## Overview

This project demonstrates the implementation of DevSecOps best practices for securing a microservice deployment pipeline. The application is a Node.js/Express web service with MongoDB backend, containerized using Docker and deployed with infrastructure-as-code using Terraform.

## Project Structure

```
nodeapp-ci-cd/
├── app.js                 # Main Node.js application
├── package.json           # Node.js dependencies
├── Dockerfile            # Multi-stage container build
├── terraform_iac/        # Infrastructure as Code
│   ├── main.tf           # Terraform configuration
│   └── terraform.tfstate # Terraform state files
└── README.md            
```

## Security Implementation

### Docker Hardening

The Dockerfile implements several security best practices:

- **Multi-stage build**: Reduces final image size and attack surface
- **Minimal base image**: Uses `node:current-alpine3.22`
- **Non-root user**: Creates and used `appuser` instead of root
- **Minimal permissions**: Application runs with restricted privileges

```dockerfile
# Multi-stage build with Alpine Linux
FROM node:current-alpine3.22 AS build
# ... build stage ...

FROM node:current-alpine3.22
# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

## Prerequisites
- Docker
- Node.js 18+ (for local development)
- Terraform 1.0+
- AWS CLI configured
- MongoDB (for local development)


### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nodeapp-ci-cd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB locally**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or using local MongoDB installation
   mongod
   ```

4. **Run the application**
   ```bash
   npm start
   # or
   node app.js
   ```

5. **Test the health endpoint**
   ```bash
   curl http://localhost:8080/health
   ```



### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t nodeapp-cicd:latest .
   ```

2. **Run the container**
   ```bash
   docker run -d -p 8080:8080 --name nodeapp nodeapp-cicd:latest
   ```

3. **Verify deployment**
   ```bash
   curl http://localhost:8080/health
   ```


### Infrastructure Deployment

1. **Initialize Terraform**
   ```bash
   cd terraform_iac
   terraform init
   ```

2. **Plan the deployment**
   ```bash
   terraform plan
   ```

3. **Apply the configuration**
   ```bash
   terraform apply
   ```

4. **Get the public IP**
   ```bash
   terraform output ec2_public_ip
   ```


### Container Scanning

To scan the Docker image for vulnerabilities:

```bash
# Using Trivy
trivy image <image_name>:latest

```


### Infrastructure Scanning

To scan Terraform files:

```bash
# Using tfsec
tfsec terraform_iac/
```