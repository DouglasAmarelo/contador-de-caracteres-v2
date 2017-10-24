$(document).ready(function () {

	'use strict';

	var menuItem = $('.menu-item');
	var container = $('.content-container');
	var formInput = $('.form input, .form textarea');
	var inputLength = $('.input-length .text');

	// Menu
	menuItem.click(function () {
		var thisForm = $('.content-' + $(this).text().toLowerCase());

		menuItem.removeClass('is--active');
		$(this).addClass('is--active');

		container.removeClass('is--active');
		$(thisForm).addClass('is--active');
	});

	// Counter
	$('.form').submit(function () { return false; });

	function updateCounter(element, value) {
		element
			.closest('.row')
			.find('.input-length .text')
			.text(value);
	}

	formInput.on('input', function () {
		var $self = $(this);
		var valCounted = $self.val().length;

		updateCounter($self, valCounted);
	});

	// Action buttons
	var btnClear = $('.button-clear');
	var btnPreview = $('.button-preview');
	var btnCopy = $('.button-copy');

	function render (labelField, textField) {
		return labelField + ': ' + textField;
	}

	function copyToClipboard(copyFrom) {

		document.addEventListener('copy', function(e){
			e.preventDefault();

			if ( e.clipboardData ) {
				e.clipboardData.setData("text/plain", copyFrom);
				// console.log(e.clipboardData.getData('text'));
			}
		});

		document.execCommand('copy');
	}

	btnClear.click(function (e) {
		e.preventDefault();

		var formContext = $(this).closest('.content-container');

		formContext.find(formInput).val('');
		formContext.find(inputLength).text(0);
	});

	btnCopy.click(function (e) {
		e.preventDefault();

		var $self = $(this);
		var formContext = $self.closest('.content-container');
		var activeSection = '#' + $('.menu-item.is--active').text().toLocaleUpperCase();
		var inputsText = '';

		$.each(formContext.find('.row:not(.action-buttons)'), function (index, element) {
			var labelField = $(element).find('.input-title').text();
			var textField = $(element).find(formInput).val();

			inputsText += render( labelField, textField ) + '\n';
		});

		inputsText = '\n' + activeSection + '\n' + inputsText + '\n';

		copyToClipboard(inputsText);
	});

});
