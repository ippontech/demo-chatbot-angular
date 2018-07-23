#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "java -version"
    }

    stage('clean') {
        sh "chmod +x mvnw"
        sh "./mvnw clean"
    }

    stage('install tools') {
        sh "./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-yarn -DnodeVersion=v8.11.3 -DyarnVersion=v1.6.0"
    }

    stage('yarn install') {
        sh "./mvnw com.github.eirslett:frontend-maven-plugin:yarn"
    }

    stage('backend tests') {
        try {
            sh "./mvnw test"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/surefire-reports/TEST-*.xml'
        }
    }

    stage('frontend tests') {
        try {
            sh "./mvnw com.github.eirslett:frontend-maven-plugin:yarn -Dfrontend.yarn.arguments=test"
        } catch(err) {
            throw err
        } finally {
            junit allowEmptyResults: true, testResults: '**/target/test-results/jest/TESTS-*.xml'
        }
    }

    stage('packaging') {
        sh "./mvnw verify -Pprod -DskipTests"
        archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
    }

    stage('upload package to instance 2') {
        sh "ssh -i 'gateway.pem' ec2-user@ec2-35-174-136-82.compute-1.amazonaws.com sudo service gateway stop"
        sh "scp -i 'gateway.pem' ../Gateway/target/gateway-0.0.1-SNAPSHOT.war ec2-user@ec2-35-174-136-82.compute-1.amazonaws.com:/home/ec2-user/app/gateway/"
        sh "ssh -i 'gateway.pem' ec2-user@ec2-35-174-136-82.compute-1.amazonaws.com sudo service gateway start"
    }

    stage('upload package to instance 1') {
        sh "ssh -i 'gateway.pem' ec2-user@ec2-54-172-53-119.compute-1.amazonaws.com sudo service gateway stop"
        sh "scp -i 'gateway.pem' ../Gateway/target/gateway-0.0.1-SNAPSHOT.war ec2-user@ec2-54-172-53-119.compute-1.amazonaws.com:/home/ec2-user/app/gateway/"
        sh "ssh -i 'gateway.pem' ec2-user@ec2-54-172-53-119.compute-1.amazonaws.com sudo service gateway start"
    }

}
