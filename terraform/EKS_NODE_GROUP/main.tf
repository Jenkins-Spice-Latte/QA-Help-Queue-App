# eks node group / main

resource "aws_eks_node_group" "eks_node_group" {
  instance_type   = var.instance_type
  ami_type        = var.ami_type
  cluster_name    = var.cluster_name
  node_group_name = var.node_group_name
  node_role_arn   = var.node_role_arn
  subnet_ids      = var.subnet_ids

  scaling_config {
    desired_size = var.desired_size
    max_size     = var.max_size
    min_size     = var.min_size
  }

  depends_on = [var.eks_node_group_depends_on]

  tags = {
    "Name" = var.name_tag
  }
}