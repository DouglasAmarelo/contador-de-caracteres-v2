$(document).ready(function() {

	'use strict';

	// Page elements
	var menuItem = $('.menu-item');
	var container = $('.content-container');
	var formInput = $('.form input, .form textarea');
	var inputLength = container.find('.input-length .text');

	// Menu
	menuItem.click(function() {
		var thisForm = $('.content-' + $(this).text().toLowerCase());

		menuItem.removeClass('is--active');
		$(this).addClass('is--active');

		container.removeClass('is--active');
		$(thisForm).addClass('is--active');
	});

	// Counter
	container.submit(function() { return false; });

	function updateCounter(element, value) {
		element
			.closest('.row')
			.find('.input-length .text')
			.text( value );
	}

	formInput.on('input', function() {
		var $self = $(this);
		var valCounted = $self.val().length;

		updateCounter($self, valCounted);

		var formContext = $self.closest( container );
		var previewContainer = formContext.find('.preview');

		if ( previewContainer.length > 0 ) {
			previewRender( $self );
		}
	});

	function previewRender(element) {
		var field = element.attr('name');

		$('.preview__' + field).text(element.val());
	}

	// Copy to clipboard
	function copyToClipboard(copyFrom) {

		document.addEventListener('copy', function(e) {
			e.preventDefault();

			if ( e.clipboardData ) {
				e.clipboardData.setData("text/plain", copyFrom);
				// console.log(e.clipboardData.getData('text'));
			}
		});

		document.execCommand('copy');
	}

	// Feedback message when copy
	function copyFeedback(element) {
		var $self = element;

		$self.addClass('is--active');
		setTimeout(function() {
			$self.removeClass('is--active');
		}, 800);
	}

	// Action buttons
	var btnClear = $('.button-clear');
	var btnPreview = $('.button-preview');
	var btnCopy = $('.button-copy');
	var btnCopyItem = $('.button-item-copy');

	// Clear form
	btnClear.click(function(e) {
		e.preventDefault();

		var formContext = $(this).closest( container );

		formContext.find(formInput).val('');
		formContext.find(inputLength).text(0);
	});

	// Copy information
	btnCopy.click(function(e) {
		e.preventDefault();

		var $self = $(this);
		var formContext = $self.closest( container );
		var inputsText = formContext.find( formInput ).val();

		copyToClipboard( inputsText );

		copyFeedback($self);
	});

	// Item copy
	btnCopyItem.click(function() {
		var $self = $(this);
		var inputsText = $self.prev( formInput ).val();

		copyToClipboard( inputsText );

		copyFeedback($self);
	});

	// Preview
	btnPreview.click(function(e) {
		e.preventDefault();

		var $self = $(this);
		var formContext = $self.closest( container );
		var previewContainer = formContext.find('.preview');

		previewContainer.toggle();
	});

});
