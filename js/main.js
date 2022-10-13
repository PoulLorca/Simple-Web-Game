'use strict'

document.addEventListener("DOMContentLoaded", ()=>{
    
    let animals = ["Waramel","Shelpecker","Magmeleon"];
    let attacks = ["Fire🔥","Water🌊","Grass🌱"];
    
    let btnSelectAnimal  = document.getElementById('btnSelectAnimal');    

    let btnFire = document.getElementById("btnFire");
    let btnWater = document.getElementById("btnWater");
    let btnGrass = document.getElementById("btnGrass");
    
    let human = {
        animal:"",
        lives:0,
        attack:"",
    }

    let computer = {
        animal:"",
        lives:0,
        attack:"",
    }
    

    /* Animal Selection */
    btnSelectAnimal.addEventListener('click',()=>{
        try{
            //player's animal
            let indexPlayer = document.querySelector('input[name="animal"]:checked').value;
            human.animal = chooseAnimal(indexPlayer);                       
            human.lives = 3;
            document.getElementById("playerAnimal").innerHTML = human.animal;            
            document.getElementById("playerLives").innerHTML = human.lives;
            //computer's animal
            let indexComputer = random(0,2);
            computer.animal = chooseAnimal(indexComputer);
            computer.lives = 3;
            document.getElementById("computerAnimal").innerHTML = computer.animal;
            document.getElementById("computerLives").innerHTML = computer.lives;
        }catch{
            alert("Choose one!")
        }                
    })      
    
    function chooseAnimal(index){
        return animals[index];
    }

    /*Select attack*/
    btnFire.addEventListener('click',()=>{              
        human.attack = attacks[0];
        computer.attack = randomAttack();               
        Combat();
        
    })    

    btnWater.addEventListener('click',()=>{              
        human.attack = attacks[1];
        computer.attack = randomAttack();        
        Combat();
    })    

    btnGrass.addEventListener('click',()=>{              
        human.attack = attacks[2];
        computer.attack = randomAttack();        
        Combat();
    })    

    function randomAttack(){
        let indexComputer = random(0,2);
        return attacks[indexComputer];
    }

    function Combat(){
        if (!human.animal || !computer.animal){
            alert("First choose an animal");            
            return; //Finish execution
        }
        let result;
        if(human.attack == computer.attack){
            result =  "Draw 😐"
        } else if(human.attack == attacks[0] && computer.attack == attacks[2]){
            result = "You win 👍"            
        }else if (human.attack == attacks[1] && computer.attack == attacks[0]){
            result = "You win 👍"
        }else if (human.attack == attacks[2] && computer.attack == attacks[1]){
            result = "You win 👍"
        }else{
            result = "You lose 👎"        
        }

        printAttack(human.attack, computer.attack, result);
    }


    function printAttack(humanAttack, computerAttack, result){
        let text = document.createElement('p');
        text.innerHTML = `You are used ${humanAttack} - Your enemy Used ${computerAttack} - Result: ${result}`  //- Congrats You win 🎉
        document.getElementById("message").appendChild(text);
    }

})

function random(min, max){
    return Math.floor(Math.random()*(max-min+1) + min);
}