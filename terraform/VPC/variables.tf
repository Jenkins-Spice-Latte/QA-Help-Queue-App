# vpc / variables

variable "cidr_block" {
  description = "The CIDR block for the VPC."
}

variable "enable_dns_hostnames" {
  description = "DNS support in the VPC"
  type        = bool
}

variable "enable_dns_support" {
  description = "DNS hostnames in the VPC"
  type        = bool
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}