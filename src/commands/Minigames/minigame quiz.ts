import { ActionRow, ButtonComponent, ButtonStyle, Embed, Message } from 'discord.js';
// Quiz data
import AstronomyData from '../../assets/quiz/astronomy.json';
import GeographyData from '../../assets/quiz/geography.json';
import TechData from '../../assets/quiz/tech.json';

import { CommandRunData, CommandStructure } from '../../utils/baseCommand';

type ValidCategories = 'technology' | 'astronomy' | 'geography' | 'random';
const categories: ValidCategories[] = ['technology', 'astronomy', 'geography', 'random'];

interface AnswersStructure {
	name: string;
	correct?: boolean;
}

interface QuestionStrucutre {
	title: string;
	image?: string;
	image_credit?: string;
	answers: AnswersStructure[];
}

export default class MinigameCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'minigame quiz';
		this.category = 'MINIGAMES';
		this.config = {
			autoDefer: true,
			ephemeral: false,
		};
		this.perms = {
			bot: ['EmbedLinks'],
			user: [],
		};
	}

	public override async run({ interaction, t }: CommandRunData, points = 0) {
		const category: ValidCategories = (interaction.options.getString('category') as ValidCategories) ?? 'random';
		const randomQuestion = this._getRandomQuestion(category);

		const row = this._generateButtons(randomQuestion.answers, new ActionRow());
		const embed = new Embed()
			.setTitle(randomQuestion.title)
			.setDescription(`🎖️ **${t('QUIZ_POINTS')}**: ${points}`)
			.setTimestamp()
			.setImage(randomQuestion.image ?? null)
			.setFooter(randomQuestion.image_credit ? { text: `${t('QUIZ_IMG_CREDIT')}: ${randomQuestion.image_credit}` } : null);

		const message = (await interaction.editReply({
			components: [row],
			embeds: [embed],
		})) as Message;
		const collector = message.createMessageComponentCollector({ filter: button => button.user.id === interaction.user.id, max: 1, time: 30000 });

		collector.on('collect', async collected => {
			await collected.deferUpdate();

			const wrongRow = this._generateButtons(randomQuestion.answers, new ActionRow(), ButtonStyle.Secondary, true);
			await interaction.editReply({
				components: [wrongRow],
				embeds: [embed],
			});

			const answer = randomQuestion.answers[Number(collected.customId)];

			if (answer.correct) {
				return collected.followUp({ content: `✅ ${interaction.user} **|** ${t('QUIZ_RIGHT_ANSWER')}` }).then(r => {
					setTimeout(() => {
						// eslint-disable-next-line no-empty-function
						(r as Message).delete().catch(() => {});
						client.commands?.get('minigame quiz')?.run({ interaction, t }, ++points);
					}, 2000).unref();
				});
			}
			collected.followUp({ content: `❌ ${interaction.user} **|** ${t('QUIZ_WRONG_ANSWER')}`, ephemeral: true });
		});

		collector.on('end', collected => {
			if (collected.size === 0) {
				const wrongRow = this._generateButtons(randomQuestion.answers, new ActionRow(), ButtonStyle.Secondary, true);
				embed.setDescription(`⚠️ ${t('QUIZ_NO_ANSWER')}\n🎖️ **${t('QUIZ_POINTS')}**: ${points}`);
				interaction.editReply({ components: [wrongRow], embeds: [embed] });
			}
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
				return this._getRandomQuestion(categories.filter(t => t !== 'random')[Math.floor(Math.random() * (categories.length - 1))]);
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
