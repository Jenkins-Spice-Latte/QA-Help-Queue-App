# instance / variables

variable "ami" {
  description = "AMI to use for the instance."
}

variable "instance_type" {
  description = "Type of instance to start."
}

variable "key_name" {
  description = "Key name of the Key Pair to use for the instance."
}

variable "vpc_security_group_ids" {
  description = "A list of security group IDs to associate with."
}

variable "subnet_id" {
  description = "VPC Subnet ID to launch in."
}
variable "volume_size" {
  description = "Size of the volume in Gibibytes (GiB)."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}