variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region for the state bucket and lock table."
}

variable "aws_profile" {
  type        = string
  default     = "emrooz"
  description = "AWS CLI profile to use."
}

variable "lock_table_name" {
  type        = string
  default     = "emrooz-tflock"
  description = "Name of the DynamoDB table used for Terraform state locking."
}
