# nat gateway / main

resource "aws_nat_gateway" "nat_gateway" {
  allocation_id = var.allocation_id
  subnet_id     = var.subnet_id

  depends_on = var.nat_gateway_depends_on

  tags = {
    "Name" = var.name_tag
  }
}
