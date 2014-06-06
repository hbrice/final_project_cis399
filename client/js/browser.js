/* This keeps index.html from being able to back click after logout. */
        function preventBack() {
          window.history.forward();
        }
        setTimeout("preventBack()", 0);
        window.onunload=function(){null};