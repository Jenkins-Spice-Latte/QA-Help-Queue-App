# eks node group / variables

variable "instance_type" {
  description = "Instance types associated."
}

variable "ami_type" {
  description = "Type of AMI associated with the EKS Node Group."
}

variable "cluster_name" {
  description = "Name of the EKS Cluster."
}

variable "node_group_name" {
  description = "Name of the EKS Node Group."
}

variable "node_role_arn" {
  description = "Amazon Resource Name (ARN) of the IAM Role"
}

variable "subnet_ids" {
  description = "Identifiers of EC2 Subnets to associate with the EKS Node Group."
}

variable "desired_size" {
  description = "Desired number of worker nodes."
}

variable "max_size" {
  description = "Maximum number of worker nodes."
}

variable "min_size" {
  description = "Minimum number of worker nodes."
}

variable "depends_on_a" {
  description = "Usually depends on iam role policies."
}
variable "depends_on_b" {
  description = "Usually depends on iam role policies."
}
variable "depends_on_c" {
  description = "Usually depends on iam role policies."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}