import { CommandRunData, CommandStructure } from '../../utils/baseCommand';
import { SubCommandInterpreter } from '../../utils/subCommandInterpreter';

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

	public override async run({ interaction }: CommandRunData) {
		new SubCommandInterpreter(interaction).run({
			type: 'common',
			switchs: [await import('./SubCommands/quiz'), await import('./SubCommands/akinator')],
		});
	}
}
