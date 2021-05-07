# policies / outputs

output "cluster_arn" {
  value = aws_iam_role.eks_cluster_iam_role.arn
}

output "nodes_arn" {
  value = aws_iam_role.eks_node_group_iam_role.arn
}

output "cluster_policy_attachment_a" {
  value = aws_iam_role_policy_attachment.AmazonEKSClusterPolicy
}

output "cluster_policy_attachment_b" {
  value = aws_iam_role_policy_attachment.AmazonEKSVPCResourceController
}

output "ng_policy_attachment_a" {
  value = aws_iam_role_policy_attachment.AmazonEKSWorkerNodePolicy
}

output "ng_policy_attachment_b" {
  value = aws_iam_role_policy_attachment.AmazonEKS_CNI_Policy
}

output "ng_policy_attachment_c" {
  value = aws_iam_role_policy_attachment.AmazonEC2ContainerRegistryReadOnly
}