import type { CommandInteraction } from 'discord.js';

export default class InteractionCreateEvent extends null {
	public static async run(interaction: CommandInteraction) {
		if (!interaction.isCommand()) return;
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		if (command.config.autoDefer) await interaction.deferReply({ ephemeral: command.config.ephemeral });
		command.run(interaction);
	}
}