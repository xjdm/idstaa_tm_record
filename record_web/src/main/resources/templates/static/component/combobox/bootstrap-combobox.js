/*
 * =============================================================
 * bootstrap-combobox.js v1.1.6
 * ============================================================= Copyright 2012
 * Daniel Farrell
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License. ============================================================
 */

!function($) {

	"use strict";

	/*
	 * COMBOBOX PUBLIC CLASS DEFINITION ================================
	 */

	var Combobox = function(element, options) {
		this.options = $.extend({}, $.fn.combobox.defaults, options);
		this.mode = this.options.mode;
		this.$source = $(element);
		this.$container = this.setup();
		this.$element = this.$container.find('input[type=text]');
		this.$button = this.$container.find('.dropdown-toggle');
		this.$menu = $(this.options.menu).appendTo('body');
		this.template = this.options.template || this.template;
		this.matcher = this.options.matcher || this.matcher;
		this.matcherWay = 'name';
		this.sorter = this.options.sorter || this.sorter;
		this.highlighter = this.options.highlighter || this.highlighter;
		this.shown = false;
		this.selected = false;
		this.transferAttributes();
		this.listen();
	};

	Combobox.prototype = {

		constructor : Combobox,
		setup : function() {
			var that = this;
			var combobox = $(this.template());
			this.$source.append(combobox);
			$("#"+this.options.key).bind("change",function(){
				that.matcherWay = 'id';
				that.$element.val($("#"+that.options.key).val());
				that.lookup();
				that.hide();
			});
			return combobox;
		},

		disable : function() {
			this.$element.prop('disabled', true);
			this.$button.attr('disabled', true);
			this.disabled = true;
			this.$container.addClass('combobox-disabled');
		}

		,
		enable : function() {
			this.$element.prop('disabled', false);
			this.$button.attr('disabled', false);
			this.disabled = false;
			this.$container.removeClass('combobox-disabled');
		},

		transferAttributes : function() {
//			this.options.placeholder = this.$source.attr('data-placeholder') || this.options.placeholder
//			this.$element.attr('name', this.$source.attr('id'));
//			this.$target.prop('name', this.$source.prop('name'))
//			this.$target.val(this.$source.val())
//			this.$source.removeAttr('name') // Remove from source otherwise form
//			// will pass parameter twice.
//			this.$element.attr('required', this.$source.attr('required'))
//			this.$element.attr('rel', this.$source.attr('rel'))
//			this.$element.attr('title', this.$source.attr('title'))
//			this.$element.attr('class', this.$source.attr('class'))
//			this.$element.attr('tabindex', this.$source.attr('tabindex'))
//			this.$source.removeAttr('tabindex')
//			if (this.$source.attr('disabled') !== undefined)
//				this.disable();
		}

		,
		select : function() {
			var vals = this.$menu.find('.active').attr('data-value').split(",");
			var name = this.$menu.find('.active').find('a').text();
			this.$element.val(name).trigger('change');
			var fnameArray=this.options.fname.split(",");
			for(var i=0;i<fnameArray.length;i++){
				$("#"+fnameArray[i]).val(vals[i]);
			}
			this.$container.addClass('combobox-selected');
			this.selected = true;
			return this.hide();
		}

		,
		updater : function(item) {
			return item;
		}

		,
		show : function() {
			var pos = $.extend({}, this.$element.position(), {
				height : this.$element[0].offsetHeight
			});

			this.$menu.insertAfter(this.$element).css({
				top : pos.top + pos.height,
				left : pos.left
			}).show();

			this.shown = true;
			return this;
		}

		,
		hide : function() {
			this.$menu.hide();
			this.shown = false;
			return this;
		}

		,
		lookup : function(event) {
			this.query = this.$element.val();
			if (this.query.length < this.options.minChars)
				return;
			if (this.mode == 'remote') {
				var reload = true;
				if (this.$comboData) {
					reload = false;
				}
				//查询参数赋值
				this.options.params[this.options.Qname] = this.query;
				if (reload) {
					this.loadData();
				}
			}
			return this.process();
		},

		process : function() {
			var that = this;
			var items = $.grep(this.$comboData, function(item) {
				if(that.matcherWay == 'id'){
					var result = that.matcherId(item.id.split(",")[0]);
					if(result){
						that.$element.val(item.name);
					}
					return result;
				}else{
					return that.matcherName(item.name);
				}
			},false);

			if (!items.length) {
				return this.shown ? this.hide() : this;
			}
			return this.render(items).show();
		}

		,
		template : function() {
			if (this.options.bsVersion == '2') {
				return '<div class="combobox-container" style="width:' + (this.options.width || 100) + 'px;"><div class="input-append"> <input style="height:30px;" type="text" autocomplete="off" class="form-control" placeholder="请选择"/> <span style="height:30px;" class="add-on dropdown-toggle" data-dropdown="dropdown"> <span class="caret"/> <i style="height:10px;" class="icon-remove"/> </span> </div> </div>';
			} else {
				return '<div class="combobox-container" style="width:' + (this.options.width || 100) + 'px;"><div  class="input-group"> <input style="height:30px;" type="text" autocomplete="off" class="form-control" placeholder="请选择"/> <span style="height:30px;" class="input-group-addon dropdown-toggle" data-dropdown="dropdown"> <span class="caret" /> <span style="height:10px;" class="glyphicon glyphicon-remove" /> </span> </div> </div>';
			}
		}

		,
		matcherId : function(item) {
			if(item.toLowerCase()==this.query.toLowerCase()){
				return true;
			}else{
				return false;
			}
		},

		matcherName : function(item) {
			if(item.toLowerCase().indexOf(this.query.toLowerCase())>-1){
				return true;
			}else{
				return false;
			}
		},

		sorter : function(items) {
			var beginswith = [], caseSensitive = [], caseInsensitive = [], item;

			while (item = items.shift()) {
				if (!item.toLowerCase().indexOf(this.query.toLowerCase())) {
					beginswith.push(item);
				} else if (~item.indexOf(this.query)) {
					caseSensitive.push(item);
				} else {
					caseInsensitive.push(item);
				}
			}

			return beginswith.concat(caseSensitive, caseInsensitive);
		}

		,
		highlighter : function(item) {
			var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
			return item.replace(new RegExp('(' + query + ')', 'ig'), function($1, match) {
				return '<strong>' + match + '</strong>';
			});
		},

		render : function(items) {
			var that = this;
			that.$menu.html("");
			$.each(items, function(i, dataItem) {
				var selectItem=$(that.options.item);
				selectItem.attr('data-value', dataItem.id);
				selectItem.find('a').html(that.highlighter(dataItem.name));
				that.$menu.append(selectItem);
			});
			return this;
		}

		,
		next : function(event) {
			var active = this.$menu.find('.active').removeClass('active'), next = active.next();

			if (!next.length) {
				next = $(this.$menu.find('li')[0]);
			}

			next.addClass('active');
		}

		,
		prev : function(event) {
			var active = this.$menu.find('.active').removeClass('active'), prev = active.prev();

			if (!prev.length) {
				prev = this.$menu.find('li').last();
			}

			prev.addClass('active');
		}

		,
		toggle : function() {
			if (!this.disabled) {
				if (this.$container.hasClass('combobox-selected')) {
					this.clearTarget();
					this.clearElement();
				} else {
					if (this.shown) {
						this.hide();
					} else {
						this.matcherWay='name';
						this.clearElement();
						this.lookup();
					}
				}
			}
		}

		,
		clearElement : function() {
			this.$element.val('').focus();
		}

		,
		clearTarget : function() {
			this.$source.val('');
			this.$container.removeClass('combobox-selected');
			this.selected = false;

			var fnameArray=this.options.fname.split(",");
			for(var i=0;i<fnameArray.length;i++){
				$("#"+fnameArray[i]).val("");
			}
		},

		loadData : function(obj) {
			var that = this;
			if (that.options.mode == 'remote') {
				$.ajax({
					url : that.options.url,
					data : that.options.params,
					async : false,
					dataType : 'json',
					type : 'post',
					success : function(json, textStatus, jqXHR) {
						if (jqXHR.getResponseHeader('sessionstatus')) {
							window.parent.jumpToIndex();
							return;
						}
						that.$comboData = json;
					}
				});
			} else {
				that.$comboData = that.options.params;
			}

		}

		,
		listen : function() {
			this.$element.on('focus', $.proxy(this.focus, this)).on('blur', $.proxy(this.blur, this)).on('keypress', $.proxy(this.keypress, this)).on('keyup', $.proxy(this.keyup, this));

			if (this.eventSupported('keydown')) {
				this.$element.on('keydown', $.proxy(this.keydown, this));
			}

			this.$menu.on('click', $.proxy(this.click, this)).on('mouseenter', 'li', $.proxy(this.mouseenter, this)).on('mouseleave', 'li', $.proxy(this.mouseleave, this));

			this.$button.on('click', $.proxy(this.toggle, this));
		}

		,
		eventSupported : function(eventName) {
			var isSupported = eventName in this.$element;
			if (!isSupported) {
				this.$element.setAttribute(eventName, 'return;');
				isSupported = typeof this.$element[eventName] === 'function';
			}
			return isSupported;
		}

		,
		move : function(e) {
			if (!this.shown) {
				return;
			}

			switch (e.keyCode) {
			case 9: // tab
			case 13: // enter
			case 27: // escape
				e.preventDefault();
				break;

			case 38: // up arrow
				e.preventDefault();
				this.prev();
				break;

			case 40: // down arrow
				e.preventDefault();
				this.next();
				break;
			}

			e.stopPropagation();
		}

		,
		keydown : function(e) {
			this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [ 40, 38, 9, 13, 27 ]);
			this.move(e);
		}

		,
		keypress : function(e) {
			if (this.suppressKeyPressRepeat) {
				return;
			}
			this.move(e);
		}

		,
		keyup : function(e) {
			switch (e.keyCode) {
			case 40: // down arrow
			case 39: // right arrow
			case 38: // up arrow
			case 37: // left arrow
			case 36: // home
			case 35: // end
			case 16: // shift
			case 17: // ctrl
			case 18: // alt
				break;

			case 9: // tab
			case 13: // enter
				if (!this.shown) {
					return;
				}
				this.select();
				break;

			case 27: // escape
				if (!this.shown) {
					return;
				}
				this.hide();
				break;

			default:
				this.clearTarget();
				this.lookup();
			}

			e.stopPropagation();
			e.preventDefault();
		}

		,
		focus : function(e) {
			this.focused = true;
		}

		,
		blur : function(e) {
			var that = this;
			this.focused = false;
			var val = this.$element.val();
			if (!this.selected && val !== '') {
				this.$element.val('');
			}
			if (!this.mousedover && this.shown) {
				setTimeout(function() {
					that.hide();
				}, 200);
			}
		}

		,
		click : function(e) {
			e.stopPropagation();
			e.preventDefault();
			this.select();
			this.$element.focus();
			if ($.isFunction(this.options.onValueChange)) {
				this.options.onValueChange.call();
			}
		}

		,
		mouseenter : function(e) {
			this.mousedover = true;
			this.$menu.find('.active').removeClass('active');
			$(e.currentTarget).addClass('active');
		}

		,
		mouseleave : function(e) {
			this.mousedover = false;
		},
	};

	/*
	 * COMBOBOX PLUGIN DEFINITION ===========================
	 */
	$.fn.combobox = function(option) {
		return this.each(function() {
			var $this = $(this), data = $this.data('combobox'), options = typeof option == 'object' && option;
			if (!data) {
				$this.data('combobox', (data = new Combobox(this, options)));
			}
			if (typeof option == 'string') {
				data[option]();
			}
		});
	};

	$.fn.combobox.defaults = {
		bsVersion : '3',
		menu : '<ul class="typeahead typeahead-long dropdown-menu"></ul>',
		item : '<li><a href="#"></a></li>'
	};

	$.fn.combobox.Constructor = Combobox;

}(window.jQuery);
