var letter = require('./letter.js');

//-----Function #1 ------
var Word = function(wrd){
	var that = this;

	//properties 

	this.word = wrd;
	this.letters = [];
	this.wordFind = false;

	//method to grab a letter in a word.
	this.grabLetters = function(){
		for(var i = 0; i < that.word.length; i++){
			var newLetter = new letter(that.word[i]);
			this.letters.push(newLetter);
		}
	};
	//this.grabLetters();

//-----Function #2 -----
this.foundtheWord = function(){
	if(this.letters.every(function(ltr){
		return ltr.show === true;
	})) {
		this.wordFind = true;
		return true;
	}
};


// Function will find the letter in the array of guesses
this.foundTheLetter = function(letterGuessed){
	var whatToReturn = 0;

	//goes through each letter to see if matches guess letter
	this.letters.forEach(function(ltr){
		if(ltr.letter === letterGuessed){
			ltr.show = true
			whatToReturn++;
		}
	})
	//If guessed letter matches letter property show letter object
	return whatToReturn;
};
	



this.wordRender = function() {
var display ='';

that.letters.forEach(function(ltr){
	var currentLetter = ltr.letterin();
	display += currentLetter;
});
	return display;
	};
}


module.exports = Word;