const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('begin')
		.setDescription('Create a Game of Incan Gold.'),
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'begin') {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('join')
						.setLabel('Join Lobby')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('exit')
						.setLabel('Leave Lobby')
						.setStyle('DANGER'),
					new MessageButton()
						.setCustomId('start')
						.setLabel('Start Game')
						.setStyle('SUCCESS'),
				);

			await interaction.reply({ content: 'Play some Incan Gold! 🗿\nPlayers:\n', components: [row] });
		}
	},
};


	
