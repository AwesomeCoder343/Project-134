audio="";
object=[];
function preload(){
    audio=loadSound('old_telephone.mp3');
}
function setup(){
    canvas=createCanvas(380,480);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,480)
    objectdetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Object detecting";
}
function draw(){
image(video, 0,0,380,480);

    r=random(255);
    g=random(255);
    b=random(255);

    
if(status!=""){
    objectdetector.detect(video, gotResult);
    for(i=0; i<object.length; i++){
       document.getElementById("status").innerHTML="Status: Object detected";
       fill(r, g, b);
       percent=floor(object[i].confidence*100);
       text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
       noFill();
       stroke(r,g,b);
       rect(object[i].x, object[i].y, object[i].width, object[i].height);
       if(object[i].label=="person"){
        document.getElementById("baby").innerHTML="Baby detected";
           audio.stop();
       }
       else{
        audio.play();
        document.getElementById("baby").innerHTML="Baby not detected";
       }
    }
}
}
function modelLoaded(){
    console.log("Model is loaded!");
    status=true;
    
}
function gotResult(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    object=results;
}
}