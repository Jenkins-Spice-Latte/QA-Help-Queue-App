# elastic ip / variables

variable "vpc" {
  description = "Boolean if the EIP is in a VPC or not."
  default     = null
}

variable "instance" {
  description = "EC2 instance ID."
  default     = null
}

variable "eip_depends_on" {
  description = "Usually depends on iam role policies."
  default = null
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}