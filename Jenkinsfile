pipeline {
    agent any // Runs on any available Jenkins agent

    stages {
        stage('Checkout') {
            steps {
                // This checks out the code from the SCM (Git) defined in the job
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install' // Uses Windows batch command
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx wdio run ./wdio.conf.js' // Uses Windows batch command
            }
        }
    }

    post {
        always {
            echo 'Test execution finished. Check the logs above for results.'
            // You can add advanced post-build actions here later, like sending emails or publishing reports
        }
        success {
            echo 'Pipeline completed successfully! 🎉'
        }
        failure {
            echo 'Pipeline failed! See the logs for details.'
        }
    }
}
