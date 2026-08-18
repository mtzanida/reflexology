variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Globally unique S3 bucket name for the static website"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository in 'owner/repo' format (for OIDC trust policy)"
  type        = string
}

# ── Custom domain (optional, enable after ACM certificate is issued) ──────────

variable "domain_name" {
  description = "Custom domain for CloudFront, e.g. yourdomain.com. Leave empty to use the CloudFront domain."
  type        = string
  default     = ""
}

variable "certificate_arn" {
  description = "ACM certificate ARN for the custom domain. Must be in us-east-1 (CloudFront requirement)."
  type        = string
  default     = ""
}
