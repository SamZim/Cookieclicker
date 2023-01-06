class UpgradeController {
  constructor(gamestate) {
    this.gamestate = gamestate
  }

  getUpgradeEfficency(upgrade) {
    let amount = 0
    this.gamestate.upgrades.forEach(element => {
      if (upgrade.id === element.id) {
        amount++
      }
    })
    return (upgrade.modifier * amount) / this.gamestate.cps * 100
  }

  buyUpgrade(upgrade) {
    try {
      this.gamestate.addUpgrade(upgrade)
    }
    catch (e) {
      console.log(e)
      return
    }
    this.gamestate.score -= upgrade.cost
    this.gamestate.updateCps()
  }
}

