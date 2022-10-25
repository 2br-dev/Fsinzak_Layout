(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var sidenav, collapsible, newsSwiper, popularSlider, tooltip, datepicker, select, productSlider;
var startY, endY;
$(function () {
  sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'));
  collapsible = M.Collapsible.init(document.querySelectorAll('.collapsible'));

  if ($('#news-slider').length) {
    newsSwiper = new Swiper('#news-slider', {
      loop: true,
      pagination: {
        el: '#news-pagination',
        type: 'bullets',
        clickable: true
      },
      spaceBetween: 10,
      on: {
        'slideChange': function slideChange() {
          $('.lazy').lazy();
        }
      }
    });
  }

  if ($('#product-slider').length) {
    productSlider = new Swiper('#product-slider', {
      loop: true,
      spaceBetween: 10,
      breakpoints: {
        300: {
          slidesPerView: 2
        },
        500: {
          slidesPerView: 3
        },
        700: {
          slidesPerView: 4
        },
        900: {
          slidesPerView: 2
        },
        1200: {
          slidesPerView: 4
        },
        1300: {
          slidesPerView: 5
        }
      },
      on: {
        'slideChange': function slideChange() {
          $('.lazy').lazy();
        },
        'click': function click(e, t) {
          var image = t.target;
          var slide = $(image).parents('.swiper-slide');
          var slides = $(slide).parents('.swiper').find('.swiper-slide');
          slides.removeClass('active');
          $(slide).addClass('active');
          var background = image.style.backgroundImage;
          $('.product-image').css({
            backgroundImage: background
          });
        }
      }
    });
  }

  if ($('#popular-slider').length) {
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
      breakpoints: {
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
        'slideChange': function slideChange() {
          $('.lazy').lazy();
        }
      }
    });
  }

  if ($('.datepicker').length) {
    $('.datepicker').datepicker({
      container: document.body,
      i18n: {
        cancel: "Отмена",
        clear: "Очистить",
        done: "OK",
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мрт", "Апр", "Май", "Июн", "Июл", "Авг", "Снб", "Окт", "Ноя", "Дек"],
        weekdays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        weekdaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        weekdaysAbbrev: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
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
  $('body').on('mouseenter', '.name-selector-wrapper', function (e) {
    $(e.currentTarget).addClass('hover');
  });
  $('body').on('mouseleave', '.name-selector-wrapper', function (e) {
    $(e.currentTarget).removeClass('hover');
    $('.footer').click();
  });
  document.addEventListener('touchstart', touchstart);
  document.addEventListener('touchmove', touchmove);
  document.addEventListener('touchend', touchend);
  var tabs = M.Tabs.init(document.querySelectorAll('.tabs'));
  var modal = M.Modal.init(document.querySelectorAll('.modal'));
  select = M.FormSelect.init(document.querySelectorAll('select'));
});

function runTimer() {
  var HabarovskDate = calcTime(10);
  var hours = HabarovskDate.getHours() >= 10 ? HabarovskDate.getHours().toString() : "0" + HabarovskDate.getHours().toString;
  var minutes = HabarovskDate.getMinutes() >= 10 ? HabarovskDate.getMinutes().toString() : "0" + HabarovskDate.getMinutes().toString;
  var h1 = hours[0];
  var h2 = hours[1];
  var m1 = minutes[0];
  var m2 = minutes[1];
  $('#h1').text(h1);
  $('#h2').text(h2);
  $('#m1').text(m1);
  $('#m2').text(m2);
  requestAnimationFrame(runTimer);
}

function calcTime(offset) {
  // create Date object for current location
  var d = new Date(); // convert to msec
  // subtract local time zone offset
  // get UTC time in msec

  var utc = d.getTime() + d.getTimezoneOffset() * 60000; // create new Date object for different city
  // using supplied offset

  var nd = new Date(utc + 3600000 * offset); // return time as a string

  return nd;
}

function openSubLevel() {
  $(this).parents('ul').find('a').removeClass('hover');
  $(this).addClass('hover');
  $('#l2').empty();
  var $subLevel = $(this).next();

  if ($subLevel.length) {
    $('#l2').html($subLevel.html());
  }
}

function toggleMegaMenu(e) {
  var _this = this;

  e.preventDefault();
  var already = $(this).hasClass('opened');

  if (already) {
    $(this).removeClass('opened');
    $('#shadow').animate({
      opacity: 0
    }, 400, function () {
      $('#shadow').remove();
    });
  } else {
    $(this).addClass('opened');
    var shadow = document.createElement('div');
    shadow.id = 'shadow';
    $('body').append(shadow);
    $('body').on('click', '#shadow', function () {
      $(_this).removeClass('opened');
      $('#shadow').animate({
        opacity: 0
      }, 400, function () {
        $('#shadow').remove();
      });
    });
  }
}

function switchView(e) {
  e.preventDefault();
  var id = this.id;

  switch (id) {
    case "list":
      $('#catalog-content').addClass('list');
      break;

    case "card":
      $('#catalog-content').removeClass('list');
      break;
  }

  $('.view-switcher').removeClass('active');
  $(this).addClass('active');
}

function closeSidenav(e) {
  e.preventDefault();
  var instance = M.Sidenav.getInstance(document.querySelector('#cat-nav'));
  instance.close();
}

function toggleFolder(e) {
  var $li = $(this).parent();
  var $sub = $li.find('> ul');
  var opened = $li.hasClass('opened');

  if (!opened) {
    e.preventDefault();
    $('.folder').removeClass('opened');
    $('.catalog-navi .folder ul').slideUp('fast');
    $li.addClass('opened');
    $sub.slideDown('fast');
  }
}

function toggleAnswer() {
  var collapsed = $(this).hasClass('collapsed');
  var $el = $(this);
  var speed = $(window).innerWidth > 3000 ? 0 : 'fast';

  if (collapsed) {
    $('.question').addClass('collapsed');
    $('.answer').slideUp(speed);
    $(this).removeClass('collapsed');
    $(this).next().slideDown(speed, function () {
      var st = $el.position().top;
      $('html, body').animate({
        scrollTop: st - 170
      }, 400);
    });
  } else {
    $('.question').addClass('collapsed');
    $(this).next().slideUp(speed, function () {
      var st = $el.position().top;
      $('html, body').animate({
        scrollTop: st - 170
      }, 400);
    });
  }
}

function closeSideNav() {
  sidenav[0].close();
}

function touchstart(e) {
  startY = e.touches[0].clientY;
}

function touchmove(e) {
  endY = e.touches[0].clientY;
}

function touchend(e) {
  // Смахнули вниз
  if (endY && endY > startY) {
    $('.name-selector-wrapper').removeClass('hover');
  } else {
    var nameSelector = $(e.target).parents('.name-selector-wrapper');

    if (nameSelector.length) {
      $('.name-selector-wrapper').addClass('hover');
    }
  }

  endY = null;
}

function setupHeader() {
  var st = $('html, body').scrollTop();
  var className = st >= 80 ? 'fixed' : '';
  $('body').attr('class', className);
}

function openPlaceSelector(e) {
  var _this2 = this;

  e.preventDefault();
  var targetModal = M.Modal.getInstance(document.querySelector('#place-selector'));
  targetModal.open();

  targetModal.options.onCloseEnd = function (el) {
    var city = el.querySelector("[name=city]").value;
    var organization = el.querySelector("[name=organization]").value;
    var summary = "".concat(city, ", ").concat(organization);
    _this2.value = summary;
  };
}

function updateTextarea() {
  this.style.height = "1px";
  this.style.height = this.scrollHeight + "px";
}

function updateSubject() {
  debugger;

  if ($(this).val() == "Новая тема") {
    $('#subject').removeClass('hidden');
  } else {
    $('#subject').addClass('hidden');
  }
}

function closeList(e) {
  var el = e.target;
  var path = composedPath(el);
  var filtered = path.filter(function (element, index) {
    return element.tagName == 'LABEL';
  });
  $('.list-field ul').removeClass('shown');

  if (filtered.length) {
    $(filtered).parents('.list-field').find('ul').addClass('shown');
  }

  if ($('.name-selector.hover').length) {
    debugger;
    e.stopImmediatePropagation();
    $('.name-selector').removeClass('hover');
  }
}

function setList(e) {
  e.preventDefault();
  var val = $(this).text();
  var $parent = $(this).parents('.list-field');
  var $label = $parent.find('label');
  var $input = $parent.find('input[type="hidden"]');
  var $ul = $parent.find('ul');
  $label.text(val);
  $input.val(val);
  $ul.removeClass('shown');
  afterSetList(val);
}

function afterSetList(val) {
  if (val == 'Новая тема') {
    $('#subject').removeClass('hidden');
  } else {
    $('#subject').addClass('hidden');
  }
}

function openList() {
  $(this).parents('.list-field').find('ul').addClass('shown');
}

function toggleDetails() {
  var $detailsRow = $(this).next();
  var $detailsWrapper = $detailsRow.find('.details-row-wrapper');
  $(this).toggleClass('active');
  $detailsWrapper.slideToggle('fast');
}

function togglePassword() {
  $('#password').slideToggle('fast');
}

function showToast(e) {
  e.preventDefault();
  var text = $(this).data("text");
  var className = $(this).data("class");
  M.toast({
    html: text,
    classes: className
  });
}

function counterBlur() {
  if ($(this).val() == null) {
    $(this).val(0);
  }

  $(this).parents('.basket-count').addClass('hidden').prev().removeClass('hidden');
}

function nop(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  return false;
}

function showCount(e) {
  e.preventDefault();
  $(this).addClass('hidden').next().removeClass('hidden').find('input').val(1);
}

function basketPlus(e) {
  e.preventDefault();
  var $input = $(this).parents('.basket-count').find('input');
  var val = parseInt($input.val()) + 1;
  $input.val(val);
}

function basketMinus(e) {
  e.preventDefault();
  var $input = $(this).parents('.basket-count').find('input');
  var val = parseInt($input.val()) - 1;
  $input.val(val);

  if ($input.val() == 0) {
    $(this).parents('.basket-count').addClass('hidden').prev().removeClass('hidden');
  }
}

function composedPath(el) {
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

},{}]},{},[1]);
