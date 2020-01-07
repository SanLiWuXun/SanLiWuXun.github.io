function load_page(pageName) {
	var content='<object type="text/html" data='+pageName+' width="100%" height="600px"></object>'
	document.getElementById("pageContent").innerHTML = content;
}