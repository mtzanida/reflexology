terraform {
  backend "s3" {
    bucket = "terraform-state-reflexology-${random_id.state_suffix.hex}"
    key    = "reflexology-website/terraform.tfstate"
    region = "us-east-1"
    
    # Enable state locking
    dynamodb_table = "terraform-locks-reflexology"
    encrypt        = true
  }
}

resource "random_id" "state_suffix" {
  byte_length = 4
}
