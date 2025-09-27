# AWS Configuration
aws_region = "us-east-1"

# S3 Bucket Configuration (must be globally unique)
bucket_name = "reflexology-maria-website-2024"

# GitHub Repository Configuration (for OIDC)
github_repo = "mtzanida/reflexology"

# Optional: Custom Domain Configuration
# domain_name = "yourdomain.com"
# certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/your-cert-id"

# Tags
tags = {
  Project     = "Reflexology Website"
  Environment = "production"
  ManagedBy   = "terraform"
}
