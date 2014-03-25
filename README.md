basic-javascript-knob
=====================

Pure JavaScript knob without using any framework.

##How to use

First, you need a div container and optionally an input object (type=text) for show your knob values.
Some like this:

```
<div id="container" style="width: 300px; height: 300px;"></div>
<input id="knob_input" type="text">
        
```
*The knob size depends to the container size.



Now you only need declarate a variable like a new Knob and pass the container and output object id's to the constructor.

```
var knob = new Knob( 'container', 'knob_input' );
knob.setCallback( function() { someMethod(); } );

function someMethod() {
  ...
}
```


You can see the demo [here](http://www.builtbyedgar.com/blog/examples/pure-javascript-knob/knob01.html).



####TODO: 
- Methods to customize the knob.

