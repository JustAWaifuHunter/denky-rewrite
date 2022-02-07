import type { Interaction } from 'discord.js';
import type { Commands } from '../modules/languages/Languages';
import type { CommandRunData } from '../utils/baseCommand';

export default class InteractionCreateEvent extends null {
	public static async run(interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;
		if (command.config.autoDefer) await interaction.deferReply({ ephemeral: command.config.ephemeral });

		const translate = (key: keyof Commands, ...args: any): string => {
			return client.languages.commands.t(key, interaction.locale.replace('-', '_'), ...args);
		};

		command.run({ interaction, t: translate } as CommandRunData);
	}
}