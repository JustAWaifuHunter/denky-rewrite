import type { User } from 'discord.js';

const data = {
	// Ping
	UTILS_PING: (u: User, wsPing: number, apiPing: number) => `🏓 ${u} **|** Pong!\n**WebSocket:** ${wsPing}ms\n**API Ping:** ${apiPing}ms`,

	// Quiz
	QUIZ_POINTS: 'Pontos',
	QUIZ_RIGHT_ANSWER: 'Resposta correta!',
	QUIZ_WRONG_ANSWER: 'Resposta errada!',
	QUIZ_IMG_CREDIT: 'Crédito da imagem',
	QUIZ_NO_ANSWER: 'Você demorou para responder!',

	// Interactions
	PERMISSIONS_BOT_MISSING: (perms: string[]) => `Eu não tenho as permissões necessárias: ${perms.join(', ')}`,
	PERMISSIONS_USER_MISSING: (perms: string[]) => `Você não tem as permissões necessárias: ${perms.join(', ')}`,

	// Akinator
	MINIGAMES_AKINATOR_ALREADY_RUNNING(u: User) {
		return `❌ ${u} **|** Você já possui um jogo de Akinator em andamento.`;
	},
	MINIGAMES_AKINATOR_ERROR_STARTING(u: User) {
		return `❌ ${u} **|** Ocorreu um erro ao iniciar a partida.`;
	},
	MINIGAMES_AKINATOR_IDK(u: User) {
		return `Não consegui advinhar o personagem que você pensou!\nQue tal tentar novamente, ${u}?`;
	},
	MINIGAMES_AKINATOR_QUESTION: 'Pergunta',
	MINIGAMES_AKINATOR_CHOOSE_ANSWER: 'Escolha uma resposta',
	MINIGAMES_AKINATOR_STOP: 'Parar de jogar',
	MINIGAMES_AKINATOR_NOT_AUTHOR: '❌ | Apenas o autor do comando pode escolher uma opção.',
	MINIGAMES_AKINATOR_ANSWER_YES: 'Sim',
	MINIGAMES_AKINATOR_ANSWER_NO: 'Não',
	MINIGAMES_AKINATOR_ANSWER_PROB_YES: 'Provavelmente sim',
	MINIGAMES_AKINATOR_ANSWER_PROB_NO: 'Provavelmente não',
	MINIGAMES_AKINATOR_ANSWER_IDK: 'Não sei',
	MINIGAMES_AKINATOR_GAME_END: 'O jogo acabou!',
	MINIGAMES_AKINATOR_GAME_TIMEOUT: 'O tempo acabou.',
	MINIGAMES_AKINATOR_IS_THIS_YOUR_CHAR: 'Este é o seu personagem?',
	MINIGAMES_AKINATOR_POSITION: 'Posição',
	MINIGAMES_AKINATOR_SUCCESS: 'Consegui advinhar novamente! Que tal outra partida?',
	MINIGAMES_AKINATOR_COULDNOT_GUESS: 'Não consegui advinhar. Que tal outra partida?',

	// AFK
	UTILS_AFK_ENABLED(u: User) {
		return `✅ ${u} **|** Agora você está ausente.`;
	},
	UTILS_AFK_ALREADY_SET(u: User) {
		return `❌ ${u} **|** Você já está ausente.`;
	},
	UTILS_AFK_NOT_AFK(u: User) {
		return `❌ ${u} **|** Você não está ausente.`;
	},
	UTILS_AFK_REMOVED(u: User) {
		return `✅ ${u} **|** Você não está mais ausente.`;
	},
	UTILS_AFK_AUTOREMOVED(u: User, time: number) {
		return `👋 ${u} **|** Bem-vindo novamente, seu AFK foi removido.\n⏰ **|** Você ficou ausente <t:${time}:R>`;
	},
	UTILS_AFK_MENTIONED_AFK(u: User, time: number, reason?: string) {
		return `${u} ficou ausente <t:${time}:R>.\n_\`${reason ?? 'Sem motivo informado.'}\`_`;
	},
};

export { data };