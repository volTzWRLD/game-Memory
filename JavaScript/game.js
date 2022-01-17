var gameNatives = {

    lock_Mode: false,

    first_Cards: null,
    second_Cards: null,

    current_Index: null,
    random_Index: null,
    cards_Elements: null,

    cards_Content: null,

    techs_Used: [

        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react",

    ],

    verifyClickInCards: function(id){

        const cards_Filtered = this.cards_Content.filter(content => content.id === id)[0];

        if(this.lock_Mode || cards_Filtered.flipped){

            return 

        }

        if (!this.first_Cards){

            this.first_Cards = cards_Filtered;
            this.first_Cards.flipped = true;

            return true;

        }else{

            this.second_Cards = cards_Filtered;
            this.second_Cards.flipped = true;
            this.lock_Mode = true;

            return true;
        }


    },

    verifyCardsIsPairs: function(){

        if(this.first_Cards.icon !== this.second_Cards.icon){

            return false

        }

        return this.first_Cards.icon === this.second_Cards.icon

    },

    verifyPlayerIsWinner: function(){

        return this.cards_Content.filter(flipped => !flipped.flipped).length == 0;
    
    },

    clearCards: function(){

        this.first_Cards  = null;
        this.second_Cards = null;
        this.lock_Mode    = false;

    },

    unflipCards: function(){

        this.first_Cards.flipped  = false;
        this.second_Cards.flipped = false;

        this.clearCards();

    },

    createCardsPairs: function(){

        let cards_Arm = [];

        for(let i of this.techs_Used){

            cards_Arm.push(this.createIdentityCards(i))
            
        }   
        
        return cards_Arm.flatMap(pairs => pairs);

    },
    
    createIdentityCards: function(techs){
    
        return [{
    
            id: this.generateID(techs),
            icon: techs,
            flipped: false,
    
        }, {

            id: this.generateID(techs),
            icon: techs,
            flipped: false,

        }]
    },
    
    generateID: function(techs){

      return techs + parseInt(Math.random() * 1000);  

    },

    shuffleCards: function(techs){

        this.current_Index = techs.length
        this.random_Index  = 0

        while (this.current_Index !== 0){

            this.random_Index = Math.floor(Math.random() * this.current_Index)
            this.current_Index--;


            [techs[this.random_Index], techs[this.current_Index]] = [techs[this.current_Index], techs[this.random_Index]];

        }

    }

}