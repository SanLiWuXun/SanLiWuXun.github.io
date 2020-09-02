function load_page(targetIDName, sourcePageLoaded) {
	var contentHeight=document.body.clientHeight-100;
	//var content='<object type="text/html" data='+sourcePageLoaded+' width="100%" height="100%"></object>'
	var content='<object type="text/html" data='+sourcePageLoaded+' width="100%" height="' +contentHeight+ 'px"></object>'
	document.getElementById(targetIDName).innerHTML = content;
}

function foldTitle(){
	var mySrc=event.srcElement;
	var nav=mySrc.parentNode;
	var ulTag=nav.getElementsByTagName("ul");
	if (ulTag[0].style.display=='none') {
		ulTag[0].style.display='block';
	}
	else{
		ulTag[0].style.display='none';
	}
}