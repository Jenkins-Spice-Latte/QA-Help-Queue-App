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

module "EIP_NGW" {
  source         = "./EIP"
  eip_depends_on = module.INTERNET_GATEWAY
  name_tag       = "hq_eip_for_nat_gateway"
}

module "NAT_GATEWAY_MAIN" {
  source                 = "./NAT_GATEWAY"
  allocation_id          = module.EIP_NGW.id
  subnet_id              = module.PUBLIC_SUBNET.id
  nat_gateway_depends_on = [module.PUBLIC_SUBNET]
  name_tag               = "hq_nat_main"
}

# ^ private resources - testVM, RDSs
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

module "RDS_PRIVATE_SUBNET_A" {
  source                  = "./SUBNET"
  vpc_id                  = module.VPC.vpc_id
  availability_zone       = "eu-west-2a"
  cidr_block              = "10.0.33.0/24"
  map_public_ip_on_launch = false
  tags = {
    Name = "hq_test_private_subnet_a"
  }
}

module "RDS_PRIVATE_SUBNET_B" {
  source                  = "./SUBNET"
  vpc_id                  = module.VPC.vpc_id
  availability_zone       = "eu-west-2b"
  cidr_block              = "10.0.55.0/24"
  map_public_ip_on_launch = false
  tags = {
    Name = "hq_rds_private_subnet_b"
  }
}

module "RDS_SUBNET_GROUP" {
  source     = "./SUBNET_GROUP"
  name       = "rds_subnet_group"
  subnet_ids = [module.RDS_PRIVATE_SUBNET_B.id, module.RDS_PRIVATE_SUBNET_A.id]
  name_tag   = ""
}

# ^ resources needed for private subnet (test server)

module "PRIVATE_RT" {
  source           = "./RT"
  vpc_id           = module.VPC.vpc_id
  gateway_id       = module.NAT_GATEWAY_MAIN.id
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

# Roles and policies for eks cluster and eks node group
module "EKS_ROLES_POLICIES" {
  source = "./POLICIES"
}

module "EKS_CLUSTER" {
  source = "./EKS_CLUSTER"
  name = ""
  role_arn = ""
  subnet_ids = ""
  endpoint_public_access = true
  endpoint_private_access = true
  name_tag = ""
  eks_cluster_depends_on = ""
}