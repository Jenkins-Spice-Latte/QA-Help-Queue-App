# database instance / main

resource "aws_db_instance" "db_instance" {
  allocated_storage      = var.allocated_storage
  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  db_subnet_group_name   = var.db_subnet_group_name
  vpc_security_group_ids = var.vpc_security_group_ids
  name                   = var.name
  username               = var.username
  password               = var.password
  skip_final_snapshot    = var.skip_final_snapshot
  identifier             = var.identifier
  apply_immediately      = var.apply_immediately

  tags = {
    "Name" = var.name_tag
  }
}

