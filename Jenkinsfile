pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install' // Use 'sh' for Linux/Mac
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npx wdio run ./wdio.conf.js' // Use 'sh' for Linux/Mac
            }
        }
    }

    // POST-BUILD ACTIONS
    post {
        always {
            echo 'Archiving test artifacts for future reference...'
            // Archive the raw Allure results and the log file
            archiveArtifacts(
                artifacts: 'allure-results/**/*, wdio.log',
                fingerprint: true
            )
        }
        success {
            echo 'Pipeline completed successfully! 🎉'
        }
        failure {
            echo 'Pipeline failed. Artifacts have been archived for investigation.'
        }
    }
}
