{
  "family": "__TASK_FAMILY__",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "__EXECUTION_ROLE_ARN__",
  "taskRoleArn": "__TASK_ROLE_ARN__",
  "containerDefinitions": [
    {
      "name": "__CONTAINER_NAME__",
      "image": "__IMAGE_URI__",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 5001,
          "hostPort": 5001,
          "protocol": "tcp"
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "node -e \"fetch('http://127.0.0.1:5001/api/health').then((res) => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1))\""],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 20
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "__LOG_GROUP_NAME__",
          "awslogs-region": "__AWS_REGION__",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
