# ./tools/docker/lambda-base/Dockerfile
FROM node:23-alpine

ARG LAMBDA_NAME
ENV LAMBDA_NAME=${LAMBDA_NAME}

WORKDIR /app

COPY tools/package*.json ./
COPY tools/tsconfig.json ./
COPY tools/tsconfig.build.json ./
COPY tools/.npmrc ./
 
RUN npm install

COPY tools/apps/${LAMBDA_NAME}/src ./

RUN npm run build

CMD ["sh", "-c", "npm run start:prod --lambda=${LAMBDA_NAME}"]