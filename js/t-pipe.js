

window.onload=function(){
	var counter=0;/*0,1,2,3 stand for value point to left,top,right,bottom*/
	var valveStatus=['flow-left','flow-top','flow-right','flow-bottom'];
	document.getElementById('valve').onclick=function(){
		counter=(counter+1)%4;
		this.style.transform='rotate('+counter*90+'deg)';
		var valveNow=document.getElementById(valveStatus[counter]);
		valveNow.style.display='block';

		var indexBefor=(counter==0)?3:counter-1;
		var valveBefor=document.getElementById(valveStatus[indexBefor]);
		valveBefor.style.display='none';
	};
};