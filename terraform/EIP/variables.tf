# elastic ip / variables

variable "vpc" {
  description = "Boolean if the EIP is in a VPC or not."
}

variable "instance" {
  description = "EC2 instance ID."
}

variable "eip_depends_on" {
  description = "Usually depends on iam role policies."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}