/* eslint-disable no-var */
export { };

import type { Client, Collection } from 'discord.js';
import DescriptionLanguages from './modules/languages/DescriptionLanguages';
import CommandLanguages from './modules/languages/CommandLanguages';

export interface Language {
	commands: CommandLanguages;
	descriptions: DescriptionLanguages;
}

export interface DenkyClient extends Client {
	commands?: Collection<string, any>;
	languages?: Language;
}

declare global {
	var client: DenkyClient;
}