/* main.js
 * Javascript functions for main.html
 */

window.onload = function(){ //Start the accordion functionality
    $( "#accordion" ).accordion({
        collapsible: true, //Allow all sections to be closed simultaneously
        active: false, //Start with all sections closed
        animate: 100, //Speed up the animation to 100ms, default seems to be 200
        icons: { "header": "ui-icon-blank", "activeHeader": "ui-icon-blank" }
            //Blank icons
    }); 
}

