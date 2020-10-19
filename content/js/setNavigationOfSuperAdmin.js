function setNavigationPanel(id){
	var navigationIndices = id.split(".");
	//alert(navigationIndices);
	
	$('#MenuItem1').removeClass('open');
	$('#MenuItem2').removeClass('open');
	$('#MenuItem3').removeClass('open');
	
	$('#SubMenu1').css('display','none');
	$('#SubMenu2').css('display','none');
	$('#SubMenu3').css('display','none');
	
	switch(navigationIndices[0])
	{
		case '1':
			$('#MenuItem1').addClass('open');
			$('#SubMenu1').css('display','block');

			switch(navigationIndices[1])
			{
				case '1':
					$('#tenantList').addClass('active');
					break;
				case '2':
					$('#addTenant').addClass('active');
					break;
			}
			break;
			
		case '2':
			
			$('#MenuItem2').addClass('open');
			$('#SubMenu2').css('display','block');

			switch(navigationIndices[1])
			{
				case '1':
					$('#screens').addClass('active');
					break;
				case '2':
					$('#addScreen').addClass('active');
					break;
			}
			break;
			
		case '3':
			$('#MenuItem3').addClass('open');
			$('#SubMenu3').css('display','block');

			switch(navigationIndices[1])
			{
				case '1':
					$('#usersList').addClass('active');
					break;
				case '2':
					$('#addUser').addClass('active');
					break;
			}
			break;
	}
}