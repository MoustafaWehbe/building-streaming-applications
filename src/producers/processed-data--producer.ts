import { processedHealthDataTopic } from '../topics/create-topics';
import { kafka } from '../utils/broker-client';

export async function sendEvent(payload: any) {
  try {
    const producer = kafka.producer();
    await producer.connect();
    console.log('Producer connected successfully!');

    const result = await producer.send({
      topic: processedHealthDataTopic,
      messages: [
        {
          value: JSON.stringify(payload),
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
