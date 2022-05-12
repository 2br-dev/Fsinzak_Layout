(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var sidenav, collapsible, newsSwiper, popularSlider, tooltip;
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

  if ($('#popular-slider').length) {
    popularSlider = new Swiper('#popular-slider', {
      pagination: {
        el: '#popular-pagination',
        type: 'bullets',
        clickable: true
      },
      spaceBetween: 20,
      breakpoints: {
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
        'slideChange': function slideChange() {
          $('.lazy').lazy();
        }
      }
    });
  }

  if ($('.datepicker').length) {
    $('.datepicker').datepicker({
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

  var tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  $('.lazy').lazy();
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
  var tabs = M.Tabs.init(document.querySelectorAll('.tabs'));
  var modal = M.Modal.init(document.querySelectorAll('.modal'));
});

function openPlaceSelector(e) {
  var _this = this;

  e.preventDefault();
  var targetModal = M.Modal.getInstance(document.querySelector('#place-selector'));
  targetModal.open();

  targetModal.options.onCloseEnd = function (el) {
    var city = el.querySelector("[name=city]").value;
    var organization = el.querySelector("[name=organization]").value;
    var summary = "".concat(city, ", ").concat(organization);
    _this.value = summary;
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
