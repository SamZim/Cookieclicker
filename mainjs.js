//Model
    //Dynamisch: Gamestate(cps,efficency,score,eigene upgrades)
    //Basis: Upgrades(modifier,cost,name,typ:aktiv/passiv,)
class Upgrade{
    constructor(modifier, cost, name, type,id){
        this.modifier = modifier
        this.cost = cost
        this.name = name
        this.type = type
        this.id = id
    }
        
}

class Gamestate{
    constructor(){
        this.cps = 0
        this.score = 0
        this.upgrades = []
    }
    
    updateCps(){
        let modifier = 0 
        this.getPassiveUpgrades().forEach((upgrade)=>{
            modifier += upgrade.modifier  
        })
        this.cps = modifier
    }

    updateScore(){
        this.score += this.cps
    }

    getActiveUpgrades(){
        return this.upgrades.filter((upgrade)=> upgrade.type == "active")
    }

    getPassiveUpgrades(){
        return this.upgrades.filter((upgrade)=> upgrade.type == "passive")
    }

    addUpgrade(upgrade){
        if(this.score < upgrade.cost){
            throw "nicht genug score Madge"
        }
        this.upgrades.push(upgrade)
    }
   

}

//View

//Controller
class UpgradeController{
    constructor(gamestate){
        this.gamestate = gamestate
    }
    getUpgradeEfficency(upgrade){
        let amount = 0 
        this.gamestate.upgrades.forEach(element => {
            if(upgrade.id === element.id){
                amount++
            }
        })
         return (upgrade.modifier * amount) / this.gamestate.cps * 100
    }
    buyUpgrade(upgrade){
        try{
            this.gamestate.addUpgrade(upgrade)
        }
        catch(e){
            console.log(e)
            return
        }
        this.gamestate.score -= upgrade.cost
        this.gamestate.updateCps()
    }
}

class GamestateController{
    constructor(){
        this.gamestate = new Gamestate()
        this.startGame()
    }
    startGame(){
        this.runner = setInterval(()=>{this.gamestate.updateScore()},1000)
    }
    endGame(){
        clearInterval(this.runner)
    }
}

let game = new GamestateController()
console.log(game)