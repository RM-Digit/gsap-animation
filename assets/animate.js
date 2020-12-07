
window.addEventListener('DOMContentLoaded', (event) => {
  window.scrollTo(0, 0);
});
gsap.registerPlugin(ScrollTrigger);
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const first_text = document.querySelectorAll(".first-container");
canvas.width = 1900;
canvas.height = 1500;

ScrollTrigger.saveStyles(".container-hero>div")
ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 800px)": function() {
 
    var targets = document.querySelectorAll(".container-hero>div");
    targets.forEach((target,index) => {
      console.log(index)
      const tl = gsap.timeline({
        defaults: {duration: 10},
        scrollTrigger: {
          trigger: target,
          markers: false,
          scrub: 0.5,
          start: "center 50%",
          end: "bottom -100%",
          pin: true,
          pinSpacing: false,
        }
      })
      .fromTo(target, {y: 25}, {y: -25})
      .from(target, {opacity: 0, duration: 2.5}, 0)
      .to(target, {opacity: 0, duration: 2.5,delay:10}, 0.8)
    });
   
  const f_timer= gsap.timeline({
      defaults: {duration: 5},
      scrollTrigger: {
        trigger: first_text,
        markers: false,
        scrub: true,
        start: "center 10%",
        end: "bottom -50%",
        pin: true,
      }
    })
    .fromTo(first_text, {y: 0}, {y: -25})
    .to(first_text, {opacity: 0, duration: 5}, 0.8)
    const speed = 30;
    const frameCount = 435 * speed;
    const currentFrame = index => {
      index = Math.floor(index/speed);
      return `https://cdn.shopify.com/s/files/1/0509/2619/0767/files/1_${index.toString().padStart(5, '0')}.png`;
     };
  

    const images = []
    const airpods = {
      frame: 0
    };
    var repeat = 4;
    var canvas_controller = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      if((i>120*speed && i<130*speed)){
        for (let j = 0; j < repeat; j++) {
              img.src = currentFrame(i);
              images.push(img);
            }
      } 
      else if((i>134*speed && i<194*speed) ) {
        for (let j = 0; j < repeat; j++) {
          img.src = currentFrame(i);
          images.push(img);
        }
      }
      else if(i == 228*speed){
        for (let j = 0; j < repeat*550; j++) {
              img.src = currentFrame(i);
              images.push(img);
            }
      }  else if((i>250*speed && i<258*speed) ) {
        for (let j = 0; j < repeat+2; j++) {
          img.src = currentFrame(i);
          images.push(img);
        }
      }
      else if(i > 327*speed){
        i+=2;
        img.src = currentFrame(i);
        images.push(img);
      } 
      else {
        img.src = currentFrame(i);
        images.push(img);
      }
    }
    gsap.to(airpods, {
      frame: frameCount + 7500 - 1,
      snap: "frame",
      scrollTrigger: {
        trigger: ".bg_gsap",
        duration:6,
        pin:true,
        pinSpacing: false,
        end:"bottom bottom",
        // endTrigger:"#shopify-section-custom-footer",
        scrub:0.5,
        onLeave: ({progress, direction, isActive}) => console.log(progress, direction, isActive),
        onLeaveBack: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
      },
      onUpdate: render
    });

    images[0].onload = ()=>{
      context.drawImage(images[airpods.frame], 0, 0);
      const tt = gsap.timeline({
        defaults: {duration: 1}
      })
      .fromTo(canvas, {y: 10}, {y: -10})
      .from(canvas, {opacity: 0, duration: 0.5}, 0)
      .to(canvas, {opacity: 1, duration: 0.5}, 0.8)
      gsap.timeline({
        defaults: {duration: 1}
      }).fromTo(first_text, {y: 10}, {y: -10})
      .from(first_text, {opacity: 0, duration: 0.5}, 0)
      .to(first_text, {opacity: 1, duration: 0.5}, 0.8)
    };
    
    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }
    
        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;
    
        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;
    
        var iw = img.width,
            ih = img.height,
            r = Math.min(w / (iw*2), h / (ih*2)),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;
    
        // decide which gap to fill    
        if (nw < w) ar = w / nw;                             
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;
    
        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);
    
        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;
    
        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;
    
        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }
    function render() {
      let fram_rate = airpods.frame;
      context.clearRect(0, 0, canvas.width, canvas.height);
      // drawImageProp(context, images[airpods.frame], 0, 0, canvas.width, canvas.height);
      context.drawImage(images[airpods.frame], 0, 0);
      if ( fram_rate % 2 == 0) {
        if(fram_rate == 430 ) airpods.frame = 0;
        canvas_controller ++;
      }
    }
   
  },
  // mobile
  "(max-width: 799px)": function() {
    var targets = document.querySelectorAll(".container-hero>div");

    targets.forEach((target,i) => {
      console.log(i);
     
      const tl = gsap.timeline({
        defaults: {duration: 8},
        scrollTrigger: {
          trigger: target,
          markers: false,
          scrub:  0.5,
          start: "center 50%",
          end: "bottom -100%",
          pin: true,
          pinSpacing: false,
        }
      })
      .fromTo(target, {y: 25}, {y: -25})
      .from(target, {opacity: 0, duration: 2.5}, 0)
      .to(target, {opacity: 0, duration: 2.5,delay:10}, 0.8)
    });
    const f_timer= gsap.timeline({
      defaults: {duration: 5},
      scrollTrigger: {
        trigger: first_text,
        markers: false,
        scrub: true,
        start: "top 50%",
        end: "bottom -150%",
        pin: true,
      }
    })
    .fromTo(first_text, {y: 0}, {y: -25})
    .to(first_text, {opacity: 0, duration: 5,delay:10}, 0.8)
    
    canvas.width = 1500;
    canvas.height =2500;
  
    const speed = 20;
    const frameCount = 334 * speed;
    const currentFrame = index => {
      
      index = Math.floor(index/speed);
      return `https://cdn.shopify.com/s/files/1/0509/2619/0767/files/1_mobile_${index.toString().padStart(5, '0')}.png`;
     };
  

    const images = []
    const airpods = {
      frame: 0
    };
    var canvas_controller = 0;
    var repeat = 4;
    for (let i = 37*speed; i < frameCount; i++) {
      const img = new Image();
      if((i>59*speed && i<89*speed) ) {
        for (let j = 0; j < repeat; j++) {
          img.src = currentFrame(i);
          images.push(img);
        }
      } else if(i == 176*speed ){
        for (let j = 0; j < repeat * 300; j++) {
          img.src = currentFrame(i);
          images.push(img);
        }
      } else if(i>96*speed && i<126*speed){
        for (let j = 0; j < repeat; j++) {
          img.src = currentFrame(i);
          images.push(img);
        }
      }
      else {
        img.src = currentFrame(i);
        images.push(img);
      }
    }
    var startX = 0;
    gsap.to(airpods, {
      frame: frameCount + 4000 - 1,
      snap: "frame",
      scrollTrigger: {
        trigger: ".bg_gsap",
        duration:6,
        pin:true,
        pinSpacing: false,
        end:"bottom bottom",
        // endTrigger:"#shopify-section-custom-footer",
        scrub:0.5,
        onLeave: ({progress, direction, isActive}) => console.log(progress, direction, isActive),
        onLeaveBack: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
      },
      onUpdate: render
    });
 
    images[0].onload = ()=>{
      console.log(startX);
    
      drawImageProp(context, images[airpods.frame], startX, 0, canvas.width, canvas.height);
      const tt = gsap.timeline({
        defaults: {duration: 1}
      })
      .fromTo(canvas, {y: 10}, {y: -10})
      .from(canvas, {opacity: 0, duration: 0.5}, 0)
      .to(canvas, {opacity: 1, duration: 0.5}, 0.8)
      gsap.timeline({
        defaults: {duration: 1}
      }).fromTo(first_text, {y: 10}, {y: -10})
      .from(first_text, {opacity: 0, duration: 0.5}, 0)
      .to(first_text, {opacity: 1, duration: 0.5}, 0.8)
    };
    
    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }
    
        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;
    
        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;
    
        var iw = img.width,
            ih = img.height,
            r = Math.min(w / (iw), h / (ih)),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;
    
        // decide which gap to fill    
        if (nw < w) ar = w / nw;                             
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;
    
        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);
    
        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;
    
        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;
    
        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }
    function render() {
      console.log(airpods.frame)
      let frame_rate = airpods.frame;
       
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawImageProp(context, images[airpods.frame], 0, 0, canvas.width, canvas.height);
        // context.drawImage(images[airpods.frame], 0, 0);
      
    }
  }
});

