import type { CommandInteraction } from 'discord.js';

export interface CommandConfiguration {
	autoDefer?: boolean;
	ephemeral?: boolean;
}

export interface CommandRunData {
	interaction: CommandInteraction;
	t: (key: string, ...args: any) => string;
}

export class CommandStructure {
	name: string;
	desc: string;
	config: CommandConfiguration;
	constructor() {
		this.name = '';
		this.desc = '';
		this.config = {
			autoDefer: true,
			ephemeral: false,
		};
	}
}