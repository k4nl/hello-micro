FROM node:23-alpine

WORKDIR /app

RUN apk add --no-cache python3 py3-pip bash \
  && python3 -m venv /venv \
  && . /venv/bin/activate \
  && pip install awscli awscli-local

ENV PATH="/venv/bin:$PATH"

COPY gateway ./

RUN npm install

RUN npm run build

CMD ["sh", "-c", "./scripts/queue.sh && npm run start:prod"]
