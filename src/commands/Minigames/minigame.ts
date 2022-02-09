import { CommandRunData, CommandStructure } from '../../utils/baseCommand';

export default class MinigameCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'minigame';
		this.category = 'MINIGAMES';
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

	public override run({ interaction, t }: CommandRunData) {
		switch (interaction.options.getSubcommand()) {
			case 'quiz':
				client.commands?.get('minigame quiz')?.run({ interaction, t });
				break;
			case 'akinator':
				client.commands?.get('minigame akinator')?.run({ interaction, t });
				break;
		}
	}
}
