# Setup and Deployment Guide

[Back to project overview](../README.md)

## Edit and preview the website

Edit `bucket-contents/index.html` and its supporting assets. The deployment
workflows publish this directory as static files without a build step.
`page.tsx` is not compiled by these workflows.

For a local preview, run from the repository root:

```bash
python3 -m http.server 8000 --directory bucket-contents
```

Open http://localhost:8000. Styling and icons require internet access because the
HTML loads them from CDNs. The contact form targets the configured Formspree
endpoint; submitting it is a real external submission.

## Deployment paths

| Target | Branch | Automatic trigger |
| --- | --- | --- |
| GitHub Pages preview | `dev` | Changes to `bucket-contents/**` or the Pages workflow |
| S3 and CloudFront | `prod` | Changes to `bucket-contents/**` or the S3 workflow |

Both workflows also support manual dispatch. Documentation-only changes do not
trigger their push-based deployments.

Create any missing deployment branches from the intended reviewed commit and push
them. Check whether the branches already exist before creating them.

## Enable GitHub Pages

In repository **Settings → Pages**, select **GitHub Actions** as the source.
The Pages workflow uses the `dev` GitHub environment. Check its deployment rules
and allow the intended branch. Push a website change to `dev` and inspect the
workflow's deployment URL.

## Provision AWS infrastructure

Requirements: Terraform compatible with `terraform/versions.tf`, AWS credentials
with provisioning permissions, and a globally unique bucket name.

The repository does not include `terraform/tfvars/prod.tfvars` or
`terraform/backend.tf`, despite references in older instructions. Create your
own variable file; Terraform uses local state unless you configure a backend.

Create `terraform/tfvars/prod.tfvars` with your values:

```hcl
aws_region  = "us-east-1"
bucket_name = "your-globally-unique-bucket-name"
github_repo = "mtzanida/reflexology"
```

Keep credentials out of variable files. Review the state-storage approach before
using this infrastructure collaboratively.

From the repository root:

```bash
aws sts get-caller-identity
cd terraform
terraform init
terraform fmt -check -recursive
terraform validate
terraform plan -var-file="tfvars/prod.tfvars"
terraform apply -var-file="tfvars/prod.tfvars"
terraform output
```

Review the plan before approving apply. Record the bucket name, CloudFront URL and
GitHub Actions role ARN from the outputs.

### Review OIDC and IAM before production deployment

The workflow uses the GitHub environment `production`, while the IAM role's
`subjects` in `terraform/iam.tf` currently match the `prod` branch subject.
Align the role trust with the actual GitHub OIDC subject used by the environment
before attempting deployment; the documentation change does not fix this mismatch.

Review the S3 deployment policy too: it currently includes `s3:HeadObject`.
The workflow's HeadObject operation needs the applicable object-read permission
(`s3:GetObject`). Verify the required policy permissions before relying on the
workflow's validation steps.

## Configure the production environment

In **Settings → Environments → production**, configure:

| Type | Name | Value |
| --- | --- | --- |
| Secret | `AWS_ROLE_ARN` | Terraform's `github_actions_role_arn` output |
| Variable | `BUCKET_NAME` | Terraform's `bucket_name` output |
| Variable | `AWS_REGION` | Region used by Terraform; workflow default is `us-east-1` |
| Variable, optional | `DOMAIN_NAME` | Displayed in the deployment summary; does not configure DNS |

Push reviewed website changes to `prod`. The workflow syncs the website directory
to S3 with `--delete`, so destination objects absent from the source are removed.
Use the dedicated website bucket.

The workflow discovers the CloudFront distribution by its origin domain and
requests invalidation. If no distribution matches, it skips invalidation with a
warning. Confirm the lookup matches the Terraform-created origin and check the
production content after deployment.

## Optional custom domain

1. Obtain and DNS-validate an ACM certificate in `us-east-1`.
2. Set `domain_name` and `certificate_arn` in your variable file.
3. Enable the commented `aliases` and `viewer_certificate` settings in
   `terraform/cloudfront.tf`.
4. Review and apply the Terraform plan.
5. Configure DNS to point the domain to CloudFront.

Setting `DOMAIN_NAME` in GitHub alone does not enable a custom domain.

## Supporting workflows

| Workflow | Behavior |
| --- | --- |
| `terraform-validate.yml` | Checks formatting, initializes and validates Terraform; attempts an informational plan using `tfvars/prod.tfvars`, with plan failures allowed |
| `security-scan.yml` | Contains Trivy and TruffleHog scans |
| `cost-monitor.yml` | Scheduled Monday at 09:00 UTC or manually; queries current-month account costs and emits a workflow warning above $5 |
| `protect-main.yml` | Runs a branch-policy check after a push to main; use repository rulesets or branch protection to enforce push restrictions |

The cost workflow does not select the `production` environment. Provide its AWS
configuration at an accessible scope and a suitable OIDC role with Cost Explorer
permissions. The website deployment role does not include those permissions.
A cost warning is not a spending cap or a guarantee of free-tier coverage.

## Troubleshooting

- **Terraform fails:** check the active AWS identity, required variables, bucket
  name uniqueness and provider errors. Ensure the local variable file exists.
- **OIDC assumption fails:** compare the token subject, environment name and IAM
  trust policy.
- **S3 validation or upload fails:** check the production environment configuration,
  bucket existence and the role's bucket/object permissions.
- **Production content looks stale:** inspect distribution discovery and invalidation
  logs, then check the CloudFront distribution status.
- **Custom domain fails:** verify DNS, aliases and an issued ACM certificate in
  `us-east-1`.
- **Form submissions fail:** check the Formspree endpoint and its account configuration.
