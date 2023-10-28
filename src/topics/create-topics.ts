import { kafka } from '../utils/broker-client';
import { healthDataTopic, processedHealthDataTopic } from '../utils/consts';

async function run() {
  try {
    const admin = kafka.admin();
    await admin.connect();
    console.log('Kafka admin connected successfully!');

    await admin.createTopics({
      topics: [
        {
          topic: healthDataTopic,
          numPartitions: 2,
        },
        { topic: processedHealthDataTopic, numPartitions: 1 },
      ],
    });

    console.log(
      `${healthDataTopic} and ${processedHealthDataTopic} Topics created successfully`
    );
    await admin.disconnect();
  } catch (error) {
    console.error(`An error occured ${error}`);
  } finally {
    process.exit();
  }
}

run();
