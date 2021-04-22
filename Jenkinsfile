pipeline {
    agent any 
    environment{
        dockerImage=''
        registry = 'rajnishcoder/orphanjs'
        registryCredential = 'dockerhub_id'
    }
    options{
        skipDefaultCheckout(true)
    }
    stages {
        stage('clean workspace'){
            steps{
                cleanWs()
            }
        }
        stage('clone repo and install') { 
            steps {
                git 'https://github.com/abhisah01/SPE.git'
                sh "npm install"
            }
        }
        stage('Testing'){
            steps{
                sh "npm test"
            }
        }
        stage('Build docker image'){
            steps{
                script{
                    dockerImage = docker.build registry
                }
            }
        }
        stage('Push to Dockerhub'){
            steps{
                script{
                       docker.withRegistry('',registryCredential){
                       dockerImage.push() 
                    }
                }
            }
        }
       stage('Remove unused and dangling images'){
           steps{
               script{
                       sh "docker rmi $registry:latest"
                       sh "docker system prune -f"
               }
           }
       }
       stage('Deploy on Node'){
            steps{
                script{
                    step([
                        $class: "RundeckNotifier",
                        includeRundeckLogs: true,
                        rundeckInstance: "rundeck",
                        jobId: "b7617a1e-6893-4925-9a0d-3176b77bdeb1",
                        shouldWaitForRundeckJob: true,
                        shouldFailTheBuild: true,
                        tailLog: true
                        ])
                }
            }
        }
        
    }
}
