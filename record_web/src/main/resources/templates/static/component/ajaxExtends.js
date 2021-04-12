jQuery.ajaxExtends = {
	syncGet : function(url, handler, type) {
		$.ajax({
			type : "get",
			url : url,
			dataType : type,
			async : false,
			success : handler
		});
	},
	syncPost : function(url, data, handler, type) {
		$.ajax({
			type : "post",
			url : url,
			data : data,
			dataType : type,
			async : false,
			success : handler
		});
	},
	asyncPostJson:function(url, data, handler){
		$.ajax({
	        type:"POST",
	        url:url,
	        dataType:"json",
	        contentType:"application/json;charset=UTF-8",
	        data:JSON.stringify(data),
	        success : handler
	     });
	}
};
