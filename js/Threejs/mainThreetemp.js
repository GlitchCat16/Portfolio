// Three.js ray.intersects with offset canvas

var container, camera, scene, renderer, mesh, composer, composer2,
    catHead = new THREE.Object3D(),
    catBody = new THREE.Object3D(),

    mouse = { x: 0, y: 0 },
    catControl = { x: 0, y: 0 },
    objects = [],

    count = 0,
    Csize = 300,
    CANVAS_WIDTH = Csize,
    CANVAS_HEIGHT = Csize,
    ctG = true;
catInicial = true;

var glitchPass;
// info
//info = document.createElement( 'div' );
//info.style.position = 'absolute';
//info.style.top = '30px';
//info.style.width = '100%';
//info.style.textAlign = 'center';
//info.style.color = '#f00';
//info.style.backgroundColor = 'transparent';
//info.style.zIndex = '1';
//info.style.fontFamily = 'Monospace';
//info.innerHTML = 'INTERSECT Count: ' + count;
//info.style.userSelect = "none";
//info.style.webkitUserSelect = "none";
//info.style.MozUserSelect = "none";
//document.body.appendChild( info );

container = document.getElementById('canvas');
//document.body.appendChild( container );

renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
renderer.domElement.id = 'threeCanvas';
renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(60, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000);
camera.position.y = 10.5;
camera.position.z = 30;
//camera.lookAt( scene.position );

//////
var ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

var loader = new THREE.FBXLoader();
loader.load('models/catHead.fbx', function (object) {
    catHead.add(object)
    scene.add(catHead);
});
catHead.position.y = 6.23;
var loader = new THREE.FBXLoader();
loader.load('models/catBody.fbx', function (object) {
    catBody.add(object)
    scene.add(catBody);
});
objects.push(catHead);
objects.push(catBody);

// postprocessing
composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));
glitchPass = new THREE.GlitchPass();
glitchPass.renderToScreen = true;
composer.addPass(glitchPass);

composer2 = new THREE.EffectComposer(renderer);
composer2.addPass(new THREE.RenderPass(scene, camera));
var effect = new THREE.ShaderPass(THREE.DotScreenShader);
effect.uniforms['scale'].value = 4;
composer2.addPass(effect);
var effect = new THREE.ShaderPass(THREE.RGBShiftShader);
effect.uniforms['amount'].value = 0.015;//0.0015;
effect.renderToScreen = true;
composer2.addPass(effect);
//composer2.addPass( glitchPass );

mesh = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, 30, 1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }
    ));
//scene.add( mesh );
//objects.push( mesh );

// find intersections
var vector = new THREE.Vector3();
var raycaster = new THREE.Raycaster();

// mouse listener
document.addEventListener('mousedown', function (event) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / 300) * 2 - 1;
    mouse.y = - ((event.clientY - rect.top) / 300) * 2 + 1;
    vector.set(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);

    raycaster.set(camera.position, vector.sub(camera.position).normalize());

    intersects = raycaster.intersectObjects(objects, true);

    if (intersects.length > 0) {

        //info.innerHTML = 'INTERSECT Count: ' + ++count;
        if (ctG) {
            ctG = false;
        } else {
            ctG = true;
        }
    }

}, false);

document.addEventListener('mousemove', function (event) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / 300) * 2 - 1;
    mouse.y = - ((event.clientY - rect.top) / 300) * 2 + 1;

    catControl.y = -mouse.y * 26;
    catControl.x = mouse.x * 26;

    vector.set(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);

    raycaster.set(camera.position, vector.sub(camera.position).normalize());

    intersects = raycaster.intersectObjects(objects, true);

    if (intersects.length > 0) {
        catInicial = false;
        glitchPass.goWild = true;
        ctG = true;
    } else {
        glitchPass.goWild = false;
        ctG = false;
    }

}, false);
/////////////////////
var canvas = document.getElementById('threeCanvas');
var context = canvas.getContext('2d');
/////////////////




function render() {

    //mesh.rotation.y += 0.01;
    if (catControl.x > 66) {
        catControl.x = 66;
    }
    if (catControl.x < -66) {
        catControl.x = -66;
    } if (catControl.y > 45) {
        catControl.y = 45;
    }
    if (!catInicial) {
        catHead.rotation.x = THREE.Math.degToRad(catControl.y);
        catHead.rotation.y = THREE.Math.degToRad(catControl.x);
    }
    //catBody.rotation.y -= 0.01;
    //composer2.render();
    if (catInicial) {
        renderer.render(scene, camera);
    } else {
        if (ctG) {
            composer.render();
        } else {
            composer2.render();
        }
    }
    //renderer.render( scene, camera );

}

(function animate() {

    requestAnimationFrame(animate);

    render();

})();