const cardValues = {

A: 11,
K: 10,
Q: 10,
J: 10,
X: 10,
IX: 9,
VIII: 8,
VII: 7,
VI: 6,
V: 5,
IV: 4,
III: 3,
II: 2,


};

let gameState = {
dealerCards: [],
playerCards: [],
deck: [],
message: "",
gameOver: false,
};

function updateTable() {
const dealerCardsContainer = document.getElementById("dealer-cards");
const playerCardsContainer = document.getElementById("player-cards");

dealerCardsContainer.innerHTML = "<h2>Dealer</h2>";
playerCardsContainer.innerHTML = "<h2>Player</h2>";

gameState.dealerCards.forEach((card) => {
const cardDiv = document.createElement("div");
cardDiv.classList.add("card");
if (card.suit === "HEARTS" || card.suit === "DIAMONDS") {
cardDiv.classList.add("red");
}
cardDiv.textContent = card.rank;
dealerCardsContainer.appendChild(cardDiv);
});

gameState.playerCards.forEach((card) => {
const cardDiv = document.createElement("div");
cardDiv.classList.add("card");
if (card.suit === "HEARTS" || card.suit === "DIAMONDS") {
cardDiv.classList.add("red");
}
cardDiv.textContent = card.rank;
playerCardsContainer.appendChild(cardDiv);
});

const message = document.getElementById("message");
message.textContent = gameState.message;
}

function createDeck() {
const ranks = Object.keys(cardValues);
const suits = ["HEARTS", "DIAMONDS", "SPADES", "CLUBS"];

const deck = [];
for (let i = 0; i < ranks.length; i++) {
for (let j = 0; j < suits.length; j++) {
deck.push({ rank: ranks[i], suit: suits[j], value: cardValues[ranks[i]] });
}
}

return deck;
}

function shuffleDeck(deck) {
for (let i = deck.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[deck[i], deck[j]] = [deck[j], deck[i]];
}
}

function dealCards() {
gameState.dealerCards = [];
gameState.playerCards = [];
gameState.message = "";
gameState.gameOver = false;

if (gameState.deck.length < 4) {
gameState.deck = createDeck();
shuffleDeck(gameState.deck);
}

gameState.dealerCards.push(gameState.deck.shift());
gameState.playerCards.push(gameState.deck.shift());
gameState.dealerCards.push(gameState.deck.shift());
gameState.playerCards.push(gameState.deck.shift());

if (getHandValue(gameState.dealerCards) === 21) {
gameState.message = "Az Osztónak blackjackje van!";
gameState.gameOver = true;
} else if (getHandValue(gameState.playerCards) === 21) {
gameState.message = "A játékosnak Blackjackje van!";
gameState.gameOver = true;
}

updateTable();
}

function getHandValue(hand) {
let value = 0;
let aces = 0;

hand.forEach((card) => {
value += card.value;
if (card.rank === "ACE") {
aces++;
}
});

while (aces > 0 && value > 21) {
}
return value;
}

function playerHit() {
gameState.playerCards.push(gameState.deck.shift());

if (getHandValue(gameState.playerCards) > 21) {
gameState.message = "A játékos besokall! Az osztó nyert!";
gameState.gameOver = true;
}

updateTable();
}

function dealerPlay() {
while (getHandValue(gameState.dealerCards) < 17) {
gameState.dealerCards.push(gameState.deck.shift());
}

if (getHandValue(gameState.dealerCards) > 21) {
gameState.message = "Az Osztó kiesett! A játékos nyert!";
} else if (getHandValue(gameState.dealerCards) > getHandValue(gameState.playerCards)) {
gameState.message = "Az Osztó nyert!";
} else if (getHandValue(gameState.dealerCards) === getHandValue(gameState.playerCards)) {
gameState.message = "Push!";
} else {
gameState.message = "Játékos nyert!";
}

gameState.gameOver = true;
updateTable();
}

function playerStand() {
dealerPlay();
}

function main() {
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");

dealButton.addEventListener("click", () => {
dealCards();
});

hitButton.addEventListener("click", () => {
if (!gameState.gameOver) {
playerHit();
}
});

standButton.addEventListener("click", () => {
if (!gameState.gameOver) {
playerStand();
}
});
}

main();
