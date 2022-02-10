import type { CommandRunData } from '../../../utils/baseCommand';
import { SubCommandSwitcher } from '../../../utils/subCommandInterpreter';

export default class Invert extends SubCommandSwitcher {
	override name = 'invert';
	override async run({ interaction }: CommandRunData) {
		const text = interaction.options.getString('text');

		const invertText = text.split('').reverse().join('');
		await interaction.editReply(invertText);
	}
}
