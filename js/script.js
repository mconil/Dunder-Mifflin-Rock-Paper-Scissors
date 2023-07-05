const ApiKey="I4auq0KM81b9dUuXLsPUqlWTmoVlouHL";
const WebUrl="https://developers.giphy.com"


$(document).ready(function() {
var choices = [
    {
        name: 'rock',
        emoji: '🪨',
        
    },
    {
        name: 'paper',
        emoji: '📄',
        
    },
    {
        name: 'scissors',
        emoji: '✂️',
       
    }
    
]

    $(".choiceBtn").click(function() {
      var userChoice = $(this).attr(".select-id");
      var computerChoice = choices[Math.floor(Math.random() * choices.length)];
  
      var result = determineWinner(userChoice, computerChoice);
      
      $("#score").text(result);  
      $("#computerscore").text(result);

    })
  
    function determineWinner(userChoice, computerChoice) {
      if (userChoice === computerChoice) {
        return "It's a tie!";
      } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
      ) {
        return "Dunder Mifflin wins!";
        //insert ajax gif as an alert
      } else {
        return "Staples Inc wins!";
        //inset ajax gif as an alert 
      }
    }
})