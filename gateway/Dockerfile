FROM node:23-alpine

WORKDIR /app

RUN apk add --no-cache python3 py3-pip bash \
  && python3 -m venv /venv \
  && . /venv/bin/activate \
  && pip install awscli awscli-local

ENV PATH="/venv/bin:$PATH"

COPY . .
RUN chmod +x ./scripts/queue.sh

RUN apk add --no-cache dos2unix \
  && dos2unix ./scripts/queue.sh \
  && chmod +x ./scripts/queue.sh

RUN npm install
RUN npm run build
RUN npm run prisma:generate

CMD ["sh", "-c", "./scripts/queue.sh && npm run start:prod"]