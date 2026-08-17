# Reflexology Website

A modern, responsive static website for a professional reflexologist — built with HTML/CSS and hosted on AWS.

---

## Architecture

```
dev branch  →  GitHub Pages   (fast iteration, free, no AWS needed)
prod branch →  S3 + CloudFront (production, custom domain ready)
```

| Layer | dev | prod |
|---|---|---|
| Hosting | GitHub Pages | S3 + CloudFront |
| Domain | `mtzanida.github.io/reflexology` | Your custom domain |
| Deploy trigger | push to `dev` | push to `prod` |
| AWS needed | No | Yes (Terraform) |

---

## Repository Structure

```
├── bucket-contents/        # Website files (HTML, CSS, images)
├── terraform/
│   ├── s3.tf               # S3 bucket (private, CloudFront-only)
│   ├── cloudfront.tf       # CloudFront distribution
│   ├── iam.tf              # GitHub OIDC role for Actions
│   ├── variables.tf
│   ├── outputs.tf
│   ├── versions.tf
│   ├── providers.tf
│   ├── backend.tf          # Local state (upgrade to S3 when ready)
│   └── tfvars/
│       ├── dev.tfvars
│       └── prod.tfvars
└── .github/workflows/
    ├── deploy-pages.yml    # dev branch → GitHub Pages
    ├── deploy-s3.yml       # prod branch → S3 + CloudFront
    ├── protect-main.yml    # blocks direct pushes to main
    ├── terraform-validate.yml
    ├── cost-monitor.yml
    └── security-scan.yml
```

---

## Workflows

| Workflow | Trigger | What it does |
|---|---|---|
| `deploy-pages.yml` | push to `dev` | Deploys `bucket-contents/` to GitHub Pages |
| `deploy-s3.yml` | push to `prod` | Syncs `bucket-contents/` to S3, invalidates CloudFront |
| `protect-main.yml` | push to `main` | Blocks it and explains the branch model |
| `terraform-validate.yml` | push/PR touching `terraform/` | fmt, init, validate, plan |
| `cost-monitor.yml` | weekly (Mon 9 AM) | Alerts if AWS costs exceed $5 |
| `security-scan.yml` | push/PR, weekly | Trivy + TruffleHog scans |

---

## Deploy from scratch

### 1. Edit website files

Update `bucket-contents/index.html` and `bucket-contents/style.css` with your content.

### 2. Create branches

```bash
git checkout -b dev
git push -u origin dev

git checkout -b prod
git push -u origin prod
```

### 3. Enable GitHub Pages (dev branch)

Go to **Settings → Pages → Source → GitHub Actions**.

Push to `dev` — the site deploys automatically to GitHub Pages.

### 4. Deploy prod infrastructure with Terraform

Fill in `terraform/tfvars/prod.tfvars` with your values, then:

```bash
cd terraform
terraform init
terraform plan -var-file="tfvars/prod.tfvars"
terraform apply -var-file="tfvars/prod.tfvars"
```

Note the outputs:

```
cloudfront_url          = "https://xxxx.cloudfront.net"
github_actions_role_arn = "arn:aws:iam::123456789012:role/..."
bucket_name             = "reflexology-maria-website-2025"
```

### 5. Configure GitHub Environment (production)

Go to **Settings → Environments → production** and add:

| Type | Name | Value |
|---|---|---|
| Secret | `AWS_ROLE_ARN` | `github_actions_role_arn` from terraform output |
| Variable | `BUCKET_NAME` | `bucket_name` from terraform output |
| Variable | `AWS_REGION` | `us-east-1` |

Push to `prod` — the site deploys automatically to S3 + CloudFront.

### 6. Add your custom domain (when ready)

1. Request an ACM certificate in `us-east-1` for your domain
2. Validate it via DNS CNAME
3. In `terraform/cloudfront.tf`, uncomment the `aliases` and `viewer_certificate` lines
4. In `terraform/tfvars/prod.tfvars`, uncomment and fill in `domain_name` and `certificate_arn`
5. Run `terraform apply -var-file="tfvars/prod.tfvars"`
6. Point your domain DNS to the CloudFront distribution domain name

---

## Troubleshooting

**Terraform apply fails**
- Check credentials: `aws sts get-caller-identity`
- Verify bucket name is globally unique

**deploy-s3.yml fails**
- Confirm `AWS_ROLE_ARN`, `BUCKET_NAME`, `AWS_REGION` are set in the `production` environment
- Run `terraform apply` first to create the bucket

**Website not loading after prod deploy**
- CloudFront takes a few minutes to deploy — check distribution status in AWS console
- For custom domains, DNS propagation can take up to 48 hours

**SSL certificate issues**
- Certificate must be requested in `us-east-1` (CloudFront requirement)
- Status must be `Issued` before attaching to CloudFront
