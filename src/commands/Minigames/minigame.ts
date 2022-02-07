import { CommandStructure, CommandRunData } from '../../utils/baseCommand';

export default class MinigameCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'minigame';
		this.config = {
			autoDefer: true,
			ephemeral: false,
			showInHelp: false,
		};
		this.perms = {
			bot: [],
			user: [],
		};
	}

	public run({ interaction, t }: CommandRunData) {
		switch (interaction.options.getSubcommand()) {
		case 'quiz':
			client.commands?.get('minigame quiz')?.run({ interaction, t });
			break;
		}

	}
}