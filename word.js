// require letter objects
var letter = require('./letter.js');
//--------------------------------------------
function Word(wrd) {
    var that = this;

//store the string wrd
  this.word = wrd;

  //collection of letter objects
  this.letters = [];
  this.wordFind = false;
//--------------------------------------------
//Method that grabs the letter in the word.
  this.grabLetters = function() {
    //populate the collection above with new Letter objects
    for(var i = 0; i<that.word.length; i++){
      var newLetter = new letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };
//--------------------------------------------
  //Method that finds the letter in the guess array
  this.foundtheWord = function() {
    if(this.letters.every(function(ltr){
      return ltr.show === true;
    })){
      this.wordFind = true;
      return true;
    }

  };
  //-------------------------------------------
  //Method that compares the letter in the word with the letter input
  this.foundTheLetter = function(guessedLetter) {
    var whatToReturn = 0;
    //iterates through each letter to see if it matches the guessed letter
    this.letters.forEach(function(ltr){
      if(ltr.letter === guessedLetter){
        ltr.show = true;
        whatToReturn++;
      }
    })
    //if guessLetter matches Letter property, the letter object should be shown
    return whatToReturn;
  };

  //------------------------------------------
  //Method that display the word whether the letters in the word are found or not
  this.wordRender = function() {
    var display = '';
    that.letters.forEach(function(ltr){
      var currentLetter = ltr.letterin();
      display+= currentLetter;
    });

    return display;
  };
}

module.exports = Word;