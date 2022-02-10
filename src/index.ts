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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.o_O = (..._args: any) => undefined;

client.login(process.env.BOT_TOKEN);

// We should set this, so tasks don't duplicade (giveaways, reminders, etc)
if (client.shard.ids[0] === 0) global.IS_MAIN_PROCESS = true;

new Initializer();
