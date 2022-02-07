import type { PermissionResolvable, ChatInputCommandInteraction } from 'discord.js';

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
	interaction: ChatInputCommandInteraction;
	t: (key: string, ...args: any) => string;
}

export class CommandStructure {
	name: string;
	category: string;
	config: Partial<CommandConfiguration>;
	perms: CommandPermissions;
	constructor() {
		this.name = '';
		this.category = '';
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