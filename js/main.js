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

function Grid ( height, width, parentElement ) {
    this.height = Number( height )
    this.width = Number( width )

    this.parentElement = parentElement

    // setup grid html and css and append to
    // parent div.
    this.html = document.createElement( 'div' )
    this.html.classList.add( 'grid' )

    this.html.style.display = 'grid'

    this.parentElement.appendChild( this.html )
}

Grid.prototype = {

    fill: function () {
        this.grid = new Array()
        for ( let rowIndex = 0; rowIndex < this.height; rowIndex += 1 ) {
            for ( let index = 0; index < this.width; index += 1 ) {

                let cell = new Cell( rowIndex, index, index )

                this.grid.push( cell )
                this.html.appendChild( this.grid[ this.grid.length - 1 ].create() )

            }
        }
    },

    findCell: function ( row, col ) {
        let r = row * this.width

        if ( this.grid ) {
            return this.grid[ r + col ]
        } else {
            return 'index not found'
        }
    },

    getSurroundingByCoords: function ( row, col ) {
        let surroundingCoords = [
            [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, -1 ], [ -1, -1 ], [ -1, 0 ], [ -1, 1 ], [ 1, -1 ] ]

        let surroundingArray = new Array()
        for ( let [ rOffset, cOffset ] of surroundingCoords ) {
            surroundingArray.push( this.findCell( Number( row ) + rOffset, Number( col ) + cOffset ) )
        }

        return surroundingArray
    },

    getSurroundingByCell: function ( cell ) {
        let row = Number( cell.html.style.gridRow )
        let col = Number( cell.html.style.girdColumn )

        let surroundingCoords = [
            [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, -1 ], [ -1, -1 ], [ -1, 0 ], [ -1, 1 ], [ 1, -1 ] ]

        let surroundingArray = new Array()
        for ( let [ rOffset, cOffset ] of surroundingCoords ) {
            surroundingArray.push( this.findCell( Number( row ) + rOffset, Number( col ) + cOffset ) )
        }

        return surroundingArray
    },

}

// main
    let grid = new Grid( 15, 15, document.getElementsByTagName('main')[0] )
    grid.fill()
