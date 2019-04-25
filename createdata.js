let pxx = [];
let data = [];
let count = 0

function setup () {
    cleanup(0);
    print(data);
    createCanvas(28, 28);
    background(190);
    textSize(5);
    noFill();
    rect(-0.5,-0.5,28,28);
   
    button = createButton('download');
    button.position(30, 30);
    button.mousePressed(downl);  
    input = createInput();
    input.position(30, 00);
    button = createButton('clean');
    button.position(30, 60);
    button.mousePressed(cleanup);
}

function downl(){
    saveJSON(data, 'data.json');
}

function savedata(couu) {

   
        
        let temps_output = [0,0,0];
        if(input.value() != "") {
        temps_output[int(input.value())] = 1;  
        data[data.length] = {
            input:pxx[couu],
            output:temps_output
        };
       // pxx = data[data.length].input * 0;
        background(190);
        rect(-0.5,-0.5,28,28);
        count+=1;
        cleanup(count);
        //
        }else{
            
        }


 

    
    //print(data);
}

function mouseDragged() {
    if(0 <floor(mouseX) < 30 && 0 < floor(mouseY) < 30){
        pxx[count][floor(mouseX) + floor(mouseY)*28] = 1;
        point(floor(mouseX),floor(mouseY));
    }

}
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        savedata(count);
    }else  if (keyCode === RIGHT_ARROW) {
        
      }
}
function cleanup(counnn) {
    pxx[counnn] = [];
    for(let i = 0;i<784;i++){
        pxx[counnn][i]=0;
    }
 
}
