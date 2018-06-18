'use strict'

function Cell ( row, col, value = '' ) {

    this.value = value
    this.row = Number( row )
    this.col = Number( col )

}

Cell.prototype = {

    create: function () {
        this.html = document.createElement( 'div' )
        this.html.style.gridRow = this.row + 1
        this.html.style.gridColumn = this.col + 1
        this.html.textContent = this.value

        return this.html
    },

    setValue: function ( value ) {
        this.value = value
        this.html.textContent = this.value
    },

    setClass: function ( newClass ) {
        this.html.classList.add( newClass )
    },

    removeClass: function ( oldClass ) {
        this.html.classList.remove( oldClass )
    },

}


