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
  default     = "t2.micro"
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