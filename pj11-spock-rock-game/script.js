const playerScoreEl = document.getElementById("player-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerScoreEl = document.getElementById("computer-score");
const computerChoiceEl = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");

const playerRock = document.getElementById("player-rock");
const playerPaper = document.getElementById("player-paper");
const playerScissors = document.getElementById("player-scissors");
const playerLizard = document.getElementById("player-lizard");
const playerSpock = document.getElementById("player-spock");

const computerRock = document.getElementById("computer-rock");
const computerPaper = document.getElementById("computer-paper");
const computerScissors = document.getElementById("computer-scissors");
const computerLizard = document.getElementById("computer-lizard");
const computerSpock = document.getElementById("computer-spock");

const allGameIcons = document.querySelectorAll(".game-icon");

const choices = {
    rock: { name: "Rock", defeats: ["scissors", "lizard"] },
    paper: { name: "Paper", defeats: ["rock", "spock"] },
    scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
    lizard: { name: "Lizard", defeat: ["paper", "spock"] },
    spock: { name: "Spock", defeats: ["scissors", "rock"] }
};

// CONFETTI
const canvas = document.getElementById("confetti");
const jsConfetti = new JSConfetti();
jsConfetti.addConfetti({
    confettiColors: [
        '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
    ],
    confettiNumber: 5000,
});

// jsConfetti.addConfetti(); // Adds Confetti    
// jsConfetti.clearCanvas() // Clears Confetti

let computerChoice = "";
let playerScoreNumber = 0;
let computerScoreNumber = 0;


const resetAllScores = () => {
    playerScoreNumber = 0;
    computerScoreNumber = 0;
    playerScoreEl.textContent = playerScoreNumber;
    computerScoreEl.textContent = computerScoreNumber;
    playerChoiceEl.textContent = "";
    computerChoiceEl.textContent = "";
    resultText.textContent = "";
    resetClassSelected();
};

const updateScore = (playerChoice) => {
    if (playerChoice === computerChoice) {
        resultText.textContent = "It's a tie!";
    } else {
        const choice = choices[playerChoice];
        if (choice.defeats.indexOf(computerChoice) > -1) {
            jsConfetti.addConfetti();
            resultText.textContent = "You Won!";
            playerScoreNumber++;
            playerScoreEl.textContent = playerScoreNumber;
        } else {
            resultText.textContent = "You Lost!";
            computerScoreNumber++;
            computerScoreEl.textContent = computerScoreNumber;
        }
    }
};

const computerRandomChoice = () => {
    const computerChoiceNumber = Math.floor(Math.random() * 10);

    if (computerChoiceNumber <= 2) computerChoice = "rock";
    else if (computerChoiceNumber <= 4) computerChoice = "paper";
    else if (computerChoiceNumber <= 6) computerChoice = "scissors";
    else if (computerChoiceNumber <= 8) computerChoice = "lizard";
    else computerChoice = "spock";
};

const computerSelection = () => {
    switch (computerChoice) {
        case "rock":
            computerRock.classList.add("selected");
            computerChoiceEl.textContent = " -> Rock";
            break;
        case "paper":
            computerPaper.classList.add("selected");
            computerChoiceEl.textContent = " -> Paper";
            break;
        case "scissors":
            computerScissors.classList.add("selected");
            computerChoiceEl.textContent = " -> Scissors";
            break;
        case "lizard":
            computerLizard.classList.add("selected");
            computerChoiceEl.textContent = " -> Lizard";
            break;
        case "spock":
            computerSpock.classList.add("selected");
            computerChoiceEl.textContent = " -> Spock";
            break;
        default:
            break;
    }
};

const checkResults = (playerChoice) => {
    resetClassSelected();
    computerRandomChoice();
    computerSelection();
    updateScore(playerChoice);
};

const resetClassSelected = () => {
    allGameIcons.forEach(gameicon => gameicon.classList.remove("selected")
    )

    jsConfetti.clearCanvas();
};

const playerSelection = (playerChoice) => {
    resetClassSelected();
    checkResults(playerChoice);

    switch (playerChoice) {
        case "rock":
            playerRock.classList.add("selected");
            playerChoiceEl.textContent = " -> Rock";
            break;
        case "paper":
            playerPaper.classList.add("selected");
            playerChoiceEl.textContent = " -> Paper";
            break;
        case "scissors":
            playerScissors.classList.add("selected");
            playerChoiceEl.textContent = " -> Scissors";
            break;
        case "lizard":
            playerLizard.classList.add("selected");
            playerChoiceEl.textContent = " -> Lizard";
            break;
        case "spock":
            playerSpock.classList.add("selected");
            playerChoiceEl.textContent = " -> Spock";
            break;
        default:
            break;
    }
};

resetAllScores();

