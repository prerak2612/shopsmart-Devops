output "s3_bucket_name" {
  description = "Unique S3 bucket created for rubric storage requirements."
  value       = aws_s3_bucket.artifacts.bucket
}

output "ecr_repository_url" {
  description = "ECR repository URL used by GitHub Actions for docker push."
  value       = aws_ecr_repository.app.repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name for deployments."
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS service name for deployments."
  value       = aws_ecs_service.app.name
}

output "ecs_task_family" {
  description = "Task definition family updated by the deploy workflow."
  value       = aws_ecs_task_definition.app.family
}

output "ecs_container_name" {
  description = "Container name inside the ECS task definition."
  value       = local.container_name
}

output "ecs_execution_role_arn" {
  description = "Execution role ARN injected into the ECS task definition template."
  value       = aws_iam_role.ecs_execution.arn
}

output "ecs_task_role_arn" {
  description = "Task role ARN injected into the ECS task definition template."
  value       = aws_iam_role.ecs_task.arn
}

output "ecs_log_group_name" {
  description = "CloudWatch log group for the container."
  value       = aws_cloudwatch_log_group.ecs.name
}

output "alb_dns_name" {
  description = "Public endpoint for the ECS service."
  value       = aws_lb.app.dns_name
}
