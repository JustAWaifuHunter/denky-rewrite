import type { PermissionResolvable, ChatInputCommandInteraction } from 'discord.js';
import type { Commands } from '../modules/languages/Languages';

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
	t: (key: keyof Commands, ...args: unknown[]) => string;
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public run(_data: CommandRunData, ..._additional: any): void {
		// Empty comment
	}
}