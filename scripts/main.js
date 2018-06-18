'use strict'

// main
let game = new Board( 8, 8, document.getElementById('game') )

game.setup().setBoardCSS().setupGame()
game.move()
// play with canvas
//
