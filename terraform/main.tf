# root / main

module "VPC" {
  source = "./VPC"

  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  name_tag             = "hq_vpc"
}

module "INTERNET_GATEWAY" {
  source = "./INTERNET_GATEWAY"

  vpc_id   = module.VPC.vpc_id
  name_tag = "hq_internet_gateway"
}

module "PUBLIC_SUBNET" {
  source = "./SUBNET"

  vpc_id                  = module.VPC.vpc_id
  availability_zone       = "eu-west-2a"
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = true

  tags = {
    "name" = "hq_public_subnet"
  }
}

module "TEST_PRIVATE_SUBNET" {
  source = "./SUBNET"

  vpc_id                  = module.VPC.vpc_id
  availability_zone       = "eu-west-2a"
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = false

  tags = {
    "name" = "hq_test_private_subnet"
  }
}
