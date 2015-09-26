(function() {
    var canvas = document.getElementById('Map'),
        context = canvas.getContext('2d');
        
    window.addEventListener('resize', resizeCanvas, false);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth - 250;
        canvas.height = window.innerHeight;
        reDraw(); 
    }

    resizeCanvas();
    
    function reDraw()
    { 
    }

})();