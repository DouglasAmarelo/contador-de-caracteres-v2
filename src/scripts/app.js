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

		if ( field === 'path-01' || field === 'path-02' ) {
			$('.preview__' + field).text('/' + element.val());
		}
		else {
			$('.preview__' + field).text(element.val());
		}
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

	var tplADW = '<div class="preview__title"><span class="preview__headline-01">Lorem ipsum: dolor sit amet</span> <span class="preview__headline-02"></span></div><div class="preview__url"><span class="preview__final-url">www.loremipsum.com</span><span class="preview__path-01"></span><span class="preview__path-02"></span></div><p class="preview__description"><span class="preview__description">Ducimus dignissimos tempore facere numquam officiis? Incidunt totam cumque!</span></p>';

	var tplSEO = '<div class="preview__title"><span class="preview__seo-title">Lorem ipsum: dolor sit amet</span></div><div class="preview__url"><span class="preview__seo-url">www.loremipsum.com</span></div><p class="preview__description"><span class="preview__seo-description">Ducimus dignissimos tempore facere numquam officiis? Incidunt totam cumque!</span></p>';

	// Clear form
	btnClear.click(function(e) {
		e.preventDefault();

		var formContext = $(this).closest( container );
		var previewContainer = formContext.find('.preview');

		formContext.find(formInput).val('');
		formContext.find(inputLength).text(0);

		if ( previewContainer.hasClass('preview-adwords') ) {
			previewContainer.html( tplADW );
		}
		else {
			previewContainer.html( tplSEO );
		}
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

		previewContainer.toggleClass('is--active');
	});

});
