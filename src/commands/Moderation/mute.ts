import type { GuildMember, GuildMemberRoleManager } from 'discord.js';
import { CommandRunData, CommandStructure } from '../../utils/baseCommand';
import dateParser from '../../utils/dateParser';

export default class MuteCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'mute';
		this.category = 'MODERATION';
		this.config = {
			autoDefer: true,
			ephemeral: false,
		};
		this.perms = {
			bot: ['ModerateMembers'],
			user: ['ModerateMembers'],
		};
	}

	public override run({ interaction, t }: CommandRunData) {
		const member = interaction.options.getMember('user') as GuildMember;
		if (!member) return interaction.editReply(`❌ ${interaction.user} **|** ${t('MOD_MUTE_NO_MEMBER')}`);

		if (member.user.id === client.user.id) return interaction.editReply(`❌ ${interaction.user} **|** ${t('MOD_MUTE_SELF_CLIENT')}`);
		if (member.user.id === interaction.user.id) return interaction.editReply(`❌ ${interaction.user} **|** ${t('MOD_MUTE_SELF')}`);
		if (member.user.id === interaction.guild.ownerId) return interaction.editReply(`❌ ${interaction.user} **|** ${t('MOD_MUTE_OWNER')}`);

		if (interaction.guild.ownerId !== interaction.user.id) {
			if (member.roles.highest?.position >= interaction.guild.me.roles.highest?.position) {
				return interaction.editReply(`❌ ${interaction.user} **|** ${t('MOD_CANNOT_PUNISH_ROLES_HIGH')}`);
			}
			if (!member.moderatable) {
				return interaction.editReply(`❌ ${interaction.user} **|** ${t('MOD_CANNOT_PUNISH_ROLES_HIGH')}`);
			}
			if ((interaction.member.roles as GuildMemberRoleManager).highest.position <= member.roles.highest?.position) {
				return interaction.editReply(`❌ ${interaction.user} **|** ${t('MOD_CANNOT_PUNISH_ROLES_LOW')}`);
			}
		}

		const duration = interaction.options.getString('duration') as string;
		let parsedDate: number | null;
		try {
			parsedDate = dateParser.parse(duration);
		} catch {
			return interaction.editReply(`❌ ${interaction.user} **|** ${t('MOD_MUTE_INVALID_DURATION')}`);
		}

		member
			.disableCommunicationUntil(Date.now() + parsedDate, `Applied by ${interaction.user.tag}`)
			.then(() => interaction.editReply(`✅ ${interaction.user} **|** ${t('MOD_MUTE_SUCCESS')}`))
			.catch(() => interaction.editReply(`❌ ${interaction.user} **|** ${t('MOD_MUTE_FAIL')}`));
	}
}
