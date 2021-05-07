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
  description = "Instance type."
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

# ^ other
variable "vpc_cidr_block" {
  default = "11.0.0.0/16"
}

variable "key_name" {
  default = "dramatic_entrance"
}
variable "public_key_path" {
  default = "~/.ssh/dramatic_entrance.pub"
}