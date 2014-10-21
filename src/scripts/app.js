$(document).ready(function(){

	'use strict';

	var title = $(".title"), link = $('.link'), desc1 = $('.desc1'), desc2 = $('.desc2'), semTit = $('.sem-tit'), semDesc1 = $('.sem-desc1'), semDesc2 = $('.sem-desc2'), semUrl = $('.sem-url');

	var tabs = $('#tabs'),
		menu = $('menu');

	menu.find('li a').click(function(e) {
		e.preventDefault();

		var link = $(this).attr('href').substring(1);

		menu.find('a').removeClass();

		$(this).addClass('active');

		tabs.find('div[id*=tabs]').hide();

		tabs.find('#' + link).fadeIn('fast');
	});




	// Contador
	$('.contador').keyup(function() {
		var a = $(this).val().length;

		$('.no-limit span').text(a);
		console.log(a);
	});

	// Facebook
	$('.face-tit').limit('25','.face-tit-result');
	$('.face-desc').limit('90','.face-desc-result');

	// SEM
	semTit.limit('25','.sem-tit-result');
	semDesc1.limit('35','.sem-desc1-result');
	semDesc2.limit('35','.sem-desc2-result');
	semUrl.limit('35','.sem-url-result');

	semTit.keyup(function() { title.text(this.value).attr('title', this.value); });
	semUrl.keyup(function() { link.text(this.value).attr('title', this.value); });
	semDesc1.keyup(function() { desc1.text(this.value); });
	semDesc2.keyup(function() { desc2.text(this.value); });

	// Modelo de anúncio
	$('#link-sem').click(function() {
		$('.sem-anuncio').fadeIn(500);
	});




});