'use strict'

function Board ( height, width, parentElement ) {
    this.height = Number( height )
    this.width = Number( width )

    this.parentElement = parentElement

    // setup grid html and css and append to
    // parent div.
    this.html = document.createElement( 'div' )
    this.html.classList.add( 'grid' )

    this.html.style.display = 'grid'

    this.parentElement.appendChild( this.html )

    this.gameSettings = {
        turn: 0,
        moves: [],
        selectedChecker: null,
        players: [ 'red', 'black' ],
    }
}

Board.prototype = {

    setup: function ( next ) {
        this.grid = new Array()
        for ( let rowIndex = 0; rowIndex < this.height; rowIndex += 1 ) {
            for ( let index = 0; index < this.width; index += 1 ) {
                let cell = new Cell( rowIndex, index, '' )
                this.grid.push( cell )
                this.html.appendChild( this.grid[ this.grid.length - 1 ].create() )
            }
        }

        if ( next ) next(  )

        return this

    },

    addCheckers: function ( rows, color ) {
        let area = this.getRows( rows )
        area.map( function ( cell ) {
            if ( cell.color === 'black' ) {
                let checker = new Checker( color, cell.html )
                checker.createElement()
            }
        } )
    },

    setupGame: function () {
        this.addCheckers( [0,1,2], 'red' )
        this.addCheckers( [5,6,7], 'black' )

        return this
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
            [ 1, 1 ], [ -1, -1 ], [ -1, 1 ], [ 1, -1 ] ]

        let surroundingArray = new Array()
        for ( let [ rOffset, cOffset ] of surroundingCoords ) {
            let c = this.findCell( Number( row ) + rOffset, Number( col ) + cOffset )
            if ( c )
                surroundingArray.push( c )
        }

        return surroundingArray
    },

    getSurroundingByCell: function ( cell ) {
        let row = parseInt( cell.html.style.gridRow ) - 1
        let col = parseInt( cell.html.style.gridColumn ) - 1

        let surroundingCoords = [
            [ 1, 1 ], [ -1, -1 ], [ -1, 1 ], [ 1, -1 ] ]

        let surroundingArray = new Array()
        for ( let [ rOffset, cOffset ] of surroundingCoords ) {
            surroundingArray.push( this.findCell( Number( row ) + rOffset, Number( col ) + cOffset ) )
        }
        surroundingArray = surroundingArray.filter( function(i) {
            return i != undefined
        })
        return surroundingArray
    },

    getRows: function ( rows ) {
        let rowArray = new Array()

        if ( rows > 0 ) {
            for ( let cell of this.grid ) {
                if ( cell.row === rows ) {
                    rowArray.push( cell )
                }
            }
        } else if ( rows.length > 0 ) {
            for ( let cell of this.grid ) {
                rows.forEach( ( row ) => {
                    if ( cell.row === row ) {
                        rowArray.push( cell )
                    }
                })
            }
        }
        return rowArray
    },

    setBoardCSS: function () {
        for ( let i in this.grid ) {
            this.grid[ i ].html.classList.add('square')

            // if the row is odd alternate the color pattern
            if ( Math.floor( i / this.width ) % 2 === 0 ) {
                if ( i % 2 === 0 ) {
                    this.grid[ i ].html.classList.add('even')
                    this.grid[ i ].color = 'red'
                } else {
                    this.grid[ i ].html.classList.add('odd')
                    this.grid[ i ].color = 'black'
                }
            } else {
                if ( i % 2 === 0 ) {
                    this.grid[ i ].html.classList.add('odd')
                    this.grid[ i ].color = 'black'
                } else {
                    this.grid[ i ].html.classList.add('even')
                    this.grid[ i ].color = 'red'
                }
            }
        }
        return this
    },

    move: function (argument) {
        this.html.addEventListener( 'click', function() {
            let oldCol = 0
            let oldRow = 0
            let newCol = 0
            let newRow = 0

            if ( this.gameSettings.selectedChecker ) {
                oldCol = parseInt( this.gameSettings.selectedChecker.parentElement.style.gridColumn ) - 1
                oldRow = parseInt( this.gameSettings.selectedChecker.parentElement.style.gridRow ) - 1
            }

            if ( event.target.tagName === 'CANVAS' ) {
                newCol = parseInt( event.target.parentElement.style.gridColumn ) - 1
                newRow = parseInt( event.target.parentElement.style.gridRow ) - 1
            } else {
                newCol = parseInt( event.target.style.gridColumn ) - 1
                newRow = parseInt( event.target.style.gridRow ) - 1
            }

            // if piece add to selected piece
            if ( event.target.tagName === 'CANVAS' &&
                !this.gameSettings.selectedChecker &&
                this.gameSettings.players[0] === this.findCell( newRow, newCol ).html.children[0].dataset.color ) {
                this.gameSettings.selectedChecker = event.target

            } else if ( event.target.tagName === 'DIV' &&
                this.gameSettings.selectedChecker ) {
                let closeCells = this.getSurroundingByCell( this.findCell( oldRow, oldCol ) )
                closeCells.map( function( v, i, a ) {

                    let newCol = parseInt( event.target.style.gridColumn ) - 1
                    let newRow = parseInt( event.target.style.gridRow ) - 1

                    if( newCol === v.col && newRow === v.row ) {
                        v.html.appendChild( this.gameSettings.selectedChecker )
                        this.gameSettings.selectedChecker = null
                        this.gameSettings.turn += 1
                        this.gameSettings.players.reverse()
                    }
                }.bind( this ) )
            } else if ( event.target.tagName === 'CANVAS' &&
                        this.gameSettings.selectedChecker &&
                    this.gameSettings.players[0] === this.findCell( newRow, newCol ).html.children[0].dataset.color ) {}
        }.bind( this ) )
    },

    jump: function (argument) {},

}
