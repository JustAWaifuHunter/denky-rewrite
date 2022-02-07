import { CommandStructure, CommandRunData } from '../../utils/baseCommand';
import { ActionRow, ButtonComponent, ButtonStyle, Embed, Message } from 'discord.js';

type ValidCategories = 'technology' | 'astronomy' | 'geography' | 'random';
const categories: ValidCategories[] = ['technology', 'astronomy', 'geography', 'random'];

interface AnswersStructure {
    name: string;
    correct?: boolean;
}

interface QuestionStrucutre {
    title: string;
    answers: AnswersStructure[];
}

// Quiz data
import AstronomyData from '../../assets/quiz/astronomy.json';
import GeographyData from '../../assets/quiz/geography.json';
import TechData from '../../assets/quiz/tech.json';

export default class MinigameCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'minigame quiz';
		this.config = {
			autoDefer: true,
			ephemeral: false,
		};
		this.perms = {
			bot: ['EmbedLinks'],
			user: [],
		};
	}

	public async run({ interaction }: CommandRunData, points = 0) {
		const category: ValidCategories = interaction.options.getString('category') as ValidCategories ?? 'random';
		const randomQuestion = this._getRandomQuestion(category);

		const row = this._generateButtons(randomQuestion.answers, new ActionRow());
		const embed = new Embed().setTitle(randomQuestion.title).setDescription(`🎖️ **Pontos**: ${points}`).setTimestamp();

		const message = await interaction.editReply({ components: [row], embeds: [embed] }) as Message;
		const collector = message.createMessageComponentCollector({
			filter: button => button.user.id === interaction.user.id,
			max: 1,
			time: 30000,
		});

		collector.on('collect', async collected => {
			await collected.deferUpdate();

			const wrongRow = this._generateButtons(randomQuestion.answers, new ActionRow(), ButtonStyle.Secondary, true);
			await interaction.editReply({ components: [wrongRow], embeds: [embed] });

			const answer = randomQuestion.answers[Number(collected.customId)];

			if (answer.correct) {
				return collected.followUp({ content: `✅ ${interaction.user} **|** Resposta correta!` }).then(r => {
					setTimeout(() => {
						// eslint-disable-next-line no-empty-function
						(r as Message).delete().catch(() => {});
						client.commands?.get('minigame quiz')?.run({ interaction }, ++points);
					}, 2000).unref();
				});
			}
			collected.followUp({ content: `❌ ${interaction.user} **|** Resposta incorreta!`, ephemeral: true });
		});
	}

	_getRandomQuestion(category: ValidCategories): QuestionStrucutre {
		switch (category) {
		case 'astronomy':
			return AstronomyData.questions[Math.floor(Math.random() * AstronomyData.questions.length)];
		case 'geography':
			return GeographyData.questions[Math.floor(Math.random() * GeographyData.questions.length)];
		case 'technology':
			return TechData.questions[Math.floor(Math.random() * TechData.questions.length)];
		case 'random':
			return this._getRandomQuestion(categories.filter(t => t !== 'random')[Math.floor(Math.random() * categories.length)]);
		}
	}

	_generateButtons(answers: AnswersStructure[], row: ActionRow, style = ButtonStyle.Primary, disable = false): ActionRow {
		let number = -1;

		for (const answer of answers) {
			++number;

			const button = new ButtonComponent().setLabel(answer.name).setStyle(style).setCustomId(String(number)).setDisabled(disable);

			row.addComponents(button);
		}

		return row;
	}
}