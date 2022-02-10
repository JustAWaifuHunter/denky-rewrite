/* eslint-disable no-empty-function */
import type { GuildMember } from 'discord.js';
import { CommandRunData, CommandStructure } from '../../utils/baseCommand';

export default class PingCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'afk on | off';
		this.category = 'UTILS';
		this.config = {
			autoDefer: true,
			ephemeral: false,
		};
		this.perms = {
			bot: ['ManageNicknames'],
			user: [],
		};
	}

	public override async run({ interaction, t }: CommandRunData) {
		switch (interaction.options.getSubcommand()) {
			case 'on': {
				if (await client.db.get(`afk${interaction.user.id}`)) {
					interaction.editReply(t('UTILS_AFK_ALREADY_SET', interaction.user));
					break;
				}

				await client.db.set(`afk${interaction.user.id}`, {
					g: interaction.guild.id,
					m: interaction.options.getString('reason'),
					o: (interaction.member as GuildMember).nickname as string,
					t: Math.round(Date.now() / 1000),
				});

				const nome = (interaction.member as GuildMember).nickname || interaction.user.username;

				(interaction.member as GuildMember).setNickname(`[AFK] ${nome.slice(0, 19)}`, 'AFK').catch(o_O);
				interaction.editReply(t('UTILS_AFK_ENABLED', interaction.user));

				break;
			}

			case 'off': {
				const data = await client.db.get(`afk${interaction.user.id}`);
				if (!data) {
					interaction.editReply(t('UTILS_AFK_NOT_AFK', interaction.user));
					break;
				}

				await client.db.delete(`afk${interaction.user.id}`);
				(interaction.member as GuildMember).setNickname(data.o).catch(o_O);
				interaction.editReply(t('UTILS_AFK_REMOVED', interaction.user));
				break;
			}
		}
	}
}
