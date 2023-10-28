import { Kafka } from 'kafkajs';

import { BORKER_CLIENT_ID, BROKER_HOST, BROKER_PORT } from './env';

export const kafka = new Kafka({
  clientId: BORKER_CLIENT_ID,
  brokers: [`${BROKER_HOST}:${BROKER_PORT}`],
});
