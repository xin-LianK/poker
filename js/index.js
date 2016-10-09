$(function(){
	//构造每个扑克对象
	function setpoker(){
		var poker=[];
		var colors=['d','h','s','c'];
		var tf={};

		while(poker.length!==52){
			var n=Math.ceil(Math.random()*13);
			var c=colors[Math.floor(Math.random()*4)];
			var v={num:n,color:c};

			if(!tf[n+c]){
				tf[n+c]=true;
				poker.push(v);
			}
		}
		return poker;
	}


//	把扑克对象添加到页面中
	function addtable(poker){
		$('.box1').empty();
		var index=0;
		var dir={
			1:'A',
			2:2,
			3:3,
			4:4,
			5:5,
			6:6,
			7:7,
			8:8,
			9:9,
			10:'T',
			11:'J',
			12:'Q',
			13:'K'
		};
		//添加上面 的牌
		for(var i=0,poke;i<7;i++){
			for (var j = 0;j<i+1; j++) {
				poke=poker[index];
				index+=1;
				$('<div>').addClass('poker')
				.attr({'id':i+'-'+j,'data-number':poke.num})
				.css({backgroundImage:'url(img/'+dir[poke.num]+''+poke.color+'.png)'})
				.delay(index*30)
				.animate({
					top:i*40,
					left:j*130+(6-i)*60+300,
					opacity:1
				})
				.appendTo('.box1');
			}
		}
		//添加下面的牌
		for(;index<poker.length;index++){
			a=poker[index];
			$('<div>').addClass('poker')
			.css({backgroundImage:'url(img/'+dir[a.num]+''+a.color+'.png)'}).appendTo('.box1')
			.attr('data-number',a.num)
			.delay(index*30)
			.animate({
				top:420,
				left:500,
				opacity:1
			}).addClass('left');

		}
	}


	//函数在定义的时候会记录自己可见范围内的所有变量
	//只记录地址  不记录值
	//记录的顺序是由近到远
	//所有的记录组成一个链条
	//叫做函数的作用域链
	//函数在调用的时候，会查看作用域链
	//辅助自己正确的解释执行

	//JS中函数的这个特性导出闭包这个概念
	//闭包通常来构造一个更强大的函数
	//或者用来获取一些中间状态的值


	//jQuery中回调函数中的this大部分情况是指向集合中的一个DOM元素




	var zindex=0;

	//抽牌按钮
	$('.btn1').on('mouseup',function(){
		$(this).animate({
			top:'-=2',
			left:'-=2'
		},50);
		if($('.box1 .left').length){
			zindex++;
			$('.left').last()
			.css('z-index',zindex)
			.animate({left:850})
			.queue(function(){
				$(this).removeClass('left')
				.addClass('right')
				.dequeue();
			});
		}
	});
	$('.btn1').on('mousedown',function(){
		$(this).animate({
			top:'+=2',
			left:'+=2'
		},50);
	});

	var back=0;
	$('.btn2').on('mouseup',function(){
		$(this).animate({
			top:'-=2',
			left:'-=2'
		},50);
		if($('.box1 .left').length){return};
		back++;
		if(back>3){return};
		$('.right').each(function(i){
			$(this).delay(i*50)

			.animate({left:600})
			.queue(function(){
				$(this).css('z-index',0)
				.removeClass('right')
				.addClass('left')
				.dequeue();
			});
		});
//
	});

	$('.btn2').on('mousedown',function(){
		$(this).animate({
			top:'+=2',
			left:'+=2'
		},50);
	});

	function getNumber(el){
		return parseInt($(el).attr('data-number'));
	}

	function isCanClick(el){
//		console.dir($(el).attr('id'))
		var x=parseInt($(el).attr('id').split('-')[0]);
		var y=parseInt($(el).attr('id').split('-')[1]);
		if($('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length){
			return false;
		}else{
			return true;
		}
	}


	var prev=null;
	$('.box1').on('click','.poker',function(){
		if($(this).attr('id')&&!isCanClick(this)){
			return;
		}
		$(this).animate({
					top:"-=20",
//					left:j*130+(6-i)*60+50,
//					opacity:1
				});
		if(getNumber(this)==13){
			$(this).animate({top:0,left:600})
			.queue(function(){
				$(this).detach().dequeue();
				prev=null;
			});
		}


		if(prev){
			if(getNumber(prev)+getNumber(this)==13){
				prev.add(this)
					.animate({top:0,left:600})
					.queue(function(){
						$(this).detach().dequeue();
					});
					prev=null;
			}else{
				$(this).animate({
					top:'+=20'
				});
				prev.delay(400).animate({
					top:"+=20",
				});
				prev=null;
			}
		}else{
			prev=$(this);
		}
	});

//	开始按钮
	var flag=true;
	var t = 0;
	var h = 0, m = 0, s = 0;
	var sjhs;
	var flag1;
    function studyTime(){
		h=parseInt(t/60/60);
		m=parseInt(t/60%60);
		s=parseInt(t%60);
		h=h<10?"0"+h:h;
		m=m<10?"0"+m:m;
		s=s<10?"0"+s:s;
		$('.jsq').text(h+':'+m+':'+s);
    	t=t+1;
		// flag1=setTimeout('studyTime()', 1000);

    }
	$('.star').on('click',function(){
		if(flag){
			addtable(setpoker());
			flag=false;
			sjhs=setInterval(studyTime, 1000);
			studyTime();
		}
		$('.res').on('click',function(){
//		$('div').removeClass('poker')
			addtable(setpoker());
			clearInterval(sjhs);
			h = 0;
			m = 0;
			s = 0;
			h=h<10?"0"+h:h;
			m=m<10?"0"+m:m;
			s=s<10?"0"+s:s;
			$('.jsq').text(h+':'+m+':'+s);
			t=0;
			sjhs=setInterval(studyTime, 1000);
		});
	});



	$('.stop').on('click',function(){
			clearInterval(sjhs);
			$('.stop').on('click',function(){
				sjhs=setInterval(studyTime, 1000);
			});
	});



	//清除浏览器默认样式
	$('.box .btn1').on('mousedown',false);
	$('.box .btn2').on('mousedown',false);
	$('.box').on('mousedown',false);
	$('.star').on('mousedown',false);
	$('.res').on('mousedown',false);
	$('.stop').on('mousedown',false);

});
