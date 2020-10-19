/************************************************************************************************************
	
	************************************************************************************************************/

	/* VARIABLES YOU COULD MODIFY */
	//var boxSizeArray = [4,4,4,3,7];	// Array indicating how many items there is rooom for in the right column ULs
	var boxSizeArray = [200,0,0,0,0];

	var verticalSpaceBetweenListItems = 3;	// Pixels space between one <li> and next
											// Same value or higher as margin bottom in CSS for #dhtmlgoodies_dragDropContainer ul li,#dragContent li
	var indicateDestionationByUseOfArrow = true;	// Display arrow to indicate where object will be dropped(false = use rectangle)

	var cloneSourceItems = false;	// Items picked from main container will be cloned(i.e. "copy" instead of "cut").
//	var cloneAllowDuplicates = false;	// Allow multiple instances of an item inside a small box(example: drag Student 1 to team A twice

	/* END VARIABLES YOU COULD MODIFY */

	var dragDropTopContainer = false;
	var dragTimer = -1;
	var dragContentObj = false;
	var contentToBeDragged = false;	// Reference to dragged <li>
	var contentToBeDragged_src = false;	// Reference to parent of <li> before drag started
	var contentToBeDragged_next = false; 	// Reference to next sibling of <li> to be dragged
	var destinationObj = false;	// Reference to <UL> or <LI> where element is dropped.
	var dragDropIndicator = false;	// Reference to small arrow indicating where items will be dropped
	var ulPositionArray = new Array();
	var mouseoverObj = false;	// Reference to highlighted DIV

	var MSIE = navigator.userAgent.indexOf('MSIE')>=0?true:false;
	var navigatorVersion = navigator.appVersion.replace(/.*?MSIE (\d\.\d).*/g,'$1')/1;

	var arrow_offsetX = -5;	// Offset X - position of small arrow
	var arrow_offsetY = 0;	// Offset Y - position of small arrow

        
        var swidgets;
       

        if(!MSIE || navigatorVersion > 6)
        {
		arrow_offsetX = -6;	// Firefox - offset X small arrow
		arrow_offsetY = -13; // Firefox - offset Y small arrow
	}

	var indicateDestinationBox = false;
	
        
        function getTopPos(inputObj)
	{
	  var returnValue = inputObj.offsetTop;
	  while((inputObj = inputObj.offsetParent) != null){
	  	if(inputObj.tagName!='HTML')returnValue += inputObj.offsetTop;
	  }
	  return returnValue;
	}

	function getLeftPos(inputObj)
	{
	  var returnValue = inputObj.offsetLeft;
	  while((inputObj = inputObj.offsetParent) != null){
	  	if(inputObj.tagName!='HTML')returnValue += inputObj.offsetLeft;
	  }
	  return returnValue;
	}

	function cancelEvent()
	{
		return false;
	}
	function initDrag(e)	// Mouse button is pressed down on a LI
	{
		if(document.all)e = event;
		var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
		var sl = Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);

		dragTimer = 0;
		dragContentObj.style.left = e.clientX + sl + 'px';
		dragContentObj.style.top = e.clientY + st + 'px';
		contentToBeDragged = this;
		contentToBeDragged_src = this.parentNode;
		contentToBeDragged_next = false;
		if(this.nextSibling){
			contentToBeDragged_next = this.nextSibling;
			if(!this.tagName && contentToBeDragged_next.nextSibling)contentToBeDragged_next = contentToBeDragged_next.nextSibling;
		}
		timerDrag();
		return false;
	}

	function timerDrag()
	{
           
		if(dragTimer>=0 && dragTimer<10){
			dragTimer++;
			setTimeout('timerDrag()',10);
			return;
		}
		if(dragTimer==10){

			if(cloneSourceItems && contentToBeDragged.parentNode.id=='allItemsNewGenre'){
				newItem = contentToBeDragged.cloneNode(true);
				newItem.onmousedown = contentToBeDragged.onmousedown;
				contentToBeDragged = newItem;
			}
			dragContentObj.style.display='block';
			dragContentObj.appendChild(contentToBeDragged);
		}
	}

	function moveDragContent(e)
	{
		if(dragTimer<10){
			if(contentToBeDragged){
				if(contentToBeDragged_next){
					contentToBeDragged_src.insertBefore(contentToBeDragged,contentToBeDragged_next);
				}else{
					contentToBeDragged_src.appendChild(contentToBeDragged);
				}
			}
			return;
		}
		if(document.all)e = event;
		var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
		var sl = Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);


		dragContentObj.style.left = e.clientX + sl + 'px';
		dragContentObj.style.top = e.clientY + st + 'px';

		if(mouseoverObj)mouseoverObj.className='';
		destinationObj = false;
		dragDropIndicator.style.display='none';
		if(indicateDestinationBox)indicateDestinationBox.style.display='none';
		var x = e.clientX + sl;
		var y = e.clientY + st;
		var width = dragContentObj.offsetWidth;
		var height = dragContentObj.offsetHeight;

		var tmpOffsetX = arrow_offsetX;
		var tmpOffsetY = arrow_offsetY;

		for(var no=0;no<ulPositionArray.length;no++){
			var ul_leftPos = ulPositionArray[no]['left'];
			var ul_topPos = ulPositionArray[no]['top'];
			var ul_height = ulPositionArray[no]['height'];
			var ul_width = ulPositionArray[no]['width'];

			if((x+width) > ul_leftPos && x<(ul_leftPos + ul_width) && (y+height)> ul_topPos && y<(ul_topPos + ul_height)){
				var noExisting = ulPositionArray[no]['obj'].getElementsByTagName('LI').length;
				if(indicateDestinationBox && indicateDestinationBox.parentNode==ulPositionArray[no]['obj'])noExisting--;
				if(noExisting<boxSizeArray[no-1] || no==0){
					dragDropIndicator.style.left = ul_leftPos + tmpOffsetX + 'px';
					var subLi = ulPositionArray[no]['obj'].getElementsByTagName('LI');

					var clonedItemAllreadyAdded = false;
					if(cloneSourceItems && !cloneAllowDuplicates){
						for(var liIndex=0;liIndex<subLi.length;liIndex++){
							if(contentToBeDragged.id == subLi[liIndex].id)clonedItemAllreadyAdded = true;
						}
						if(clonedItemAllreadyAdded)continue;
					}

					for(var liIndex=0;liIndex<subLi.length;liIndex++){
						var tmpTop = getTopPos(subLi[liIndex]);
						if(!indicateDestionationByUseOfArrow){
							if(y<tmpTop){
								destinationObj = subLi[liIndex];
								indicateDestinationBox.style.display='block';
								subLi[liIndex].parentNode.insertBefore(indicateDestinationBox,subLi[liIndex]);
								break;
							}
						}else{
							if(y<tmpTop){
								destinationObj = subLi[liIndex];
								dragDropIndicator.style.top = tmpTop + tmpOffsetY - Math.round(dragDropIndicator.clientHeight/2) + 'px';
								dragDropIndicator.style.display='block';
								break;
							}
						}
					}

					if(!indicateDestionationByUseOfArrow){
						if(indicateDestinationBox.style.display=='none'){
							indicateDestinationBox.style.display='block';
							ulPositionArray[no]['obj'].appendChild(indicateDestinationBox);
						}

					}else{
						if(subLi.length>0 && dragDropIndicator.style.display=='none'){
							dragDropIndicator.style.top = getTopPos(subLi[subLi.length-1]) + subLi[subLi.length-1].offsetHeight + tmpOffsetY + 'px';
							dragDropIndicator.style.display='block';
						}
						if(subLi.length==0){
							dragDropIndicator.style.top = ul_topPos + arrow_offsetY + 'px'
							dragDropIndicator.style.display='block';
						}
					}

					if(!destinationObj)destinationObj = ulPositionArray[no]['obj'];
					mouseoverObj = ulPositionArray[no]['obj'].parentNode;
					mouseoverObj.className='mouseover';
					return;
				}
			}
		}
	}

	/* End dragging
	Put <LI> into a destination or back to where it came from.
	*/
	function dragDropEnd(e)
	{
              //alert("hi");
              dragContentObj.style.display='none';
              
              if(dragTimer==-1)return;
		if(dragTimer<10){
			dragTimer = -1;
			return;
		}
		dragTimer = -1;
		if(document.all)e = event;


		if(cloneSourceItems && (!destinationObj || (destinationObj && (destinationObj.id=='allItems' || destinationObj.parentNode.id=='allItems')))){
			contentToBeDragged.parentNode.removeChild(contentToBeDragged);
		}else{

			if(destinationObj){
				if(destinationObj.tagName=='UL'){
					destinationObj.appendChild(contentToBeDragged);
				}else{
					destinationObj.parentNode.insertBefore(contentToBeDragged,destinationObj);
				}
				mouseoverObj.className='';
				destinationObj = false;
				dragDropIndicator.style.display='none';
				if(indicateDestinationBox){
					indicateDestinationBox.style.display='none';
					document.body.appendChild(indicateDestinationBox);
				}
				contentToBeDragged = false;
				return;
			}
			if(contentToBeDragged_next){
				contentToBeDragged_src.insertBefore(contentToBeDragged,contentToBeDragged_next);
			}else{
				contentToBeDragged_src.appendChild(contentToBeDragged);
			}
		}
		contentToBeDragged = false;
		dragDropIndicator.style.display='none';
		if(indicateDestinationBox){
			indicateDestinationBox.style.display='none';
			document.body.appendChild(indicateDestinationBox);

		}
		mouseoverObj = false;
                
	}

	
        
        
        /*
	Preparing data to be saved
	*/
	function saveDragDropNodes()
	{
              var saveString = "";
              var uls = dragDropTopContainer.getElementsByTagName('UL');
              for(var no=0;no<uls.length;no++)// LOoping through all <ul>
              {	
			var lis = uls[no].getElementsByTagName('LI');
                      
                      for(var no2=0;no2<lis.length;no2++)
                      {
                             if(saveString.length>0)saveString = saveString + ";";
                             {
                                saveString = saveString + uls[no].id + '|' + lis[no2].id;
                             }
                      }
              }
             
              //
              //alert(saveString);
              var s = saveString.split(';');
              var s1;
              var str='';
              var presentSelectedWidget = "" ;
              
              //get all the selected widgets present in the SelectedWidget Table db table not UI list
              //$url = '${createLink(controller:'widgetMaster', action:'getAllSelectedWidget')}';
              jQuery.ajax({
                    cache: false,
                    type: "get",
                    url: $url,
                    
                    success: function(response) 
                    { 
                        //swidgets contains the selectedWidgets in db
                        swidgets = response;
                       
                        var s2 = swidgets.split(',');
                        var s3 , pStr = "";
                        var flag = 0;
            
                        // getting all the ids of record which are moving to box1 e.g.1,2,3
                        jQuery.each(s,function(index,widget)
                        {
                          var s1 = widget.split('|');
                          
                          //if widget is in box1 then append its ID to 'pStr'
                          // pStr is used for setting the priority of the selected widget
                          if(s1[0] == 'box1')
                          {
                            pStr += s1[1]+'pStr,'; 
                          }
                          
                          if(s1[0] == 'box1')
                          {
                            //here we are checking that selectedWidget is already present in the db our not
                            //if it present in the db then dont add it in db 
                            //if  it not present then add it to the db
                            jQuery.each(s2,function(index,widget1)
                            {
                                s3 = widget1.split('|');
                                
                                //s3[0] contains the ID of the selectedWidget from db
                                //s1[1] contains the ID of the selectedWidget from UI
                                if(s3[0] == s1[1])
                                {
                                  flag = 1;
                                }
                            });
                
                            if(flag == 0)
                              flag =2;
                          }
              
                          if(flag == 2)
                          {
                              str += s1[1]+'&';
                          }
              
                          flag = 0;
                          
                          //if the widget present in the allItems then delete that widget from selectedWidget db 
                          if(s1[0] == 'allItems')
                          {
                              $url ;//= '${createLink(controller:'widgetMaster', action:'deleteFromSelectedWidget')}?id='+ escape(s1[1]);
                              //ajax call to the deleteFromSelectedWidget 
                              jQuery.ajax({
                                cache: false,
                                type: "get",
                                url: $url
                              });
                          }
                        });
                        
                        //str contains the newly added widgets in the selectedWidget UI List
                        // so we are send all  that widgets to 'addToSelectedWidget'
                        $url ;//= '${createLink(controller:'widgetMaster', action:'addToSelectedWidget')}?id='+ escape(str);
                        //ajax call to the addToSelectedWidget
                        jQuery.ajax({
                              cache: false,
                              type: "get",
                              url: $url
                        });
                        
                        //pstr contains the all the widgets in selectedWidget UI List as per their order in the selectedWidget UI List
                        $url ;//= '${createLink(controller:'widgetMaster', action:'setPriorityInSelectedWidget')}?id='+ escape(pStr);
                         //ajax call to the addToSelectedWidget
                        jQuery.ajax({
                              cache: false,
                              type: "get",
                              url: $url
                        });
                        
                        document.getElementById('saveContent').innerHTML = '<h1>Ready to save these nodes:</h1> ' + saveString.replace(/;/g,';<br>') + '<p>Format: ID of ul |(pipe) ID of li;(semicolon)</p><p>You can put these values into a hidden form fields, post it to the server and explode the submitted value there</p>';
                    },
                    error: function(response) 
                    {
                        alert("error in getAllSelectedWidget");   
                    }
               });
              
              location.reload();
	}

        
	function initDragDropScript()
	{
		//alert("hi");
                dragContentObj = document.getElementById('dragContent');
                
		dragDropIndicator = document.getElementById('dragDropIndicator');
		dragDropTopContainer = document.getElementById('dhtmlgoodies_dragDropContainer');
		document.documentElement.onselectstart = cancelEvent;;
		var listItems = dragDropTopContainer.getElementsByTagName('LI');	// Get array containing all <LI>
		var itemHeight = false;
		for(var no=0;no<listItems.length;no++){
			listItems[no].onmousedown = initDrag;
			listItems[no].onselectstart = cancelEvent;
			if(!itemHeight)itemHeight = listItems[no].offsetHeight;
			if(MSIE && navigatorVersion/1<6){
				listItems[no].style.cursor='hand';
			}
		}

		var mainContainer = document.getElementById('dhtmlgoodies_mainContainer');
		var uls = mainContainer.getElementsByTagName('UL');
		itemHeight = itemHeight + verticalSpaceBetweenListItems;
		for(var no=0;no<uls.length;no++){
			//commented because it adding extra height to ul
		//	uls[no].style.height = itemHeight * boxSizeArray[no]  + 'px';
		}

		var leftContainer = document.getElementById('dhtmlgoodies_listOfItems');
		var itemBox = leftContainer.getElementsByTagName('UL')[0];

		document.documentElement.onmousemove = moveDragContent;	// Mouse move event - moving draggable div
		document.documentElement.onmouseup = dragDropEnd;	// Mouse move event - moving draggable div

		var ulArray = dragDropTopContainer.getElementsByTagName('UL');
		for(var no=0;no<ulArray.length;no++){
			ulPositionArray[no] = new Array();
			ulPositionArray[no]['left'] = getLeftPos(ulArray[no]);
			ulPositionArray[no]['top'] = getTopPos(ulArray[no]);
			ulPositionArray[no]['width'] = ulArray[no].offsetWidth;
			ulPositionArray[no]['height'] = ulArray[no].clientHeight;
			ulPositionArray[no]['obj'] = ulArray[no];
		}

		if(!indicateDestionationByUseOfArrow){
			indicateDestinationBox = document.createElement('LI');
			indicateDestinationBox.id = 'indicateDestination';
			indicateDestinationBox.style.display='none';
			document.body.appendChild(indicateDestinationBox);


		}
                
	}

	window.onload = initDragDropScript;