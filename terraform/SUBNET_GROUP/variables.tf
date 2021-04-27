# subnet group / variables

variable "name" {
  description = "The name of the DB subnet group. "
}

variable "subnet_ids" {
  description = "A list of VPC subnet IDs."
}

variable "name_tag" {
  description = "A map of tags to assign to the resource."
}