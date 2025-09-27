module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 4.0"

  bucket = var.bucket_name

  website = {
    index_document = "index.html"
  }
}

# Separate bucket policy to avoid circular dependency
resource "aws_s3_bucket_policy" "website" {
  bucket     = module.s3_bucket.s3_bucket_id
  depends_on = [module.cloudfront]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipal"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "arn:aws:s3:::${var.bucket_name}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = module.cloudfront.cloudfront_distribution_arn
          }
        }
      }
    ]
  })
}

# Keep bucket private - access only through CloudFront
resource "aws_s3_bucket_public_access_block" "website" {
  bucket = module.s3_bucket.s3_bucket_id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
