# sg rule / variables

variable "type" {
  description = "Type of rule being created."
}

variable "from_port" {
  description = "Start port."
}

variable "to_port" {
  description = "End port."
}

variable "protocol" {
  description = "Protocol."
}

variable "cidr_blocks" {
  description = "List of CIDR blocks."
}

variable "security_group_id" {
  description = "Security group to apply this rule to."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}