# elastic ip / main

resource "aws_eip" "eip" {
  instance = var.instance
  vpc      = var.vpc

  depends_on = var.eip_depends_on

  tags = {
    "Name" = var.name_tag
  }
}

