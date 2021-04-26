# root / main

# ^ general
module "VPC" {
  source               = "./VPC"
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  name_tag             = "hq_vpc"
}

module "INTERNET_GATEWAY" {
  source   = "./INTERNET_GATEWAY"
  vpc_id   = module.VPC.vpc_id
  name_tag = "hq_internet_gateway"
}

module "PUBLIC_SUBNET" {
  source                  = "./SUBNET"
  vpc_id                  = module.VPC.vpc_id
  availability_zone       = "eu-west-2a"
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "general_public_subnet"
  }
}

module "PUBLIC_RT" {
  source           = "./RT"
  vpc_id           = module.VPC.vpc_id
  gateway_id       = module.INTERNET_GATEWAY.id
  route_cidr_block = "0.0.0.0/0"
  name_tag         = "hq_public_rt"
}

module "PUBLIC_RT_ASSOCIATION" {
  source         = "./RT_A"
  subnet_id      = module.PUBLIC_SUBNET.id
  route_table_id = module.PUBLIC_RT.id
}

# ^ CI resources
module "TEST_PRIVATE_SUBNET" {
  source                  = "./SUBNET"
  vpc_id                  = module.VPC.vpc_id
  availability_zone       = "eu-west-2a"
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = false
  tags = {
    Name = "hq_test_private_subnet"
  }
}

# ^ resources needed for private subnet (test server)
module "NAT_GATEWAY" {
  source                 = "./NAT_GATEWAY"
  allocation_id          = module.EIP_NGW.id
  subnet_id              = module.EKS_PUBLIC_SUBNET_A.id
  nat_gateway_depends_on = [module.EKS_PUBLIC_SUBNET_A]
  name_tag               = "hq_eks_nat"
}

module "PRIVATE_RT" {
  source           = "./RT"
  vpc_id           = module.VPC.vpc_id
  gateway_id       = module.NAT_GATEWAY.id
  route_cidr_block = "0.0.0.0/0"
  name_tag         = "hq_private_rt"
}

module "PRIVATE_RT_ASSOCIATION" {
  source         = "./RT_A"
  route_table_id = module.PRIVATE_RT.id
  subnet_id      = module.TEST_PRIVATE_SUBNET.id
}

# ^ deployment resources (eks)
module "EKS_PUBLIC_SUBNET_A" {
  source                  = "./SUBNET"
  vpc_id                  = module.VPC.vpc_id
  availability_zone       = "eu-west-2a"
  cidr_block              = "10.0.22.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "hq_eks_public_subnet_a"
    # tags for kubernetes
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/elb"    = 1
  }
}

module "EKS_PUBLIC_SUBNET_B" {
  source                  = "./SUBNET"
  vpc_id                  = module.VPC.vpc_id
  availability_zone       = "eu-west-2b"
  cidr_block              = "10.0.44.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "hq_eks_public_subnet_b"
    # tags for kubernetes load balancer
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/elb"    = 1
  }
}

module "EIP_NGW" {
  source         = "./EIP"
  eip_depends_on = module.INTERNET_GATEWAY
  name_tag       = "hq_eip_for_nat_gateway"
}
