import type { CommandInteraction, GuildMember, Interaction } from 'discord.js';
import type { Commands } from '../modules/languages/Languages';
import type { CommandRunData, CommandStructure } from '../utils/baseCommand';

export type TranslationArguments = (key: keyof Commands, ...args: any) => string;

export default class InteractionCreateEvent extends null {
	public static async run(interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		const translate = (key: keyof Commands, ...args: any): string => {
			return client.languages.commands.t(key, interaction.locale.replace('-', '_'), ...args);
		};

		if (!InteractionCreateEvent._checkBotPermissions(interaction, command, translate)) return;
		if (!InteractionCreateEvent._checkMemberPermissions(interaction, command, translate)) return;

		if (command.config.autoDefer) await interaction.deferReply({ ephemeral: command.config.ephemeral });

		return command.run({ interaction, t: translate } as CommandRunData);
	}

	static _checkBotPermissions(interaction: CommandInteraction, command: CommandStructure, translate: TranslationArguments): boolean {
		if (command.perms.bot.length === 0) return true;
		if (!interaction.guild.me.permissions.has(command.perms.bot)) {
			interaction.reply({ content: `❌ ${interaction.user} **|** ${translate('PERMISSIONS_BOT_MISSING', command.perms.bot)}`, ephemeral: true });
			return false;
		}
		return true;
	}

	static _checkMemberPermissions(interaction: CommandInteraction, command: CommandStructure, translate: TranslationArguments): boolean {
		if (command.perms.user.length === 0) return true;
		if (!(interaction.member as GuildMember).permissions.has(command.perms.user)) {
			interaction.reply({ content: `❌ ${interaction.user} **|** ${translate('PERMISSIONS_USER_MISSING', command.perms.user)}`, ephemeral: true });
			return false;
		}
		return true;
	}
}
