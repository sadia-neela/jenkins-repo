pipeline {
    agent any
    parameters {
        choice( name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Select the browser' )
    }

    stages {
        stage('Checkout') { steps { checkout scm } }

        // NEW STAGE: Ensure the upstream job has run successfully
        stage('Build Upstream Dependency') {
            steps {
                script {
                    // This builds the 'create-url-file' job and waits for it to finish.
                    // If it fails, this entire pipeline will fail immediately.
                    build(
                        job: 'create-url-file',
                        wait: true // Wait for the upstream build to finish
                    )
                }
            }
        }

        // Copy the required artifact from the upstream job
        stage('Copy URL Config') {
            steps {
                script {
                    // Use the copyArtifacts plugin to get the file
                    copyArtifacts(
                        projectName: 'create-url-file',   // Name of the upstream job
                        selector: lastSuccessful(),       // Copy from the last successful build of that job
                        filter: 'url.txt',               // Name of the file to copy
                        // target: '.' is optional, it copies to the root of the workspace by default
                    )
                    // Optional: Print the contents to the log to confirm it worked
                    bat 'type url.txt'
                }
            }
        }

        stage('Install Dependencies') { steps { bat 'npm install' } }
        
        stage('Run Tests') {
            steps {
                script {
                    powershell "\$env:BROWSER='${params.BROWSER}'; npx wdio run ./wdio.conf.js"
                }
            }
        }
    }

    post {
        always {
            echo 'Archiving test artifacts...'
            archiveArtifacts(artifacts: 'allure-results/**/*, wdio.log', fingerprint: true)
            allure(includeProperties: false, jdk: '', results: [[path: 'allure-results']], report: 'allure-report')
        }
        success {
            echo "Pipeline for ${params.BROWSER} completed successfully! 🎉"
        }
        failure {
            echo "Pipeline for ${params.BROWSER} failed. Check the report."
        }
    }
}
