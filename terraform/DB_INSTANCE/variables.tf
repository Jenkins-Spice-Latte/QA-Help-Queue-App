# database instance / variables

variable "allocated_storage" {
  description = "The allocated storage in gibibytes."
}

variable "engine" {
  description = "The database engine to use."
}

variable "engine_version" {
  description = "The engine version to use."
}

variable "instance_class" {
  description = "The instance type of the RDS instance."
}

variable "db_subnet_group_name" {
  description = "Name of DB subnet group."
}

variable "vpc_security_group_ids" {
  description = "List of VPC security groups to associate."
}

variable "name" {
  description = " The name of the database to create when the DB instance is created."
}

variable "username" {
  description = "Username for the root DB user."
}

variable "password" {
  description = "Password for the root DB user."
}

variable "skip_final_snapshot" {
  description = "Determines whether a final DB snapshot is created before the DB instance is deleted."
}

variable "identifier" {
  description = "The name of the RDS instance."
}

variable "apply_immediately" {
  description = "Specifies whether any database modifications are applied immediately."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}