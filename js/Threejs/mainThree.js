let cSize = 300;
let canvas_width = cSize;
let canvas_height = cSize;

let mouse = { x: 0, y: 0 };
let catControl = { x: 0, y: 0 };
let headRot = { x: 0, y: 0 };

let catHead = new THREE.Object3D();
let catHead2 = new THREE.Object3D();
let catBody = new THREE.Object3D();
let objects = [];

let catInicial = true;
let catGlitch = false;
let catNormal = true;
let catDespierto = false;

let textoGato = document.getElementById('text-gato');

//Renderer
let container = document.getElementById('canvas');
let scene = new THREE.Scene();
let aspect = canvas_width / canvas_height;
let camera = new THREE.PerspectiveCamera(60, aspect, 1, 300);
camera.position.y = 10.5;
camera.position.z = 30;
let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.domElement.id = 'threeCanvas';
renderer.setSize(canvas_width, canvas_height);
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

//Light
let ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Load FBX
let loader = new THREE.FBXLoader();
loader.load('models/catHead.fbx', function (object) {
  catHead.add(object)
  catHead.position.y = 6.23;
  scene.add(catHead);
});

loader.load('models/catHead2.fbx', function (object) {
  catHead2.add(object)
  catHead2.position.y = 6.23;
  catHead2.visible = false;
  scene.add(catHead2);
});

loader.load('models/catBody.fbx', function (object) {
  catBody.add(object)
  scene.add(catBody);
});
objects.push(catHead);
objects.push(catHead2);
objects.push(catBody);

// postprocessing
let composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));
let glitchPass = new THREE.GlitchPass();
glitchPass.renderToScreen = true;
composer.addPass(glitchPass);

let composer2 = new THREE.EffectComposer(renderer);
composer2.addPass(new THREE.RenderPass(scene, camera));
let effect = new THREE.ShaderPass(THREE.RGBShiftShader);
effect.uniforms['amount'].value = 0.012;
effect.renderToScreen = true;
composer2.addPass(effect);

// find intersections
let vector = new THREE.Vector3();
let raycaster = new THREE.Raycaster();

let canvas = document.getElementById('threeCanvas');
let context = canvas.getContext('2d');

// mouse listener
document.addEventListener("touchmove", function(event){
  let rect = canvas.getBoundingClientRect();
  mouse.x = ((event.touches[0].clientX - rect.left) / cSize) * 2 - 1;
  mouse.y = -((event.touches[0].clientY - rect.top) / cSize) * 2 + 1;

  catControl.x = mouse.x * 26;
  catControl.y = -mouse.y * 26;

  vector.set(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  raycaster.set(camera.position, vector.sub(camera.position).normalize());
  let intersects = raycaster.intersectObjects(objects, true);

  if (intersects.length > 0) {
    if (!catNormal) {
      textoGato.innerHTML = 'Bueno ahora ya sabes porque el nombre, si quieres regresarlo a la normalidad dale CLICK.';
      catDespierto = true;
      catHead.visible = false;
      catHead2.visible = true;
      catInicial = false;
      glitchPass.goWild = true;
      catGlitch = true;
    }
  } else {
    catGlitch = false;
    catNormal = false;
  }
}, false);

document.addEventListener('mousedown', function (event) {
  let rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / cSize) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / cSize) * 2 + 1;
  vector.set(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  raycaster.set(camera.position, vector.sub(camera.position).normalize());
  let intersects = raycaster.intersectObjects(objects, true);

  if (intersects.length > 0) {
    catHead.visible = true;
    catHead2.visible = false;
    catInicial = true;
    if(catNormal){
      catNormal = false;
      catDespierto = true;
      catHead.visible = false;
      catHead2.visible = true;
      catInicial = false;
      glitchPass.goWild = true;
      catGlitch = true;
    }else{
      catNormal = true;
      textoGato.innerHTML = 'Ya que lo despertaste, si te parecía mejor con el tercer ojo vuelve a molestarlo.';      
    }
  }

}, false);

document.addEventListener('mousemove', function (event) {
  let rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / cSize) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / cSize) * 2 + 1;

  catControl.x = mouse.x * 26;
  catControl.y = -mouse.y * 26;

  vector.set(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  raycaster.set(camera.position, vector.sub(camera.position).normalize());
  let intersects = raycaster.intersectObjects(objects, true);

  if (intersects.length > 0) {
    if (!catNormal) {
      textoGato.innerHTML = 'Bueno ahora ya sabes porque el nombre, si quieres regresarlo a la normalidad dale CLICK.';
      catDespierto = true;
      catHead.visible = false;
      catHead2.visible = true;
      catInicial = false;
      glitchPass.goWild = true;
      catGlitch = true;
    }
  } else {
    catGlitch = false;
    // glitchPass.goWild = false;
    catNormal = false;
  }

}, false);

//render animation
let render = function () {
  requestAnimationFrame(render);
  if (catControl.x > 60) {
    catControl.x = 60;
  }
  if (catControl.x < -60) {
    catControl.x = -60;
  } if (catControl.y > 45) {
    catControl.y = 45;
  }
  headRot.x = THREE.Math.lerp(catHead.rotation.x, THREE.Math.degToRad(catControl.y), 0.16);
  headRot.y = THREE.Math.lerp(catHead.rotation.y, THREE.Math.degToRad(catControl.x), 0.16);
  if (catDespierto) {
    catHead.rotation.set(headRot.x, headRot.y, 0);
    catHead2.rotation.set(headRot.x, headRot.y, 0);
  }
  if (catInicial) {
    renderer.render(scene, camera);
  } else {
    if (catGlitch) {
      composer.render();
    } else {
      composer2.render();
    }
  }
};

render();