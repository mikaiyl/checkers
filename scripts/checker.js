'use strict'

function Checker ( color, parentElement ) {
    this.color = color
    this.isKing = false
    this.parentElement = parentElement
}

Checker.prototype = {
    createElement: function (  ) {

        this.html = document.createElement( 'canvas' )
        this.html.width = 40
        this.html.height = 40
        this.html.dataset.color = this.color

        this.html.style.cursor = 'move'

        var ctx = this.html.getContext( '2d' )

        ctx.beginPath()
        ctx.strokeStyle = 'white'
        ctx.arc( 20, 20, 18, 0, Math.PI * 2, true) // Outer circle
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.stroke()

        this.parentElement.appendChild( this.html )

        return this
    }
}
