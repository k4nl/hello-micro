import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, './.env') });

const actionsDir = path.join(__dirname, './tools/apps');
const actionDirs = fs
    .readdirSync(actionsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const gatewayService = `
    gateway:
        build:
            context: .
            dockerfile: ./gateway/Dockerfile
        ports:
            - '3000:3000'
        environment:
            - NODE_ENV=development
            - PORT=3000
            - AWS_REGION=${process.env.AWS_REGION || 'us-east-1'}
            - AWS_ENDPOINT=${process.env.AWS_ENDPOINT || 'http://localstack:4566/000000000000'}
            - AWS_ACCESS_KEY_ID=${process.env.AWS_ACCESS_KEY_ID || 'AKIAIOSFODNN7EXAMPLE'}
            - AWS_SECRET_ACCESS_KEY=${process.env.AWS_SECRET_ACCESS_KEY || 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'}
            - DATABASE_URL=${process.env.DATABASE_URL || 'postgresql://postgres:postgres@database:5432/hello'}
        depends_on:
            - localstack
            - database
        networks:
            - app-network
        volumes:
            - ./gateway:/app
`;

const localstackService = `
    localstack:
        image: localstack/localstack:latest
        ports:
            - '4566:4566'
        environment:
            - SERVICES=sqs
            - DEFAULT_REGION=us-east-1
            - HOSTNAME_EXTERNAL=localstack
        volumes:
            - './localstack:/docker-entrypoint-initaws.d'
        networks:
            - app-network
`;

const databaseService = `
    database:
        image: postgres:16
        environment:
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: postgres
            POSTGRES_DB: hello
        ports:
            - '5432:5432'
        volumes:
            - db_data:/var/lib/postgresql/data
        networks:
            - app-network
`;

const dynamicServices = actionDirs.map((dir) => {
    return `
    ${dir}:
        build:
            context: .
            dockerfile: ./tools/docker/lambda-base/Dockerfile
            args:
                - SERVICE_PATH=./tools/apps/${dir}/src
                - LAMBDA_NAME=${dir}
        environment:
            - AWS_REGION=${process.env.AWS_REGION}
            - AWS_ACCESS_KEY_ID=${process.env.AWS_ACCESS_KEY_ID}
            - AWS_SECRET_ACCESS_KEY=${process.env.AWS_SECRET_ACCESS_KEY}
            - AWS_ENDPOINT=${process.env.AWS_ENDPOINT}
            - DATABASE_URL=${process.env.DATABASE_URL}
        depends_on:
            - localstack
            - database
        networks:
            - app-network
`;
}).join('\n');

const content = `version: '3.8'
services:
${gatewayService}
${localstackService}
${databaseService}
${dynamicServices}
networks:
    app-network:
        name: app-network
volumes:
    db_data:
`;

fs.writeFileSync(path.join(__dirname, './docker-compose.yml'), content);
console.log('✅ docker-compose.yml generated with gateway and dynamic services!');