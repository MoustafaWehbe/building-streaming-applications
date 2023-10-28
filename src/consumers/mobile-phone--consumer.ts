import { kafka } from '../utils/broker-client';
import {
  consumerGroupForProcessedHealthDataTopic,
  processedHealthDataTopic,
} from '../utils/consts';

async function run() {
  try {
    const consumer = kafka.consumer({
      groupId: consumerGroupForProcessedHealthDataTopic,
    });
    await consumer.connect();
    console.log('Health data processor (consumer) connected successfully!');

    consumer.subscribe({
      topic: processedHealthDataTopic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(`Mobile phone received: ${result.message.value}`);
      },
    });
  } catch (error) {
    console.error(`An error occured ${error}`);
  }
}

run();
