# sg / main

resource "aws_security_group" "security_group" {
  description = var.description
  vpc_id      = var.vpc_id

  tags = {
    "Name" = var.name_tag
  }
}

