/* eslint-disable no-await-in-loop */
import { Collection } from 'discord.js';
import { readdir } from 'fs/promises';

class Initializer {
	constructor() {
		console.log('[DENKY] Starting bot...');
		this.init();
	}

	public async init() {
		await this.loadModules();
		await this.loadCommands();
		await this.loadEvents();
	}

	async loadCommands() {
		client.commands = new Collection();
		const categories = await readdir('./commands/');
		for (const category of categories) {
			const commands = await readdir(`./commands/${category}`);
			for (const command of commands) {
				if (!command.endsWith('.js')) continue;
				const { default: BaseCommand } = await import(`../commands/${category}/${command}`);
				const Command = new BaseCommand();
				client.commands.set(Command.name, Command);
				console.log(`[DENKY] Loaded command: ${Command.name}`);
			}
		}
	}

	async loadEvents() {
		const events = await readdir('./events/');
		for (const event of events) {
			if (!event.endsWith('.js')) continue;
			const name = event.replace('.js', '');
			const { default: BaseEvent } = await import(`../events/${event}`);
			client.on(name, BaseEvent.run);
			console.log(`[DENKY] Loaded event: ${name}`);
		}
	}

	async loadModules() {
		const modules = await readdir('./modules/');
		for (const module of modules) {
			if (!module.endsWith('.js')) continue;
			const name = module.replace('.js', '');
			const { default: BaseModule } = await import(`../modules/${module}`);

			// Some modules are classes and some are functions.
			try {
				new BaseModule();
			} catch {
				BaseModule();
			}
			console.log(`[DENKY] Loaded module: ${name}`);
		}
	}
}

export { Initializer };
