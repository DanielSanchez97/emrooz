terraform {
  backend "s3" {
    bucket         = "emrooz-tf-state-prod"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "emrooz-tflock"
    encrypt        = true

    # Backend config is static (can't interpolate variables), so we pin the
    # profile here to match providers.tf. Override via `terraform init
    # -backend-config=profile=<name>` if you need a different profile.
    profile = "emrooz"
  }
}
