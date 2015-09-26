(function() {
    var canvas = document.getElementById('SideBar'),
        context = canvas.getContext('2d');
        
    window.addEventListener('resize', resizeCanvas, false);
    
    function resizeCanvas() {
        canvas.width = 250;
        canvas.height = window.innerHeight;
        reDraw(); 
    }

    resizeCanvas();
    
    function reDraw()
    { 
    }

})();