//MERGE OBJECTS
function mergeObj(array){
  var
    length = array.length,
    arr = array[0];
  for (var i = 1; i < length; i++ ){ arr = $.merge(arr, array[i]); }
  return arr;
};
//MERGE OBJECTS END

/*CUSTOM INPUTS*/
function customInputs(wrapInput) {
  if (wrapInput.length) {
    var inp = ':text, :password, textarea, input[type="date"], input[type="datetime"], input[type="email"], input[type="number"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"]';
    wrapInput.on('click', function() {
      var
        self = $(this),
        curInp = self.find(inp).not('[disabled]');
      if (curInp.length) {
        self.addClass('focus');
        if (!curInp.is(':focus')) {
          curInp.trigger('focus');
        }
      }
    });
    wrapInput.on({
        change: function(e) {
          var curWrap = $(e.delegateTarget);
          $(this).is(':disabled') ? curWrap.addClass('disabled') : curWrap.removeClass('disabled');
        },
        blur: function(e) {
          $(e.delegateTarget).removeClass('focus');
        }
      },
      inp);
  }
};
/*CUSTOM INPUTS END*/

/*PLACEHOLDER*/
function placeholder(objInputs) {
  var browserIE = window.navigator.userAgent.match(/MSIE *\d+\.\w+/i);
  browserIE = browserIE != null ? browserIE.toString().charAt(5) : 10;
  if ((browserIE <= 9) && objInputs.length) {
    objInputs.placeholder();
  }
};
/*PLACEHOLDER END*/

// addPositionClass
function addPositionClass(position, feedback, obj) {
  removePositionClass(obj);
  obj.css(position).addClass(feedback.vertical).addClass(feedback.horizontal);
}

// removePositionClass
function removePositionClass(obj) {
  obj.removeClass('top bottom center left right');
}


function galleries(el, settings) {
  el = $(el);

  if (el.length) {
    el.owlCarousel(settings);
  }
}

function imgPopUp() {
  var el;
  el = $(".fancybox");

  if (el.length) {
    el.fancybox();
  }
}


/* Spinner */
function spinner() {
  var spin = $('.input.count')

  if (spin.length) {
    spin.each(function() {
      var spinner = $(this);
      spinner.spinner({
        spin: function(event, ui) {
          if (ui.value > 9999) {
            $(this).spinner('value', 9999);
            return false;
          } else if (ui.value < 1) {
            $(this).spinner('value', 1);
            return false;
          }
          var spin_val = $(this).spinner('value');
        },
        create: function(ui, event) {
          var widget = $(this).spinner('widget');
          widget.find('.ui-icon-triangle-1-n').html('+');
          widget.find('.ui-icon-triangle-1-s').html('-');
        },
        stop: function(event, ui) {
          basketTotal();
        }
      });
      // Функция реакции на событие event, проверяет введёный символ на "число это или нет", "дополнительные кнопки или нет" и "значение в интервале 1 - 9999 "
      function checkSpinInput(event) {
        // Если Ctrl+A, home, end, стрелки
        if (event.keyCode == 46 || event.keyCode == 9 || event.keyCode == 27 ||
          (event.keyCode == 65 && event.ctrlKey === true) ||
          (event.keyCode >= 35 && event.keyCode <= 39)) {} else {
          // Если не число - отменить действие
          if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            if (event.keyCode != 8)
              event.preventDefault();
          }
        }
      }
      spinner.keydown(function(event) {
        checkSpinInput(event);
      });
      spinner.keyup(function(event) {
        checkSpinInput(event);
      });
      spinner.blur(function(event) {
        if (!spinner.val() || spinner.val() == 0)
          spinner.val(1);
        basketTotal();
      });
      // spinner.change(function() {
      //   if (curVal.length == 1) {
      //     $('.ui-spinner-down ').addClass('disable')
      //   } else {
      //     $('.ui-spinner-down ').removeClass('disable')
      //   }
      // })
    });
  }
}

/* Spinner End */

function basketTotal() {
  cart = $('.basket.table tbody')
  total = $('.total')
  total_value = 0;
  cart.find('tr').each(function() {
    var cur = $(this),
      price = parseFloat(cur.attr('data-price')), // цена
      cost = cur.find('.price')
    count = cur.find('.input.count').val(), // количество
      sum = cur.find('.summory'), // стоимость
      sum_value = price * count;
    cost.text(price);
    sum.text(sum_value);
    total_value += sum_value;
  });
  total.html(total_value);
}


function basketTotal() {
  cart = $('.basket.table tbody')
  total = $('.total')
  total_value = 0;
  cart.find('tr').each(function() {
    var cur = $(this),
      price = parseFloat(cur.attr('data-price')), // цена
      cost = cur.find('.price')
      sum_value = price;
    cost.text(price);
    total_value += sum_value;
  });
  total.html(total_value);
}

function deleteRow(e) {
  cart = $('.basket.table tbody')
  del = $('.basket.table tbody .del-text')
    // удаляем строку в корзине
  del.on('click', function(e) {
    e.preventDefault();
    var cur = $(this);
    // var cart = $('.table_cart');
    cur.parents('tr').fadeOut();
    setTimeout(function() {
      cur.parents('tr').remove();
      basketTotal()
    }, 400);
  });
}

// addPositionClass
function addPositionClass(position, feedback, obj){
	removePositionClass(obj);
	obj.css(position).addClass(feedback.vertical).addClass(feedback.horizontal);
}

// removePositionClass
function removePositionClass(obj){
	obj.removeClass('top bottom center left right');
}

/* UI MULTISELECT */
/* type 1 default */
selectConfig = {
	header: false,
	height: 'auto',
	minWidth:  'auto',
	classes: 'select',
	noneSelectedText: 'select options',
	selectedList: 1,
	multiple: false,
	position: {
		my: 'left top',
		at: 'left bottom',
		collision: 'flip flip',
		using: function(position, feedback) {
			addPositionClass(position, feedback, $(this));
		}
	},
	arrow: true,
	divider: false,
	corner: false,
	icon: false,
	jscrollpane: false,
	filter: false,
	filterOptions: {},
	dataImg: false	/*<option value="1" data-img="pic/lang/ua.png">value 1</option>*/
}

/* customSelect */
function customSelect(objSelName, arrConfig){
	if (objSelName.length){
		objSelName.each(function(){
			var self = $(this);
			var curClass = '';
			if (self.is('[class]'))
				curClass = self.attr('class');
			var placeholderFlag, noneSelectedText;
			if (self.is('[data-placeholder]'))
				noneSelectedText = self.attr('data-placeholder');
			else
				noneSelectedText = arrConfig.noneSelectedText;
			if(self.find('option').is('[selected]'))
				placeholderFlag = false;
			else
				placeholderFlag = true;
			self.multiselect({
				header: arrConfig.header,
				height: arrConfig.height,
				minWidth: arrConfig.minWidth,
				classes: arrConfig.classes + ' ' + curClass,
				checkAllText: arrConfig.checkAllText,
				uncheckAllText: arrConfig.uncheckAllText,
				noneSelectedText: noneSelectedText,
				selectedText: arrConfig.selectedText,
				selectedList: arrConfig.selectedList,
				show: arrConfig.show,
				hide: arrConfig.hide,
				autoOpen: arrConfig.autoOpen,
				multiple: arrConfig.multiple,
				position: arrConfig.position,
				appendTo: arrConfig.appendTo,
				create: function(event, ui){
					var
						btn = $(this).multiselect('getButton'),
						btnIcon = btn.find('.ui-icon'),
						widg = $(this).multiselect('widget');
					if (placeholderFlag){
						$(this).multiselect("uncheckAll");
						btn.addClass('ui-state-placeholder');
					}
					btn.find('span').not('[class]').addClass('ui-multiselect-value');

					// button divider
					if (arrConfig.divider === true)
						btn.append('<span class="ui-multiselect-divider"></span>');

					// button arrow
					if (arrConfig.arrow === true)
						btn.append('<span class="ui-multiselect-arrow"></span>');

					// button icon
					if (arrConfig.icon !== true)
						btnIcon.remove();
					else
						btnIcon.removeClass('ui-icon ui-icon-triangle-2-n-s').addClass('ui-multiselect-icon');
					btn.children().wrapAll('<span class="ui-multiselect-inner"></span>');
					widg.children().wrapAll('<div class="ui-multiselect-menu-inner"></div>');

					// widget scrollpane
					if (arrConfig.jscrollpane === true)
						widg.find('.ui-multiselect-checkboxes').wrap('<div class="ui-multiselect-wrap-scrollpane"><div class="ui-multiselect-scrollpane"></div></div>');

					// widget corner
					if (arrConfig.corner === true)
						widg.append('<div class="ui-multiselect-corner"></div>');

					// button image
					if (arrConfig.dataImg === true){
						var
							listOptions = $(this).find('option'),
							list = widg.find('.ui-multiselect-checkboxes li span');
						list.each(function(i){
							$(this).html('<img src="'+listOptions.eq(i).attr('data-img')+'" />');
							if(listOptions.eq(i).is(':selected')){
								btn.find('.ui-multiselect-value').html('<img src="'+listOptions.eq(i).attr('data-img')+'" />');
							}
						});
						/*ie7-8 image click bug*/
						list.on('click', function(){
							$(this).parents('li').find('input').trigger('click');
						});
					}

					// check all
					widg.on('click', '.ui-multiselect-all', function(){
						btn.removeClass('ui-state-placeholder');
					});

					// uncheck all
					widg.on('click', '.ui-multiselect-none', function(){
						btn.addClass('ui-state-placeholder');
					});
				},
				open: function(event, ui){
					var widg = $(this).multiselect('widget');

					// adding to the last item class 'first'
					widg.find('.ui-multiselect-checkboxes li:eq(1)')
						.addClass('first')
						.siblings().removeClass('first');

					// adding to the last item class 'last'
					widg.find('.ui-multiselect-checkboxes li:last')
						.addClass('last')
						.siblings().removeClass('last');

					// fix scroll drop list
					var list = widg.find('.ui-multiselect-checkboxes');
					var maxH = parseInt(list.css('max-height'));
					if(maxH > parseInt(list.height()))
						list.removeClass('list-fix-scroll');
					else
						list.addClass('list-fix-scroll');

					// jscrollpane run handler
					if (arrConfig.jscrollpane === true){
						scrollbarVertical(widg.find('.ui-multiselect-scrollpane'));
						//scrollpaneFix(widg.find('.jspScrollable'));
					}
				},
				click: function(event, ui){
					var
						btn = $(this).multiselect('getButton'),
						widg = $(this).multiselect('widget'),
						flagCheck = false;
					// placeholder
					if (ui.checked)
						btn.removeClass('ui-state-placeholder');
					else {
						if ($(this).multiselect("option").multiple)
						widg.find(':checkbox').each(function(){
						  if ($(this).is(':checked')) flagCheck = true;
						});
						if (flagCheck){
							btn.removeClass('ui-state-placeholder');
						} else {
							btn.addClass('ui-state-placeholder');
						}
					}
				},
				beforeclose: function(event, ui){
					var widg = $(this).multiselect('widget');
					removePositionClass(widg);
					/* jscrollpane destroy handler */
					if (arrConfig.jscrollpane === true){
						var jscrollpane = widg.find('.ui-multiselect-scrollpane').data('jsp');
						if (jscrollpane){
							jscrollpane.destroy();
						}
						$(document).unbind('mousewheel.false');
					}
				}
			});
			/* filter options */
			if (arrConfig.filter === true){
				self.multiselectfilter(arrConfig.filterOptions);
			}
			/* filter options end */
		});
	}
}
/* customSelect end */

// customSelectClose
function customSelectClose(objSelect){
	if (objSelect.length){
		objSelect.each(function(){
			var self = $(this);
			if (self.next('button.ui-multiselect').length)
			self.multiselect('close');
		});
	}
}

// customSelectRefreshPlaceholder
function customSelectRefreshPlaceholder(objSelect){
	if (objSelect.length){
		objSelect.each(function(){
			var self = $(this);
			if (self.next('button.ui-multiselect').length){
				var btn = self.multiselect("getButton");
				if(! self.find('option').is('[selected]')){
					self.multiselect("uncheckAll");
					btn.addClass('ui-state-placeholder');
				}else{
					btn.removeClass('ui-state-placeholder');
				}
			}
		});
	}
};

// customSelectRefresh
function customSelectRefresh(objSelect){
	if (objSelect.length){
		objSelect.each(function(){
			var self = $(this);
			if (self.next('button.ui-multiselect').length)
			self.multiselect('refresh');
		});
	}
}


/* UI MULTISELECT END */

/* SCROLLPANE */
/* scrollbarVertical */
function scrollbarVertical(objScroll){
	if (objScroll.length) {
		objScroll.each(function(){
			$(this).jScrollPane({
				mouseWheelSpeed:85,
				verticalDragMinHeight: 30,
				verticalDragMaxHeight: 30,
				horizontalDragMinWidth: 0,
				horizontalDragMaxWidth: 0,
				autoReinitialise: true
			});
		});
	}
}
/* scrollbarVertical end */

/* scrollbarHorizontal */
function scrollbarHorizontal(objScroll){
	if (objScroll.length) {
		objScroll.each(function(){
			$(this).jScrollPane({
				verticalDragMaxHeight:0,
				verticalDragMinHeight:0,
				horizontalDragMinWidth: 43,
				horizontalDragMaxWidth: 43
			});
		});
	}
}
/* scrollbarHorizontal end */
/* SCROLLPANE END */

function isDevice() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);

	if (!check) { // run on desktop
		customSelect($(".custom-select"), selectConfig);
		// selectRemoveEmpty();
	} else { // run on devices
		disableSelectOption();
		selectRemoveEmpty();
	}
}

function disableSelectOption() {
	var el;
	el = $(".js-disable-option");

	if (el.length) {
		el.on("change", function() {
			$(this).find("option:first").attr("disabled", "disabled");
		});
	}
}

function selectRemoveEmpty() {
	var el;
	el = $(".js-remove-empty");

	if (el.length) {
		el.find("option:first").remove();
	}
}


/**PREVIEW***/
function preview() {
  $('.preview-list > li > a').on('click',function(e){
   var cur_item = $(this);
   var cur_item_href = cur_item.attr('href');
   var cur_item_large = cur_item.attr('data-image-large');

   $('.preview-holder-large').attr('href',cur_item_href);
   $('.preview-holder-large img').attr('src',cur_item_large);
   e.preventDefault();
  });



  $('.preview-list > li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });


  // $('.preview-holder-large').on('click', function(e){
  // var cur = $(this);
  // var cur_href = cur.attr('href');
  // $('.preview-list a').addClass('fancybox-group');
  // $('.preview-list a[href="'+cur_href+'"]').trigger('click');
  // e.preventDefault();
  // });


  $('.fancybox-group').fancybox({
    maxWidth  : 800,
    maxHeight : 600,
    fitToView : false,
    width   : '70%',
    height    : '70%',
    autoSize  : false,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect : 'none',

  });
}

function fancybox() {
  $('.preview-holder-large.preview').fancybox({

  });
  // $('.zoom-holder a').fancybox();

}

/*TABS*/
function tabs() {
  // $(".tabs.main").lightTabs();
  $('.tabs.product-info').lightTabs_1();

}

function customScroll() {
	var el;
	el = $(".js-custom-scroll");

	if (el.length) {
		el.jScrollPane({
			mouseWheelSpeed: 84,
			verticalDragMinHeight: 20,
			verticalDragMaxHeight: 20,
			horizontalDragMinWidth: 0,
			horizontalDragMaxWidth: 0,
			autoReinitialise: true,
			hideFocus: true
		});
	}
}




function accordion() {
	"use strict";

	var doc, wnd,
			container, params, closeSection, toggleTrigger;
	doc = document;
	wnd = window;

	params = {
		accordionContainer: ".js-accordion",
		accordionTrigger: ".js-accordion-trigger",
		toggleElement: ".foo-col .ttl",
		activeCls: "accordion-active",
		bp: 680 // max-width
	};
	container = doc.querySelector(params.accordionContainer);

	if (container) {
		closeSection = function(el) {
			$(el).removeClass(params.activeCls);
			$(el).siblings().removeClass(params.activeCls);
		}

		toggleTrigger = function() {
			var windowWidth, el;

			windowWidth = $(window).width();
			el = $(params.toggleElement);

			windowWidth <= params.bp
				? el.addClass(params.accordionTrigger.slice(1)) // remove dot
				: el.removeClass(params.accordionTrigger.slice(1));
		}
		toggleTrigger();

		$(params.accordionContainer).on("click", params.accordionTrigger, function(e) {
			var parent = $(this).parent();

			if (parent.is("." + params.activeCls)) {
				closeSection(parent);
			} else {
				closeSection(parent);
				parent.addClass(params.activeCls);
			}
			e.preventDefault();
		});

		wnd.addEventListener("resize", toggleTrigger);
	}
}

function basketCatalog() {
  var catalogBtn = $(".basket-catalog"),
      catalogItems = $('.basket-page .site-nav');
      // isMobile = {
      //     iOS: function() {
      //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      //     }
      // };

  catalogBtn.on('click', function() {
    $(this).toggleClass('active');
    catalogItems.toggleClass('visible');
  })

  $(document).on('click', function(event) {
    if ($(event.target).closest($('.catalog-wrap')).length) return;
    catalogBtn.removeClass('active')
    catalogItems.removeClass('visible')
    event.stopPropagation();
  })

  // if( isMobile.iOS() ) {
  //   $(document).on('touchend ' , function(event) {
  //     if ($(event.target).closest($('.catalog-wrap')).length) return;
  //     catalogBtn.removeClass('active')
  //     catalogItems.removeClass('visible')
  //     event.stopPropagation();
  //   })
  // };
}

function openBasket() {
  var basketBtn = $('.cart'),
      basketItem = $('.basket-small');
      // isMobile = {
      //     iOS: function() {
      //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      //     }
      // };

  basketBtn.on('click', function() {
    $(this).toggleClass('active')
    basketItem.toggleClass('visible');
  })

  $(document).on('click', function(event) {
    if ($(event.target).closest($('.cart-wrap')).length) return;
    basketBtn.removeClass('active')
    basketItem.removeClass('visible')
    event.stopPropagation();
  })

  // if( isMobile.iOS() ) {
  //   $(document).on('touchend', function(event) {
  //     if ($(event.target).closest($('.cart-wrap')).length) return;
  //     basketBtn.removeClass('active')
  //     basketItem.removeClass('visible')
  //     event.stopPropagation();
  //   })
  // }
}

function mobileTransform() {
var navBlock = $('.site-nav'),
    catalogHolder = $('.catalog-wrap .catalog'),
    catalogBtn = $('.catalog.basket-catalog'),
    basketCatalog = $('.basket-page .catalog'),
    cartBtn = $('.cart'),
    cartHolder = $('.basket-small'),
    productFilters = $(".products-filters"),
    prodFiltersHolderTop = $(".js-filters-holder-top"),
    windowsize = window.innerWidth;
    // isMobile = {
    //     iOS: function() {
    //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    //     }
    // };


  if (windowsize <= 980) {
    navBlock.insertAfter(catalogHolder);
    catalogHolder.addClass('basket-catalog');
    $('.catalog-wrap').on('click', '.basket-catalog', function() {
      $(this).toggleClass('active');
      navBlock.toggleClass('visible');
    })
    $(document).on('click ' , function(event) {
      event.stopPropagation();
      if ($(event.target).closest($('.catalog-wrap')).length) return;
      $('.catalog-wrap .catalog.basket-catalog').removeClass('active')
      navBlock.removeClass('visible')
    })

    productFilters.appendTo(prodFiltersHolderTop);
    $(".mobile-filters-wrap").on("click", ".js-filters-trigger", function() {
    	$(this).toggleClass("active");
    	$(this).closest(".filters-holder").toggleClass("visible");
    });

    $(document).on("click", function(e) {
      if (!$(e.target).closest(".filters-holder").length) {
      	$(".filters-holder").removeClass("visible");
      	$(".js-filters-trigger").removeClass("active");
      }
    });
  } else {
    navBlock.prependTo('.aside');
    catalogHolder.removeClass('basket-catalog');
    basketCatalog.addClass('basket-catalog');

    productFilters.appendTo(".aside");
  }

  if (windowsize <= 580) {
    // catalogBtn.text('Каталог');
    navBlock.prependTo($('.bottom .container'));
    cartHolder.appendTo('.bottom .container');

  } else {
    // catalogBtn.text('Каталог товаров');
    cartHolder.appendTo('.cart-wrap .cart');
  }

  // if( isMobile.iOS() ) {
  //   $(document).on('touchend ' , function(event) {
  //     event.stopPropagation();
  //     if ($(event.target).closest($('.catalog-wrap')).length) return;
  //     $('.catalog-wrap .catalog.basket-catalog').removeClass('active')
  //     navBlock.removeClass('visible')
  //   })
  // };
}


$(document).ready(function() {
  galleries(".gallery01", {
    items: 1
  });
  galleries(".gallery02", {
    loop: true,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      460: {
      	items: 2
      },
      690: {
      	items: 3
      },
      980: {
      	items: 3
      },
      1025: {
      	items: 4
      }
    }
  });
  galleries(".gallery03", {
    loop: true,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 5
      }
    }
  });
  imgPopUp();
  isDevice();


  spinner()
  basketTotal();


    // keyPress()
  deleteRow()
  preview()
  fancybox()
  tabs();
  customScroll();
  basketCatalog();
  openBasket();
  accordion();
  mobileTransform()
  // detectDevice()
});

$(window).load(function() {

});
$(window).resize(function() {
  mobileTransform()
  customSelectRefresh($(".custom-select"));
});