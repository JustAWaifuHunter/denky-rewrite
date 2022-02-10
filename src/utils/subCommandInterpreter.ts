/* eslint-disable new-cap */
import type { ChatInputCommandInteraction } from 'discord.js';
import type { Commands, Descriptions } from '../modules/languages/Languages';
import type { CommandRunData } from './baseCommand';

const subCommandCache = client.subCommands;

abstract class SubCommandSwitcher {
	name: string;
	description: keyof Descriptions;
	parent: string;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	run(_data: CommandRunData) {
		// Empty comment
	}
}

interface InterpreterOptions {
	type: 'group' | 'common';
	switchs: ({ name: string; description: keyof Descriptions; parent: string; run: (_data: CommandRunData) => void } | { default: new () => SubCommandSwitcher })[];
}

class SubCommandInterpreter {
	readonly command: ChatInputCommandInteraction;
	constructor(command: ChatInputCommandInteraction) {
		this.command = command;
	}

	run(options: InterpreterOptions) {
		const subCommandName = this.command.options.getSubcommand();

		const translate = (key: keyof Commands, ...args: any): string => {
			return client.languages.commands.t(key, this.command.locale.replace('-', '_'), ...args);
		};

		const Switcher = options.switchs.find(s => ('default' in s ? new s.default().name === subCommandName : s.name === subCommandName));
		const cacheName = `${this.command.commandName} ${options.type === 'group' ? this.command.options.getSubcommandGroup() : ''} ${subCommandName}`;

		if (Switcher) {
			const subCommand: SubCommandSwitcher = subCommandCache.get(cacheName) ?? ('default' in Switcher ? new Switcher.default() : Switcher);

			subCommand.run({ interaction: this.command, t: translate });

			if (!subCommandCache.has(cacheName)) subCommandCache.set(cacheName, subCommand);
		}
	}
}

export { SubCommandInterpreter, SubCommandSwitcher };
