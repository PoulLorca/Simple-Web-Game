'use strict'

document.addEventListener("DOMContentLoaded", ()=>{
    
    let animals = ["Waramel","Shelpecker","Magmeleon"];
    let attacks = ["Fire","Water","Grass"];
    
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
        showdata();        
    })    

    btnWater.addEventListener('click',()=>{              
        human.attack = attacks[1];
        computer.attack = randomAttack();
        showdata();        
    })    

    btnGrass.addEventListener('click',()=>{              
        human.attack = attacks[2];
        computer.attack = randomAttack();
        showdata();        
    })    

    function randomAttack(){
        let indexComputer = random(0,2);
        return attacks[indexComputer];
    }

    function showdata(){
        console.log(human);
        console.log(computer);
    }

})

function random(min, max){
    return Math.floor(Math.random()*(max-min+1) + min);
}