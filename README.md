# Build Event Streaming solutions using Kafka

## Health Data streaming tutorial

- The Apple Watch continuously collects health data and sends it to a designated endpoint

- The REST API, acting as a Kafka producer, sends the health data to the health-data topic with multiple partitions in the Kafka cluster.

- Kafka's partitioning algorithm determines which partition a message should be sent to based on the metric type tag associated with each data point.

- The Health Data Processor application processes the incoming health data in real-time, considering the specific health metric type. It maintains order within each partition.

- Processed data is sent back to the Kafka cluster to a different topic (processed_health_data) for storage.

- On mobile phone, the dedicated app subscribes to the processed_health_data topic. It receives and displays the processed health data.

### Set up the project by running the floowing commands

`docker-compose up -d`: Start the zookeeper and the kafka server

`cp .env.example ./.env`: Copy or replace the environment variables if you have different configurations

`npm install`: install depds

### Start testing: open multiple terminals and run the following

- ***Topics:***
  - `npm run create-topics`: This command creates two topics inside the broker: `health_data` and `processed_health_data`
- ***Producers:***
  - `npm run produce-data-by-smart-watch heartRate 123` or `npm run produce-data-by-smart-watch sleepDuration 8`: run any of these commands when you want your terminal to act as the smart watch sending metrics to the server. The tutorial supports two type of metrics `heartRate` and `sleepDuration`. The second argument is also required and it specifies the value of the metric.
- ***Consumers:***
  - `npm run consume-data-by-data-processor-server`: You can run this command in two different terminals at max, and the zookeeper will decided which instance will read from which partition inside the health_data topic. If one consumer of this instance is executed it will be responsible for events inside both partitions.
  - `npm run consume-data-by-mobile-phone`: This command will be used by the mobile phone to consume data after it being processed and push to the processed_health_data topic. Since this consumer is reading from a different topic it cannot be inside the same consumer group as the `consume-data-by-data-processor-server` consumer

### This tutorial showcase the following kafka components

- Broker
- Zookeeper
- Topics
- Partitioning
- Consumers
- Consumer Groups
- Producers
