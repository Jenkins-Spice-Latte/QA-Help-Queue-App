# policies / outputs

output "cluster_arn" {
  value = aws_iam_role.eks_cluster_iam_role.arn
}