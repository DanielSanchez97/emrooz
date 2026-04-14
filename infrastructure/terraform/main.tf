# The hosted zone for emrooz.io is assumed to already exist. Looking it up
# instead of creating it avoids the risk of clobbering existing records.
data "aws_route53_zone" "root" {
  name         = var.root_domain
  private_zone = false
}

module "emrooz_site" {
  source         = "./modules/static_site"
  domain_name    = var.root_domain
  hosted_zone_id = data.aws_route53_zone.root.zone_id

  tags = {
    Site = "emrooz"
  }
}

module "iga_site" {
  source         = "./modules/static_site"
  domain_name    = "iga.${var.root_domain}"
  hosted_zone_id = data.aws_route53_zone.root.zone_id

  tags = {
    Site = "instagram-analyzer"
  }
}
