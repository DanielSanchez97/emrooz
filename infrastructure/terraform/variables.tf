variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region. Must be us-east-1 because CloudFront ACM certs live there."
}

variable "aws_profile" {
  type        = string
  default     = "emrooz"
  description = "AWS CLI profile to use."
}

variable "root_domain" {
  type        = string
  default     = "emrooz.io"
  description = "The Route53 hosted zone domain that owns all site domains."
}
