# subnet / variables

variable "vpc_id" {
  description = "The VPC ID."
}

variable "cidr_block" {
  description = "The CIDR block for the subnet."
}

variable "map_public_ip_on_launch" {
  description = "Indicates instances launched into the subnet should be assigned a public IP address."
}

variable "availability_zone" {
  description = "The AZ for the subnet."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}