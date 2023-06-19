//! ------- All variables ---------
let pokemonBalls = document.querySelectorAll(".ball");
let showPokemon = document.querySelector("#pokemonShow");
let pickMonsters = ["./public/images/bulbasaur.png","./public/images/squirtle.png", "./public/images/charmander.png"]
let startGame = document.querySelector("#startGame");
//! ------------ Event listener -------

//------------ Pick a pokemon monster -------
pokemonBalls.forEach( (ball, index) =>{
    ball.addEventListener("click", ()=>{
        monsterPopUp(ball, index);
        ball.addEventListener("animationend", ()=>{
            ball.classList.remove("ball-scale"); 
        })
    })
})

//! ------------ Function -------------

// ------------- Show a pokemon --------
function monsterPopUp(ball, index){
    ball.classList.add("ball-scale");
        startGame.classList.remove("d-none");
        if(showPokemon.firstElementChild.className =="monster"){
            showPokemon.firstElementChild.remove();
        }
        showPokemon.insertAdjacentHTML("afterbegin",`
        <img class="monster" src=${pickMonsters[index]} alt="bulbasaur">
        `)
}

//! ------------ Animation ------------