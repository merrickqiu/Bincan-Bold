module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isSelectMenu()) return;
		if (interaction.customId === 'select') {
			if(interaction.values[0] === 'balls') {
				interaction.reply({ content: 'You died đ', ephemeral: true });
			} else {
				interaction.reply({ content: 'You are poor âšī¸', ephemeral: true });
			}
		}
	},
};
