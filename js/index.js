function load_page(targetIDName, sourcePageLoaded) {
	var content='<object type="text/html" data='+sourcePageLoaded+' width="100%" height="600px"></object>'
	document.getElementById(targetIDName).innerHTML = content;
}