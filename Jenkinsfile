pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out repostiory..'
                checkout scm
            }
        }
        stage('Setting environments') {
            steps {
                echo 'Setting environment..'
                env.PATH = "/usr/local/apache-maven-3.9.5/bin:${env.PATH}"
                echo 'Testing maven..'
                sh 'mvn -version'
            }
        }
    }
}
