/**
 * addcart 将商品加入购物车
 * @goods_id  商品id
 * @num   商品数量
 * @form_id  商品详情页所在的 form表单
 * @to_catr 加入购物车后再跳转到 购物车页面 默认不跳转 1 为跳转
 * layer弹窗插件请参考http://layer.layui.com/mobile/
 */
function AjaxAddCart(goods_id,num,to_catr,is_drug)
{	
	checkOnSale(goods_id,0,0);
	var buyNum = $("#number").val();
	var sales_model = $("#sales_model").val();
	if(to_catr == 1){
		location.href = "/index.php?m=Mobile&c=Cart&a=cart2&sm="+sales_model+"&goods_id="+goods_id+"&num="+buyNum+"&is_drug="+is_drug;
		return false;
	}
    //如果有商品规格 说明是商品详情页提交
    if($("#buy_goods_form").length > 0){
        $.ajax({
            type : "POST",
            url:"/index.php?m=Mobile&c=Cart&a=ajaxAddCart",
            data : $('#buy_goods_form').serialize(),// 你的formid 搜索表单 序列化提交
			dataType:'json',
            success: function(data){
            	var carturl = is_drug == 0 ? "/cart" : "/subscribe";
            	var cartstr = is_drug == 0 ? "购物车" : "需求清单";
				// 加入购物车后再跳转到 购物车页面
			    if(data.status < 0)
				{
					layer.open({content: data.msg,time: 2});
					return false;
				}
			   if(to_catr == 1)  //直接购买
			   {
				   location.href = carturl;
			   }
			    cart_num = parseInt($('#tp_cart_info').html())+parseInt($('#number').val());
			    $('#tp_cart_info').html(cart_num);
			    var tpcart_num=parseInt($("#cart_quantity").text());
				tpcart_num+=1;
				$("#cart_quantity").text(tpcart_num);
				//是否跑到购物车里面去
				layer.open({
			        content: '添加成功！',
			        btn: ['再逛逛', cartstr],
			        shadeClose: false,
			        yes: function(){
			            layer.closeAll();
			        }, no: function(){
			        	location.href = carturl;
			        }
			    });
				
			 }
        });
    }else{ //否则可能是商品列表页 、收藏页商品点击加入购物车
        $.ajax({
            type : "POST",
            url:"/index.php?m=Mobile&c=Cart&a=ajaxAddCart",
            data :{goods_id:goods_id,goods_num:num} ,
			dataType:'json',
            success: function(data){

				   if(data.status == -1)
				   {
					    //layer.open({content: data.msg,time: 2});
						location.href = "/Goods/"+goods_id;
				   }
				   else
				   {
					    if(data.status < 0)
						{
							layer.open({content:data.msg, time:2});
							return false;
						}
					    cart_num = parseInt($('#tp_cart_info').html())+parseInt(num);
					    $('#tp_cart_info').html(cart_num)
				    	layer.open({content: data.msg,time: 1});
				    	var tpcart_num=parseInt($("#cart_quantity").text());
				    	tpcart_num+=1;
				    	$("#cart_quantity").text(tpcart_num);
						return false;
				   }
            }
        });
    }
}

//查看商品是否已经下架啰
//auth 查看购物车的商品
function checkOnSale(goods_id,auth,order_id){
	      $.ajax({
            type : "POST",
            url:"/index.php?m=Mobile&c=Cart&a=check_on_sale",
            data :{goods_id:goods_id,shopauth:auth,order_id:order_id} ,
			dataType:'json',
            success: function(data){
					    if(data.status < 0)
						{
							layer.open({content:data.msg, time:2});
							return false;
						}
				   }
        });

}


function checkMobile(tel) {
	var reg = /(^1[3-9][0-9]{9}$)/;
	if (reg.test(tel)) {
		return true;
	}else{
		return false;
	};
}

function checkEmail(str){
	var reg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(reg.test(str)){
		return true;
	}else{
		return false;
	}
}

function showCheckoutOther(obj)
{
	var otherParent = obj.parentNode;
	otherParent.className = (otherParent.className=='checkout_other') ? 'checkout_other2' : 'checkout_other';
	var spanzi = obj.getElementsByTagName('span')[0];
	spanzi.className= spanzi.className == 'right_arrow_flow' ? 'right_arrow_flow2' : 'right_arrow_flow';
}

function setGoodsTab(name,cursel,n){
	$('html,body').animate({'scrollTop':0},600);
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById("user_"+name+"_"+i);
		menu.className=i==cursel?"on":"";
		con.style.display=i==cursel?"block":"none";
	}
}

// 获取活动剩余天数 小时 分钟
//倒计时js代码精确到时分秒，使用方法：注意 var EndTime= new Date('2013/05/1 10:00:00'); //截止时间 这一句，特别是 '2013/05/1 10:00:00' 这个js日期格式一定要注意，否则在IE6、7下工作计算不正确哦。
//js代码如下：
function GetRTime(end_time){
	// var EndTime= new Date('2016/05/1 10:00:00'); //截止时间 前端路上 http://www.51xuediannao.com/qd63/
	var EndTime= new Date(end_time); //截止时间 前端路上 http://www.51xuediannao.com/qd63/
	var NowTime = new Date();
	var t =EndTime.getTime() - NowTime.getTime();
	/*var d=Math.floor(t/1000/60/60/24);
	 t-=d*(1000*60*60*24);
	 var h=Math.floor(t/1000/60/60);
	 t-=h*60*60*1000;
	 var m=Math.floor(t/1000/60);
	 t-=m*60*1000;
	 var s=Math.floor(t/1000);*/

	var d=Math.floor(t/1000/60/60/24);
	var h=Math.floor(t/1000/60/60%24);
	var m=Math.floor(t/1000/60%60);
	var s=Math.floor(t/1000%60);
	if(s >= 0)
		return d + "天 " + h + "时 " + m + "分 " +s + "秒";
}

// 点击收藏商品
function collect_goods(goods_id){
	$.ajax({
		type : "GET",
		dataType: "json",
		url:"/index.php?m=Mobile&c=goods&a=collect_goods&goods_id="+goods_id,//+tab,
		success: function(data){
            layer.open({
                content: data.msg
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
		}
	});
}	
function consult_goods(goods_id,infoJson,app_type) {
	switch (app_type){
		case 1:
		case 3:
			// IOS
            window.webkit.messageHandlers.InitiateConsultation.postMessage(infoJson);
			break;
        case 2:
        case 4:
            // android
            window.InitiateConsultation.postMessage(infoJson);
            //window.IsNotLoginInfo.postMessage();
            break;
		default:
			return;
	}
}