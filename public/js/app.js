//! ------- All variables ---------
let pickPokemonPhase = document.querySelector("#firstPhase");
let battleContainer = document.querySelector("#battleContainer");
let pokemonBalls = document.querySelectorAll(".ball");
let showPokemon = document.querySelector("#pokemonShow");
let pickMonsters = [
  "./public/images/bulbasaur.png",
  "./public/images/squirtle.png",
  "./public/images/charmander.png",
];
let monsterGifs = [
  "./public/images/bulbasaur-animation.gif",
  "./public/images/squirtle-animation.gif",
  "./public/images/charmander.animation.gif",
];
let startGame = document.querySelector("#startGame");
let listOfAttack = document.querySelectorAll(".attack");
let indexOfMonster;
//! ------------ Event listener -------

//------------ Pick a pokemon monster -------
pokemonBalls.forEach((ball, index) => {
  ball.addEventListener("click", () => {
    indexOfMonster = index;
    monsterPopUp(ball, index);
    // -------------- Remove the animation of the ball ----------
    ball.addEventListener("animationend", () => {
      ball.classList.remove("ball-scale");
    });
  });
});

startGame.addEventListener("click", () => {
  pickPokemonPhase.classList.add("d-none");
  battleContainer.classList.remove("d-none");
  heroEnter();
});

listOfAttack.forEach(attack =>{
    attack.addEventListener("click", ()=>{
        if(attack.id == "tackleAttack"){
            console.log(tabHero[indexOfMonster]);
            tabHero[indexOfMonster].tackle();
            console.log(pidgeotto);
        } else if(attack.id == "tailWhipeAttack"){
            tabHero[indexOfMonster].tailWhipe();
            console.log(tabHero[indexOfMonster]);
            console.log(pidgeotto);
        }
    })
})

//! ------------ Function -------------

// ------------- Show a pokemon --------
function monsterPopUp(ball, index) {
  ball.classList.add("ball-scale");
  startGame.classList.remove("d-none");
  if (showPokemon.firstElementChild.className == "monster") {
    showPokemon.firstElementChild.remove();
  }
  showPokemon.insertAdjacentHTML(
    "afterbegin",
    `
        <img class="monster" src=${pickMonsters[index]} alt="bulbasaur">
    `
  );
}

// ------------- Enter a hero monster to the field --------
function heroEnter() {
  let monsterHero = document.querySelector(".hero");
  let monsterVillain = document.querySelector(".villain");
  monsterHero.src = monsterGifs[indexOfMonster];
  monsterHero.classList.add("hero-enter");
  monsterVillain.classList.add("villain-enter");
}

//! ------------ Class of Hero Villain ------------

class Monster{
    constructor(name, attack, initiative, hp){
        this.name = name;
        this.attack = attack;
        this.initiative = initiative;
        this.hp = hp;
    }
}

class Hero extends Monster{
    constructor(name ,attack, initiative, hp){
        super(name ,attack, initiative, hp)
    }

    tackle(){
        pidgeotto.hp -= (this.attack*1.25);
    }

    tailWhipe(){
        this.hp += (this.hp * 0.25);
        pidgeotto.hp -= (this.attack*0.25);
    }
}

class Villain extends Monster{
    constructor(name ,attack, initiative, hp){
        super(name ,attack, initiative, hp)
    }


}

//---------- hero monsters ------
let squirtle = new Hero("squirtle", 80, 1, 300);
let charmander = new Hero("charmander",100, 1, 300);
let bulbasaur = new Hero("bulbasaur",70, 1, 300);

let tabHero = [bulbasaur, squirtle, charmander];
//--------- villain monster -----
let pidgeotto = new Villain("pidgeotto",65, 1, 500);

