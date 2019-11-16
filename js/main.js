import * as THREE from '../build/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.js';

let scene, camera, renderer, clock, deltaTime, totalTime;

let arToolkitSource, arToolkitContext;

let markerRoot1, markerRoot2;


let audioLoader;
let listener;

//arbol
let mixerArbol, mixerArbolText;
let soundArbol;
let audioArbol = true;
let Arbol, ArbolText;
let arbolAnimation, arbolTextAnimation;
let animArbol = true;
let arbolActive = false;
//

//queso
let mixerQueso;
let soundQueso;
let audioQueso = true;
let Queso;
let quesoAnimation;
let animQueso = true;
let quesoActive = false;
let end = false;
//

//loads
let audio1 = false;
let audio2 = false;
let model1 = false;
let model2 = false;
let model3 = false;

var loader = new GLTFLoader();

initialize();
animate();

window['Arbol'] = Arbol;


function initialize() {
  scene = new THREE.Scene();

  // var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);
  // hemiLight.color.setHSL(0.6, 1, 0.6);
  // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  // hemiLight.position.set(0, 20, 0);
  // scene.add(hemiLight);

  var dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(- 1, 1.75, 1);
  dirLight.position.multiplyScalar(30);
  scene.add(dirLight);

  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
  scene.add(ambientLight);

  // var light = new THREE.HemisphereLight(0xffffff, 0x444444);
  // light.position.set(0, 20, 0);
  // scene.add(light);
  // var light = new THREE.DirectionalLight(0xffffff);
  // light.position.set(0, 20, 10);
  // scene.add(light);

  camera = new THREE.Camera();
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setClearColor(new THREE.Color('lightgrey'), 0)
  renderer.setSize(640, 480);
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = '0px'
  renderer.domElement.style.left = '0px'
  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  deltaTime = 0;
  totalTime = 0;

  ////////////////////////////////////////////////////////////
  // setup arToolkitSource
  ////////////////////////////////////////////////////////////

  arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam',
  });

  function onResize() {
    arToolkitSource.onResize()
    arToolkitSource.copySizeTo(renderer.domElement)
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
    }
  }

  arToolkitSource.init(function onReady() {
    onResize()
  });

  // handle resize event
  window.addEventListener('resize', function () {
    onResize()
  });

  ////////////////////////////////////////////////////////////
  // setup arToolkitContext
  ////////////////////////////////////////////////////////////	

  // create atToolkitContext
  arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'data/camera_para.dat',
    detectionMode: 'mono'
  });

  // copy projection matrix to camera when initialization complete
  arToolkitContext.init(function onCompleted() {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  ////////////////////////////////////////////////////////////
  // setup markerRoots
  ////////////////////////////////////////////////////////////

  listener = new THREE.AudioListener();
  camera.add(listener);
  audioLoader = new THREE.AudioLoader();
  // build markerControls

  //Alpina Arbol

  soundArbol = new THREE.Audio(listener);

  audioLoader.load('./sounds/AlpinaArbol.wav', function (buffer) {
    soundArbol.setBuffer(buffer);
    soundArbol.setLoop(false);
    soundArbol.setVolume(1);
    // soundArbol.play();
  },
    function (xhr) {
      if ((xhr.loaded / xhr.total * 100) == 100) {
        audio1 = true;
      }
    },
    function (error) {
      console.log('An error happened');
    });

  markerRoot1 = new THREE.Group();
  scene.add(markerRoot1);
  let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
    type: 'pattern', patternUrl: "data/StickerAlpina.patt",
  })

  Arbol = new THREE.Object3D();
  loader.load('./models/arbol/ArbolFull.glb', function (gltf) {
    const model = gltf.scene;
    Arbol.add(model);
    arbolAnimation = gltf;
    mixerArbol = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
      mixerArbol.clipAction(clip).setLoop(1, 1);
      mixerArbol.clipAction(clip).clampWhenFinished = true;
      // mixerArbol.clipAction(clip).startAt(1);
      mixerArbol.clipAction(clip).play();
    });
  },
    function (xhr) {
      if ((xhr.loaded / xhr.total * 100) == 100) {
        model1 = true;
      }
    },
    function (error) {
      console.log('An error happened');
    });

  ArbolText = new THREE.Object3D();
  loader.load('./models/arbol/ArbolTexto.glb', function (gltf) {
    const model = gltf.scene;
    ArbolText.add(model);
    mixerArbolText = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
      mixerArbolText.clipAction(clip).setLoop(1, 1);
      // mixerArbolText.clipAction(clip).startAt(1);
      mixerArbolText.clipAction(clip).clampWhenFinished = true;
      mixerArbolText.clipAction(clip).play();
    });
    mixerArbolText.addEventListener('finished', function (e) {
      // console.log('Termino arbol');
      audioArbol = false;
      document.getElementById('boton').style.display = 'block';
    });
  },
    function (xhr) {
      if ((xhr.loaded / xhr.total * 100) == 100) {
        model2 = true;
      }
    },
    function (error) {
      console.log('An error happened');
    });
  //

  ArbolText.position.x = 2.26;
  Arbol.add(ArbolText);
  Arbol.scale.set(0.5, 0.5, 0.5);
  markerRoot1.add(Arbol);

  //Alpina queso

  soundQueso = new THREE.Audio(listener);

  audioLoader.load('./sounds/AlpinaQueso.wav', function (buffer) {
    soundQueso.setBuffer(buffer);
    soundQueso.setLoop(false);
    soundQueso.setVolume(1);
    // soundQueso.play();
  },
    function (xhr) {
      if ((xhr.loaded / xhr.total * 100) == 100) {
        audio2 = true;
      }
    },
    function (error) {
      console.log('An error happened');
    });

  markerRoot2 = new THREE.Group();
  scene.add(markerRoot2);
  let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
    type: 'pattern', patternUrl: "data/StickerQueso.patt",
  })

  Queso = new THREE.Object3D();
  loader.load('./models/queso/Queso.glb', function (gltf) {
    const model = gltf.scene;
    Queso.add(model);
    quesoAnimation = gltf;
    mixerQueso = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
      mixerQueso.clipAction(clip).setLoop(1, 1);
      mixerQueso.clipAction(clip).clampWhenFinished = true;
      // mixerQueso.clipAction(clip).startAt(1);
      mixerQueso.clipAction(clip).play();
    });
    mixerQueso.addEventListener('finished', function (e) {
      // console.log('Termino queso');
      if (end) {
        audioQueso = false;
        document.getElementById('boton').style.display = 'block';
      }
      end = true;
    });
  },
    function (xhr) {
      if ((xhr.loaded / xhr.total * 100) == 100) {
        model3 = true;
      }
    },
    function (error) {
      console.log('An error happened');
    });

  Queso.scale.set(0.5, 0.5, 0.5);
  markerRoot2.add(Queso);
  //
}

function update() {
  if (arToolkitSource.ready !== false)
    arToolkitContext.update(arToolkitSource.domElement);
  if (markerRoot1.visible) {
    arbolActive = true;
    if (!soundArbol.isPlaying && audioArbol) {
      soundArbol.play();
    }
  } else {
    arbolActive = false;
    if (soundArbol.isPlaying) {
      soundArbol.pause();
    }
  }

  if (markerRoot2.visible) {
    quesoActive = true;
    if (!soundQueso.isPlaying && audioQueso) {
      soundQueso.play();
    }
  } else {
    quesoActive = false;
    if (soundQueso.isPlaying) {
      soundQueso.pause();
    }
  }

}


function render() {
  if (arbolActive) {
    if (mixerArbol != null) {
      mixerArbol.update(deltaTime);
    };

    if (mixerArbolText != null) {
      mixerArbolText.update(deltaTime);
    };
  }

  if (quesoActive) {
    if (mixerQueso != null) {
      mixerQueso.update(deltaTime);
    };
  }
  renderer.render(scene, camera);
}


function animate() {
  requestAnimationFrame(animate);
  deltaTime = clock.getDelta();
  totalTime += deltaTime;

  if (audio1 && audio2 && model1 && model2 && model3) {
    update();
    render();
  }
}
