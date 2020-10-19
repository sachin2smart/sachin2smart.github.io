
$(document).ready(function() 
{
	fetchAllImages();
	var contextPath= window.location.pathname.toString().split('/');
		$('.deleteCurrentImage').live('click', function(){
			var answer = confirm("Are you sure you want to delete the image ?");
		    if (answer){
				var tempString = this.id;
				var splitMethod = tempString.split('_');
				
				$.ajax({
		            type: "POST",      
		            dataType: "json",
		            url: "/"+ contextPath[1] +"/ContentImage/deleteByTenantAdmin/",
		            data:'id='+splitMethod[1],
		            success:function () {
			            location.reload(true);
		            	var loc = document.location;
			            var randomnumber=Math.floor(Math.random()*11);
			            document.location = loc + "?rand=" + randomnumber;
			        }
				});
		    }
		});
		
		
		$('.editImage').live('click', function(){	
			var tempString = this.id;
			
			$.ajax({
			            type: "get",      
			            dataType: "json",
			            url:"/"+ contextPath[1] +"/ContentImage/editImage/",
			            data:'id='+tempString,
			            success:function () {
				            location.reload(true);
			            }
					});
		});
		
		$('.deleteCurrentHTML').live('click', function(){
			var answer = confirm("Are you sure you want to delete the HTML ?");
		    if (answer){
				var tempString = this.id;
				var splitMethod = tempString.split('_');
				
				$.ajax({
		            type: "POST",      
		            dataType: "json",
		            url: "/"+ contextPath[1] +"/ContentImage/deleteHTMLByTenantAdmin/",
		            data:'id='+splitMethod[1],
		            success:function () {
			            location.reload(true);
		            	var loc = document.location;
			            var randomnumber=Math.floor(Math.random()*11);
			            document.location = loc + "?rand=" + randomnumber;
			            			            }
				});
		    }
		});
		
		
		$('.editHTML').live('click', function(){	
			var tempString = this.id;
			
			$.ajax({
			            type: "get",      
			            dataType: "json",
			            url:"/"+ contextPath[1] +"/ContentImage/editHTML/",
			            data:'id='+tempString,
			            success:function () {
				            location.reload(true);
			            }
					});
		});
});

function fetchAllImages(){
	var contextPath= window.location.pathname.toString().split('/');
	//alert(contextPath[1]);
	var host = window.location.host;
	var protocol = window.location.protocol;
	var url = protocol + "//" + host +"/"+ contextPath[1] +"/fetchImages";
	jQuery.ajax(
    {       
        cache: false,
        type: "get",
        url: url,
    
        success: function(response) 
        { 
          //alert(JSON.stringify(response));
           showImages(response);
        },
        error: function(response) 
        {
            //alert("error in showAllSongs");   
        }
    });
}

function showImages(jsonData){
	var noOfImages=jsonData.images.length;
	var contextPath= window.location.pathname.toString().split('/');
	//alert(jsonData.amazonRootPath);
	if(noOfImages==0){
		jQuery('#allImages').append('<h1>No images added.</h1>');
	}else{
		var imageBaseUrl = jsonData.amazonRootPath;
		var liCount = 0; 
		var evenOdd="odd";
		for(i=0;i<noOfImages ; i++)
		{
			var imageUrl="";
			var fileName = jsonData.images[i].fileName;
			
			var title = jsonData.images[i].title;
			var escapedTitle = $('<div/>').text(title).html();
			
			var description = jsonData.images[i].description;
			var escapedDescription = $('<div/>').text(description).html();
			
			evenOdd="odd";
			if(liCount%2==0){
				evenOdd="even";
			}
			var deleteAction="deleteAction_";
			var parts = jsonData.images[i].fileName.split('.');
			var ext = parts[parts.length - 1];
			if(ext.toLowerCase()=="zip"){
				jQuery('#allImages').append(
						'<li class="' + evenOdd + '" id='+ jsonData.images[i].id +'><div class=" leftFloat sequence">' + jsonData.images[i].sequence +'</div><div class=" leftFloat imageTitle editHTML" id='+ jsonData.images[i].id +'><a href="/'+ contextPath[1] +'/ContentImage/editHTML/'+ jsonData.images[i].id +'">'+ escapedTitle +'</a></div><div class=" leftFloat imageDescription">'+ escapedDescription +'</div><div class=" leftFloat imageTimeout">' +jsonData.images[i].timeoutDuration +'</div><div class=" leftFloat imagePicture"><img src="/'+contextPath[1]+'/images/HTML_ICON.jpg"></img></div><div class=" leftFloat imageDelete"><div class="deleteCurrentImage" id="'+ deleteAction + jsonData.images[i].id +'" ><font color="#000000">Delete</font></div> </div><div class="clear"></div></li>'
						);
			}
			else{
				jQuery('#allImages').append(
						'<li class="' + evenOdd + '" id='+ jsonData.images[i].id +'><div class=" leftFloat sequence">' + jsonData.images[i].sequence +'</div><div class=" leftFloat imageTitle editImage" id='+ jsonData.images[i].id +'><a href="/'+ contextPath[1] +'/ContentImage/editImage/'+ jsonData.images[i].id +'">'+ escapedTitle +'</a></div><div class=" leftFloat imageDescription">'+ escapedDescription +'</div><div class=" leftFloat imageTimeout">' +jsonData.images[i].timeoutDuration +'</div><div class=" leftFloat imagePicture"><img style="border: 0px none;max-width: 100%;overflow: hidden; align="center" src="'+ imageBaseUrl + jsonData.images[i].fileName +'"></img></div><div class=" leftFloat imageDelete"><div class="deleteCurrentImage" id="'+ deleteAction + jsonData.images[i].id +'" ><font color="#000000">Delete</font></div> </div><div class="clear"></div></li>'
						);
			}
		  liCount++;
		}
	}
	initDragDropScript(); 	
}