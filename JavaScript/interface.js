const game_Board  = document.getElementById("gameBoard");
const ranking_Top = document.getElementById("rankingTop");

let game_Over    = document.getElementById("gameOver");

const name_Front = "card-Front";
const name_Back  = "card-Back";
const name_Class = "card";

let flip_Removed = false;

let playing_Hours   = 0;
let playing_Minutes = 0;
let playing_Seconds = 0;

let result_Seconds = 0;
let result_Minutes = 0;
let result_Hours = 0;

let register_stopWatch;

const stopWatch = () =>{

    playing_Seconds ++;

    var verify_Seconds = playing_Seconds < 10 ? result_Seconds = "0" + playing_Seconds : result_Seconds = playing_Seconds;
    var verify_Minutes  = playing_Minutes < 10 ? result_Minutes = "0" + playing_Minutes : result_Minutes = playing_Minutes; 

    if (playing_Seconds === 60) {

        playing_Seconds = 0;
        playing_Minutes++;

    }

    if (playing_Minutes === 60){

        playing_Seconds = 0;
        playing_Minutes = 0;    
        playing_Hours++;

    }

    register_stopWatch = result_Hours + ":" + result_Minutes + ":" + result_Seconds

    return register_stopWatch;

}

const registerTimeOfUsually = () => {


    let paragraph_Time = stopWatch();
    let paragraph_Arm = document.createElement("p");
    
    paragraph_Arm.innerHTML = "Your Time was: " + paragraph_Time

    game_Over.appendChild(paragraph_Arm);

}

const startGame = () =>{
    
    gameNatives.cards_Content = gameNatives.createCardsPairs();
    
    gameNatives.shuffleCards(gameNatives.cards_Content)
        	
    initializeCards(gameNatives.cards_Content)
}

startGame();

function initializeCards(info_Cards){

    game_Board.innerHTML = ""

    setTimeout(() =>{

        setInterval(stopWatch, 1000);

     }, 2000)

    info_Cards.forEach(pos_Index => {
        
        let cards_Element = document.createElement("div"); 

        cards_Element.classList.add(name_Class);
        cards_Element.id = pos_Index.id;
     
        game_Board.appendChild(cards_Element);
        
        createCardsInScreen(pos_Index, cards_Element);

        addEventListener("DOMContentLoaded", 

            cards_Element.classList.add("flip")
            
        )

        setTimeout(() =>{

            cards_Element.classList.remove("flip");
            
            cards_Element.addEventListener("click", flipCards);


        }, 2000)

        
    }) 
    
}

function createCardsInScreen(icons,element){

    createFaceCards(name_Front, icons, element);
    createFaceCards(name_Back, icons, element);

}

function createFaceCards(face, icons ,element){

    let cardFace_Element = document.createElement("div");
    cardFace_Element.classList.add(face);

    if (face == name_Front){
        
        var image_Element = document.createElement('img');
        image_Element.src = "./assets/images/" + icons.icon + ".png";

        cardFace_Element.appendChild(image_Element);

    }
    
    else{

        cardFace_Element.innerHTML = "&lt/&gt";

    }

    element.appendChild(cardFace_Element);
    
}

function flipCards(){
    
    if(gameNatives.verifyClickInCards(this.id)){
        
        this.classList.add("flip");
        
        if (gameNatives.second_Cards){

            if(gameNatives.verifyCardsIsPairs()){

                gameNatives.clearCards();
                
                if (gameNatives.verifyPlayerIsWinner()){

                    game_Over.style.display = "flex";
                    registerTimeOfUsually();

                }

            }

            else{

                setTimeout(() => {

                    const first_Cards  = document.getElementById(gameNatives.first_Cards.id);
                    const second_Cards = document.getElementById(gameNatives.second_Cards.id);

                    first_Cards.classList.remove("flip");
                    second_Cards.classList.remove("flip");
                    
                    gameNatives.unflipCards();

                },1000)

                
            }


        }

    }

}

const restartGame = () =>{

    gameNatives.clearCards();
    startGame();

    game_Over.style.display = "none";

    
}