
$(window).load(function(){
	//jQuery('#tenant').hide();
});


jQuery('#role').live('change', function(){
	
	var role = jQuery('#role').val();
	
	if(role == 'tenantadmin')
	{
		jQuery('#tenant').show();
	}
	else
	{
		jQuery('#tenant').hide();
	}

});
