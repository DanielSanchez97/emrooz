# infrastructure/

Terraform-managed AWS infrastructure for static-site hosting.

## What it deploys

| Site               | Domain          | Origin (S3)              | CDN                                        |
|--------------------|-----------------|--------------------------|--------------------------------------------|
| emrooz             | `emrooz.io`     | `emrooz-io-site`         | CloudFront + ACM, alias in Route53         |
| instagram-analyzer | `iga.emrooz.io` | `iga-emrooz-io-site`     | CloudFront + ACM, alias in Route53         |

Both sites use the same pattern: a private S3 bucket fronted by CloudFront
via Origin Access Control (OAC), with a DNS-validated ACM certificate and
A/AAAA alias records in the existing `emrooz.io` Route53 hosted zone.

## Layout

```
infrastructure/
├── bootstrap/    # One-time: S3 state bucket + DynamoDB lock table (local state)
├── terraform/    # Main root (remote state). Two static_site module instances.
└── Makefile      # tf-* targets and per-site deploy targets
```

## Prerequisites

- Terraform ≥ 1.6
- AWS CLI, with credentials for the target account in your default profile
  (override via `aws_profile` if you have multiple accounts)
- The `emrooz.io` hosted zone must already exist in Route53 in this account.
  Verify:
  ```sh
  aws route53 list-hosted-zones-by-name --dns-name emrooz.io
  ```

## One-time bootstrap

Creates the remote-state bucket + lock table. Local state stays in
`bootstrap/terraform.tfstate` (gitignored).

```sh
make tf-bootstrap-init
make tf-bootstrap-apply
```

## Apply main infra

```sh
make tf-init
make tf-plan      # sanity-check the diff
make tf-apply
```

ACM cert validation usually completes within ~2 minutes. CloudFront
distribution creation takes 5–20 minutes. After apply, both domains will
serve a CloudFront 403 (the buckets are empty) until you deploy.

## Deploy site updates

From the **repo root**:

```sh
make emrooz-deploy   # build sites/emrooz, sync to S3, invalidate CloudFront
make ia-deploy       # build apps/instagram-analyzer/frontend, sync, invalidate
make deploy-all      # both
```

Deploy targets resolve bucket and distribution IDs via `terraform output`
at run time, so they keep working across re-creates.

## Tearing down

`terraform destroy` in the main root removes the buckets, distributions,
certs, and DNS records — but **not** the hosted zone (we don't manage it).
Don't destroy the bootstrap unless you also intend to abandon the project;
removing the state bucket strands every other resource.

## Troubleshooting

- **`Error: no matching Route53Zone found`** — the hosted zone for
  `emrooz.io` doesn't exist in this account, or the AWS profile points
  somewhere else.
- **ACM validation hangs** — verify the validation CNAMEs that Terraform
  created exist in Route53 (`aws route53 list-resource-record-sets …`).
  Apply is idempotent; retrying is safe.
- **`make emrooz-deploy` errors with "no value found for output"** — main
  Terraform hasn't been applied yet, or the workspace isn't initialized.
  Run `make tf-init && make tf-apply` first.

## Cost

CloudFront + S3 for two low-traffic static sites runs ~$1–2/month per site.
ACM certs and Route53 records inside an existing hosted zone are free.
The state bucket and DynamoDB lock table are effectively free at this
usage level.
