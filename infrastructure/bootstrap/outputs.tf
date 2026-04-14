output "lock_table" {
  value       = aws_dynamodb_table.tflock.name
  description = "DynamoDB table name to use for state locking."
}
