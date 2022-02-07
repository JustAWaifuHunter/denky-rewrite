import { data as descriptions_pt_BR } from './assets/languages/descriptions/pt_BR';
import { data as descriptions_en_US } from './assets/languages/descriptions/en_US';
import { data as categories_pt_BR } from './assets/languages/categories/pt_BR';
import { data as categories_en_US } from './assets/languages/categories/en_US';
import { data as commands_pt_BR } from './assets/languages/commands/pt_BR';
import { data as commands_en_US } from './assets/languages/commands/en_US';

import type { Client, Collection } from 'discord.js';
import Languages from './modules/languages/Languages';

interface LangExtender <T> {
	pt_BR: T;
	en_US: T;
	t: (string: keyof T, lang: 'pt_BR' | 'en_US', ...args: Array<string>) => string;
}

export type Commands = typeof commands_pt_BR & typeof commands_en_US;
export type Descriptions = typeof descriptions_pt_BR & typeof descriptions_en_US;
export type Categories = typeof categories_pt_BR & typeof categories_en_US;

export interface Language {
	commands: Languages<'pt_BR', Commands> & LangExtender<Commands>;
	descriptions: Languages<'pt_BR', Descriptions> & LangExtender<Descriptions>;
	categories: Languages<'pt_BR', Categories> & LangExtender<Categories>;
}

export interface DenkyClient extends Client {
	commands?: Collection<string, any>;
	languages?: Language;
}

declare global {
	// eslint-disable-next-line no-var
	var client: DenkyClient;
}