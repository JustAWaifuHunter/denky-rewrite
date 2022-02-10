import type { Descriptions } from '../../../modules/languages/Languages';
import type { CommandRunData } from '../../../utils/baseCommand';
import { SubCommandSwitcher } from '../../../utils/subCommandInterpreter';

export default class Invert extends SubCommandSwitcher {
	override name = 'vaporwave';
	override parent = 'text';
	override description: keyof Descriptions = 'TEXT VAPORWAVE';
	override async run({ interaction }: CommandRunData) {
		const text = interaction.options.getString('text');

		const vapeText = text
			.split('')
			.map(str => {
				const char = str.charCodeAt(0);

				return char >= 33 && char <= 126 ? String.fromCharCode(char - 33 + 65_281) : char;
			})
			.join('');

		await interaction.editReply(vapeText);
	}
}
