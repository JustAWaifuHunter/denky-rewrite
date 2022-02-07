import { data as data_pt_BR } from '../../assets/languages/commands/pt_BR';
import { data as data_en_US } from '../../assets/languages/commands/en_US';

type ResponseType = string | ((...options: any) => string)

export default class CommandLanguages {
	pt_BR: typeof data_pt_BR;
	en_US: typeof data_en_US;
	constructor() {
		this.init();
	}

	init() {
		this.pt_BR = data_pt_BR;
		this.en_US = data_en_US;
	}

	t(string: string, lang: string, ...args: any): string {
		let res: ResponseType = '';
		switch (lang) {
		case 'pt_BR':
			res = data_pt_BR[string];
			break;
		case 'en_US':
			res = data_en_US[string] || data_pt_BR[string];
			break;
		default:
			res = data_pt_BR[string];
			break;
		}

		if (typeof res === 'function') {
			return res(...args) || `!{${lang}.${string}}!`;
		}

		return res || `!{${lang}.${string}}!`;
	}
}