import type { PermissionResolvable, CommandInteraction } from 'discord.js';

export interface CommandPermissions {
	bot: PermissionResolvable[];
	user: PermissionResolvable[];
}

export interface CommandConfiguration {
	autoDefer?: boolean;
	ephemeral?: boolean;
	showInHelp?: boolean;
}

export interface CommandRunData {
	interaction: CommandInteraction;
	t: (key: string, ...args: any) => string;
}

export class CommandStructure {
	name: string;
	config: Partial<CommandConfiguration>;
	perms: CommandPermissions;
	constructor() {
		this.name = '';
		this.config = {
			autoDefer: true,
			ephemeral: false,
			showInHelp: true,
		};
		this.perms = {
			bot: [],
			user: [],
		};
	}
}