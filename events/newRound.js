global.newRound = async function newRound() {
    // new round code
    round++;
    if (round === 7) {
        channel.send('----Game Over! Here are the scores...----');
        for (const [player, score] of Object.entries(scores)) {
            channel.send(`${player}: ${score}`);
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
            return;
        }
    }
    board = [];
    deck = [];
    decision = [];
    pot = 0;
    // Create deck
    points = [1,2,3,4,5,5,7,7,9,11,11,13,14,15,17];
    hazards = ['🐍', '🕸️', '🧟', '🔥', '🪨'];
    artifacts = ['🪙', '🗿', '💰', '🥇', '🛢️'];
    // Setup hazard counts
    for (i in hazards) {
        hazardCount[hazards[i]] = 0; 
    }
    for (i in points) {
        deck.push({type: "treasure", points: points[i], string: `[${points[i]} 💎]`});
    }
    for (i in hazards) {
        for (let j = 0; j < 3; j++) {
            deck.push({type: "hazard", points: 0, emoji: hazards[i], string: `[HZD ${hazards[i]}]`})
        } 
    }
    for (i in artifacts) {
        deck.push({type: "artifact", points: 5, string: `[ART ${artifacts[i]}]`})
    }

    // Deal first card
    card = deck.splice(Math.floor(Math.random()*deck.length), 1)[0];
    board.push(card);
    pot += card.points;
    if (card.type === 'hazard') {
        hazardCount[card.emoji] += 1;
    }
    // Instanciate global variables
    global.undecided = [...players];
    global.insideTemple = [...players];

    // Setup Messages
    roundMessage = await message.channel
        .send(`----ROUND ${round}----\nWaiting on: ${players.map(player => player.username).join(', ')}\nThe pot: ${pot}\nThe deck: ${board.map(card => card.string).join(', ')}`);		
}