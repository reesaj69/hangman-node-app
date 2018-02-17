var inquirer = require('inquirer');
var prompt = require("prompt");


var Word = require('./word.js');
var wordsToGuess = require('./wordsToGuess.js');

//Start hangman
var hangman = {
	wordbank: wordsToGuess.wordList,
	guessesLeft: 10,
	guessedLtr: [],
	display: 0,
	currentWord: null,
	
	//Start the game of hangman
	startwordsToGuess:  function(){
	var that = this;
	
	//removes the letters guessed before a new game starts
	if(this.guessedLtr.length > 0) {
		this.guessedLtr = [];
	}

	inquirer.prompt([{
		name:  "start",
		type: "confirm", 
		message: "Welcome to the game of Hangman! Are you ready to play?"
	}])
	.then(function(answer) {
		if(answer.start) {
			that.newGame();
		} else {
			console.log('I do not want to play right now!');
		}
	})
},

	//If user selects new game
	newGame: function() {
		if(this.guessesLeft === 10) {
			console.log("Let's Keep Playing!");

			//generates a random number from the wordList - indicating the random word chosen
			var randomNum = Math.floor(Math.random() * this.wordbank.length);

			//generates new random word
			this.currentWord = new Word(this.wordbank[randomNum]);

			//Popuates the random word letters
			this.currentWord.grabLetters();

			//display words as blanks
			console.log(this.currentWord.wordRender());
			this.promptUser();
		} else {
			this.resetRemainingGuess();
			this.newGame();
		}
	},
	resetRemainingGuess: function(){
		this.guessesLeft = 10;
	},

	promptUser: function(){
		var that = this;

		//asks player for a letter
		inquirer.prompt([{
			name: 'chosenLtr',
			type: 'input',
			message: 'Choose a letter'

		}]).then(function(ltr) {
			var letterReturned = (ltr.chosenLtr).toUpperCase();

			//adds to the guessedLtr array if it's not there already
			var guessedAlready = false;

			//loop through the letters guessed to check
			for(var i = 0; i < that.guessedLtr; i++){
				if (letterReturned === that.guessedLtr[i]){
					guessedAlready = true;
				}
			};
			//if the letter was not guessed 
				if(guessedAlready === false) {
					that.guessedLtr.push(letterReturned);



				var found = that.currentWord.foundtheWord(letterReturned);
				if (found === 0) {
					console.log('Wrong guess');

					that.guessesLeft--;
					that.display++;

					console.log('Guesses Remaining: ' + that.guessesLeft);
					console.log('\n**********************');
					console.log(that.currentWord.wordRender());
					console.log('\n**********************');
					console.log("Letters guessed: " + that.guessedLtr);
				} else {
					console.log('Yes! Great Guess!');
					console.log('Guesses remaining: ' + that.guessesLeft);
					console.log(that.currentWord.wordRender());
					console.log('\n**********************');
					console.log("Letters guessed: " + that.guessedLtr);

				if (that.currentWord.foundtheWord() === true){
					console.log(that.currentWord.wordRender());
					console.log("You win!");
				}
				}
				}

				if(that.guessesLeft > 0 && that.currentWord.wordFind === false){
					that.promptUser();
				} else if (that.guessesLeft === 0) {
					console.log('Game Over!');
					console.log('The word you were guessing was: ' + that.currentWord.word);
				}
		});
	}



}
hangman.startwordsToGuess();