import type { Descriptions } from '../../../modules/languages/Languages';
import type { CommandRunData } from '../../../utils/baseCommand';
import { SubCommandSwitcher } from '../../../utils/subCommandInterpreter';

export default class Emojify extends SubCommandSwitcher {
	override name = 'emojify';
	override parent = 'text';
	override description: keyof Descriptions = 'TEXT EMOJIFY';
	override async run({ interaction }: CommandRunData) {
		const ignored = [' ', '!', '?', '%', '$', '&', '#', '@', '*', '-', '+'];

		const text = interaction.options.getString('text');
		let emojiText = text
			.split('')
			.map(str => (ignored.includes(str) ? str : `:regional_indicator_${str}:`))
			.join('')
			.replaceAll('!', '❗')
			.replaceAll('?', '❓')
			.replaceAll('$', '💲')
			.replaceAll('-', '➖')
			.replaceAll('+', '➕');

		for (const i of ignored) {
			emojiText = emojiText.replaceAll(i, '');
		}

		await interaction.editReply(emojiText);
	}
}
