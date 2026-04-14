terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.70"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

# NOTE: The S3 state bucket (`emrooz-tf-state-prod`) is managed manually
# outside of Terraform — this avoids a recurring provider/region drift
# issue we hit when Terraform created it. If you ever need to recreate it,
# do so via the AWS console or CLI:
#
#   aws s3api create-bucket --bucket emrooz-tf-state-prod --region us-east-1 \
#     --profile emrooz
#   aws s3api put-bucket-versioning --bucket emrooz-tf-state-prod \
#     --versioning-configuration Status=Enabled --profile emrooz
#   aws s3api put-public-access-block --bucket emrooz-tf-state-prod \
#     --public-access-block-configuration \
#       BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true \
#     --profile emrooz
#
# This bootstrap module manages only the DynamoDB lock table.

# DynamoDB table for state locking. PAY_PER_REQUEST keeps cost ~$0 for
# infrequent terraform runs.
resource "aws_dynamodb_table" "tflock" {
  name         = var.lock_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Project = "emrooz"
    Purpose = "terraform-state-lock"
  }
}
