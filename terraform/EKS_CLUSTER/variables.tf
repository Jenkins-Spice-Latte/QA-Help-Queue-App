# eks cluster / variables

variable "name" {
  description = "Name of the cluster."
}

variable "role_arn" {
  description = "The Amazon Resource Name IAM role for perms to control plane to make calls to AWS API."
}

variable "subnet_ids" {
  description = "List of subnet IDs. At least two different availability zones!"
}

variable "endpoint_private_access" {
  description = "Indicates whether or not the Amazon EKS private API server endpoint is enabled."
}

variable "endpoint_public_access" {
  description = "Indicates whether or not the Amazon EKS public API server endpoint is enabled."
}

variable "depends_on_a" {
  description = "Usually depends on iam role policies."
}
variable "depends_on_b" {
  description = "Usually depends on iam role policies."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}