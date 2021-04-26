# eks cluster / main

resource "aws_eks_cluster" "eks_cluster" {
  name     = var.name
  role_arn = var.role_arn

  vpc_config {
    subnet_ids              = var.subnet_ids
    endpoint_private_access = var.endpoint_private_access
  }

  depends_on = var.eks_cluster_depends_on

  tags = {
    "Name" = var.name_tag
  }
}