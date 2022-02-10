import type { Descriptions } from '../../../modules/languages/Languages';
import type { CommandRunData } from '../../../utils/baseCommand';
import { SubCommandSwitcher } from '../../../utils/subCommandInterpreter';

export default class Invert extends SubCommandSwitcher {
	override name = 'invert';
	override parent = 'text';
	override description: keyof Descriptions = 'TEXT INVERT';
	override async run({ interaction }: CommandRunData) {
		const text = interaction.options.getString('text');

		const invertText = text.split('').reverse().join('');
		await interaction.editReply(invertText);
	}
}
