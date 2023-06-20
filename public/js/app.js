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
let heroProgressBar = document.querySelector("#heroProgressBar");
let villainProgressBar = document.querySelector("#villainProgressBar");
let monsterHero = document.querySelector(".hero");
let monsterVillain = document.querySelector(".villain");
let heroHealthContainer = document.querySelector(".hero-health") ;
let villainHealthContainer = document.querySelector(".villain-health");
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

//------------ Start the game -------
startGame.addEventListener("click", () => {
  pickPokemonPhase.classList.add("d-none");
  battleContainer.classList.remove("d-none");
  heroEnter();
});

//------------ Pick an attack -------
listOfAttack.forEach(attack =>{
    attack.addEventListener("click", ()=>{
        if(attack.id == "tackleAttack"){
            tabHero[indexOfMonster].tackle(pidgeotto);
            monsterVillain.classList.add("monster-attacked");
            monsterHero.classList.remove("monster-attacked");
            // villainHealthContainer.classList.add("move-left-right");
          //-------------- Villain attack ----------------
            setTimeout(()=>{
              monsterVillain.classList.remove("monster-attacked");
              pidgeotto.hyperAttack(tabHero[indexOfMonster]);
              monsterHero.classList.add("monster-attacked");
            },2000)
            
        } else if(attack.id == "tailWhipeAttack"){
            tabHero[indexOfMonster].tailWhipe(pidgeotto);
            monsterVillain.classList.add("monster-attacked");
            monsterHero.classList.remove("monster-attacked");
            // villainHealthContainer.classList.add("move-left-right");
          //-------------- Villain attack ----------------  
            setTimeout(()=>{
              monsterVillain.classList.remove("monster-attacked");
              pidgeotto.hyperAttack(tabHero[indexOfMonster]);
              monsterHero.classList.add("monster-attacked");
            },2000)
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
  monsterHero.src = monsterGifs[indexOfMonster];
  // ----------- Hero enter animation ---------
  monsterHero.classList.add("hero-enter");
  monsterHero.addEventListener("animationend",()=>{
    monsterHero.classList.remove("hero-enter");
  })
  // ----------- Villain enter animation ----------
  monsterVillain.classList.add("villain-enter");
  monsterVillain.addEventListener("animationend",()=>{
    monsterVillain.classList.remove("villain-enter");
  })
}

// ------------ Start fight ------------

function controlHealthBar(target, health){
  // console.log(health.hp);
  if(health.hp <= 0){
    target.style.width = `0%`;
  }
  else if(health.hp <= 20){
    target.style.backgroundColor = "red";
  }
  else if(health.hp <= 50){
    target.style.backgroundColor = "yellow";
  }
  else if(health.hp >= 100){
    target.style.width = `100%`;
    health.hp = 100;
  }
  target.style.width = `${health.hp}%`;
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

// ---------- Hero class -------
class Hero extends Monster{
    constructor(name ,attack, initiative, hp){
        super(name ,attack, initiative, hp)
    }

    tackle(villain){
        villain.hp -= (this.attack*2);
        controlHealthBar(villainProgressBar, villain);
    }

    tailWhipe(villain){
      villain.hp -= this.attack*0.75;
      controlHealthBar(villainProgressBar, villain);
      this.hp += (this.hp * 0.15);
      controlHealthBar(heroProgressBar, this);
    }
}

// ---------- Villain class -------
class Villain extends Monster{
    constructor(name ,attack, initiative, hp){
        super(name ,attack, initiative, hp)
    }

    hyperAttack(hero){
      hero.hp -= this.attack; 
      controlHealthBar(heroProgressBar, hero);
    }
}

//---------- hero monsters ------
let squirtle = new Hero("squirtle", 10, 1, 100);
let charmander = new Hero("charmander",10, 1, 100);
let bulbasaur = new Hero("bulbasaur",10, 1, 100);

let tabHero = [bulbasaur, squirtle, charmander];
//--------- villain monster -----
let pidgeotto = new Villain("pidgeotto",15, 1, 100);

