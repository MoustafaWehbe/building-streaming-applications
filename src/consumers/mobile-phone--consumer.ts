import { processedHealthDataTopic } from '../topics/create-topics';
import { kafka } from '../utils/broker-client';

const consumerGroup = 'groupForDataConsumers';

async function run() {
  try {
    const consumer = kafka.consumer({ groupId: consumerGroup });
    await consumer.connect();
    console.log('Health data processor (consumer) connected successfully!');

    consumer.subscribe({
      topic: processedHealthDataTopic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received message: ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (error) {
    console.error(`An error occured ${error}`);
  }
}

run();
