# elastic ip / variables

variable "vpc" {
  description = "Boolean if the EIP is in a VPC or not."
}

variable "instance" {
  description = "EC2 instance ID."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}