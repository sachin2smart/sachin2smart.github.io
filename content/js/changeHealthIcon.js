jQuery('#changeHealthIcon').live('change',function(){
	
	var healthIcon = jQuery('#changeHealthIcon').val();
	
	if(healthIcon == 'act')
	{
		jQuery('#changeHealthIcon').show();
		jQuery('#redIcon').hide();
	}
	else
	{
		jQuery('#redIcon').show();
		jQuery('#changeHealthIcon').hide();
	}

});