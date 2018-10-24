/*jshint esversion: 6 */

const len = 784;
const total_data = 1000;

const COOKIE = 0;
const PIZZA = 1;
const FLOWER = 2;

let cookies_data;
let pizzas_data;
let flowers_data;

let cookies = {};
let pizzas = {};
let flowers = {};

let nn;

function preload() {
  cookies_data = loadBytes('data/cookies1000.bin');
  pizzas_data = loadBytes('data/pizza1000.bin');
  flowers_data = loadBytes('data/flower1000.bin');
}

function setup() {

  createCanvas(280, 280);
  background(255);

  //Preparing Data
  prepareData(cookies, cookies_data, COOKIE);
  prepareData(pizzas, pizzas_data, PIZZA);
  prepareData(flowers, flowers_data, FLOWER);

  //Making the neural Network
  nn = new NeuralNetwork(784, 64, 3);

  //Randomizing Data
  let training = [];
  training = training.concat(cookies.training);
  training = training.concat(pizzas.training);
  training = training.concat(flowers.training);

  let testing = [];
  testing = training.concat(cookies.testing);
  testing = training.concat(pizzas.testing);
  testing = training.concat(flowers.testing);
//
// for(let i=0; i<5; i++){
//   trainEpoch(training);
//   console.log("Epoch: " + i);
//   let percent = testAll(testing);
//   console.log("% Correct: " + percent);
//
// }

let trainButton = select('#train');
let epochCounter =0;
trainButton.mousePressed(function() {
  trainEpoch(training);
  epochCounter ++;
  console.log("Epoch Counter: " + epochCounter);
});

let testButton = select('#test');
testButton.mousePressed(function() {
  let percent = testAll(testing);
  console.log("Percent: " +nf(percent, 2,2)+ "%");
});

let guessButton = select('#guess');
 guessButton.mousePressed(function() {
   let inputs = [];
   let img = get();
   img.resize(28, 28);
   img.loadPixels();
   for (let i = 0; i < len; i++) {
     let bright = img.pixels[i * 4];
     inputs[i] = (255 - bright) / 255.0;
   }

   let guess = nn.predict(inputs);
   // console.log(guess);
   let m = max(guess);
   let classification = guess.indexOf(m);
   if (classification === COOKIE) {
     console.log("cookie!");
   } else if (classification === PIZZA) {
     console.log("Pizza!");
   } else if (classification === FLOWER) {
     console.log("Flower!");
   }

   //image(img, 0, 0);
 });

 let clearButton = select('#clear');
 clearButton.mousePressed(function() {
   background(255);
 });
 // for (let i = 1; i < 6; i++) {
 //   trainEpoch(training);
 //   console.log("Epoch: " + i);
 //   let percent = testAll(testing);
 //   console.log("% Correct: " + percent);
 // }
}


function draw() {
 strokeWeight(8);
 stroke(0);
 if (mouseIsPressed) {
   line(pmouseX, pmouseY, mouseX, mouseY);
 }

}



//.log(training);
// let total = 100;
// for(let n =0; n<total; n++){
//   let img = createImage(28,28);
//   img.loadPixels();
//   let offset = n*784;
//   for(let i=0; i<784*4; i++){
//     let val = 255 -  cookies_data.bytes[i+offset];
//     img.pixels[i*4 + 0] = val;
//       img.pixels[i*4 + 1] = val;
//         img.pixels[i*4 + 2] = val;
//           img.pixels[i*4 + 3] = 255;
//   }
//   img.updatePixels();
//   let x = (n%10) * 28;
//   let y = floor(n/10) * 28;
//   image(img,x,y);
// }
