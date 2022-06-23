module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isButton) return;
		if (interaction.customId === 'continue' || interaction.customId === 'leave') {
            decisions[interaction.user] = interaction.customId;
            undecided = undecided.filter(item => item !== interaction.user);
            roundMessage
				.edit(`----ROUND ${round}----\nWaiting on: ${undecided.map(player => player.username).join(', ')}\nThe pot: ${pot}\nThe deck: ${board.map(card => card.string).join(', ')}`);
            interaction.update({content: `You are going to ${interaction.customId}.`, fetchReply: true});

			if (undecided.length === 0) {
				gems = Math.floor(pot /insideTemple.length);
				for (const [user, decision] of Object.entries(decisions)) {
					if (decision === 'continue') {
						channel.send(`${user} has decided to continue into the temple.`);
					} else if (decision === 'leave') {
						channel.send(`${user} has left and gains **${gems}** gems.`);
						insideTemple = insideTemple.filter(player => player.toString() !== user);
						pot -= gems;
						scores[user] += gems;
						console.log(scores);
					} else {
						channel.send(`${user} is not in the temple.`);
					}
				}
				if (insideTemple.length > 0) {
					// Reset Undecided Players
					undecided = [...insideTemple];
					// Deal another card
					card = deck.splice(Math.floor(Math.random()*deck.length), 1)[0];
					board.push(card);
					pot += card.points;
					roundMessage
						.edit(`----ROUND ${round}----\nWaiting on: ${undecided.map(player => player.username).join(', ')}\nThe pot: ${pot}\nThe deck: ${board.map(card => card.string).join(', ')}`);
					if (card.type === 'hazard') {
						hazardCount[card.emoji] += 1;
						if (hazardCount[card.emoji] === 2) {
							for (user in insideTemple) {
								channel.send(`☠️${insideTemple[user]} has died and gains **0** gems.☠️`);
							}
							newRound();
							return;
						}
					}
				} else {
					newRound();
				}
			}
		} 
	},
};
