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

  var tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  $('.lazy').lazy();
  $('body').on('click', '.disabled', nop);
  $('body').on('click', '.basket-add', showCount);
  $('body').on('click', '.basket-minus', basketMinus);
  $('body').on('click', '.basket-plus', basketPlus);
  $('body').on('blur', '.counter-wrapper', counterBlur);
  $('body').on('click', '.toast-trigger', showToast);
});

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

},{}]},{},[1]);
