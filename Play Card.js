//get current player data for combat
let userName = game.users.current.name;
let userActor = game.actors.filter(x => x.name.includes(userName));
let userCombatant = game.combat.combatants.filter(x => x.actorId == userActor[0]._id)
let combatantId = userCombatant[0]._id;

//get player card stacks and played card data
let revealedHand = game.cards.filter(x => x.name === "Revealed cards (" + userName + ")")
let playedCards = game.cards.filter(x => x.name === ("Revealed cards (" + userName + ")"))
let card1 = playedCards[0]._source.cards[0].name;
let card2 = playedCards[0]._source.cards[1].name;
let card1Init = playedCards[0]._source.cards[0].value;
let card2Init = playedCards[0]._source.cards[1].value;
let initiative = Math.min(card1Init, card2Init);

//for testing
console.log("User Name is: " + userName);
console.log("User Actor is: " + userActor[0].name);
console.log("Revealed Hand is: " + revealedHand);
console.log("Played cards are: " + card1 + " and " + card2);
console.log("Card 1 initiative is: " + card1Init);
console.log("Card 2 initiative is: " + card2Init);
console.log("Initiative is: " + initiative);

playCard();

function playCard () {

if (revealedHand[0]._source.cards.length != 2) {
    ui.notifications.warn("Must have 2 cards in play")
} else {

let confirmHandDialog = new Dialog({
    title: "Play Hand",
    content: "Do you wish to play this hand? " + card1 + " and " + card2 + " Initiative: " + initiative,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Yes",
            callback: () => setInitiative()
        },
        two: {
            icon: '<i class="fas fa-times"></i>',
            label: "No",
            callback: () => console.log("Chose no")
        }
    },
    default: "two",
    render: html => console.log("Register interactivity in the rendered dialog"),
    close: html => console.log("This always is logged no matter which option is chosen")
});
confirmHandDialog.render(true);

    }  //end if-else
} //end playCard function

function setInitiative () {
    //let combat = game.combats.combats[0];
    game.combat.setInitiative(combatantId, initiative)
    console.log("set " + userName + "initiative to " + initiative);
}
