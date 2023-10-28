import { healthDataTopic } from '../topics/create-topics';
import { kafka } from '../utils/broker-client';

type Metrics = 'heartRate' | 'sleepDuration';

const metricType = process.argv[2] as Metrics;
const metricValue = process.argv[3];

async function run() {
  try {
    const producer = kafka.producer();
    await producer.connect();
    console.log('Producer connected successfully!');

    const partition = metricType === 'heartRate' ? 0 : 1;

    const result = await producer.send({
      topic: healthDataTopic,
      messages: [
        {
          value: JSON.stringify({
            metricType,
            metricValue,
          }),
          partition,
        },
      ],
    });
    console.log(
      `Message sent successfully to topic ${result[0].topicName} and partition ${result[0].partition}`
    );
    await producer.disconnect();
  } catch (error) {
    console.error(`An error occured ${error}`);
  } finally {
    process.exit();
  }
}

run();
