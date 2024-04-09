const choices = ["KŐ","PAPÍR","OLLÓ"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
let playerScore = 0;
let computerScore = 0;

let playerHealth = 100;
let computerHealth = 100;

function playGame(playerChoice){
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    playerDisplay.innerHTML = `JÁTÉKOS: ${playerChoice} ${getEmoji(playerChoice)}`;
    computerDisplay.innerHTML = `GÉP: ${computerChoice} ${getEmoji(computerChoice)}`;

    if(playerChoice === computerChoice) {
        result = "DÖNTETLEN!";
    } else {
        switch(playerChoice){
            case "KŐ":
                result = (computerChoice === "OLLÓ") ? "NYERTÉL!" : "VESZTETTÉL!";
                break;
            case "PAPÍR":
                result = (computerChoice === "KŐ") ? "NYERTÉL!" : "VESZTETTÉL!";
                break;
            case "OLLÓ":
                result = (computerChoice === "PAPÍR") ? "NYERTÉL!" : "VESZTETTÉL!";
                break;
        }
    }

    handleRoundOutcome(playerChoice, computerChoice);

    resultDisplay.textContent = result;
    resultDisplay.classList.remove("greenText","redText")

    switch(result){
        case "NYERTÉL!":
            resultDisplay.classList.add("greenText");
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            break;
        case "VESZTETTÉL!":
            resultDisplay.classList.add("redText");
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            break;
    }
    checkGameOver();
}

function getEmoji(choice) {
    switch(choice) {
        case "KŐ":
            return "🪨";
        case "PAPÍR":
            return "🧻";
        case "OLLÓ":
            return "✂️";
        default:
            return "";
    }
}

function updateHealthBars() {
    const playerHealthBar = document.getElementById('player-health-bar');
    const computerHealthBar = document.getElementById('computer-health-bar');

    playerHealthBar.style.width = playerHealth + '%';
    computerHealthBar.style.width = computerHealth + '%';

    if (playerHealth < 30) {
        document.getElementById('player-character').classList.add('low-health');
    } else {
        document.getElementById('player-character').classList.remove('low-health');
    }
    if (computerHealth < 30) {
        document.getElementById('computer-character').classList.add('low-health');
    } else {
        document.getElementById('computer-character').classList.remove('low-health');
    }
}
function updatePlayerHealth(amount) {
    playerHealth += amount;
    if (playerHealth > 100) {
        playerHealth = 100; m
    }
    updateHealthBars();
}
function updateComputerHealth(amount) {
    computerHealth += amount;
    if (computerHealth > 100) {
        computerHealth = 100;
    }
    updateHealthBars();
}

function handleRoundOutcome(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
    } else {
        if (
            (playerChoice === "KŐ" && computerChoice === "OLLÓ") ||
            (playerChoice === "PAPÍR" && computerChoice === "KŐ") ||
            (playerChoice === "OLLÓ" && computerChoice === "PAPÍR")
        ) {
            updateComputerHealth(-20);
        } else {
            updatePlayerHealth(-20);
        }
    }
}
function checkGameOver() {
    if (playerHealth <= 0 || computerHealth <= 0) {
        setTimeout(() => {
            let winner = playerHealth > computerHealth ? "Az ember" : "A gép";
            updateBackground(winner);
            alert(`${winner} diadalmaskodott!`);
            playerHealth = 100;
            computerHealth = 100;
            updateHealthBars();
        }, 200);
    }
}
function updateBackground(winner) {
    const body = document.querySelector('body');
    if (winner === 'Az ember') {
        body.style.backgroundImage = "url('romanempire.jpg')";
    } else if (winner === 'A gép') {
        body.style.backgroundImage = "url('cyber.jpg')";
    } else {
        body.style.backgroundImage = "url('background.jpg')";
    }
}