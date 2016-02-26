$(document).ready(function() {		
	$('#add-todo').click(function() {
		var todoDescription = $('#todo-description').val();
		$('.todo-list').prepend('<div class="checkbox">' +
									'<label>' +
										'<input type="checkbox" class="check_todo"/>' +
										todoDescription +	
									 	'<button type="button" class="close" aria-label="Close">' +
									 		'<span aria-hidden="true">&times;</span>' +
									 	'</button>' +
									'</label>' +
								'</div>');						
			$('#todo-description').val('');	
			$('#todo-description').focus();
	});
	$('#todo-description').focus();
});