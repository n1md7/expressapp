$(document).ready(function(){
	$('form').on('submit', function(event){
		$(this).find('input').each(function(){
			if ($(this).val() == ''){
				$(this).next()
					.removeClass('hidden')
					.html(`Error, required field! <b>${jQuery(this).attr('name')}</b>`);

				$(this).on('click, focus', () => {$(this).next().toggleClass('hidden', true);});
				event.preventDefault();
			}
		});
		if(
			$(this).find('input[name=password1]').val() !=
			$(this).find('input[name=password2]').val()
		){
			$(this).find('input[name=password2]').next()
					.removeClass('hidden')
					.html(`Error, passwords didn\'t match!`);
			event.preventDefault();
		}
	});
});