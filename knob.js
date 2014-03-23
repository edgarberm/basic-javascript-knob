/*
*
*   @author:     Edgar Bermejo @BuiltByEdgar
*   @copyright:  2014 Edgar Bermejo
*
*   @license:    {@link: http://www.opensource.org/licenses/mit-license.php || MIT License}
*
*/

var Knob = { VERSION: '0.0.0' };
 
(function() {
 
    'use strict';
    
    /*
    *   @class Knob
    *   @constructor
    *   @param {container} object - The DOM object (div) container for the Knob.
    *   @param {output} object - The DOM object (input[type=text]) to show the Knob value
    */

    Knob = function( container, output )
    {
        
        this.container = document.getElementById( container );
 
        this.canvas = document.createElement( 'canvas' );
        this.context = this.canvas.getContext( '2d' );
        this.canvas.width = parseInt( this.container.style.width ) || 200;
        this.canvas.height = parseInt( this.container.style.height ) || 200;
 
        this.offsetX = this.canvas.offsetLeft;
        this.offsetY = this.canvas.offsetTop;
 
        this.arc = Math.PI * 2;
 
        this.knobX = this.canvas.width / 2;
        this.knobY = this.canvas.height / 2;
        this.dialX = this.knobX;
        this.dialY = this.knobY;
 
        this.lineWidth = this.canvas.width / 5;
        this.radius = ( this.canvas.width / 2 ) - ( this.lineWidth / 2 );
        this.baseColor = 'rgba( 0, 0, 0, 0.3 )';
        this.dialColor = 'rgba( 0, 0, 0, 0.6 )';
        this.lineCap = 'butt';
 
        this.angleOffset = Math.PI / 2;
 
        this.startAngle = 1.5 * Math.PI + this.angleOffset;
 
        this.endAngle;
 
        this.mx;
        this.my;
 
        this.isDraggin = false;
 
 
        var isTouchSupported = 'ontouchstart' in window;
        var onStartEvent = isTouchSupported ? 'touchstart' : 'mousedown';
        var onMoveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
        var onEndEvent = isTouchSupported ? 'touchend' : 'mouseup';
 
        this.mouseDownEndedHandler = this.onMouseDown.bind( this );
        this.canvas.addEventListener( onStartEvent, this.mouseDownEndedHandler, false );
        this.mouseMoveEndedHandler = this.onMouseMove.bind( this );
        this.canvas.addEventListener( onMoveEvent, this.mouseMoveEndedHandler, false );
        this.mouseUpEndedHandler = this.onMouseUp.bind( this );
        this.canvas.addEventListener( onEndEvent, this.mouseUpEndedHandler, false );
        
        this.container.appendChild( this.canvas );
 
        this.value = 0;
        this.outputObject = document.getElementById( output ) || null;
 
        this.draw( );
 
    }
 
 
    Knob.prototype.draw = function( mouseX, mouseY ) 
    {
        
        this.endAngle = Math.atan2( mouseY - this.knobY, mouseX - this.knobX ) + this.angleOffset;
 
        this.setValue( gradiansToValue( radiansToGradians( this.endAngle ) ) );
        if ( this.endAngle > -0.0009 && this.endAngle < 0.001 ) this.endAngle = 0.0001;
 
        if ( this.callback ) this.getCallback();
        
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
 
        this.context.beginPath();
        this.context.arc( this.knobX, this.knobY, this.radius, 0, this.arc, false );
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.baseColor;
        this.context.stroke();
 
        this.context.beginPath();
        this.context.arc( this.dialX, this.dialY, this.radius, this.startAngle - this.angleOffset, this.endAngle - this.angleOffset, false );
        this.context.lineWidth = this.lineWidth;
        this.context.lineCap = this.lineCap;
        this.context.strokeStyle = this.dialColor;
        this.context.stroke();
 
    };
 
 
    Knob.prototype.onMouseDown = function( evnt ) 
    {
 
        var sX = window.pageXOffset;
        var sY = window.pageYOffset;
        this.offsetX = this.container.offsetLeft - sX;
        this.offsetY = this.container.offsetTop - sY;
 
        this.isDraggin = true;
 
        if( evnt.touches )
        {
            this.mx = parseInt( evnt.touches[ 0 ].pageX - this.offsetX );
            this.my = parseInt( evnt.touches[ 0 ].pageY - this.offsetY );
        } 
        else 
        {
            this.mx = parseInt( evnt.pageX - this.offsetX );
            this.my = parseInt( evnt.pageY - this.offsetY );
        }
 
        this.draw( this.mx, this.my );
 
    };
 
 
    Knob.prototype.onMouseMove = function( evnt ) 
    {
 
        if( this.isDraggin )
        {
            if( evnt.touches )
            {
                this.mx = parseInt( evnt.touches[ 0 ].pageX - this.offsetX );
                this.my = parseInt( evnt.touches[ 0 ].pageY - this.offsetY );
            } 
            else 
            {
                this.mx = parseInt( evnt.pageX - this.offsetX );
                this.my = parseInt( evnt.pageY - this.offsetY );
            }
 
            this.draw( this.mx, this.my );
 
            document.body.style.cursor = 'default';
        }
 
    };
 
 
    Knob.prototype.onMouseUp = function( evnt ) 
    {
 
        this.isDraggin = false;
 
    };
 
 
    Knob.prototype.setCallback = function( callback ) 
    {
        
        this.callback = callback;
 
    };
    
 
    Knob.prototype.getCallback = function( ) 
    {
        
        this.callback();
 
    };
 
 
    Knob.prototype.getValue = function( ) 
    {
        
        return this.value;
 
    };
    
 
    Knob.prototype.setValue = function( val ) 
    {
 
        this.value = val || 0;
        if( this.outputObject !== null ) this.outputObject.value = this.value;
        
    };
 
 
    function radiansToGradians( rad ) 
    {
        var g = rad * 63.6638548;
        ( g < 0 ) ? g = g + 400 : g = g;
        return g;
    }
 
 
    function gradiansToValue( gon ) 
    {
        return Math.ceil( gon / 4 );
    }
 
 
}());