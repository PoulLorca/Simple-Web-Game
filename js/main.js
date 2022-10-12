'use strict'

document.addEventListener("DOMContentLoaded", ()=>{
    
    let btnSelectAnimal  = document.getElementById('btnSelectAnimal');
    let selectedAnimal;

    /* Animal Selection */
    btnSelectAnimal.addEventListener('click',()=>{
        try{
            selectedAnimal = document.querySelector('input[name="animal"]:checked').value;                        
            document.getElementById("playerAnimal").innerHTML = selectedAnimal;
        }catch{
            alert("Choose one!")
        }        
    })

    


})