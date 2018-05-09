$(document).ready(function(){
	$('form').on('submit', function(event){
		$(this).find('input').each(function(){
			if ($(this).val() == ''){
				$(this).next()
					.removeClass('hidden')
					.html(`Error, required field! <b>${jQuery(this).attr('name')}</b>`);

				$(this).on('click', () => {$(this).next().toggleClass('hidden', true);});
				event.preventDefault();
			}
		});
	});
});