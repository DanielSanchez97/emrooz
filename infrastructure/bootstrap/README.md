# Terraform bootstrap

Manages the DynamoDB table used for remote-state locking. Local state stays
in `bootstrap/terraform.tfstate` (gitignored).

The S3 state bucket itself (**`emrooz-tf-state-prod`**) is managed manually
outside of Terraform. See the comment in `main.tf` for the CLI commands to
recreate it if needed.

## Run once

```sh
make tf-bootstrap-init
make tf-bootstrap-apply
```

Creates DynamoDB table `emrooz-tflock` (PAY_PER_REQUEST) in us-east-1.

## After bootstrap

Switch to `../terraform/` and run `terraform init` — it will pick up the
S3 backend defined in `backend.tf`.

## Tearing down

Don't, unless you really mean it. The lock table is shared by every
`terraform apply` against the main root.

```sh
cd ../terraform && terraform destroy   # destroy main first
cd ../bootstrap && terraform destroy   # then the lock table
# Then manually delete the S3 state bucket if you also want it gone.
```
