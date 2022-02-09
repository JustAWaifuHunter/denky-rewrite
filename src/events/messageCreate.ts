import type { Message } from 'discord.js';
import type { Commands } from '../modules/languages/Languages';

type TranslateFunction = (key: keyof Commands, ...args: any) => string;

export default class MessageCreateEvent extends null {
	static run(message: Message) {
		const translate: TranslateFunction = (key, ...args) => {
			return client.languages.commands.t(key, message.guild.preferredLocale.replace('-', '_'), ...args);
		};

		MessageCreateEvent.verifyAFK(message, translate);
		MessageCreateEvent.verifyAFKMention(message, translate);
	}

	static async verifyAFK(message: Message, translate: TranslateFunction) {
		const data = await client.db.get(`afk${message.author.id}`);
		if (!data) return;

		client.db.delete(message.author.id);
		// eslint-disable-next-line no-empty-function
		message.member.setNickname(data.o).catch(() => {});
		return message.reply(translate('UTILS_AFK_AUTOREMOVED', message.author, data.t)).then(msg => setTimeout(msg.delete, 5000));
	}

	static async verifyAFKMention(message: Message, translate: TranslateFunction) {
		if (message.mentions.users.size === 0) return;
		for await (const user of message.mentions.users.values()) {
			const data = await client.db.get(user.id);
			if (!data) return;
			message.reply(translate('UTILS_AFK_MENTIONED_AFK', user, data.t, data.m)).then(msg => setTimeout(msg.delete, 5000));
		}
	}
}