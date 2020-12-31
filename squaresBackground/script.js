//squares in bg
requirejs.config({
	baseUrl: 'https://cdn.rawgit.com/erykpiast/LiveBackground/master/',
  paths: {
		jquery: [ '//code.jquery.com/jquery-1.9.1',
			'/lib/third/jquery/jquery-1.9.1.min' ],
		underscore:["https://cdn.jsdelivr.net/npm/underscore@1.12.0/underscore-min"]
	}
});


require([ 'livebg', 'color', 'jquery' ], function(LiveBackground, Color) {
	function init() {
		var cvsCont = document.getElementById('canvas'),
        cvs = cvsCont.lastElementChild;    
    cvs.setAttribute('width', cvsCont.offsetWidth);
    cvs.setAttribute('height', cvsCont.offsetHeight);

		var lb = new LiveBackground({
			shapes: [
				shape1('orange-blue', 1, 'rgba(255, 128, 0, 1)', 'rgba(0, 128, 255, 1)'),
				shape1('green-red', 10, 'rgba(0, 255, 0, 1)', 'rgba(255, 0, 0, 1)'),
				shape1('yellow-violet', 5, 'rgba(255, 240, 0, 1)', 'rgba(102, 00, 102, 1)'),
        shape1('yellow-blue', 5, 'rgba(255, 240, 0, 1)', 'rgba(0, 64, 255, 1)')
			],
      show: {
        easing: 'easeIn'
      },
      hide: {
        easing: 'easeOut'
      }
		});
		lb.debug('off');
		lb.init(cvs);
		setTimeout(function() {
			lb.displayShapes(500, 500);
		}, 1000);
	}
  
$(init);

	function shape1(name, priority, color1, color2, x, y) {
		var c1 = new Color(color1),
			c2 = new Color(color2),
			diff = c1.sub(c2),
			color4 = 'rgba(' + Math.round(c1.channels[0] - (diff[0] / 3)*2) + ', ' + Math.round(c1.channels[1] - (diff[1] / 3)*2) + ', ' + Math.round(c1.channels[2] - (diff[2] / 3)*2) + ', ' + Math.round(c1.channels[3] - (diff[3] / 3)*2) + ')',
			color3 = 'rgba(' + Math.round(c1.channels[0] - (diff[0] / 3)) + ', ' + Math.round(c1.channels[1] - (diff[1] / 3)) + ', ' + Math.round(c1.channels[2] - (diff[2] / 3)) + ', ' + Math.round(c1.channels[3] - (diff[3] / 3)) + ')';

		return (new Shape({
		name: name,
		width: 4,
		height: 4,
		x: x,
		y: y,
		showTime: 250,
		hideTime: 250,
		priority: priority,
		points: [
			{
				x: 0,
				y: 0,
				strokeColor: color1,
				showDelay: 0,
				hideDelay: 300
			},
			{
				x: 1,
				y: 0,
				strokeColor: color3,
				showDelay: 100,
				hideDelay: 200
			},
			{
				x: 2,
				y: 0,
				strokeColor: color4,
				showDelay: 200,
				hideDelay: 100
			},
			{
				x: 3,
				y: 0,
				strokeColor: color2,
				showDelay: 300,
				hideDelay: 0
			},
			{
				x: 3,
				y: 1,
				strokeColor: color4,
				showDelay: 400,
				hideDelay: 100
			},
			{
				x: 3,
				y: 2,
				strokeColor: color3,
				showDelay: 500,
				hideDelay: 200
			},
			{
				x: 3,
				y: 3,
				strokeColor: color1,
				showDelay: 600,
				hideDelay: 300
			},
			{
				x: 2,
				y: 3,
				strokeColor: color3,
				showDelay: 700,
				hideDelay: 200
			},
			{
				x: 1,
				y: 3,
				strokeColor: color4,
				showDelay: 800,
				hideDelay: 100
			},
			{
				x: 0,
				y: 3,
				strokeColor: color2,
				showDelay: 900,
				hideDelay: 0
			},
			{
				x: 0,
				y: 2,
				strokeColor: color4,
				showDelay: 1000,
				hideDelay: 100
			},
			{
				x: 0,
				y: 1,
				strokeColor: color3,
				showDelay: 1100,
				hideDelay: 200
			}
		]}));
	}
});



// end of BG
//responsive canvas
function resize(){    
    $("#can").outerHeight($(window).height()-$("#can").offset().top- Math.abs($("#can").outerHeight(true) - $("#can").outerHeight()));
  }
  $(document).ready(function(){
    resize();
    $(window).on("resize", function(){                      
        resize();
    });
  });

  //end of  responsive canvas