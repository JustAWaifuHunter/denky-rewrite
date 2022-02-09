import { Aki } from 'aki-api';
import type { guess } from 'aki-api/typings/src/functions';
import { ActionRow, ButtonComponent, ButtonStyle, Embed, Message, SelectMenuComponent, SelectMenuInteraction, SelectMenuOption } from 'discord.js';
import { CommandRunData, CommandStructure } from '../../utils/baseCommand';

const partidas = new Set();
const emojis = ['👍', '👎', '❔', '🤔', '🤷', '❌'];

export default class MinigameCommand extends CommandStructure {
	constructor() {
		super();

		this.name = 'minigame akinator';
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

	public override async run({ interaction, t }: CommandRunData) {
		if (partidas.has(interaction.user.id)) {
			return interaction.editReply(t('MINIGAMES_AKINATOR_ALREADY_RUNNING', interaction.user));
		}
		partidas.add(interaction.user.id);

		let internalLang: 'en' | 'pt' = 'en';
		switch (interaction.locale.replace('-', '_')) {
			case 'pt_BR':
				internalLang = 'pt';
				break;
			case 'en_US':
				internalLang = 'en';
				break;
			default:
				internalLang = 'en';
				break;
		}

		// Inicia uma partida
		const embed = new Embed();
		const aki = new Aki({
			region: internalLang,
			childMode: true,
		});

		try {
			await aki.start();
		} catch {
			interaction.editReply(t('MINIGAMES_AKINATOR_ERROR_STARTING', interaction.user));
			return partidas.delete(interaction.user.id);
		}

		embed.setTitle(`${t('MINIGAMES_AKINATOR_QUESTION')} ${aki.currentStep + 1}`);
		// Yellow color
		embed.setColor(14407717);
		embed.setTimestamp();
		embed.setDescription(`**${aki.question}**`);

		const componentes = new ActionRow();
		const _menu = new SelectMenuComponent().setCustomId('menu').setPlaceholder(t('MINIGAMES_AKINATOR_CHOOSE_ANSWER'));

		aki.answers.forEach((_p, i) => {
			const texto = String(i)
				.replace('0', t('MINIGAMES_AKINATOR_ANSWER_YES'))
				.replace('1', t('MINIGAMES_AKINATOR_ANSWER_NO'))
				.replace('2', t('MINIGAMES_AKINATOR_ANSWER_PROB_YES'))
				.replace('3', t('MINIGAMES_AKINATOR_ANSWER_PROB_NO'))
				.replace('4', t('MINIGAMES_AKINATOR_ANSWER_IDK'));
			const _option = new SelectMenuOption()
				.setEmoji({ name: String(emojis[i]) })
				.setLabel(texto)
				.setValue(String(i));
			_menu.addOptions(_option);
		});

		const _option = new SelectMenuOption().setEmoji({ name: '❌' }).setLabel(t('MINIGAMES_AKINATOR_STOP')).setValue('5');
		_menu.addOptions(_option);

		componentes.addComponents(_menu);

		const mensagemPartida = (await interaction.editReply({
			content: `${interaction.user}`,
			embeds: [embed],
			components: [componentes],
		})) as Message;
		const collector = mensagemPartida.createMessageComponentCollector({
			filter: int => {
				if (interaction.user.id === int.user.id) return true;
				int.deferUpdate().then(() => int.followUp({ content: t('MINIGAMES_AKINATOR_NOT_AUTHOR'), ephemeral: true }));
				return false;
			},
			time: 250000,
			max: 60,
		});

		collector.once('end', (_c, m) => {
			partidas.delete(interaction.user.id);
			if (m === 'time') {
				embed.setTitle(t('MINIGAMES_AKINATOR_GAME_END')).setDescription(t('MINIGAMES_AKINATOR_GAME_TIMEOUT'));
				// Red color
				embed.setColor(16060175);
				interaction.editReply({ content: `${interaction.user}`, embeds: [], components: [] });
			}
		});

		collector.on('collect', async (coletado: SelectMenuInteraction): Promise<any> => {
			await coletado.deferUpdate();

			const opcao = Number(coletado.values[0]);
			if (opcao === 5) {
				collector.stop();
				return aki.win();
			}

			await aki.step(opcao as 1 | 2 | 3 | 4);

			// If the user is next to a answer
			if (aki.progress >= 70 || aki.currentStep >= 78) {
				collector.stop();
				await aki.win();
				const advinhado = aki.answers[0] as guess;

				// If no character was found
				if (!advinhado) {
					embed.setTitle(t('MINIGAMES_AKINATOR_GAME_END')).setDescription(t('MINIGAMES_AKINATOR_IDK', interaction.user));
					// Red color
					embed.setColor(16060175);
					return interaction.editReply({
						content: `${interaction.user}`,
						embeds: [],
						components: [],
					});
				}

				// If Akinator found a character
				embed.setTitle(t('MINIGAMES_AKINATOR_IS_THIS_YOUR_CHAR'));
				embed.setColor(5585356);
				embed.setDescription(`**${advinhado.name}**\n${advinhado.description}\n${t('MINIGAMES_AKINATOR_POSITION')}: **#${advinhado.ranking}**`);
				embed.setImage(advinhado.nsfw ? null : advinhado.absolute_picture_path);

				const _rowFinalizado = new ActionRow();
				const _simBotao: ButtonComponent = new ButtonComponent().setStyle(ButtonStyle.Success).setCustomId('sim').setEmoji({ name: '✅' }).setLabel(t('MINIGAMES_AKINATOR_ANSWER_YES'));
				const _naoBotao: ButtonComponent = new ButtonComponent().setStyle(ButtonStyle.Danger).setCustomId('nao').setEmoji({ name: '❌' }).setLabel(t('MINIGAMES_AKINATOR_ANSWER_NO'));

				_rowFinalizado.setComponents([_simBotao, _naoBotao]);

				return interaction.editReply({ content: `${interaction.user}`, embeds: [embed], components: [_rowFinalizado] }).then((int: Message) => {
					int.awaitMessageComponent({
						filter: filtint => ['sim', 'nao'].includes(filtint.customId) && interaction.user.id === filtint.user.id,
						time: 45000,
					})
						.then(async resposta => {
							await resposta.deferUpdate();
							if (resposta.customId === 'sim') {
								embed.setColor(1299504);
								resposta.editReply({
									content: `🎉 ${interaction.user} **|** ${t('MINIGAMES_AKINATOR_SUCCESS')}`,
									embeds: [embed],
									components: [],
								});
							} else {
								embed.setColor(14407717);
								resposta.editReply({ content: `😐 ${interaction.user} **|** ${t('MINIGAMES_AKINATOR_COULDNOT_GUESS')}`, embeds: [embed], components: [] });
							}
						})
						// eslint-disable-next-line no-empty-function
						.catch(() => interaction.editReply({ content: `${interaction.user}`, embeds: [embed], components: [] }).catch(() => {}));
				});
			}

			// Continue the game
			embed.setTitle(`${t('MINIGAMES_AKINATOR_QUESTION')} ${aki.currentStep + 1}`);
			embed.setColor(14407717);
			embed.setDescription(`**${aki.question}**`);

			interaction.editReply({ content: `${interaction.user}`, embeds: [embed], components: [componentes] });
		});
	}
}
