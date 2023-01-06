export class Gamestate {
  constructor() {
    this.cps = 0
    this.score = 0
    this.upgrades = []
  }

  updateCps() {
    let modifier = 0
    this.getPassiveUpgrades().forEach((upgrade) => {
      modifier += upgrade.modifier
    })
    this.cps = modifier
  }

  updateScore() {
    this.score += this.cps
  }

  getActiveUpgrades() {
    return this.upgrades.filter((upgrade) => upgrade.type == "active")
  }

  getPassiveUpgrades() {
    return this.upgrades.filter((upgrade) => upgrade.type == "passive")
  }

  addUpgrade(upgrade) {
    if (this.score < upgrade.cost) {
      throw "nicht genug score Madge"
    }
    this.upgrades.push(upgrade)
  }
}