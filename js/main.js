'use strict'

document.addEventListener("DOMContentLoaded", () => {

    let animals = ["Waramel", "Shelpecker", "Magmeleon"];
    let attacks = ["Fire 🔥", "Water🌊", "Grass🌱"];

    let btnSelectAnimal = document.getElementById('btnSelectAnimal');

    let waramel = document.getElementById("waramelCard");
    let shelpecker = document.getElementById("shelpeckerCard");
    let magmeleon = document.getElementById("magmeleonCard");


    let btnFire = document.getElementById("btnFire");
    let btnWater = document.getElementById("btnWater");
    let btnGrass = document.getElementById("btnGrass");

    let indexPlayer;

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

    //Default states
    combatStats.style.display = 'none';

    // --> ACTIONS <--   

    // Animal Selection 

    waramel.addEventListener('click',() =>{        
        waramel.style.border = "1px solid red";        
        indexPlayer=1;
    })

    shelpecker.addEventListener('click',()=>{
        shelpecker.style.border = "1px solid red";
        indexPlayer=2;
    })

    magmeleon.addEventListener('click',()=>{
        magmeleon.style.border = "1px solid red";
        indexPlayer=3;
    })


    btnSelectAnimal.addEventListener('click', () => {
        
        if(indexPlayer) {            
            
            //player's animal            
            human.animal = chooseAnimal(indexPlayer -1);
            human.lives = 3;

            //computer's animal
            let indexComputer = random(0, 2);
            computer.animal = chooseAnimal(indexComputer);
            computer.lives = 3;

            printAnimals();
            printLives();
                     
            //Display combat stats
            combatStats.style.display = 'flex';

            //go to the bottom
            window.scrollTo(0, document.body.scrollHeight);

        } else {
            alert("Choose one!")
        }
    })

    //Select attack
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


    //  combat logic  
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
        window.scrollTo(0, document.body.scrollHeight); 

        if (human.lives == 0 || computer.lives == 0) {
            if (human.lives > computer.lives) {
                alert("Congrats You win 🎉")
            } else {
                alert("Sorry you lose 👻")
            }
            disableButtons(true);
        }

    }

    // Restart 
    btnRestart.addEventListener('click', () => {
        location.reload();
    })


    // --> FUNCTIONS <--
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

        var resultado = document.getElementById("result");
        resultado.innerHTML = ` Result: ${result}`        
        document.getElementById("message").style.border = '3px solid black'        

        let attackUser = document.createElement("p");
        attackUser.innerHTML = `You are used ${humanAttack}`;
        document.getElementById("statsBodyUser").appendChild(attackUser);

        let attackComputer = document.createElement("p");
        attackComputer.innerHTML = `Anemy used ${computerAttack}`;
        document.getElementById("statsBodyComputer").appendChild(attackComputer);
    }

    function disableButtons(state) {
        btnFire.disabled = state;
        btnWater.disabled = state;
        btnGrass.disabled = state;
    }
    

})
