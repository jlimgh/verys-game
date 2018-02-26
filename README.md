# verys-game
Simple black jack game

  Put code in ES6 complier, or go to
  https://jlimgh.github.io/verys-game/ and plug in the methods in the console.
  
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
