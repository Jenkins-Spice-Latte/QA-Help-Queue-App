# root / variables

# ^ aws info
variable "aws_region" {
  description = "London region."
  default     = "eu-west-2"
}

# ^ instance info
variable "ec2_ami" {
  description = "Ubuntu 20.04 in London region."
  default     = "ami-096cb92bb3580c759"
}

variable "ec2_instance_type" {
  description = "Free tier instance type."
  default     = "t3.medium"
}

# ^ gitignored tfvars
variable "aws_access_key" {
  description = "AWS key for permission to provision resources."
  sensitive   = true
}

variable "aws_secret_key" {
  description = "AWS key for permission to provision resources."
  sensitive   = true
}

variable "test_db_username" {
  sensitive = true
}

variable "test_db_password" {
  sensitive = true
}

variable "prod_db_username" {
  sensitive = true
}

variable "prod_db_password" {
  sensitive = true
}

# ^ other
variable "vpc_cidr_block" {
  default = "10.0.0.0/16"
}

variable "key_name" {
  default = "i_dont_give_a_ssh"
}
variable "public_key_path" {
  default = "~/.ssh/i_dont_give_a_ssh.pub"
}

variable "management_vm_cidr_ip" {
  default = null
}