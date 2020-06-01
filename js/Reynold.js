var stage=1;
var valveState={"inlet":0, "overflow":1, "flowrate-full":0, "flowrate-empty":1, "tracer":0}; //0 for close, 1 for open
var waterMainScaleY=0.0;
var waterSideScaleY=0.0;
var flowRateControl=1 //0 for small flowrate, 1 for medium flowrate, 2 for high flowrate
var flowRateState=["小开度", "中开度", "大开度"];
var alertCount=[0]; /*主要错误记录，0代表此项未出错，1代表出错
  					 index=0：加水至流量调节阀高度前未关闭流量调节阀
					*/

function checkValveState(valveName){
	var closeValve=valveName+"-valve-close";
	var openValve=valveName+"-valve-open";
	if (valveState[valveName]==0) {
		document.getElementById(closeValve).style.display='block';
		document.getElementById(openValve).style.display='none';
	}
	else{
		document.getElementById(closeValve).style.display='none';
		document.getElementById(openValve).style.display='block';
	}
}

function switchValve(valveName){
	var closeValve=valveName+"-valve-close";
	var openValve=valveName+"-valve-open";
	document.getElementById(closeValve).onclick=function(){
		valveState[valveName]=(valveState[valveName]+1)%2;
		checkValveState(valveName);
	};
	document.getElementById(openValve).onclick=function(){
		valveState[valveName]=(valveState[valveName]+1)%2;
		checkValveState(valveName);
	};
}

function waterInjection(){
	if (waterMainScaleY<1.0) {
		if (valveState["inlet"]!=0) {
			waterMainScaleY=waterMainScaleY+0.01;
			if (waterMainScaleY>0.46) {
				if (valveState["flowrate-empty"]==0) {
					document.getElementById("flowrate-empty-valve-close").style.display="none";
					document.getElementById("flowrate-full-valve-close").style.display="block";
				}
				else{
					if (alertCount[0]==0) {
						alertCount[0]=1;
						alert("未关闭流量调节阀");
						document.getElementById("flowrate-empty-valve-open").style.display="none";
						document.getElementById("flowrate-full-valve-close").style.display="block";
					}
				}
			}
			var topNum=698+320*(1.0-waterMainScaleY);
			var topString=topNum+"px";
			document.getElementById("water-main").style.top=topString;
			document.getElementById("water-main").style.transform="scaleY("+waterMainScaleY+")";
		}
	}
	else{
		document.getElementById("water-overflow").style.display="block";
		if (valveState["inlet"]!=0 && waterSideScaleY<1.0) {
			waterSideScaleY=waterSideScaleY+0.01;
			var topNum=1016+160*(1.0-waterSideScaleY);
			var topString=topNum+"px";
			document.getElementById("water-side").style.top=topString;
			document.getElementById("water-side").style.transform="scaleY("+waterSideScaleY+")";
		}
	}

	if (waterMainScaleY>=1.0 && waterSideScaleY>=1.0 && stage==1) {
		stage=2;
	}
}

function flowRateControllerSwitch(){
	if (document.getElementById("flowrate-full-valve-open").style.display=="block") {
		document.getElementById("flowrate-controller").style.display="block";
	}
	if (document.getElementById("flowrate-full-valve-open").style.display=="none") {
		document.getElementById("flowrate-controller").style.display="none";
	}
}

function flowRateAdjust(){
	document.getElementById("flowrate-controller").onclick=function(){
		flowRateControl=(flowRateControl+1)%3;
		document.getElementById("flowrate-controller").innerText=flowRateState[flowRateControl];
	};
}

function ReynoldExperiment(){
	if (stage==2) {
		if (valveState["tracer"]==1 && valveState["flowrate-full"]==1) {
			if (flowRateControl==0) {
				document.getElementById("laminar-flow").style.display="block";
				document.getElementById("transition-flow").style.display="none";
				document.getElementById("turbulent-flow").style.display="none";
			}
			else if (flowRateControl==1) {
				document.getElementById("laminar-flow").style.display="none";
				document.getElementById("transition-flow").style.display="block";
				document.getElementById("turbulent-flow").style.display="none";
			}
			else {
				document.getElementById("laminar-flow").style.display="none";
				document.getElementById("transition-flow").style.display="none";
				document.getElementById("turbulent-flow").style.display="block";
			}
		}
		else{
			document.getElementById("laminar-flow").style.display="none";
			document.getElementById("transition-flow").style.display="none";
			document.getElementById("turbulent-flow").style.display="none";
		}
	}
}

function velocityDistribution(){
	if (stage==2) {
		if (valveState["tracer"]==1 && valveState["flowrate-full"]==0) {
			document.getElementById("vel-distribution-0").style.display="block";
			stage=3;
		}
	}
	if (stage==3) {
		if (valveState["tracer"]==1 && valveState["flowrate-full"]==1) {
			document.getElementById("vel-distribution-0").style.display="none";
			document.getElementById("vel-distribution-0").style.display="block";
			document.getElementById("vel-distribution-1").style.display="block";
			document.getElementById("vel-distribution-2").style.display="block";
			document.getElementById("vel-distribution-3").style.display="block";
			document.getElementById("vel-distribution-4").style.display="block";
			document.getElementById("vel-distribution-5").style.display="block";
			document.getElementById("vel-distribution-6").style.display="block";
		}
		else{
			if (valveState["tracer"]==0) {
				document.getElementById("vel-distribution-0").style.display="none";
				stage=2;
			}
			document.getElementById("vel-distribution-1").style.display="none";
			document.getElementById("vel-distribution-2").style.display="none";
			document.getElementById("vel-distribution-3").style.display="none";
			document.getElementById("vel-distribution-4").style.display="none";
			document.getElementById("vel-distribution-5").style.display="none";
			document.getElementById("vel-distribution-6").style.display="none";
		}
	}
}

setInterval("waterInjection()","100");
setInterval("flowRateControllerSwitch()","100");
setInterval("ReynoldExperiment()","100");
setInterval("velocityDistribution()","100");

window.onload=function(){
	switchValve("inlet");
	switchValve("overflow");
	switchValve("flowrate-full");
	switchValve("flowrate-empty");
	switchValve("tracer");

	flowRateAdjust();
};