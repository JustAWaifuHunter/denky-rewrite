import type { User } from 'discord.js';

const data = {
	UTILS_PING: (u: User, wsPing: number, apiPing: number) => `🏓 ${u} **|** Pong!\n**WebSocket:** ${wsPing}ms\n**API Ping:** ${apiPing}ms`,
	QUIZ_POINTS: 'Pontos',
	QUIZ_RIGHT_ANSWER: 'Resposta correta!',
	QUIZ_WRONG_ANSWER: 'Resposta errada!',
	QUIZ_IMG_CREDIT: 'Crédito da imagem',
	QUIZ_NO_ANSWER: 'Você demorou para responder!',
};

export { data };