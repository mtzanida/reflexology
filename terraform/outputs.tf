output "website_url" {
  description = "Website URL"
  value       = module.s3_bucket.s3_bucket_website_endpoint
}

output "cloudfront_url" {
  description = "CloudFront distribution URL"
  value       = "https://${module.cloudfront.cloudfront_distribution_domain_name}"
}

output "github_role_arn" {
  description = "GitHub Actions IAM role ARN"
  value       = module.iam_github_oidc_role.arn
}

output "bucket_name" {
  description = "S3 bucket name"
  value       = module.s3_bucket.s3_bucket_id
}
