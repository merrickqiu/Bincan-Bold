const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong.'),
	async execute(interaction) {
        const delay = Math.abs(Date.now() - interaction.createdTimestamp);
		return interaction.reply('🏓 Pong ' + delay + ' ms! 🏓');
	},
};