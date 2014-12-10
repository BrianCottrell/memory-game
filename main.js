/* Memory Game            */
/* by Brian Cottrell      */
/* 10-07-2014             */

/*VARIABLES*/
var rows = 10;						//Sets number of rows on game board
var columns = 10;					//Sets number of columns on game board
var memorySquares = 20;				//Sets number of occupied boxes to remember
var spacing = 0.4					//Sets the spacing between boxes
var sideLength = (50.0)/columns-0.4;//Edge length of each box
var gameStarted = false;			//Indicates when game has started
var match = false;					//Indicates if box selected is correct
var misses = 0;						//Number of incorrect guesses
var board = [];						//Create an array to store boxed
var memoryArray = [];				//Stores occupied boxes to remember
var selectedArray = [];				//Stores boxes selected by user
var originalColor = '#000000';		//Store a backround color to be temporarily changed
var docFrag = document.createDocumentFragment();
board.length = rows*columns;		//Make box array large enough to fit the total number of boxes
memoryArray.length = memorySquares;
/*FUNCTIONS*/
//Set up the game board with the specified number of rows
function setBoard(){	
	for(var i = 0; i < board.length; i++){
		board[i] = document.createElement('div');
		board[i].classList.add('box');
		board[i].style.padding = sideLength.toString()+'%';
		board[i].style.margin = spacing.toString()+'%';
		if(i%columns == 0){
			board[i].classList.add('clearboth');
		}
		docFrag.appendChild(board[i]);
		board[i].addEventListener('mouseover', addFocus, false);
		board[i].addEventListener('mouseout', removeFocus, false);
		board[i].addEventListener('click', selectBox, false);
	}
	document.getElementsByClassName('outerdiv')[0].appendChild(docFrag);
	document.getElementsByTagName('button')[0].addEventListener('click', startGame, false);
	document.getElementsByTagName('button')[1].addEventListener('click', reset, false);
}
//Randomly select boxes to memorize
function setBoxes(){
	for(var i = 0; i < memoryArray.length; i++){
		memoryArray[i] = Math.floor(Math.random()*board.length)
		board[memoryArray[i]].style.backgroundColor = '#880000';
		for(var j = 0; j < i; j++){
			if(memoryArray[i] == memoryArray[j]){
				i--;
			}
		}
	}
}
function reset(){
	gameStarted = false;			//Indicates when game has started
	match = false;					//Indicates if box selected is correct
	misses = 0;						//Number of incorrect guesses
	board = [];						//Create an array to store boxed
	memoryArray = [];				//Stores occupied boxes to remember
	selectedArray = [];				//Stores boxes selected by user	
	board.length = rows*columns;	//Make box array large enough to fit the total number of boxes
	memoryArray.length = memorySquares;
	var containerDiv = document.getElementsByClassName('outerdiv')[0];
	while (containerDiv.hasChildNodes()) {
	    containerDiv.removeChild(containerDiv.lastChild);	//Removes all boxes from the board
	}
	setBoard();
	setBoxes();
}
function addFocus(){
	originalColor = this.style.backgroundColor;
	this.style.backgroundColor = '#224400';
}
function removeFocus(){
	this.style.backgroundColor = originalColor;
}
function selectBox(){
	if(gameStarted){
		for(var i = 0; i < selectedArray.length; i++){
			if(selectedArray[i] == board.indexOf(this)){
				match = true;
			}
		}
		if(!match){
			for(var i = 0; i < memoryArray.length; i++){
				if(memoryArray[i] == board.indexOf(this)){
					match = true;
				}
			}
			this.style.backgroundColor = '#FFFF00';
			misses++;
			if(match){
				this.style.backgroundColor = '#880000';
				misses--;
			}
			originalColor = this.style.backgroundColor;
			selectedArray.push(board.indexOf(this));
			document.getElementsByTagName('h1')[1].innerHTML = misses;
		}
		match = false;	
	}
}
function startGame(){
	for(var i = 0; i < board.length; i++){
		board[i].style.backgroundColor = '#000044';
	}
	gameStarted = true;
}
/*PROGRAM*/
setBoard();
setBoxes();