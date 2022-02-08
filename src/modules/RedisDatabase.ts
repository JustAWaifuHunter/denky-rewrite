import { createClient, RedisClientType } from 'redis';

export default class RedisDatabase {
	client: RedisClientType<any, any>;
	constructor() {
		client.db = this;
		this.client = this._createClient();
	}

	set(key: string, value: any) {
		if (typeof value !== 'string') value = JSON.stringify(value);
		return this.client.set(key, value);
	}

	async get(key: string) {
		return JSON.parse(await this.client.get(key));
	}

	delete(key: string) {
		return this.client.del(key);
	}

	keyArray() {
		return this.client.keys('*');
	}

	_createClient() {
		const client = createClient({
			url: process.env.REDIS_URL,
		});
		client.connect();
		return client;
	}
}
