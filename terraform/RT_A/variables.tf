# rt association / variables

variable "subnet_id" {
  description = "The subnet ID to create an association."
}

variable "route_table_id" {
  description = "The ID of the routing table to associate with."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}