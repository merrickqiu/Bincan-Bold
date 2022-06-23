global.players = [];
global.roundMessage;
global.channel;
global.scores = {};
global.round = 0;
global.pot = 0;

global.deck = [];
global.board = [];

global.undecided = [];
global.insideTemple = [];
global.decisions = {};

global.hazardCount = [];
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isButton) return;
		if (interaction.customId === 'join') {
            players.push(interaction.user);
			interaction.update({ content: `Play some Incan Gold! 🗿\nPlayers:\n${players.map(player => player.username).join(', ')}`, fetchReply: true});
		} else if (interaction.customId === 'exit') {
            players = players.filter(item => item !== interaction.user);
            interaction.update({ content: `Play some Incan Gold! 🗿\nPlayers:\n${players.map(player => player.username).join(', ')}`, fetchReply: true});
        } else if (interaction.customId === 'start') {
            // Setup scores
            for (player in players) {
                scores[players[player]] = 0;
            }
            // Setup Messages
            message = await interaction.update({ content: `Currently Playing🎲:\n${players.map(player => player.username).join(', ')}`, fetchReply: true, components: []});
            channel = message.channel;
            newRound();

            // Send starting game notification
            message = await message.reply({ content: `Hey ${players.toString()}! ${interaction.user.username} has started the game!`, fetchReply: true});
            setTimeout(() => message.delete(), 5000);          
        }
	},
};
