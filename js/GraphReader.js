var mouseX=0.0,mouseY=0.0;
var refreshTime=10;
var xMin,xMax,yMin,yMax;
var xMinPX,xMaxPX,yMinPX,yMaxPX;
var scaleRef=new Array();
var flagScale=false;
var flagRead=false;
var scaleLog=["please double click to select point for xMin.","please double click to select point for xMax.","please double click to select point for yMin.","please double click to select point for yMax.","axis scale complete."];
var dataCalc=new Array();

function getFileUrl(sourceId) {
    var url;
    if (navigator.userAgent.indexOf("MSIE")>=1) {
        url=document.getElementById(sourceId).value;
    } 
    else if(navigator.userAgent.indexOf("Firefox")>0) {
        url=window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    else if(navigator.userAgent.indexOf("Chrome")>0) {
        url=window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
}

function showImg(sourceId, targetId) {
    var url = getFileUrl(sourceId);
    var imgPre = document.getElementById(targetId);
    imgPre.src = url;
}

function getMouseCord(targetId){
    $(targetId).mousemove(function(e){
        mouseX = e.pageX - $(targetId).offset().left;
        mouseY = e.pageY - $(targetId).offset().top;
    });
}

function getAxisLimits(){
    $('#getAxisLimits').click(function(){
        xMin=$('#xmin').val()*1.0;
        xMax=$('#xmax').val()*1.0;
        yMin=$('#ymin').val()*1.0;
        yMax=$('#ymax').val()*1.0;
    });
}

function scaleAxis(){
    $('#scaleAxis').click(function(){
        flagScale=true;
        flagRead=false;

        if (flagScale) {
            var count=0;
            var alertCount=1;
            $("#showstatus").text("Start scaling axis... "+scaleLog[count]);
            $('#photo').dblclick(function(){
                if (count==4) {
                    $("#showstatus").text("("+alertCount+") Too many points have been specified!!! If something is wrong please press 'scale x and y axis' button and scale axis again!!! Or press 'start read data' button to begin reading data")
                    alertCount=alertCount+1;
                    return;
                }
                scaleRef[count]=new Array();
                scaleRef[count][0]=mouseX;
                scaleRef[count][1]=mouseY;
                count=count+1;
                $("#showstatus").text(count+" point have been specified, "+scaleLog[count]);
            });
            $('#scaleAxis').click(function(){
                scaleRef=[];
            });
        }
    });
}

function linearInterp(data,min,max,minpx,maxpx){
    var result;
    result=min+(data-minpx)*(max-min)/(maxpx-minpx);
    return result;
}

function readData(){
    $('#startReadData').click(function(){
        flagScale=false;
        flagRead=true;

        if (flagRead) {
            $("#showstatus").text("Start reading data...");
            xMinPX=scaleRef[0][0];
            xMaxPX=scaleRef[1][0];
            yMinPX=scaleRef[2][1];
            yMaxPX=scaleRef[3][1];  

            var countRead=0;
            $('#photo').dblclick(function(){
                dataCalc[countRead]=new Array();
                dataCalc[countRead][0]=linearInterp(mouseX,xMin,xMax,xMinPX,xMaxPX);
                dataCalc[countRead][1]=linearInterp(mouseY,yMin,yMax,yMinPX,yMaxPX);
                $("#showstatus").text(countRead+1+"th point is reading, which is: ("+dataCalc[countRead][0]*1.0+","+dataCalc[countRead][1]*1.0+")");
                countRead=countRead+1;
            });
        }
    });
}

function showResults(){
    $("#showResults").click(function(){
        var str="<table>";
        str+="<tr><th>"+"x-coordinate"+"</th><th>"+"y-coordinate"+"</th></tr>"
        var len=dataCalc.length;
        for (var i = 0; i < len; i++) {
            str+="<tr><td>"+(dataCalc[i][0]*1.0).toPrecision(6)+"</td><td>"+(dataCalc[i][1]*1.0).toPrecision(6)+"</td></tr>";
        }
        str+="</table>";
        $("#results").html(str);
    });
}

$(function(){
    getMouseCord('#photo');
    getAxisLimits();
    scaleAxis();
    readData();
    showResults();
    
    setInterval(function(){
        $("#showXY").text('Current mouse cordinate is: ('+mouseX.toPrecision(6)+', '+mouseY.toPrecision(6)+')');
        $("#axislimits").text('axis limits: '+xMin+','+xMax+','+yMin+','+yMax);
        //$("#showinfo").text('scale refrence point: '+scaleRef);
    },refreshTime);
});