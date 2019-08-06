$(function(){
// menu hover 
/*
	$('.sf-menu li').not('.current').hover(function(){
		$(this).find('strong.x1').stop().animate({top:'120px'},700)   
		$(this).find('strong.x2').stop().animate({top:'90px'},900)   
		$(this).find('strong.x3').stop().animate({top:'60px'},1100)   
		$(this).find('strong.x4').stop().animate({top:'30px'},1300)   
		$(this).find('strong.x5').stop().animate({top:'0px'},1500)   
		}, function(){
			$(this).not('.current').find('strong.x5').stop().animate({top:'-150px'},500)  
			$(this).not('.current').find('strong.x4').stop().animate({top:'-150px'},800)  
			$(this).not('.current').find('strong.x3').stop().animate({top:'-150px'},1100)  
			$(this).not('.current').find('strong.x2').stop().animate({top:'-150px'},1400)  
			$(this).not('.current').find('strong.x1').stop().animate({top:'-150px'},1900)  
		})

// hover menu	
	$('.sf-menu ul li a').not('.current').hover(function(){
		$(this).stop().animate({left:'15px'},700)   
			}, function(){
			$(this).not('.current').stop().animate({left:'0px'},500)  		
		})

// text hover
	$('.block').hover(function(){
			var th=$(this);					 
			th.find('img').stop().animate({top:'10px'}, 600,'easeOutBounce');
			th.find('div').stop().animate({color:'#000'}, 600);
		}, function(){
			var th=$(this);
			th.find('img').stop().animate({top:'0px'}, 600,'easeOutBounce');
			th.find('div').stop().animate({color:'#fff'}, 600);
	});	

// hover button
	$(".next, .prev").hover(function(){
		$(this).stop().animate({top:'135px'}, 600);
	}, function(){
		$(this).stop().animate({top:'145px'}, "normal")
	});	


*/

// lightbox image
	$(".lightbox-image").append("<span></span>");
	
	$(".lightbox-image").hover(function(){
		$(this).find("img").stop().animate({opacity:0.5}, "normal")
	}, function(){
		$(this).find("img").stop().animate({opacity:1}, "normal")
	});
// list hover
	$('.list-services li a').hover(function(){
			th=$(this).find('img');					 
			th.stop().animate({left:'6px'}, 300);
		}, function(){
			th.stop().animate({left:'0px'}, 300);			
	});	

// block hover
	$('.block').hover(function(){
			var th=$(this);					 
			th.find('img').stop().animate({top:'10px'}, 600,'easeOutBounce');
			th.find('div').stop().animate({color:'#d65f3f'}, 600);
		}, function(){
			var th=$(this);
			th.find('img').stop().animate({top:'0px'}, 600,'easeOutBounce');
			th.find('div').stop().animate({color:'#2c292a'}, 600);
	});	

// list-1 hover
	$('.list-2 li').hover(function(){
	  $(this).stop().animate({backgroundPosition:'6px 5px'},200)       
	 }, function(){
	  $(this).stop().animate({backgroundPosition:'0px 5px'},200)       
	 })

// box-hover
	$('.box-1 .bgr').css({opacity:'0'});
	$(".box-1").hover(function(){
		$(this).addClass("alt").find('.bgr').stop().animate({opacity:1}, "low");
	}, function(){
		$(this).removeClass("alt").find('.bgr').stop().animate({opacity:0}, "low");
	});

});