import { CommandStructure } from '../../utils/baseCommand';
import type { CommandInteraction } from 'discord.js';

export default class PingCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'ping';
		this.desc = 'CATEGORIES_UTILS';
		this.config = {
			autoDefer: true,
			ephemeral: false,
		};
	}

	public run(interaction: CommandInteraction): any {
		interaction.editReply('Pong!');
	}
}