'use strict'

document.addEventListener("DOMContentLoaded", () => {

    let animals = ["Waramel", "Shelpecker", "Magmeleon"];
    let attacks = ["Fire🔥", "Water🌊", "Grass🌱"];

    let btnSelectAnimal = document.getElementById('btnSelectAnimal');

    let btnFire = document.getElementById("btnFire");
    let btnWater = document.getElementById("btnWater");
    let btnGrass = document.getElementById("btnGrass");

    let btnRestart = document.getElementById("btnRestart");

    let combatStats = document.getElementById("combatStats")

    let human = {
        animal: "",
        lives: 0,
        attack: "",
    }

    let computer = {
        animal: "",
        lives: 0,
        attack: "",
    }

    /*Default states*/
    combatStats.style.display = 'none';

    /* --> ACTIONS <-- */    

    /* Animal Selection */
    btnSelectAnimal.addEventListener('click', () => {
        
        try {            
            //player's animal
            let indexPlayer = document.querySelector('input[name="animal"]:checked').value;
            human.animal = chooseAnimal(indexPlayer);
            human.lives = 3;

            //computer's animal
            let indexComputer = random(0, 2);
            computer.animal = chooseAnimal(indexComputer);
            computer.lives = 3;

            printAnimals();
            printLives();
            //Display combat stats
            combatStats.style.display = 'block';

        } catch {
            alert("Choose one!")
        }
    })


    /*Select attack*/
    btnFire.addEventListener('click', () => {
        human.attack = attacks[0];
        computer.attack = randomAttack();
        Combat();

    })

    btnWater.addEventListener('click', () => {
        human.attack = attacks[1];
        computer.attack = randomAttack();
        Combat();
    })

    btnGrass.addEventListener('click', () => {
        human.attack = attacks[2];
        computer.attack = randomAttack();
        Combat();
    })


    /*  combat logic  */
    function Combat() {
        if (!human.animal || !computer.animal) {
            alert("First choose an animal");
            return; //Finish execution
        }

        let result;
        if (human.attack == computer.attack) {
            result = "Draw 😐"
        } else if (human.attack == attacks[0] && computer.attack == attacks[2]) {
            result = "You win 👍"
            computer.lives -= 1;
        } else if (human.attack == attacks[1] && computer.attack == attacks[0]) {
            result = "You win 👍"
            computer.lives -= 1;
        } else if (human.attack == attacks[2] && computer.attack == attacks[1]) {
            result = "You win 👍"
            computer.lives -= 1;
        } else {
            result = "You lose 👎"
            human.lives -= 1;
        }

        printAttack(human.attack, computer.attack, result);
        printLives();

        if (human.lives == 0 || computer.lives == 0) {
            if (human.lives > computer.lives) {
                alert("Congrats You win 🎉")
            } else {
                alert("Sorry you lose 👻")
            }
            disableButtons(true);
        }

    }

    /*Restart */
    btnRestart.addEventListener('click', () => {
        location.reload();
    })


    /* --> FUNCTIONS <--*/
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function chooseAnimal(index) {
        return animals[index];
    }

    function randomAttack() {
        let indexComputer = random(0, 2);
        return attacks[indexComputer];
    }

    function printAnimals() {
        document.getElementById("playerAnimal").innerHTML = human.animal;
        document.getElementById("computerAnimal").innerHTML = computer.animal;
    }

    function printLives() {
        document.getElementById("playerLives").innerHTML = human.lives;
        document.getElementById("computerLives").innerHTML = computer.lives;
    }

    function printAttack(humanAttack, computerAttack, result) {
        let text = document.createElement('p');
        text.innerHTML = `You are used ${humanAttack} - Your enemy Used ${computerAttack} - Result: ${result}`
        document.getElementById("message").appendChild(text);
    }

    function disableButtons(state) {
        btnFire.disabled = state;
        btnWater.disabled = state;
        btnGrass.disabled = state;
    }

})
