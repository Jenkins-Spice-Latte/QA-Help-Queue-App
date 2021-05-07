# sg / variables

variable "description" {
  description = "Security group description."
}

variable "vpc_id" {
  description = "The VPC ID."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}