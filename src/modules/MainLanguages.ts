import CommandLanguages from './languages/CommandLanguages';
import DescriptionLanguages from './languages/DescriptionLanguages';
import CategoriesLanguages from './languages/CategoriesLanguages';

export default class LanguageModule {
	commands: CommandLanguages;
	descriptions: DescriptionLanguages;
	categories: CategoriesLanguages;
	constructor() {
		client.languages = this;
		this.init();
	}

	init() {
		this.commands = new CommandLanguages();
		this.descriptions = new DescriptionLanguages();
		this.categories = new CategoriesLanguages();
	}
}