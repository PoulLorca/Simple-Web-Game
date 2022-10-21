'use strict'

document.addEventListener("DOMContentLoaded", () => {

    const animals = ["Waramel", "Shelpecker", "Magmeleon"];
    const attacks = ["Fire 🔥", "Water🌊", "Grass🌱"];

    const btnSelectAnimal = document.getElementById('btnSelectAnimal');

    const ConteinerAttackButtons = document.getElementById("ConteinerAttackButtons");
 
    const btnRestart = document.getElementById("btnRestart");

    const combatStats = document.getElementById("combatStats")

    const contentSelectionBox = document.getElementById("contentSelectionBox");
    

    let waramel;
    let shelpecker;
    let magmeleon;

    let btnFire;
    let btnWater;
    let btnGrass;

    let Creatures = [];
    let SelectionCard;
    let ButtonAttack;

    class Animal {
        constructor(name, picture, type, lives) {
            this.name = name;
            this.picture = picture;
            this.type = type;
            this.lives = lives;
            this.attacks = [];
        }
    }

    let Waramel = new Animal('waramel', './assets/img/Waramel.png', '🔥', 5);
    let Shelpecker = new Animal('shelpecker', './assets/img/Shelpecker.png', '🌊', 5);
    let Magmeleon = new Animal('magmeleon', './assets/img/Magmeleon.png', '🌱', 5);

    Waramel.attacks.push(
        { icon: '🔥', name: 'Fire' , id: 'btnFire' },
        { icon: '🌊', name: 'Water' ,id: 'btnWater' },
        { icon: '🌱',  name: 'Grass' ,id: 'btnGrass' }
    )

    Shelpecker.attacks.push(
        { icon: '🔥', name: 'Fire' , id: 'btnFire' },
        { icon: '🌊', name: 'Water' ,id: 'btnWater' },
        { icon: '🌱',  name: 'Grass' ,id: 'btnGrass' }
    )

    Magmeleon.attacks.push(
        { icon: '🔥', name: 'Fire' , id: 'btnFire' },
        { icon: '🌊', name: 'Water' ,id: 'btnWater' },
        { icon: '🌱',  name: 'Grass' ,id: 'btnGrass' }        
    )

    Creatures.push(Waramel, Shelpecker, Magmeleon);

    Creatures.forEach(creature => {
        SelectionCard =
            `
        <button class="card" id="${creature.name}">
                    <span>${creature.type}</span>
                    <label for="${creature.name}">${capitalizeFirstLetter(creature.name)}</label>
                    <img src="${creature.picture}" alt="${creature.name}">
                </button>
        `

        contentSelectionBox.innerHTML += SelectionCard;

        waramel = document.getElementById("waramel");
        shelpecker = document.getElementById("shelpecker");
        magmeleon = document.getElementById("magmeleon");
    });

    class Player {
        constructor() {
            this.creature;
            this.attack = "";
        }
    }

    let human = new Player();
    let computer = new Player();


    //Default states
    combatStats.style.display = 'none';

    // --> ACTIONS <--   

    // Animal Selection       

    let btnsCreatures = document.querySelectorAll('.card');

    btnsCreatures.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let path = e.composedPath()[1];            

            if (path != contentSelectionBox) {
                path.style.border = "2px solid red";

                Creatures.forEach(element => {

                    if (element.name == path.id) {
                        human.creature = element;
                    }
                });

            }

        })
    })


    btnSelectAnimal.addEventListener('click', () => {

        

        if (human.creature) {

            human.creature.attacks.forEach(element => {                
                ButtonAttack =
                `
                <button class="btnSelAttack" id="${element.id}" value=${element.name}>${element.name} ${element.icon}</button>
                `

                ConteinerAttackButtons.innerHTML += ButtonAttack;

                btnFire = document.getElementById("btnFire");
                btnWater = document.getElementById("btnWater");
                btnGrass = document.getElementById("btnGrass");

            });            

            let btnsAttack= document.querySelectorAll('.btnSelAttack');

            btnsAttack.forEach(element => {
                element.addEventListener('click',(e)=>{

                    switch(e.target.value){
                        case 'Fire':
                            human.attack =attacks[0];
                            break;
                        case 'Water':
                            human.attack = attacks[1];
                            break;
                        case 'Grass':
                            human.attack = attacks[2];
                            break;
                    }
                                        
                    computer.attack = randomAttack();
                    Combat()
                });
            });                

            //computer's animal
            let indexComputer = random(0, Creatures.length -1);
            computer.creature = chooseAnimal(indexComputer);

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

    //  combat logic  
    function Combat() {
        if (!human.creature || !computer.creature) {
            alert("First choose an animal");
            return; //Finish execution
        }

        let result;
        if (human.attack == computer.attack) {
            result = "Draw 😐"
        } else if (human.attack == attacks[0] && computer.attack == attacks[2]) {
            result = "You win 👍"
            computer.creature.lives -= 1;
        } else if (human.attack == attacks[1] && computer.attack == attacks[0]) {
            result = "You win 👍"
            computer.creature.lives -= 1;
        } else if (human.attack == attacks[2] && computer.attack == attacks[1]) {
            result = "You win 👍"
            computer.creature.lives -= 1;
        } else {
            result = "You lose 👎"
            human.creature.lives -= 1;
        }

        printAttack(human.attack, computer.attack, result);
        printLives();
        window.scrollTo(0, document.body.scrollHeight);

        if (human.creature.lives == 0 || computer.creature.lives == 0) {
            if (human.creature.lives > computer.creature.lives) {
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
        return Creatures[index];
    }

    function randomAttack() {
        let indexComputer = random(0, Creatures.length -1);
        return attacks[indexComputer];
    }

    function printAnimals() {
        document.getElementById("playerAnimal").innerHTML = capitalizeFirstLetter(human.creature.name);
        document.getElementById("computerAnimal").innerHTML = capitalizeFirstLetter(computer.creature.name);
    }

    function printLives() {
        document.getElementById("playerLives").innerHTML = human.creature.lives;
        document.getElementById("computerLives").innerHTML = computer.creature.lives;
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

    function capitalizeFirstLetter(str) {
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

        return capitalized;
    }


})
