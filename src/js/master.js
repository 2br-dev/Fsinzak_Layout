let sidenav, collapsible, newsSwiper, popularSlider, tooltip, datepicker;

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

	if($('.datepicker').length){
		$('.datepicker').datepicker({
			container: document.body,
			i18n:{
				cancel: "Отмена",
				clear: "Очистить",
				done: "OK",
				months: [
					"Январь",
					"Февраль",
					"Март",
					"Апрель",
					"Май",
					"Июнь",
					"Июль",
					"Август",
					"Сентябрь",
					"Октябрь",
					"Ноябрь",
					"Декабрь",
				],
				monthsShort: [
					"Янв",
					"Фев",
					"Мрт",
					"Апр",
					"Май",
					"Июн",
					"Июл",
					"Авг",
					"Снб",
					"Окт",
					"Ноя",
					"Дек",
				],
				weekdays: [
					'Понедельник',
					'Вторник',
					'Среда',
					'Четверг',
					'Пятница',
					'Суббота',
					'Воскресенье'
				],
				weekdaysShort:[
					'Пн',
					'Вт',
					'Ср',
					'Чт',
					'Пт',
					'Сб',
					'Вс'
				],
				weekdaysAbbrev: ['пн','вт','ср','чт','пт','сб','вс']
			}
		});
	}

	tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'));

	$('.lazy').lazy();
	setupHeader();

	$('body').on('click', '.disabled', nop);
	$('body').on('click', '.basket-add', showCount);
	$('body').on('click', '.basket-minus', basketMinus);
	$('body').on('click', '.basket-plus', basketPlus);
	$('body').on('blur', '.counter-wrapper', counterBlur);
	$('body').on('click', '.toast-trigger', showToast);
	$('body').on('change', '.toggle-password', togglePassword);
	$('body').on('click', '.main-row', toggleDetails);
	$('body').on('click', '.list-field label', openList);
	$('body').on('click', '.list-field a', setList);
	$('body').on('click', closeList);
	$('body').on('click', '.open-place-selector', openPlaceSelector);
	$('body').on('keyup', 'textarea', updateTextarea);
	$(window).on('scroll', setupHeader);

	let tabs = M.Tabs.init(document.querySelectorAll('.tabs'));
	let modal = M.Modal.init(document.querySelectorAll('.modal'));
});

function setupHeader(){
	let st = $('html, body').scrollTop();
	let className = st >= 80 ? 'fixed' : '';
	console.log(st);
	$('body').attr('class', className);
}

function openPlaceSelector(e){
	e.preventDefault();
	let targetModal = M.Modal.getInstance(document.querySelector('#place-selector'));
	targetModal.open();
	targetModal.options.onCloseEnd = (el) => {
		let city = el.querySelector("[name=city]").value;
		let organization = el.querySelector("[name=organization]").value;
		let summary = `${city}, ${organization}`;

		this.value = summary;
	};
}

function updateTextarea(){
	this.style.height="1px";
	this.style.height = (this.scrollHeight)+"px";
}

function updateSubject(){
	debugger;
	if($(this).val() == "Новая тема"){
		$('#subject').removeClass('hidden');
	}else{
		$('#subject').addClass('hidden');
	}
}

function closeList(e){
	
	let el = e.target;
	let path = composedPath(el);

	let filtered = path.filter((element, index) => {
		return element.tagName == 'LABEL';
	});

	$('.list-field ul').removeClass('shown');
	
	if(filtered.length){
		$(filtered).parents('.list-field').find('ul').addClass('shown');
	}
}

function setList(e){
	e.preventDefault();
	let val = $(this).text();
	let $parent = $(this).parents('.list-field');
	let $label = $parent.find('label');
	let $input = $parent.find('input[type="hidden"]');
	let $ul = $parent.find('ul');

	$label.text(val);
	$input.val(val);

	$ul.removeClass('shown');

	afterSetList(val);
}

function afterSetList(val){
	if(val == 'Новая тема'){
		$('#subject').removeClass('hidden');
	}else{
		$('#subject').addClass('hidden');
	}
}

function openList(){
	$(this).parents('.list-field').find('ul').addClass('shown');
}

function toggleDetails(){

	let $detailsRow = $(this).next();
	let $detailsWrapper = $detailsRow.find('.details-row-wrapper');
	
	$(this).toggleClass('active');
	$detailsWrapper.slideToggle('fast');
}

function togglePassword(){
	$('#password').slideToggle('fast');
}

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

function composedPath (el) {

    var path = [];

    while (el) {

        path.push(el);

        if (el.tagName === 'HTML') {

            path.push(document);
            path.push(window);

            return path;
       }

       el = el.parentElement;
    }
}