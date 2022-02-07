import type { User } from 'discord.js';

const data = {
	UTILS_PING: (u: User, wsPing: number, apiPing: number) => `🏓 ${u} **|** Pong!\n**WebSocket:** ${wsPing}ms\n**API Ping:** ${apiPing}ms`,
	QUIZ_POINTS: 'Points',
	QUIZ_RIGHT_ANSWER: 'Right answer!',
	QUIZ_WRONG_ANSWER: 'Wrong answer!',
};

export { data };