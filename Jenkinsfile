pipeline {
    agent any

    environment{
        FULL_IMAGE = "387512138096.dkr.ecr.us-east-1.amazonaws.com/vietsrepo/nextjs-app-repo:latest"
        TASK_DEFINITION =""
        NEW_TASK_DEFINITION=""
        NEW_TASK_INFO=""
        NEW_REVISION=""
        TASK_FAMILY="nodejs-task-definition"
    }
    stages {
        stage('Build') {
            steps {
                sh "docker build -t vietsrepo/nextjs-app-repo:latest ."
            }
        }
        stage('Upload to AWS ECR') {
            steps {
                sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 387512138096.dkr.ecr.us-east-1.amazonaws.com"
                sh "docker tag vietsrepo/nextjs-app-repo:latest 387512138096.dkr.ecr.us-east-1.amazonaws.com/vietsrepo/nextjs-app-repo:latest"
                sh "docker push 387512138096.dkr.ecr.us-east-1.amazonaws.com/vietsrepo/nextjs-app-repo:latest"
            }
        }
        stage('Update task definition and force deploy ecs service') {
            steps {
                sh '''
                    TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition ${TASK_FAMILY} --region "us-east-1")
                    NEW_TASK_DEFINITION=$(echo $TASK_DEFINITION | jq --arg IMAGE "${FULL_IMAGE}" '.taskDefinition | .containerDefinitions[0].image = $IMAGE | del(.taskDefinitionArn) | del(.revision) | del(.status) | del(.requiresAttributes) | del(.compatibilities) |  del(.registeredAt)  | del(.registeredBy)')
                    NEW_TASK_INFO=$(aws ecs register-task-definition --region "us-east-1" --cli-input-json "$NEW_TASK_DEFINITION")
                    NEW_REVISION=$(echo $NEW_TASK_INFO | jq '.taskDefinition.revision')
                    aws ecs update-service --cluster udemy-devops-ecs-cluster --service nodejs-service --task-definition ${TASK_FAMILY}:${NEW_REVISION} --force-new-deployment
                '''
 
            }
        }
    }
}