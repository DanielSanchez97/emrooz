###########################
# Terraform — main root
###########################

TF_DIR := infrastructure/terraform

tf-init:
	terraform -chdir=$(TF_DIR) init

tf-plan:
	terraform -chdir=$(TF_DIR) plan

tf-apply:
	terraform -chdir=$(TF_DIR) apply

tf-output:
	terraform -chdir=$(TF_DIR) output

tf-validate:
	terraform -chdir=$(TF_DIR) validate

tf-fmt:
	terraform -chdir=infrastructure fmt -recursive

tf-fmt-check:
	terraform -chdir=infrastructure fmt -recursive -check

###########################
# Terraform — bootstrap (run once)
###########################

TF_BOOTSTRAP_DIR := infrastructure/bootstrap

tf-bootstrap-init:
	terraform -chdir=$(TF_BOOTSTRAP_DIR) init

tf-bootstrap-apply:
	terraform -chdir=$(TF_BOOTSTRAP_DIR) apply

###########################
# Site deploys (build → S3 sync → CloudFront invalidation)
###########################

emrooz-deploy: emrooz-build
	@bucket=$$(terraform -chdir=$(TF_DIR) output -raw emrooz_bucket); \
	dist_id=$$(terraform -chdir=$(TF_DIR) output -raw emrooz_distribution_id); \
	echo "Syncing sites/emrooz/dist/ → s3://$$bucket"; \
	aws s3 sync sites/emrooz/dist/ s3://$$bucket/ --delete; \
	echo "Invalidating CloudFront $$dist_id"; \
	aws cloudfront create-invalidation --distribution-id $$dist_id --paths "/*"

ia-deploy: ia-frontend-build
	@bucket=$$(terraform -chdir=$(TF_DIR) output -raw iga_bucket); \
	dist_id=$$(terraform -chdir=$(TF_DIR) output -raw iga_distribution_id); \
	echo "Syncing apps/instagram-analyzer/frontend/dist/ → s3://$$bucket"; \
	aws s3 sync apps/instagram-analyzer/frontend/dist/ s3://$$bucket/ --delete; \
	echo "Invalidating CloudFront $$dist_id"; \
	aws cloudfront create-invalidation --distribution-id $$dist_id --paths "/*"

deploy-all: emrooz-deploy ia-deploy
