/*
* Holly Brice & Heidi Niu
* Cis 399: Final Project
*/


/* For preventing the back button after logout */
function disableBackButton(){
          location.href("index.html");
 }
if(window.history.forward(1) != null)
  window.history.forward(1);