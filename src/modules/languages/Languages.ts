type ResponseType = string | ((...options: unknown[]) => string)

const defaultSymbol = Symbol('default');

export default class Languages<D extends string, L> {
	[x: string]: any;
	[defaultSymbol]: D;

	constructor(data?: [string, L][], defaultLang?: D) {
		if (data && defaultLang) this.init(data, defaultLang);
	}

	init(data: [string, L][], defaultLang: D): this {
		for (const d of data) {
			this[d[0]] = d[1];
		}

		this[defaultSymbol] = defaultLang;

		return this;
	}

	t(string: string, lang: string, ...args: any): string {
		let res: ResponseType = '';
		res = this[lang][string] || this[this[defaultSymbol]][string];

    	if (typeof res === 'function') {
    		return res(...args) || `!{${lang}.${string}}!`;
    	}

    	return res || `!{${lang}.${string}}!`;
	}
}

import type { data as descriptions_pt_BR } from '../../assets/languages/descriptions/pt_BR';
import type { data as descriptions_en_US } from '../../assets/languages/descriptions/en_US';
import type { data as categories_pt_BR } from '../../assets/languages/categories/pt_BR';
import type { data as categories_en_US } from '../../assets/languages/categories/en_US';
import type { data as commands_pt_BR } from '../../assets/languages/commands/pt_BR';
import type { data as commands_en_US } from '../../assets/languages/commands/en_US';

export type Commands = typeof commands_pt_BR & typeof commands_en_US;
export type Descriptions = typeof descriptions_pt_BR & typeof descriptions_en_US;
export type Categories = typeof categories_pt_BR & typeof categories_en_US;