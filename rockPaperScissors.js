
const MAX_SCORE = 3
const choices = {
  'Rock': 'Scissors',
  'Paper': 'Rock',
  'Scissors': 'Paper'
}
let gameVars = {
  playerButtons: null,
  playerScoreElement: null,
  playerScore: 0,
  computerScoreElement: null,
  computerScore: 0,
  rounds: 0,
  outputDOM: null,
}

/**
 * Helper function to select a 'Rock' 'Paper' or 'Scissors' and returns the selection
 *
 * @returns {String} one of 'Rock', 'Paper', or 'Scissors'
 */
function computerPlay() {
  return Object.keys(choices)[Math.floor(Math.random() * 3)]
}

/**
 * Plays a round of Rock Paper Scissors. Takes the player's and computer's selections, ensures those selections
 * are valid, and then calls the appropriate score handler based on who won the round. 
 *
 * @param {String} playerSelection The player's choice
 * @param {String} computerSelection The computer's choice
 */
function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.substring(0, 1).toUpperCase() + playerSelection.substring(1).toLowerCase()
  if (!choices.hasOwnProperty(playerSelection)) {
    // player didn't enter a valid choice
    console.log(`${playerSelection} isn't a valid choice!`)
    // throw error?
  }
  if (choices[playerSelection] == computerSelection) {
    // player wins the round
    scoreKeeper(1)
  } else if (choices[computerSelection] == playerSelection) {
    // computer wins the round
    scoreKeeper(-1)
  } else {
    // must have selected the same thing, tie.
    displayText(`You both chose ${computerSelection} - tie!`)
    scoreKeeper(0)
  }
  gameVars.rounds += 1
  checkWin()
}

/**
 * Keeps game score, and is responsible for updating the scoreboard
 * Called on each round where the result is not a tie
 *
 * @param {Number} roundScore positive number adds to the player score, negative to the computer's score
 */
function scoreKeeper(roundScore) {
  if (roundScore < 0) {
    gameVars.computerScore += Math.abs(roundScore)
    displayScores(gameVars.computerScoreElement, gameVars.computerScore)
    displayText('Computer earned a point!')
  } else if (roundScore > 0) {
    gameVars.playerScore += roundScore
    displayScores(gameVars.playerScoreElement, gameVars.playerScore)
    displayText('Player earned a point!')
  } else {
    // zero - do nothing at this time
  }
}

/**
 * Checks to see if a win condition has been reached - Game will play to the best of
 * MAX_SCORE
 */
function checkWin() {
  if (gameVars.playerScore === MAX_SCORE || gameVars.computerScore === MAX_SCORE) {
    gameVars.playerButtons.forEach((button) => {
      button.setAttribute('disabled', 'true')
    })
    if (gameVars.playerScore > gameVars.computerScore) {
      // player won
      displayText(`You won in ${gameVars.rounds} rounds!`)
    } else {
      displayText(`The computer won in ${gameVars.rounds} rounds!`)
    }
  }
}

/**
 * Helper function to update the scoreboard.
 *
 * @param {Element} element The DOM element to update the score value within
 * @param {Number} score The score value to place
 */
function displayScores(element, score) {
  element.innerText = score
}

/**
 * Helper function to add game progress text to the page.
 *
 * @param {String} text Complete text string to be placed at the bottom of the page
 */
function displayText(text) {
  let element = document.createElement('p')
  element.innerText = text
  element.classList.add('gameFeedbackText')
  gameVars.outputDOM.appendChild(element)
}

/**
 * Resets the game's scores, re-enables the gameplay buttons (if necessary),
 * clears the game progress text, and displays a message about the new game state.
 */
function resetGame() {
  gameVars.playerScore = 0
  displayScores(gameVars.playerScoreElement, gameVars.playerScore)
  gameVars.computerScore = 0
  displayScores(gameVars.computerScoreElement, gameVars.computerScore)
  gameVars.rounds = 0
  gameVars.playerButtons.forEach((button) => {
    button.removeAttribute('disabled')
  })
  // gather all existing game feedback text elements on the page (can vary game to game)
  let gameTextElements = document.querySelectorAll('.gameFeedbackText')
  gameTextElements.forEach((element) => {
    gameVars.outputDOM.removeChild(element)
  })
  displayText('New game!')
}

/**
 * Runs at the beginning of the page load, initializing event handlers and grabbing
 * relevant game DOM element references and storing them locally for quick reuse later.
 * Finally calls resetGame() to start up the first round of the game and enable player buttons.
 */
function setupGameActions() {
  gameVars.playerButtons = document.querySelectorAll('.player-button')
  gameVars.playerButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      playRound(button.value, computerPlay())
    })
  })
  let resetButton = document.querySelector('#reset-button')
  resetButton.addEventListener('click', (e) => {
    resetGame()
  })
  gameVars.outputDOM = document.querySelector('#console-output')
  gameVars.playerScoreElement = document.querySelector('#player-score')
  gameVars.computerScoreElement = document.querySelector('#computer-score')
  resetGame()
}

// Set up game as soon as the page has finished loading.
window.onload = setupGameActions
