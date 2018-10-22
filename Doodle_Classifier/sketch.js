const len = 784;
const total_data = 1000;

let cookies_data;
let cookies = {};


function preload() {
  cookies_data = loadBytes('data/cookies1000.bin');
}

function setup() {

  createCanvas(280, 280);
  background(0);
  prepareData(cookies, cookies_data);
}

function prepareData(category, data) {
  category.training = [];
  category.testing = [];
  for (let i = 0; i < total_data; i++) {
    let offset = i * len;
    let threshold = floor(0.8 * total_data);
    if (i < threshold) {
      category.training[i] = data.bytes.subarray(offset, offset + len);
    } else {
      category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
    }
  }

}

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
