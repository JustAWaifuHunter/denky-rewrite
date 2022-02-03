/* eslint-disable no-var */
export { };

import type { Client, Collection } from 'discord.js';

export interface DenkyClient extends Client {
	commands?: Collection<string, any>;
	languages?: LanguageModule;
}

declare global {
	var client: DenkyClient;
}