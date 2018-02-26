/** Usage ***

  Put code in ES6 complier

  Game Instructions:
    1. Start game with a number of players. Every new game will reload with a new deck of cards.
        *Example: blackJack.newGame(4); ---- 4 is an example.
    
    2. Deal cards to self, players, and dealer. See winner(s). Can deal again and deck count will decrease. 
        *Example: blackJack.dealHand();

    3. Shuffle current deck as needed. It's an option, although every hand dealt will be random.
        *Example: blackJack.shuffle();

    4. Reload new deck as needed with same amount of players. Can choose methods blackJack.newDeck() or blackJack.newGame() to refill when cards are low.
        *Example: blackJack.newDeck();

    5. See how many cards are left in the deck.
        *Example: blackJack.deckCount();

  */  


let blackJack = (() => {
  let deck = [],
      playerNumber,
      cardsPerPlayer = 2,
      cardsNeeded,
      players = {};  
      
  const suits = [ "Hearts", "Diamonds", "Clubs", "Spades" ];
  const value = [
    {num: 2, word: "Two"}, 
    {num: 3, word: "Three"},
    {num: 4, word: "Four"}, 
    {num: 5, word: "Five"},
    {num: 6, word: "Six"},
    {num: 7, word: "Seven"},
    {num: 8, word: "Eight"},
    {num: 9, word: "Nine"},
    {num: 10, word: "Ten"},
    {num: 10, word: "Jack"},
    {num: 10, word: "Queen"},
    {num: 10, word: "King"},
    {num: 11, word: "Ace"}
  ];
  
  /** Create new deck with suits and values */   
  let newDeck = () => {
    deck = [];
  
    for( let i = 0; i < suits.length; i++ ) {
      for( let j = 0; j < value.length; j++ ) {
        //make a card
        let card = {};
        card.suit = suits[i];
        card.value = value[j];
        
        deck.push(card);
      }
    }
  }
  
  /** Shuffle current deck, no matter how many cards left */   
  let shuffleDeck = () => {
      let counter = deck.length;

      while (counter > 0) {
          // random index
          let index = Math.floor(Math.random() * counter);

          counter--;
  
          // swap the last element
          let temp = deck[counter];
          deck[counter] = deck[index];
          deck[index] = temp;
      }
  }  
    
  /** Create new game: determine how many players, reload deck */
  let newGame = (number) => {
    if (number > 0) {
      playerNumber = number;
      cardsNeeded = playerNumber*cardsPerPlayer + cardsPerPlayer;
      newDeck();
      console.log(`Playing a game of Blackjack with ${playerNumber} players!`);      
    } else {
      console.log("At least 1 person has to play!")
    }
  }    
    
  /** Calculate drawn card(s) value/info for 1 player */ 
  let drawCard = () => {
    let currentCard;
    let playerHandInfo = {total: 0};
    
    //save and take out random current card out of deck
    let extractCurrentCard = () => {
      const index = Math.floor( Math.random() * deck.length );
      currentCard = deck.splice(index, 1)[0];
      return currentCard;
    }
    //create player hand obj info
    let makePlayerHand = (number) => {
      while(number > 0) {
       extractCurrentCard();  
       playerHandInfo[number] = `${currentCard.value.word} of ${currentCard.suit}`;
       playerHandInfo["total"] += currentCard.value.num;
       number--;
      }
    }

    if ( deck.length > 0 ) {
      makePlayerHand(cardsPerPlayer);
    }
    
      return playerHandInfo;

  }	  
  
  
  /** Deal cards to each player and calculate total for wins */ 
  function dealHand() {
    if (deck.length < cardsNeeded) {
      console.log("Not enough cards! Start a new game!");
    } else {
      //deal 2 cards to each player
      for (let i = 0; i < playerNumber + 1; i++) {
        //create players object with card info
        players[i] = drawCard();
        
        let playerInfo = `${players[i]["1"]}, ${players[i]["2"]} (total = ${players[i]["total"]})`;   
        
        //distinguish player names(self, dealer, player#) and show cards as a string
        if (i === 0) {
          console.log(`Your hand: ${playerInfo}`);
        } else if (i === playerNumber) {
          console.log(`Dealer's hand: ${playerInfo}`);
        } else {
          console.log(`Player ${i}'s hand: ${playerInfo}`);
        }
        
      }
      //calculate winners after dealing cards
      calcWinners();
    }
  }
  
  /** Calculate winners: Loop through players obj and calucate highest scores */  
  function calcWinners() {
    const maxScore = 21;
    let winners;
    let highest = 0;
    let playerName;
    
    //loop over players object to find winners
    for (const prop in players) {
      let temp = players[prop].total;
      //create player names from indexes
      if (prop === "0") {
        playerName = "You win!";
      } else if (prop === (playerNumber).toString()) {
        playerName = "Dealer wins!";
      } else {
        playerName = `Player ${prop.toString()} wins!`;
      }
      
      //Put winners into object: closest to 21, not going over
      if (temp <= maxScore && temp > highest) {
        highest = temp;
        winners = {};
        winners[prop] = playerName;
      } else if (temp <= maxScore && temp === highest) {
        winners[prop] = playerName;
      }
    }
    
    //console.log winners 
    let logWinners = () => {
      for (const prop in winners) {
        console.log(winners[prop]);
      }
    }
    
    logWinners();
  }
  
  let deckCount = () => {
    console.log(deck.length);
  }
  
  return ({
    newGame: newGame,
    dealHand: dealHand,
    shuffleDeck: shuffleDeck,
    deckCount: deckCount
  });
})();