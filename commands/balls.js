const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balls')
		.setDescription('Do you have balls?'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Balls',
							description: 'You have balls',
							value: 'balls',
						},
						{
							label: 'No Balls',
							description: 'You do not have balls',
							value: 'no_balls',
						},
					]),
			);

		await interaction.reply({ content: 'Do you have balls?', ephemeral: true, components: [row] });
	},
};


	
