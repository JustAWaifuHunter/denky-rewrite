import CommandLanguages from './languages/CommandLanguages';
import DescriptionLanguages from './languages/DescriptionLanguages';

export default class LanguageModule {
	commands: CommandLanguages;
	descriptions: DescriptionLanguages;
	constructor() {
		client.languages = this;
		this.init();
	}

	init() {
		this.commands = new CommandLanguages();
		this.descriptions = new DescriptionLanguages();
	}
}