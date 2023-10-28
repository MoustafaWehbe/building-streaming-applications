import 'dotenv/config';
import * as env from 'env-var';

export const BROKER_HOST = env.get('BROKER_HOST').required().asString();

export const BROKER_PORT = env.get('BROKER_PORT').default(9092).asPortNumber();

export const BORKER_CLIENT_ID = env.get('BROKER_PORT').required().asString();
