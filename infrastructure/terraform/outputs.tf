output "emrooz_bucket" {
  value       = module.emrooz_site.bucket_name
  description = "S3 bucket holding emrooz.io site assets."
}

output "emrooz_distribution_id" {
  value       = module.emrooz_site.distribution_id
  description = "CloudFront distribution ID for emrooz.io."
}

output "emrooz_distribution_domain" {
  value       = module.emrooz_site.distribution_domain_name
  description = "Default *.cloudfront.net domain for emrooz.io."
}

output "iga_bucket" {
  value       = module.iga_site.bucket_name
  description = "S3 bucket holding iga.emrooz.io site assets."
}

output "iga_distribution_id" {
  value       = module.iga_site.distribution_id
  description = "CloudFront distribution ID for iga.emrooz.io."
}

output "iga_distribution_domain" {
  value       = module.iga_site.distribution_domain_name
  description = "Default *.cloudfront.net domain for iga.emrooz.io."
}
