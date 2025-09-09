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
            echo 'Archiving test artifacts...'
            archiveArtifacts(artifacts: 'allure-results/**/*, wdio.log', fingerprint: true)

            // NEW STEP: Generate and publish the Allure report
            allure(
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']], // Path to the raw results
                report: 'allure-report' // Directory where the report will be generated
            )
        }
        success {
            echo 'Pipeline completed successfully! 🎉'
        }
        failure {
            echo 'Pipeline failed. Artifacts and report have been generated for investigation.'
        }
    }
}
