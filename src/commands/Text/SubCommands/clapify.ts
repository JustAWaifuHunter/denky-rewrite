import type { Descriptions } from '../../../modules/languages/Languages';
import type { CommandRunData } from '../../../utils/baseCommand';
import { SubCommandSwitcher } from '../../../utils/subCommandInterpreter';

export default class Clapify extends SubCommandSwitcher {
	override name = 'clapify';
	override parent = 'text';
	override description: keyof Descriptions = 'TEXT CLAPIFY';
	override async run({ interaction }: CommandRunData) {
		const text = interaction.options.getString('text');

		const clapText = text.split(' ').join('👏');
		await interaction.editReply(clapText);
	}
}
