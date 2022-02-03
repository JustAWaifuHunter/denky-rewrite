import { Client, Intents } from 'discord.js';
import env from 'dotenv';
import type { DenkyClient } from './index.d';
import { Initializer } from './utils/initializer';

env.config({ path: '../.env' });

const client: DenkyClient = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
	failIfNotExists: false,
	allowedMentions: {
		repliedUser: true,
		parse: ['users'],
	},
	retryLimit: 2,
});

global.client = client;

client.login(process.env.BOT_TOKEN);

new Initializer();
