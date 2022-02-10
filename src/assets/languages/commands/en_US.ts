import type { User } from 'discord.js';

const data = {
	// Ping
	UTILS_PING: (u: User, wsPing: number, apiPing: number) => `🏓 ${u} **|** Pong!\n**WebSocket:** ${wsPing}ms\n**API Ping:** ${apiPing}ms`,

	// Quiz
	QUIZ_POINTS: 'Points',
	QUIZ_RIGHT_ANSWER: 'Right answer!',
	QUIZ_WRONG_ANSWER: 'Wrong answer!',
	QUIZ_IMG_CREDIT: 'Image credit',
	QUIZ_NO_ANSWER: 'You took too long to answer!',

	// Interactions
	PERMISSIONS_BOT_MISSING: (perms: string[]) => `I don't have the required permissions: ${perms.join(', ')}`,
	PERMISSIONS_USER_MISSING: (perms: string[]) => `You don't have the required permissions: ${perms.join(', ')}`,

	// Akinator
	MINIGAMES_AKINATOR_ALREADY_RUNNING(u: User) {
		return `❌ ${u} **|** You already have an Akinator game in progress.`;
	},
	MINIGAMES_AKINATOR_ERROR_STARTING(u: User) {
		return `❌ ${u} **|** There was an error starting the game.`;
	},
	MINIGAMES_AKINATOR_IDK(u: User) {
		return `I couldn't guess the character you thought!\nHow about trying again, ${u}?`;
	},
	MINIGAMES_AKINATOR_QUESTION: 'Question',
	MINIGAMES_AKINATOR_CHOOSE_ANSWER: 'Choose an answer',
	MINIGAMES_AKINATOR_STOP: 'Stop playing',
	MINIGAMES_AKINATOR_NOT_AUTHOR: '❌ | Only the command author can choose an answer.',
	MINIGAMES_AKINATOR_ANSWER_YES: 'Yes',
	MINIGAMES_AKINATOR_ANSWER_NO: 'No',
	MINIGAMES_AKINATOR_ANSWER_PROB_YES: 'Probably yes',
	MINIGAMES_AKINATOR_ANSWER_PROB_NO: 'Probably no',
	MINIGAMES_AKINATOR_ANSWER_IDK: "I don't know",
	MINIGAMES_AKINATOR_GAME_END: 'Game over!',
	MINIGAMES_AKINATOR_GAME_TIMEOUT: 'The time is over.',
	MINIGAMES_AKINATOR_IS_THIS_YOUR_CHAR: 'Is this your character?',
	MINIGAMES_AKINATOR_POSITION: 'Position',
	MINIGAMES_AKINATOR_SUCCESS: 'I was able to guess again! How about another game?',
	MINIGAMES_AKINATOR_COULDNOT_GUESS: "I couldn't guess. How about another game?",

	// AFK
	UTILS_AFK_ENABLED(u: User) {
		return `✅ ${u} **|** Now you are AFK.`;
	},
	UTILS_AFK_ALREADY_SET(u: User) {
		return `❌ ${u} **|** You are already AFK.`;
	},
	UTILS_AFK_NOT_AFK(u: User) {
		return `❌ ${u} **|** You are not AFK.`;
	},
	UTILS_AFK_REMOVED(u: User) {
		return `✅ ${u} **|** You are no longer AFK.`;
	},
	UTILS_AFK_AUTOREMOVED(u: User, time: number) {
		return `👋 ${u} **|** Welcome back, your AFK has been removed.\n⏰ **|** You stayed AFK <t:${time}:R>`;
	},
	UTILS_AFK_MENTIONED_AFK(u: User, time: number, reason?: string) {
		return `${u} got AFK <t:${time}:R>.\n_\`${reason ?? 'No reason given.'}\`_`;
	},

	// Mutes
	MOD_MUTE_NO_MEMBER: 'Unable to timeout the user as he is not on the server.',
	MOD_MUTE_OWNER: 'You cannot timeout the server owner.',
	MOD_MUTE_SELF: 'You cannot timeout yourself.',
	MOD_MUTE_SELF_CLIENT: 'I cannot timeout myself.',
	MOD_MUTE_INVALID_DURATION: `Unable to timeout the user, possibly:
- **Your answer is not a valid time**;
- **The time entered is greater than 1 year**;
- **The time entered is less than 30 seconds**;
- **The date entered is already in the past**.`,
	MOD_MUTE_SUCCESS: 'User timedout successfully.',
	MOD_MUTE_FAIL: 'Unable to timeout the user.',
	MOD_CANNOT_PUNISH_ROLES_HIGH: "I cannot punish this user, as my highest role is below or in the same role as the member's highest role.",
	MOD_CANNOT_PUNISH_ROLES_LOW: "You cannot punish this user, as their highest rank is below or in the same rank as the member's highest rank.",
};

export { data };
