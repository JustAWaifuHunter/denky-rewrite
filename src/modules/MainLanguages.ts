import { data as categories_en_US } from '../assets/languages/categories/en_US';
import { data as categories_pt_BR } from '../assets/languages/categories/pt_BR';
import { data as commands_en_US } from '../assets/languages/commands/en_US';
import { data as commands_pt_BR } from '../assets/languages/commands/pt_BR';
import { data as descriptions_en_US } from '../assets/languages/descriptions/en_US';
import { data as descriptions_pt_BR } from '../assets/languages/descriptions/pt_BR';
import Languages from './languages/Languages';

interface LangExtender<T> {
	pt_BR: T;
	en_US: T;
	t: (string: keyof T, lang: 'pt_BR' | 'en_US', ...args: string[]) => string;
}

type Commands = typeof commands_pt_BR & typeof commands_en_US;
type Descriptions = typeof descriptions_pt_BR & typeof descriptions_en_US;
type Categories = typeof categories_pt_BR & typeof categories_en_US;

export default class LanguageModule {
	commands: Languages<'pt_BR', Commands> & LangExtender<Commands>;
	descriptions: Languages<'pt_BR', Descriptions> & LangExtender<Descriptions>;
	categories: Languages<'pt_BR', Categories> & LangExtender<Categories>;
	constructor() {
		client.languages = this;
		this.init();
	}

	init() {
		this.commands = new Languages(
			[
				['pt_BR', commands_pt_BR],
				['en_US', commands_en_US],
			],
			'pt_BR',
		) as Languages<'pt_BR', Commands> & LangExtender<Commands>;
		this.descriptions = new Languages(
			[
				['pt_BR', descriptions_pt_BR],
				['en_US', descriptions_en_US],
			],
			'pt_BR',
		) as Languages<'pt_BR', Descriptions> & LangExtender<Descriptions>;
		this.categories = new Languages(
			[
				['pt_BR', categories_pt_BR],
				['en_US', categories_en_US],
			],
			'pt_BR',
		) as Languages<'pt_BR', Categories> & LangExtender<Categories>;
	}
}
