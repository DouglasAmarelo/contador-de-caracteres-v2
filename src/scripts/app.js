$(document).ready(function(){

	'use strict';

	var menuItem = $('.menu-item');
	var container = $('.content-container');
	var formInput = $('.form input, .form textarea');
	var inputLength = $('.input-length .text');

	// Menu
	menuItem.click(function(){
		var thisForm = $('.content-' + $(this).text().toLowerCase());

		menuItem.removeClass('is--active');
		$(this).addClass('is--active');

		container.removeClass('is--active');
		$(thisForm).addClass('is--active');
	});

	// Counter
	$('.form').submit(function(){
		return false;
	});
	function updateCounter( element, value ) {
		element
			.closest('.row')
			.find('.input-length .text')
			.text(value);
	}

	formInput.on('input', function(){
		var $self = $(this);
		var valCounted = $self.val().length;

		updateCounter($self, valCounted);
	});

	// Action buttons
	var btnClear = $('.button-clear');
	var btnPreview = $('.button-preview');
	var btnCopy = $('.button-copy');

	btnClear.click(function(e){
		e.preventDefault();

		formInput.val('');
		inputLength.text(0);
	});

	btnCopy.click(function(e){
		e.preventDefault();

		formInput.each(function(a, b){
			var c = $('#copy').val();
			var d = $(this).val();

			$('#copy').val(c + '\n' + d + '\n');

			// console.log(c);
		});
	});


});



