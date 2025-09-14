pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    }

    post {
        always {
            echo 'Archiving the URL file from source control...'
            archiveArtifacts(
                artifacts: 'url.txt', // Archive the file that was checked out from Git
                fingerprint: true
            )
        }
        success {
            echo "URL file archived successfully! 🎉"
        }
        failure {
            echo "Failed to archive URL file."
        }
    }
}
