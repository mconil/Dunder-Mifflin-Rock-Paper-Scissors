const ApiKey="I4auq0KM81b9dUuXLsPUqlWTmoVlouHL";
const image="https://api.giphy.com/v1/gifs/search?q=theoffice&api_key={I4auq0KM81b9dUuXLsPUqlWTmoVlouHL}&limit=10%22"


$(document).ready(function() {
   
    const selectedButtons = $('[data-selection]');
    const Results = $('[data-final-column]');
    const userChoice = $("#endResult");
    const computerChoice = $("#computerResult");
    const gameResult = $("#totalScore");
    const playerScoreBoard = $('[data-your-score]');
    const compScoreBoard = $('[data-computer-score]');
    
   
    const choices = [
      {
        name: 'rock',
        emoji: '🪨',
        defeats: 'scissors'
      },
      {
        name: 'paper',
        emoji: '📄',
        defeats: 'rock'
      },
      {
        name: 'scissors',
        emoji: '✂️',
        defeats: 'paper'
      }
    ];
    
    selectedButtons.on('click', function() {
      var playerChoice = $(this).data('selection');
      var selection = choices.find(function(selection) {
        return selection.name === playerChoice;
      });
      chooseSelection(selection);
    });
  

    function chooseSelection(selection) {
      userChoice.empty() 
      computerChoice.empty()
      gameResult.empty()
      const compChoice = randomComputerChoice();
      const victory = whoWins(selection, compChoice);
      const compWin = whoWins(compChoice, selection);
       
      
      if (compWin){
       addSelectionResult(compChoice, compWin);
       $.ajax({
        url:`https://api.giphy.com/v1/gifs/search?q=theoffice&api_key=I4auq0KM81b9dUuXLsPUqlWTmoVlouHL&limit=10%22`
      }).then (function(data){
        addVideoToScreen(data.data[17].images.original_mp4.mp4)
      }
   )}

      if(victory){
      addSelectionResult(selection, victory);
      $.ajax({
        url:`https://api.giphy.com/v1/gifs/search?q=theoffice&api_key=I4auq0KM81b9dUuXLsPUqlWTmoVlouHL&limit=10%22`
      }).then (function(data){
        addVideoToScreen(data.data[10].images.original_mp4.mp4)
      }
  )}

    if (victory) totalScore(playerScoreBoard);
    if (compWin) totalScore(compScoreBoard);
    
} 


    let addVideoToScreen = (image) =>{
        let $li = $(`<video autoplay src ="${image}" alt="the office"/>`);
       $("body").append($li);
     
    }
   

    function totalScore(scoreBoard) {
      scoreBoard.text(parseInt(scoreBoard.text()) + 1);
      $.ajax({
        url:`https://api.giphy.com/v1/gifs/search?q=theoffice&api_key=I4auq0KM81b9dUuXLsPUqlWTmoVlouHL&limit=10%22`
      }).then (function(data){
        //console.log(data);
      // addVideoToScreen(data.data[12].images.original_mp4.mp4)
     // }).scratch (function(data) {
       //addCompVideoToScreen(data.data[16].images.original_mp4.mp4)
      })
    }


    function whoWins(selection, opponentSelection) {
      return selection.defeats === opponentSelection.name;
    }
  

    function addSelectionResult(selection, winner) {
      const div = $('<div>').text(selection.emoji).addClass('userChoice');
      //const compDiv = $('<div>').text(compChoice.emoji).addClass('computerChoice');
      if (winner) div.addClass('winner');
      //if(winner) compDiv.addClass('winner')
      userChoice.append(div);
    // computerChoice.append(div);
    }

    // function addSelectionResult(compChoice,winner) {
    //   const compDiv = $('<div>').text(compChoice.emoji).addClass('computerChoice')  
    //   if (winner) compDiv.addClass('winner');
    //   computerChoice.append (compDiv);
    // }
  

    function randomComputerChoice() {
      var randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
    }
 })

 