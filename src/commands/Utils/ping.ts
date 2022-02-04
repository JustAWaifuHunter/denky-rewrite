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

	public run({ interaction, t }: CommandRunData) {
		const teste = interaction.locale.replace('-', '_');
		console.log(teste, client.languages?.descriptions.t('PING', teste));
		interaction.editReply(client.languages?.descriptions.t('PING', teste));
		// Const start = Date.now();
		// await interaction.editReply('🤔');
		// const apiPing = Date.now() - start;
		// interaction.editReply(`${t('UTILS_PING', interaction.user, Math.round(client.ws.ping), apiPing)}`);
	}
}