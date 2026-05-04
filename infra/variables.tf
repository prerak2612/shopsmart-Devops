variable "aws_region" {
  description = "AWS region where all rubric resources are created."
  type        = string
}

variable "project_name" {
  description = "Base name used for AWS resources."
  type        = string
  default     = "shopsmart"
}

variable "container_port" {
  description = "Port exposed by the ShopSmart Node.js container."
  type        = number
  default     = 5001
}

variable "ecs_task_cpu" {
  description = "Fargate task CPU units."
  type        = number
  default     = 256
}

variable "ecs_task_memory" {
  description = "Fargate task memory in MiB."
  type        = number
  default     = 512
}

variable "ecs_service_desired_count" {
  description = "Initial ECS desired count. The workflow scales it to 1 after pushing the real image."
  type        = number
  default     = 0
}

variable "bootstrap_container_image" {
  description = "Placeholder image used for the initial Terraform-created task definition."
  type        = string
  default     = "public.ecr.aws/docker/library/node:20-alpine"
}
