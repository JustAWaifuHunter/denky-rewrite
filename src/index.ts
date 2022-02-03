import { Client, GatewayIntentBits } from 'discord.js';
import env from 'dotenv';
import type { DenkyClient } from './index.d';
import { Initializer } from './utils/initializer';

env.config({ path: '../.env' });

const client: DenkyClient = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
	failIfNotExists: false,
	allowedMentions: {
		repliedUser: true,
		parse: ['users'],
	},
	rest: {
		retries: 3,
	},
});

global.client = client;

client.login(process.env.BOT_TOKEN);

new Initializer();
