import { CommandStructure, CommandRunData } from '../../utils/baseCommand';

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

	public run({ interaction, t }: CommandRunData): any {
		interaction.editReply(t('TEST'));
	}
}