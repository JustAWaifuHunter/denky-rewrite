export interface CommandConfiguration {
	autoDefer?: boolean;
	ephemeral?: boolean;
}

export class CommandStructure {
	name: string;
	desc: string;
	config: CommandConfiguration;
}