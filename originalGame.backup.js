const choices = {
  'Rock': 'Scissors',
  'Paper': 'Rock',
  'Scissors': 'Paper'
}

function computerPlay() {
  return Object.keys(choices)[Math.floor(Math.random() * 3)]
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.substring(0, 1).toUpperCase() + playerSelection.substring(1).toLowerCase()
  if (!choices.hasOwnProperty(playerSelection)) {
    // player didn't enter a valid choice
    console.log(`${playerSelection} isn't a valid choice!`)
    return -2
    // throw error?
  }
  if (choices[playerSelection] == computerSelection) {
    // player wins
    console.log(`You win! ${playerSelection} beats ${computerSelection}!`)
    return 1
  } else if (choices[computerSelection] == playerSelection) {
    // computer wins
    console.log(`You lose! ${computerSelection} beats ${playerSelection}!`)
    return -1
  } else {
    // must have selected the same thing, tie.
    console.log(`You both chose ${computerSelection} - tie!`)
    return 0
  }
}

function game() {
  const rounds = 5
  let computerScore = 0
  let playerScore = 0

  console.log(`Playing ${rounds} rounds of Rock, Paper, Scissors!`)

  for (let i = 0; i < rounds; i += 1) {
    let roundScore = playRound(prompt('Selection?'), computerPlay())
    switch (roundScore) {
      case -2:
        console.log('Try again!')
        i -= 1
        break
      case -1:
        computerScore += 1
        console.log('Computer earned a point!')
        break
      case 1:
        playerScore += 1
        console.log('Player earned a point!')
        break
      default:
        break
    }
  }
  console.log('Game concluded!')
  console.log(`Scores: Computer: ${computerScore}, Player: ${playerScore}.`)
}
