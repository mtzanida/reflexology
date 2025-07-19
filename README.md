## GitHub Repository Description Example

**Public Website for Reflexologist – Built with AWS Serverless Services**

This repository contains the code and resources for a modern, responsive website for a professional reflexologist. The site is designed to present services, information about reflexology, and contact details in a clean and accessible way.

### Features

- **Static, single-page website** (HTML/CSS, no backend required)
- **Responsive design** for mobile and desktop
- **Contact form** (integrated with Formspree for email delivery)
- **Informative sections**:
  - About the therapist
  - What is reflexology
  - Benefits and applications
  - Contact information

### AWS Architecture

- **Amazon S3**: Static website hosting
- **Amazon CloudFront**: CDN and HTTPS support
- **AWS Certificate Manager (ACM)**: Free SSL certificates
- **Route 53**: Custom domain management (optional)

### How to Use

1. **Clone the repository** and edit `index.html` with your own contact details.
2. **Upload the files** (`index.html`, `style.css`, images) to your S3 bucket.
3. **Configure S3** for static website hosting and set permissions for public read access.
4. (Optional) **Set up CloudFront and ACM** for HTTPS and custom domain support.
5. **Go live!** Your site is now publicly accessible.

### Zero-Cost Hosting Guide

You can host this website completely free within AWS Free Tier:

1. **Create an AWS account** if you don't have one (eligible for Free Tier).
2. **Create an S3 bucket**:
   - Name it something unique (e.g., `reflexology-website-yourusername`)
   - Select the region closest to your target audience
   - Keep all default settings
3. **Enable static website hosting**:
   - Go to bucket Properties → Static website hosting → Enable
   - Set index document to `index.html`
   - Note the bucket website endpoint URL
4. **Set bucket permissions**:
   - Create a bucket policy to allow public read access:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
       }
     ]
   }
   ```
   - Replace `YOUR-BUCKET-NAME` with your actual bucket name
5. **Upload your website files**:
   - Upload all HTML, CSS, images, and other assets
   - Set appropriate content types (e.g., text/html for HTML files)
6. **Stay within Free Tier limits**:
   - S3 Free Tier includes 5GB storage, 20,000 GET requests, and 2,000 PUT requests per month
   - Keep image sizes optimized to reduce storage needs
   - For a simple reflexology website, this is typically more than sufficient

This approach uses only S3 static website hosting, which is included in the AWS Free Tier. By avoiding CloudFront, Route 53, and other services, you can maintain zero cost as long as you stay within Free Tier limits.

### Custom Domain Setup with CloudFront

If you own a custom domain and want to use it with your reflexology website, follow these steps:

1. **Request an SSL Certificate**:
   - Go to AWS Certificate Manager (ACM) in the US East (N. Virginia) region
   - Request a public certificate for your domain (e.g., `yourdomain.com` and `www.yourdomain.com`)
   - Validate the certificate by adding the provided CNAME records to your domain's DNS settings
   - Wait for the certificate to be issued (status: "Issued")

2. **Create a CloudFront Distribution**:
   - Go to CloudFront and create a new distribution
   - For Origin Domain, select your S3 bucket website endpoint
   - Set Origin Path to empty
   - For Origin Access, select "Public"
   - For Viewer Protocol Policy, select "Redirect HTTP to HTTPS"
   - For Allowed HTTP Methods, select "GET, HEAD"
   - For Cache Policy, select "CachingOptimized"
   - For Price Class, choose based on your audience location (Price Class 100 is cheapest)
   - For Alternate Domain Names (CNAMEs), enter your domain (e.g., `yourdomain.com` and `www.yourdomain.com`)
   - For Custom SSL Certificate, select the certificate you created in ACM
   - For Default Root Object, enter `index.html`
   - Create the distribution and wait for it to deploy (Status: "Deployed")

3. **Configure DNS Settings**:
   - If using Route 53:
     - Create a hosted zone for your domain
     - Create an A record with Alias pointing to your CloudFront distribution
   - If using another DNS provider:
     - Create a CNAME record pointing to your CloudFront distribution domain name (e.g., `d1234abcdef.cloudfront.net`)

4. **Cost Considerations**:
   - CloudFront: First 1TB of data transfer out per month is free in the AWS Free Tier
   - Route 53: Approximately $0.50 per hosted zone per month (not included in Free Tier)
   - Domain registration: Varies based on registrar and TLD (typically $10-15/year)
   - ACM: SSL certificates are free when used with CloudFront

5. **Verify Setup**:
   - Wait for DNS changes to propagate (can take up to 48 hours)
   - Visit your domain (https://yourdomain.com) to confirm it's working correctly
   - Test on different devices to ensure responsive design works properly

This setup provides several advantages over the basic S3 hosting:
- HTTPS security with a free SSL certificate
- Better performance through CloudFront's global CDN
- Professional appearance with your custom domain
- Improved SEO ranking (search engines prefer HTTPS sites)

### Demo

A live demo is available at:  
`http://your-s3-bucket-endpoint`  
(or your custom domain, if configured)

Feel free to fork, modify, and use this template for your own professional website!