var counter=1;

function load_page(pageName) {
	var content='<object type="text/html" data='+pageName+' width="100%" height="600px"></object>'
	document.getElementById("pageContent").innerHTML = content;
}
function changeButton(){
	if(counter%2==1){
		load_page("pages/1.html");
	}
	else{
		load_page("pages/2.html");
	}
	counter=counter+1;
}