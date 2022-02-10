/* eslint-disable no-await-in-loop */
import { readdir } from 'fs/promises';

class Initializer {
	constructor() {
		if (global.IS_MAIN_PROCESS) console.log('[DENKY] Starting bot...');
		this.init();
	}

	public async init() {
		await this.loadModules();
		await this.loadCommands();
		await this.loadEvents();
	}

	async loadCommands() {
		client.commands = new Map();
		client.subCommands = new Map();
		const categories = await readdir('./commands/');
		for (const category of categories) {
			const commands = await readdir(`./commands/${category}`);
			for (const command of commands) {
				if (!command.endsWith('.js')) continue;
				const { default: BaseCommand } = await import(`../commands/${category}/${command}`);
				const Command = new BaseCommand();
				client.commands.set(Command.name, Command);
				if (global.IS_MAIN_PROCESS) {
					console.log(`[DENKY] Loaded command: ${Command.name}`);
				}
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
			if (global.IS_MAIN_PROCESS) {
				console.log(`[DENKY] Loaded event: ${name}`);
			}
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
			} catch (e) {
				if (global.IS_MAIN_PROCESS) {
					console.log(`Could not load module ${name}`, e);
				}
				// eslint-disable-next-line new-cap
				BaseModule();
			}
			if (global.IS_MAIN_PROCESS) {
				console.log(`[DENKY] Loaded module: ${name}`);
			}
		}
	}
}

export { Initializer };
