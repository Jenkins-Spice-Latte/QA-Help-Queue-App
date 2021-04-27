# policies / outputs

output "cluster_arn" {
  value = aws_iam_role.eks_cluster_iam_role.arn
}

output "nodes_arn" {
  value = aws_iam_role.eks_node_group_iam_role.arn
}