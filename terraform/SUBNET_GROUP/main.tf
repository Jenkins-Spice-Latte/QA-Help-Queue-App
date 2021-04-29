# subnet group / main

resource "aws_db_subnet_group" "subnet_group" {
  name       = var.name
  subnet_ids = var.subnet_ids

  tags = {
    Name = var.name_tag
  }
}