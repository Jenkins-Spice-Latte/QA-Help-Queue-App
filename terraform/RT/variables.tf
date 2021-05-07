# rt / variables

variable "vpc_id" {
  description = "The VPC ID."
}

variable "route_cidr_block" {
  description = "The CIDR block of the route."
}

variable "gateway_id" {
  description = "Identifier of a VPC internet gateway or a virtual private gateway."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}