//NPM Modules
var inquirer = require('inquirer');
var isLetter = require('is-letter');

//Require objects/exports
var Word = require('./word.js');
var wordsToGuess = require('./wordsToGuess.js');

var hangman = {
  wordbank: wordsToGuess.wordList,
  guessesLeft: 10,
  //empty array to hold letters guessed by user. And checks if the user guessed the letter already
  guessedLtr: [],
  //index to display graphic
  display: 0,
  currentWord: null,
  //asks user if they are ready to play
  startwordsToGuess: function() {
      var that = this;
      //clears guessedLetters before a new game starts if it's not already empty.
      if(this.guessedLtr.length > 0){
      this.guessedLtr = [];
    }
  //Prompt the user and ask if they are ready to play the game!
    inquirer.prompt([{
      name: "start",
      type: "confirm",
      message: "Welcome to the game of Hangman! Are you ready to play?"
    }]).then(function(answer) {
        if(answer.start){
        that.newGame();
        } else{
        console.log("I don't want to play right now!");
        }
        })
      },

  //Starts new game
  newGame: function() {
    if(this.guessesLeft === 10) {
      console.log("Okay! Let's Play!")
      var randomNum = Math.floor(Math.random()*this.wordbank.length);
      this.currentWord = new Word(this.wordbank[randomNum]);
      this.currentWord.grabLetters();
      
      //Displays current word as blanks.
      console.log(this.currentWord.wordRender());
      this.promptUser();
    } else{
      this.resetRemainingGuess();
      this.newGame();
    }
  },
    resetRemainingGuess: function() {
      this.guessesLeft = 10;
    },

  //Prompt the user and ask them to choose a letter
  promptUser : function(){
      var that = this;
      //asks player for a letter
     inquirer.prompt([{
        name: "chosenLtr",
        type: "input",
        message: "Choose a letter:",
        validate: function(value) {
          if(isLetter(value)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(ltr) { 
    var letterReturned = (ltr.chosenLtr).toUpperCase();
    //Adds to the guessedLetters array if it isn't already there
      var guessedAlready = false;
        for(var i = 0; i<that.guessedLtr.length; i++){
            if(letterReturned === that.guessedLtr[i]){
            guessedAlready = true;
          }
        };

        if(guessedAlready === false){
          that.guessedLtr.push(letterReturned);
          var found = that.currentWord.foundTheLetter(letterReturned);
          //If none are found tell user they were wrong
          if(found === 0){
            console.log('Nope! You guessed wrong.');
            that.guessesLeft--;
            console.log('Guesses remaining: ' + that.guessesLeft);
            console.log('\n*******************');
            console.log(that.currentWord.wordRender());
            console.log('\n*******************');
            console.log("Letters guessed: " + that.guessedLtr);
          } else{
            console.log('Yes! You guessed right!');
            console.log('Guesses remaining: ' + that.guessesLeft);
            console.log(that.currentWord.wordRender());
            console.log('\n*******************');
            console.log("Letters guessed: " + that.guessedLtr);
              if(that.currentWord.foundtheWord() === true){
                console.log(that.currentWord.wordRender());
                console.log('Congratulations! You won the game!!!');
                } 
            }
          }
              if(that.guessesLeft > 0 && that.currentWord.wordFind === false) {
                that.promptUser();
                }else if(that.guessesLeft === 0){
                console.log('Game over!');
                console.log('The word you were guessing was: ' + that.currentWord.word);
                }
           })
        }
    }; 

hangman.startwordsToGuess();