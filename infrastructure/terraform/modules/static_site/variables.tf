variable "domain_name" {
  type        = string
  description = "Fully-qualified domain name the site will serve on (e.g. \"emrooz.io\")."
}

variable "hosted_zone_id" {
  type        = string
  description = "Route53 hosted zone ID that owns domain_name. Looked up by the caller."
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Tags applied to all resources created by the module."
}
