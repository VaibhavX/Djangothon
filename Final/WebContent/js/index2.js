$(document).ready(function() {
  	//Obtener la lista de imagenes
  	var images=$("#background img");
  	//hacer esto cada 3.5s
		setInterval(function(){
			for(var i in images){
        	//la 1ra imagen es la "actual"
				if(images[i].className=="actual"){
					if(i<images.length-1){
            	//desvanecer la imagen actual
						$(images[i]).animate({opacity: 0},1500,function(){
							$(this).removeClass("actual");
						});
            	//mostrar la imagen siguiente
						$(images[parseInt(i)+1]).animate({opacity:1},1000,function(){
							$(images[parseInt(i)+1]).addClass("actual");
						});
						break;
					}
					else{
						$(images[i]).animate({opacity: 0},1500,function(){
							$(this).removeClass("actual");
						});
						$(images[0]).animate({opacity:1},1000,function(){
							$(images[0]).addClass("actual");
						});
						break;
					}
				}
			}
		},3500);
		//mostrar submenu
		$(".a-parent").click(function(event){
			event.preventDefault();
			if($(this).next('ul').length){
				$(this).next().toggle('fast');
				$(this).children('i:last-child').toggleClass('fa-caret-down fa-caret-left');
			}
		});
	});