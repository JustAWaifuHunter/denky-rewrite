import { CommandRunData, CommandStructure } from '../../utils/baseCommand';
import { SubCommandInterpreter } from '../../utils/subCommandInterpreter';

export default class PingCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'text';
		this.category = 'TEXT';
		this.config = {
			autoDefer: true,
			ephemeral: false,
		};
		this.perms = {
			bot: [],
			user: [],
		};
	}

	public override async run({ interaction }: CommandRunData) {
		new SubCommandInterpreter(interaction).run({
			type: 'common',
			switchs: [await import('./SubCommands/clapify'), await import('./SubCommands/emojify'), await import('./SubCommands/invert')],
		});
	}
}
