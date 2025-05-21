#!/bin/sh

queues="gateway.fifo create-user.fifo update-user.fifo delete-user.fifo get-user-info.fifo tool-response.fifo"

for queue in $queues; do
  echo "Creating queue: $queue"
  awslocal sqs create-queue \
    --endpoint-url "http://localstack:4566/000000000000" \
    --queue-name "$queue" \
    --region us-east-1 \
    --attributes FifoQueue=true
done
