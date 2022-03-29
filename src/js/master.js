let sidenav, collapsible, newsSwiper, popularSlider, tooltip;

$(() => {
	
	sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'));
	collapsible = M.Collapsible.init(document.querySelectorAll('.collapsible'));

	if($('#news-slider').length){

		newsSwiper = new Swiper('#news-slider', {
			loop: true,
			pagination: {
				el: '#news-pagination',
				type: 'bullets',
				clickable: true
			},
			spaceBetween: 10,
			on: {
				'slideChange': () => {
					$('.lazy').lazy();
				}
			}
		});
	}

	if($('#popular-slider').length){
		popularSlider = new Swiper('#popular-slider', {
			pagination: {
				el: '#popular-pagination',
				type: 'bullets',
				clickable: true
			},
			spaceBetween: 20,
			breakpoints:{
				600: {
					slidesPerView: 1
				},
				1400: {
					slidesPerView: 2
				},
				1800: {
					slidesPerView: 3
				}
			},
			on: {
				'slideChange': () => {
					$('.lazy').lazy();
				}
			}
		});
	}

	let tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'));

	$('.lazy').lazy();

	$('body').on('click', '.disabled', nop);
	$('body').on('click', '.basket-add', showCount);
	$('body').on('click', '.basket-minus', basketMinus);
	$('body').on('click', '.basket-plus', basketPlus);
	$('body').on('blur', '.counter-wrapper', counterBlur);
	$('body').on('click', '.toast-trigger', showToast);
});

function showToast(e){
	e.preventDefault();
	let text = $(this).data("text");
	let className = $(this).data("class");
	M.toast({
		html: text, 
		classes: className
	});

}

function counterBlur(){
	
	if($(this).val() == null){
		$(this).val(0);
	}

	$(this).parents('.basket-count').addClass('hidden').prev().removeClass('hidden');
}

function nop(e){
	e.preventDefault();
	e.stopImmediatePropagation();
	return false;
}

function showCount(e){
	e.preventDefault();
	$(this).addClass('hidden').next().removeClass('hidden').find('input').val(1);
}

function basketPlus(e){
	e.preventDefault();
	let $input = $(this).parents('.basket-count').find('input');
	let val = parseInt($input.val()) + 1;
	$input.val(val);
}

function basketMinus(e){
	e.preventDefault();
	let $input = $(this).parents('.basket-count').find('input');
	let val = parseInt($input.val()) - 1;
	$input.val(val);

	if($input.val() == 0){
		$(this).parents('.basket-count').addClass('hidden').prev().removeClass('hidden');
	}
}