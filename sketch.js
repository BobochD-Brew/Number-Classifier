let brain;
let pxxx = [];
let training_data = [];
// training_dataspecial = [];
function preload(){
  //const training_dataspecial = loadJSON('https://api.jsonbin.io/b/5cc0897b8967d56779983651');
  const training_dataspecial = loadJSON('https://sendeyo.com/up/d/e65b305ce8');
  training_data = training_dataspecial

}

function loadblabla () {
  
}
function setup() {
  cleanup();
  createCanvas(28, 28);
  background(190);
  textSize(5);
  noFill();
  button = createButton('Detect');
  button.position(30, 0);
  button.mousePressed(testt);
  button = createButton('Train x1');
  button.position(30, 30);
  button.mousePressed(traa);
  button = createButton('Clear');
  button.position(30, 60);
  button.mousePressed(clearr);
  rect(-0.5,-0.5,28,28);
  let info = [784,600,350,50,3];
  loadblabla();
  //var promm = new Promise(loadblabla);
  //promm.then(dconect);
  brain = new neuralNetwork(info,0.1);
  //traa();
  
}

function testtspe (n){
  console.table(brain.feedforward(training_data[n].input));
}
function cleanup() {
  for(let i = 0;i<784;i++){
      pxxx[i]=0;
  }

}

function traa () {
  for(let i = 0;i<200;i++){
    let iio = random(0,training_data.length);
    brain.train(training_data[iio].input,training_data[iio].output).print();
  }

}
function clearr(){
cleanup();
createCanvas(28, 28);
  background(190);
  textSize(5);
  noFill();
  rect(-0.5,-0.5,28,28);
}
function testt (){
  let result = brain.feedforward(pxxx);
  let recordt = -1;
  let recordv
  for(let i=0;i<result.length;i++){
    if(result[i] >= recordt) {
      recordt = result[i];
      recordv = i;
    }
  }
  alert(recordv + ":          " + recordt);
}
function mouseDragged() {
  if(0 <floor(mouseX) < 30 && 0 < floor(mouseY) < 30){
      pxxx[floor(mouseX) + floor(mouseY)*28] = 1;
      point(floor(mouseX),floor(mouseY));
  }

}

  function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        traa()
    }

  }