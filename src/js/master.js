let sidenav, collapsible, newsSwiper, popularSlider, tooltip, datepicker, select, productSlider;

let startY, endY;

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

	if($('#product-slider').length){

		productSlider = new Swiper('#product-slider', {
			loop: true,
			spaceBetween: 10,
			breakpoints: {
				300:{
					slidesPerView: 2
				},
				500:{
					slidesPerView: 3
				},
				700:{
					slidesPerView: 4
				},
				900:{
					slidesPerView: 2
				},
				1200:{
					slidesPerView: 4
				},
				1300: {
					slidesPerView: 5
				}
			},
			on:{
				'slideChange': () => {
					$('.lazy').lazy();
				},
				'click': (e, t) => {
					let image = t.target;
					let slide = $(image).parents('.swiper-slide');
					let slides = $(slide).parents('.swiper').find('.swiper-slide');
					slides.removeClass('active');
					$(slide).addClass('active')
					let background = image.style.backgroundImage;
					$('.product-image').css({
						backgroundImage: background
					})
				}
			}
		})

	}

	if($('#popular-slider').length){
		popularSlider = new Swiper('#popular-slider', {
			pagination: {
				el: '#popular-pagination',
				type: 'bullets',
				clickable: true
			},
			navigation: {
				nextEl: '.pop-right',
				prevEl: '.pop-left'
			},
			spaceBetween: 20,
			breakpoints:{
				600: {
					slidesPerView: 2
				},
				900: {
					slidesPerView: 3
				},
				1400: {
					slidesPerView: 4
				},
				1600: {
					slidesPerView: 5
				},
				1800: {
					slidesPerView: 6
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

	runTimer();

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
	$('body').on('click', '.sidebar-close', closeSideNav);
	$(window).on('scroll', setupHeader);
	$('body').on('click', '.question', toggleAnswer);
	$('body').on('click', '.catalog-navi .folder > a', toggleFolder);
	$('body').on('click', '.close-sidenav', closeSidenav);
	$('body').on('click', '.view-switcher', switchView);
	$('body').on('click', '.super-btn', toggleMegaMenu);
	$('body').on('mouseenter', '#l1 a', openSubLevel);

	$('body').on('mouseenter', '.name-selector-wrapper', e => { 
		$(e.currentTarget).addClass('hover'); 
	});
	$('body').on('mouseleave', '.name-selector-wrapper', e => { $(e.currentTarget).removeClass('hover'); $('.footer').click(); });

	document.addEventListener('touchstart', touchstart);
	document.addEventListener('touchmove', touchmove);
	document.addEventListener('touchend', touchend);

	let tabs = M.Tabs.init(document.querySelectorAll('.tabs'));
	let modal = M.Modal.init(document.querySelectorAll('.modal'));
	select = M.FormSelect.init(document.querySelectorAll('select'));
});

function runTimer(){

	let HabarovskDate = calcTime(10);

	let hours = HabarovskDate.getHours() > 10 ? HabarovskDate.getHours().toString() : "0" + HabarovskDate.getHours().toString;
	let minutes = HabarovskDate.getMinutes() > 10 ? HabarovskDate.getMinutes().toString() : "0" + HabarovskDate.getMinutes().toString;

	let h1 = hours[0];
	let h2 = hours[1];
	let m1 = minutes[0];
	let m2 = minutes[1];

	$('#h1').text(h1);
	$('#h2').text(h2);
	$('#m1').text(m1);
	$('#m2').text(m2);


	requestAnimationFrame(runTimer);
}

function calcTime(offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return nd;
}

function openSubLevel(){
	$(this).parents('ul').find('a').removeClass('hover');
	$(this).addClass('hover');
	$('#l2').empty();
	let $subLevel = $(this).next();
	if( $subLevel.length ){
		$('#l2').html($subLevel.html());
	}	
}

function toggleMegaMenu(e){

	e.preventDefault();
	let already = $(this).hasClass('opened');

	if(already){
		$(this).removeClass('opened');
		$('#shadow').animate({
			opacity: 0
		}, 400, () => {
			$('#shadow').remove();
		});
	}else{
		$(this).addClass('opened');
		let shadow = document.createElement('div');
		shadow.id = 'shadow';
		$('body').append(shadow);
		$('body').on('click', '#shadow', () => {
			$(this).removeClass('opened');
			$('#shadow').animate({
				opacity: 0
			}, 400, () => {
				$('#shadow').remove();
			});
		})
	}
}

function switchView(e){
	e.preventDefault();
	let id = this.id;

	switch(id){
		case "list": $('#catalog-content').addClass('list'); break;
		case "card": $('#catalog-content').removeClass('list'); break;
	}

	$('.view-switcher').removeClass('active');
	$(this).addClass('active');
}

function closeSidenav(e){
	e.preventDefault();
	let instance = M.Sidenav.getInstance(document.querySelector('#cat-nav'));
	instance.close();
}

function toggleFolder(e){
	
	let $li = $(this).parent();
	let $sub = $li.find('> ul');
	let opened = $li.hasClass('opened');


	if( !opened ){
		e.preventDefault();
		$('.folder').removeClass('opened');
		$('.catalog-navi .folder ul').slideUp('fast');
		$li.addClass('opened');
		$sub.slideDown('fast');
	}

}

function toggleAnswer(){

	let collapsed = $(this).hasClass('collapsed');
	let $el = $(this);

	let speed = $(window).innerWidth > 3000 ? 0: 'fast';

	if(collapsed){
		$('.question').addClass('collapsed');
		$('.answer').slideUp(speed);
		$(this).removeClass('collapsed');
		$(this).next().slideDown(speed, () => {
			let st = $el.position().top;
			$('html, body').animate({
				scrollTop: st - 170
			}, 400);
		});
	}else{
		$('.question').addClass('collapsed');
		$(this).next().slideUp(speed, () => {
			let st = $el.position().top;
			$('html, body').animate({
				scrollTop: st - 170
			}, 400);
		});
	}



}

function closeSideNav(){
	sidenav[0].close();
}

function touchstart(e){
	startY = e.touches[0].clientY;
}

function touchmove(e){
	endY = e.touches[0].clientY;
}

function touchend(e){

	// Смахнули вниз
	if(endY && endY > startY){
		$('.name-selector-wrapper').removeClass('hover');
	}else{
		let nameSelector = $(e.target).parents('.name-selector-wrapper');
		if(nameSelector.length){
			$('.name-selector-wrapper').addClass('hover');
		}
	}

	endY = null;
}

function setupHeader(){
	let st = $('html, body').scrollTop();
	let className = st >= 80 ? 'fixed' : '';
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

	if($('.name-selector.hover').length){
		debugger;
		e.stopImmediatePropagation();
		$('.name-selector').removeClass('hover');
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