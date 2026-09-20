pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "docker build -t vietsrepo/nextjs-app-repo:version-${env.BUILD_NUMBER} ."
            }
        }
        stage('Upload to AWS ECR') {
            steps {
                sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 387512138096.dkr.ecr.us-east-1.amazonaws.com"
                sh "docker tag vietsrepo/nextjs-app-repo:version-${env.BUILD_NUMBER} 387512138096.dkr.ecr.us-east-1.amazonaws.com/vietsrepo/nextjs-app-repo:version-${env.BUILD_NUMBER}"
                sh "docker push 387512138096.dkr.ecr.us-east-1.amazonaws.com/vietsrepo/nextjs-app-repo:version-${env.BUILD_NUMBER}"
            }
        }
    }
}