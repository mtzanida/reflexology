module "iam_github_oidc_role" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-github-oidc-role"
  version = "~> 5.0"

  name = "github-actions-reflexology-role"

  # Scoped to the prod branch — only prod deployments can assume this role.
  subjects = ["repo:${var.github_repo}:ref:refs/heads/prod"]

  policies = {
    S3Deploy = aws_iam_policy.s3_deploy.arn
  }
}

resource "aws_iam_policy" "s3_deploy" {
  name        = "reflexology-s3-deploy"
  description = "Allows GitHub Actions to sync the site to S3 and invalidate CloudFront"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3Sync"
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket",
          "s3:GetBucketLocation",
          "s3:HeadObject"
        ]
        Resource = [
          module.s3_bucket.s3_bucket_arn,
          "${module.s3_bucket.s3_bucket_arn}/*"
        ]
      },
      {
        # ListDistributions needs * — it is an account-level action with no resource ARN.
        # CreateInvalidation and GetInvalidation are scoped to the specific distribution.
        Sid      = "CloudFrontList"
        Effect   = "Allow"
        Action   = ["cloudfront:ListDistributions"]
        Resource = "*"
      },
      {
        Sid    = "CloudFrontInvalidation"
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation"
        ]
        Resource = module.cloudfront.cloudfront_distribution_arn
      }
    ]
  })
}
