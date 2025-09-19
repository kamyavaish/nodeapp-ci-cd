provider "aws" {
  region = "us-east-1"
}

variable "key_name" {
  default = "Terra-key"  
}

resource "aws_instance" "EC2instance" {
  ami                         = "ami-08982f1c5bf93d976"  
  instance_type               = "t2.micro"
  key_name                    = var.key_name
  associate_public_ip_address = true

  tags = {
    Name = "AssessmentInstance"
  }
}

output "ec2_public_ip" {
  description = "Public IP ="
  value       = aws_instance.EC2instance.public_ip
}
