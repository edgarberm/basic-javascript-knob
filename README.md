basic-javascript-knob
=====================

Pure JavaScript knob without using any framework.

##How to use

First, you need a div container and optionally an input object (type=text) for show your knob values.

```
<div id="container" style="width: 300px; height: 300px; margin-top: 100px; margin-left: 100px;"></div>
<input id="knob_input" type="text">
        
```

Now you only need declarate a variable like a new Knob and pass the container and output to the constructor.

```
var knob = new Knob( 'container', 'knob_input' );
knob.setCallback( function() { setVolume(); } );

function setVolume() {
  ...
}
```


You can see the demo [here](file:///Users/BuiltByEdgar/Documents/Proyectos/LAB/HTML5%20Canvas%20Knob/index.html).
