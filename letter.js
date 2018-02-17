var letter = function(ltr) {
    
    // property that stores the actual letter
    this.current = "_"
    this.theLetters = ltr;
    this.showsLetter = false;
    this.letterin = function(){
    	if(this.theLetters == ' '){
    		this.showsLetter = true;
            return '  ';
    	} if(this.showsLetter === false) {
            return ' _ '; 
        } else {
            return this.theLetters;
        }
    };

};

// export the constructor
module.exports = letter;







