# nat gateway / variables

variable "allocation_id" {
  description = "The Allocation ID of the Elastic IP address for the gateway."
}
variable "subnet_id" {
  description = "The Subnet ID of the subnet in which to place the gateway."
}

variable "nat_gateway_depends_on" {
  description = "NAT gateway depends on internet gateway."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}