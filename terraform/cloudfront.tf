resource "aws_cloudfront_origin_access_control" "website" {
  name                              = "${var.bucket_name}-oac"
  description                       = "OAC for ${var.bucket_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

module "cloudfront" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "~> 3.0"

  origin = {
    s3_bucket = {
      domain_name              = module.s3_bucket.s3_bucket_bucket_domain_name
      origin_access_control_id = aws_cloudfront_origin_access_control.website.id
    }
  }

  default_cache_behavior = {
    target_origin_id       = "s3_bucket"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
  }

  # Use your custom domain once the ACM certificate is ready.
  # Uncomment the two lines below and fill in your values, then run terraform apply.
  # aliases            = [var.domain_name]
  # viewer_certificate = { acm_certificate_arn = var.certificate_arn, ssl_support_method = "sni-only" }

  default_root_object = "index.html"

  # PriceClass_100 = US, Canada, Europe only — cheapest option.
  price_class = "PriceClass_100"

  custom_error_response = [
    {
      error_code         = 404
      response_code      = 200
      response_page_path = "/index.html"
    }
  ]
}
