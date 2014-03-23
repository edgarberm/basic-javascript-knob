basic-javascript-knob
=====================

Basic JavaScript Knob

Pure JavaScript knob without using any framework.

To use:

```
<div id="container" style="width: 300px; height: 300px; margin-top: 100px; margin-left: 100px;"></div>
<input id="knob_input" type="text">
        
var knob = new Knob( 'container', 'knob_input' );
knob.setCallback( function() { setVolume(); } );

function setVolume() {
  ...
}
```


You can see the knob working here.[a link](file:///Users/BuiltByEdgar/Documents/Proyectos/LAB/HTML5%20Canvas%20Knob/index.html)
