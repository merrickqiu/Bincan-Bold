const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('decide')
		.setDescription('Choose your next action.'),
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'decide') {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('continue')
						.setLabel('Yes please 💰')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('leave')
						.setLabel('Leave temple ⛔')
						.setStyle('DANGER'),
				);

			await interaction.reply({ content: 'Go farther? \n', ephemeral: true, components: [row] });
		}
	},
};
