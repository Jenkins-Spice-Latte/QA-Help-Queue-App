# root / main

# ^ general
module "T_MANAGER_VPC" {
  source               = "./VPC"
  cidr_block           = var.vpc_cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true
  name_tag             = "T_MANAGER_vpc"
}

module "T_MANAGER_INTERNET_GATEWAY" {
  source   = "./INTERNET_GATEWAY"
  vpc_id   = module.T_MANAGER_VPC.vpc_id
  name_tag = "T_MANAGER_internet_gateway"
}

module "T_MANAGER_PUBLIC_SUBNET" {
  source                  = "./SUBNET"
  vpc_id                  = module.T_MANAGER_VPC.vpc_id
  availability_zone       = "eu-west-2a"
  cidr_block              = "11.0.2.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "T_MANAGER_public_subnet"
  }
}

module "T_MANAGER_PUBLIC_RT" {
  source           = "./RT"
  vpc_id           = module.T_MANAGER_VPC.vpc_id
  gateway_id       = module.T_MANAGER_INTERNET_GATEWAY.id
  route_cidr_block = "0.0.0.0/0"
  name_tag         = "T_MANAGER_public_rt"
}

module "T_MANAGER_PUBLIC_RT_ASSOCIATION" {
  source         = "./RT_A"
  subnet_id      = module.T_MANAGER_PUBLIC_SUBNET.id
  route_table_id = module.T_MANAGER_PUBLIC_RT.id
}

module "T_MANAGER_SG" {
  source = "./SG"
  description = "External allow"
  vpc_id = module.T_MANAGER_VPC.vpc_id
  name_tag = "T_MANAGER_ssh_sg"
}

module "T_MANAGER_SSH_ING_PUBLIC_SG_RULE" {
  source = "./SG_RULE"
  cidr_blocks = ["0.0.0.0/0"]
  type = "ingress"
  from_port = 22
  to_port = 22
  protocol = "all"
  security_group_id = module.T_MANAGER_SG.id
  name_tag = "hq_allow_ssh_from_public"
}

module "T_MANAGER_ALL_EG_PUBLIC_SG_RULE" {
  source = "./SG_RULE"
  cidr_blocks = ["0.0.0.0/0"]
  type = "egress"
  from_port = 0
  to_port = 65535
  protocol = "all"
  security_group_id = module.T_MANAGER_SG.id
  name_tag = "T_MANAGER_allow_to_public"
}

module "T_MANAGER_SG_PRIVATE" {
  source = "./SG"
  description = "Allow internal Access to VM"
  vpc_id = module.T_MANAGER_VPC.vpc_id
  name_tag = "T_MANAGER_ssh_sg"
}

module "T_MANAGER_SSH_ING_PRIVATE_SG_RULE" {
  source = "./SG_RULE"
  cidr_blocks = [var.vpc_cidr_block]
  type = "ingress"
  from_port = 0
  to_port = 65535
  protocol = "all"
  security_group_id = module.T_MANAGER_SG_PRIVATE.id
  name_tag = "T_MANAGER_VPC_allow_all_from_private"
}

module "T_MANAGER_ALL_EG_PRIVATE_SG_RULE" {
  source = "./SG_RULE"
  cidr_blocks = [var.vpc_cidr_block]
  type = "egress"
  from_port = 0
  to_port = 65535
  protocol = "all"
  security_group_id = module.T_MANAGER_SG_PRIVATE.id
  name_tag = "T_MANAGER_all_eg_private_sg_rule"
}

module "T_MANAGER_KEY" {
  source = "./KEY_PAIR"
  key_name = var.key_name
  public_key_path = var.public_key_path
  name_tag = "T_MANAGER_key"
}

module "T_MANAGER_INSTANCE" {
  source = "./INSTANCE"
  ami = var.ec2_ami
  instance_type = var.ec2_instance_type
  subnet_id = module.T_MANAGER_PUBLIC_SUBNET.id
  volume_size = 8
  vpc_security_group_id_external = module.T_MANAGER_SG.id
  vpc_security_group_id_internal = module.T_MANAGER_SG_PRIVATE.id
  key_name = module.T_MANAGER_KEY.key_pair_id

  name_tag = "T_MANAGER_vm"

}

