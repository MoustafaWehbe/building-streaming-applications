import { sendEvent } from '../producers/processed-data--producer';
import { kafka } from '../utils/broker-client';
import {
  consumerGroupForHealthDataTopic,
  healthDataTopic,
} from '../utils/consts';
import { ProcessedDataPayload } from '../utils/types';

async function run() {
  try {
    const consumer = kafka.consumer({
      groupId: consumerGroupForHealthDataTopic,
    });
    await consumer.connect();
    console.log('Health data processor (consumer) connected successfully!');

    consumer.subscribe({
      topic: healthDataTopic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        const value = JSON.parse(
          result.message.value?.toString() || ''
        ) as unknown as ProcessedDataPayload;
        console.log(
          `Received message: ${JSON.stringify(value)} on partition ${
            result.partition
          }`
        );
        console.log('Processing the data...');
        setTimeout(() => {
          if (value.metricType === 'heartRate') {
            sendEvent({
              metricType: value.metricType,
              metricValue: value.metricValue,
              result:
                value.metricValue > 110 || value.metricValue < 40
                  ? 'You need to visit a doctor!'
                  : 'Normal heart beats!',
            });
          } else {
            sendEvent({
              metricType: value.metricType,
              metricValue: value.metricValue,
              result:
                value.metricValue < 7
                  ? 'You need to sleep more!'
                  : 'Sleep Champion!',
            });
          }
        }, 4000);
      },
    });
  } catch (error) {
    console.error(`An error occured ${error}`);
  }
}

run();
