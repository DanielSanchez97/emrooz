output "bucket_name" {
  value       = aws_s3_bucket.this.id
  description = "S3 bucket holding the built site assets."
}

output "bucket_arn" {
  value       = aws_s3_bucket.this.arn
  description = "ARN of the origin S3 bucket."
}

output "distribution_id" {
  value       = aws_cloudfront_distribution.this.id
  description = "CloudFront distribution ID (used for invalidations)."
}

output "distribution_domain_name" {
  value       = aws_cloudfront_distribution.this.domain_name
  description = "Default *.cloudfront.net hostname for the distribution."
}
