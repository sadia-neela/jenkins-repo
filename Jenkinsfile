pipeline {
    agent any

    // NEW SECTION: Define parameters here
    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'firefox'],
            description: 'Select the browser to run the tests against'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                // Read the parameter and pass it as an environment variable
                script {
                    // For Windows bat command
                    powershell "\$env:BROWSER='${params.BROWSER}'; npx wdio run ./wdio.conf.js"

                    // If you were on Linux/Mac, you would use:
                    // sh "BROWSER=${params.BROWSER} npx wdio run ./wdio.conf.js"
                }
            }
        }
    }

    post {
        always {
            echo 'Archiving test artifacts...'
            archiveArtifacts(artifacts: 'allure-results/**/*, wdio.log', fingerprint: true)
            allure(
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']],
                report: 'allure-report'
            )
        }
        success {
            echo "Pipeline for ${params.BROWSER} completed successfully! 🎉"
        }
        failure {
            echo "Pipeline for ${params.BROWSER} failed. Check the report."
        }
    }
}