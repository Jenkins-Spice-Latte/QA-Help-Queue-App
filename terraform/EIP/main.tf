# elastic ip / main

resource "aws_eip" "eip" {
  instance = var.instance
  vpc      = var.vpc

  tags = {
    "Name" = var.name_tag
  }
}

