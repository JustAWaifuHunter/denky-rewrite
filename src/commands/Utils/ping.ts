import { CommandStructure, CommandRunData } from '../../utils/baseCommand';

export default class PingCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'ping';
		this.config = {
			autoDefer: true,
			ephemeral: false,
		};
		this.perms = {
			bot: [],
			user: [],
		};
	}

	public async run({ interaction, t }: CommandRunData) {
		const start = Date.now();
		await interaction.editReply('🤔');
		const apiPing = Date.now() - start;
		interaction.editReply(`${t('UTILS_PING', interaction.user, Math.round(client.ws.ping), apiPing)}`);
	}
}