import { kafka } from '../utils/broker-client';
import { processedHealthDataTopic } from '../utils/consts';
import { ProcessedDataPayload } from '../utils/types';

export async function sendEvent(
  payload: ProcessedDataPayload & { result: string }
) {
  try {
    const producer = kafka.producer();
    await producer.connect();
    const result = await producer.send({
      topic: processedHealthDataTopic,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });
    console.log(
      `Message ${JSON.stringify(payload)} sent successfully to topic ${
        result[0].topicName
      }`
    );
    await producer.disconnect();
  } catch (error) {
    console.error(`An error occured ${error}`);
  }
}
