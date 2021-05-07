# eks cluster / outputs

# required by jenkins to run kubectl commands.
# data - The base64 encoded certificate data required to communicate with your cluster.
# Add this to the certificate-authority-data section of the kubeconfig file for your cluster.
output "certificate_authority_data" {
  value = aws_eks_cluster.eks_cluster.certificate_authority.0.data
}
# need to oyutput the kubeconfig file for the jenkins user so it can connect
#(or i could make the jenkins user the admin?)

output "cluster_name" {
  value = aws_eks_cluster.eks_cluster.name
}

output "cluster_endpoint" {
  value = aws_eks_cluster.eks_cluster.endpoint
}

output "certificate_authority" {
  value = aws_eks_cluster.eks_cluster.certificate_authority
}