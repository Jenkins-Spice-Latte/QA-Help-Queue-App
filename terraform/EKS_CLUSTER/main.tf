# eks cluster / main

resource "aws_eks_cluster" "eks_cluster" {
  name     = var.name
  role_arn = var.role_arn

  vpc_config {
    subnet_ids              = var.subnet_ids
    endpoint_private_access = var.endpoint_private_access
    endpoint_public_access  = var.endpoint_private_access
  }

  depends_on = [var.depends_on_a, var.depends_on_b]

  tags = {
    "Name" = var.name_tag
  }
}