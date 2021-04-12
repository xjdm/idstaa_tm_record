$.fn.jpaging = function(jsonParams) {
	var _self = this;
	// 参数
	var defaults = {
		url : "",
		formId : "",
		sorColumn : [],
		onComplete : null,
		onSetValue : null,
		onSetRow : null,
		pageIndex : "1",
		pageSize : "1",
		sortOrder : "",
		objProperty : "",
		templatePrefix : "default",
		extObj : ""
	};
	$.extend(true, defaults, jsonParams, jsonParams || {});
	// 初始化变量-展示模板
	var contentArea = defaults.templatePrefix + "_contentArea";
	var fixedContent = defaults.templatePrefix + "_fixedContent";
	var copyRow = defaults.templatePrefix + "_copyRow";
	// 初始化变量-分页
	var totalPage = defaults.templatePrefix + "_totalPage";
	var total = defaults.templatePrefix + "_total";
	var currentPage = defaults.templatePrefix + "_currentPage";
	var arg_currentPage = defaults.templatePrefix + "_arg_currentPage";
	var arg_pageSize = defaults.templatePrefix + "_arg_pageSize";
	var arg_sortColumn = defaults.templatePrefix + "_arg_sortColumn";
	var arg_order = defaults.templatePrefix + "_arg_order";
	// 初始化变量-分页按钮
	var goTop = defaults.templatePrefix + "_goTop";
	var lastPage = defaults.templatePrefix + "_lastPage";
	var prePage = defaults.templatePrefix + "_prePage";
	var nextPage = defaults.templatePrefix + "_nextPage";
	var goTo = defaults.templatePrefix + "_goTo";
	var goToPage = defaults.templatePrefix + "_goToPage";
	var search = "search";
	// 绑定检索
	this.unbind(search).bind(search, function() {
		_self.find("#" + arg_currentPage).val(1);
		_self.find("#" + arg_pageSize).val(defaults.pageSize);
		freshPaging();
	});
	// 绑定刷新
	this.unbind("reloadGrid").bind("reloadGrid", function() {
		freshPaging();
	});
	// 初始化分页参数
	_self.find("#" + arg_currentPage).val(defaults.pageIndex);
	_self.find("#" + arg_pageSize).val(defaults.pageSize);
	_self.find("#" + arg_sortColumn).val(defaults.sorColumn);
	_self.find("#" + arg_order).val(defaults.sortOrder);
	// 分页绑定事件
	this.find("#" + goTop).unbind("click").bind("click", function() {
		$("#" + arg_currentPage).val(1);
		var postData = prepareData();
		$.ajaxExtends.asyncPostJson(defaults.url, postData, function(data) {
			displayData(data);
		});
	});
	this.find("#" + lastPage).unbind("click").bind("click", function() {
		$("#" + arg_currentPage).val($("#" + totalPage).text());
		var postData = prepareData();
		$.ajaxExtends.asyncPostJson(defaults.url, postData, function(data) {
			displayData(data);
		});
	});
	this.find("#" + prePage).unbind("click").bind("click", function() {
		var currentPageNum = $("#" + currentPage).text();
		if (currentPageNum == 1) {
			alert("\u5df2\u5230\u7b2c\u4e00\u9875\u4e86");
			return false;
		}
		$("#" + arg_currentPage).val(currentPageNum * 1 - 1);
		var postData = prepareData();
		$.ajaxExtends.asyncPostJson(defaults.url, postData, function(data) {
			$("#" + currentPage).text(currentPageNum * 1 - 1);
			displayData(data);
		});
	});
	this.find("#" + nextPage).unbind("click").bind("click", function() {
		var currentPageNum = $("#" + currentPage).text();
		if (currentPageNum == $("#" + totalPage).text()) {
			alert("\u5df2\u5230\u6700\u540e\u4e00\u9875\u4e86");
			return false;
		}
		$("#" + arg_currentPage).val(currentPageNum * 1 + 1);
		var postData = prepareData();
		$.ajaxExtends.asyncPostJson(defaults.url, postData, function(data) {
			$("#" + currentPage).text(currentPageNum * 1 + 1);
			displayData(data);
		});
	});
	this.find("#" + goTo).unbind("click").bind("click", function() {
		var goToPage = $("#" + goToPage).val();
		if (goToPage == null || goToPage == "") {
			return;
		}
		if (isNaN(goToPage)) {
			$("#" + goToPage).val("");
			$("#" + goToPage).focus();
			alert("\u8bf7\u8f93\u5165\u6570\u5b57!");
			return;
		}
		if (goToPage * 1 > $("#" + totalPage).text() || goToPage * 1 < 1) {
			alert("\u9875\u7801\u8d85\u8fc7\u8303\u56f4\u4e86");
			return false;
		}
		$("#" + arg_currentPage).val(goToPage);
		var postData = prepareData();
		$.ajaxExtends.asyncPostJson(defaults.url, postData, function(data) {
			$("#" + currentPage).text(goToPage);
			displayData(data);
		});
	});
	// 排序绑定事件
	this.bindTableHeadFn = function() {
		$("#" + arg_sortColumn).val(defaults.sortColumns[0]);
		for (var i = 0; i < defaults.sortColumns.length; i++) {
			var imgsrc = $("#" + this.sortColumns[i]).children("img").attr("src");
			if (imgsrc === undefined) {

			} else {
				if ($("#" + arg_order).attr("value") == "desc") {
					$("#" + this.sortColumns[i]).children("img").attr("src", imgsrc.replace(/up/g, "down"));
				} else {
					$("#" + this.sortColumns[i]).children("img").attr("src", mgsrc.replace(/down/g, "up"));
				}
				// 隐藏不是当前排序的图标
				if (i > 0) {
					$("#" + this.sortColumns[i]).children("img").attr("style", "display:none");
				}
			}
			$("#" + this.sortColumns[i]).attr("style", "cursor:pointer;" + $("#" + this.sortColumns[i]).attr("style"));
			// 绑定单击事件
			$("#" + this.sortColumns[i]).unbind("click").bind("click", function() {
				var currentImg = $("#" + this.id).children("img").attr("src");
				var sortCol = sortColoumn.split(",");
				$("#" + arg_sortColumn).val(this.id);
				var hasImg = true;
				// 箭头图标
				if (currentImg === undefined) {
					hasImg = false;
				}
				if (hasImg) {
					for (var i = 0; i < sortCol.length; i++) {
						if ($("#" + sortCol[i]).attr("id") != this.id) {
							$("#" + sortCol[i]).children("img").attr("style", "display:none");
						} else {
							$("#" + sortCol[i]).children("img").attr("style", "display:block");
						}
					}
				}
				if ($("#" + arg_order).attr("value") == "desc") {
					$("#" + arg_order).val("asc");
					if (hasImg) {
						$("#" + this.id).children("img").attr("src", currentImg.replace(/down/g, "up"));
					}
				} else {
					$("#" + arg_order).val("desc");
					if (hasImg) {
						$("#" + this.id).children("img").attr("src", currentImg.replace(/up/g, "down"));
					}
				}
				var postData = prepareData();
				$.ajaxExtends.asyncPostJson(defaults.url, postData, function(data) {
					displayData(data, contentDivId, valueCallback, rowCallback, lastCallback);
				});
			});
		}
	};
	// 判断
	var hasProperty = function(obj) {
		if (obj == null) {
			return false;
		}
		var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]";
		if (isjson) {
			return true;
		} else {
			return false;
		}
	};
	// 准备post的数据
	var prepareData = function() {
		var pagingArg = defaults.templatePrefix + "_pagingArg";
		var pageData = $("#" + pagingArg).serializeForm();
		if (defaults.formId != null && defaults.formId != "") {
			var postData = {};
			var formData = $("#" + defaults.formId).serializeForm();
			for ( var attr in pageData) {
				postData[attr] = pageData[attr];
			}
			for ( var attr in formData) {
				postData[attr] = formData[attr];
			}
			formData["pagingParams"] = pageData;
			console.log(JSON.stringify(formData));
			return formData;
		} else {
			return pageData;
		}
	};
	// 刷新
	var freshPaging = function() {
		var postData = prepareData();
		$.ajaxExtends.asyncPostJson(defaults.url, postData, function(data) {
			if(data["code"]==1){
				displayData(data);
			}else{
				alert("无数据");
			}
		});
	};
	// 填充数据
	var displayData = function(data) {
		var extObj = "";
		if ("" != defaults.extObj) {
			extObj = data[defaults.extObj];
		}
		if ("" != defaults.objProperty) {
			data = data[defaults.objProperty];
		}
		console.log(JSON.stringify(data));
		if (data != null) {
			var fixedContentObj = $("#" + contentArea).find("#" + fixedContent);
			if (fixedContentObj.size() > 0) {
				$("#" + contentArea).empty();
				$("#" + contentArea).append(fixedContentObj);
			} else {
				$("#" + contentArea).empty();
			}
			$("#" + totalPage).text(data.pages);
			$("#" + total).text(data.total);
			$("#" + currentPage).text($("#" + arg_currentPage).val());
			// 得到样式行对像
			var rowNum = 1;
			$.each(data.list, function(i, recordObj) {
				var row = $("#" + copyRow).html();
				for ( var property in recordObj) {
					// 嵌套的JSON
					if (hasProperty(recordObj[property])) {
						for ( var it in recordObj[property]) {
							var patten = "\:" + it + "\\b";
							var re2 = new RegExp(patten, "g");
							if ($.isFunction(defaults.onSetValue)) {
								var newValue = defaults.onSetValue.call(this, it, recordObj[property][it] == null ? "" : recordObj[property][it]);
								row = row.replace(re2, newValue);
							} else {
								row = row.replace(re2, recordObj[property][it] == null ? "" : recordObj[property][it]);
							}
						}
					} else {
						var patten = "\:" + property + "\\b";
						var re = new RegExp(patten, "g");
						if ($.isFunction(defaults.onSetValue)) {
							var newValue = defaults.onSetValue.call(this, property, recordObj[property] == null ? "" : recordObj[property]);
							row = row.replace(re, newValue);
						} else {
							row = row.replace(re, recordObj[property] == null ? "" : recordObj[property]);
						}
					}
				}
				if ($.isFunction(defaults.onSetRow)) {
					var newRow = defaults.onSetRow.call(this, row, rowNum);
					$("#" + contentArea).append(newRow);
				} else {
					$("#" + contentArea).append(row);
				}
				rowNum = rowNum + 1;
			});
			if ($.isFunction(defaults.onComplete)) {
				defaults.onComplete.call(this, extObj);
			}
		}
	};

	// 自动执行加载数据
	(function() {
		// bindTableHeadFn();
		freshPaging();
	}());
};