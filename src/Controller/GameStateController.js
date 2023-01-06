class GamestateController {
  constructor() {
    this.gamestate = new Gamestate()
    this.startGame()
  }

  startGame() {
    this.runner = setInterval(() => { this.gamestate.updateScore() }, 1000)
  }

  endGame() {
    clearInterval(this.runner)
  }
}