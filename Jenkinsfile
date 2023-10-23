pipeline {
    agent any
    environment {
        MAVEN_HOME = "/usr/local/apache-maven-3.9.5"
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out repostiory..'
                checkout scm
            }
        }
        stage('Setting environments') {
            steps {
                echo 'Testing maven..'
                sh 'mvn -version'
            }
        }
    }
}
