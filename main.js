// Standard Variables / To be changed later.
var scene, camera, renderer //, container;
var W, H;
var delta = Math.delta;

//container = document.createElement('div');
//document.body.appendChild(container);

W = parseInt(window.innerWidth);
H = parseInt(window.innerHeight);

// Camera Perspective (Change Camera Position when needed.)
camera = new THREE.PerspectiveCamera(45, W / H, 1, 1000000);
camera.position.z = 36300;
scene = new THREE.Scene();

// renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(W, H);
document.body.appendChild(renderer.domElement);

// Adding Stars.
var starsGeometry = new THREE.Geometry();
var starsMaterial = new THREE.ParticleBasicMaterial({
    color: 0xbbbbbbb,
    opacity: 0.6,
    size: 1,
    sizeAttenuation: false
});
var stars;

// Adding stars to the Scene.
for (var i = 0; i < 45000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar(7000);
    starsGeometry.vertices.push(vertex);
}

stars = new THREE.ParticleSystem(starsGeometry, starsMaterial);
stars.scale.set(50, 50, 50);
scene.add(stars);


// ------------------------------------------------------------
var starsGeometry2 = new THREE.Geometry();
var starsMaterial2 = new THREE.ParticleBasicMaterial({
    color: 0xbbbbbbb,
    opacity: 1,
    size: 1,
    sizeAttenuation: false
});
var stars2;

// Adding stars to the Scene.
for (var i = 0; i < 10000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar(7000);
    starsGeometry2.vertices.push(vertex);
}

stars2 = new THREE.ParticleSystem(starsGeometry2, starsMaterial2);
stars2.scale.set(70, 150, 100);
scene.add(stars2);

// Ambient light to the Scene.
var ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);




// ------------------------------------------------------------

//Sun
var sun, gun_geom, sun_mat;
sun_geom = new THREE.SphereGeometry(2300, 80, 80);
//texture.anisotropy = 8;
sun_mat = new THREE.MeshPhongMaterial();
sun = new THREE.Mesh(sun_geom, sun_mat);
// sun_mat = THREE.ImageUtils.loadTexture('images/sunmap.jpg');
sun_mat.bumpMap  = THREE.TextureLoader('images/sunmap.jpg');     
sun_mat.bumpScale = 0.05;
//var texture = THREE.ImageUtils.loadTexture('images/sunmap.jpg');
scene.add(sun);


/*
// Earth
var earth, earth_geom, earth_mat;
earth_geom = new THREE.SphereGeometry(50, 20, 20);
var texture2 = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
texture2.anisotropy = 8;
sun_mat = new THREE.MeshPhongMaterial({
    map: texture2,
    emissive: 0xffffff
});
*/
var geometry = new THREE.SphereGeometry(2300, 80, 80);
var texture2 = THREE.TextureLoader('images/earthmap1k.jpg');

var material = new THREE.MeshPhongMaterial({
    map: texture2,
    emissive: 0xffffff
});
var earth = new THREE.Mesh(geometry, material);


//earth_mat = new THREE.MeshNormalMaterial();
//earth = new THREE.Mesh(earth_geom, earth_mat);

scene.add(earth);

var t = 0;

document.addEventListener('mousemove', function (event) {
    y = parseInt(event.offsetY);

});

// Call Animate function within load function.

animate();

function animate() {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.001;
    earth.rotation.x +=0.1;
    earth.rotation.y +=0.1;

    //camera.position.y = y * 5;
    camera.lookAt(scene.position);

    t += Math.PI / 180 * 2;

    renderer.render(scene, camera);
}

// everything now within `onload`


