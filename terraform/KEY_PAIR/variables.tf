# keypair / variables

variable "key_name" {
  description = "The name for the key pair."
}

variable "public_key_path" {
  description = "Path of the public key material."
}

variable "name_tag" {
  description = "Name tag to assign to the resource"
  type        = string
}