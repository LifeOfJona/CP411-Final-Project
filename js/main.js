/* CP411 Solar System Project
1. User controlled 3D Rendering [10]
2. Texture mapping [10]
3. User controlled Lighting [10]
4. User controlled Animations [10]
5. User controlled navigation [10]
6. User controlled display of relevant information for the user [10]
7. Easy of use [10]
8. Aesthetically pleasing [10]
9. Additional features for teaching [20] */

// Standard Variables / To be changed later.
var scene, camera, renderer
var W, H;
var delta = 1.; //Math.delta;

W = parseInt(window.innerWidth);
H = parseInt(window.innerHeight);

// Camera Position
camera = new THREE.PerspectiveCamera(45, W / H, 1, 100000);

camera.position.z = 36300;
camera.position.y = 10000;
camera.position.x = 36300;

//camera.position.set(-1,100,200);

scene = new THREE.Scene();

// renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(W, H);
document.body.appendChild(renderer.domElement);

// Adding Stars.
var starsGeometry = new THREE.Geometry();
var starsMaterial = new THREE.PointsMaterial({
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

stars = new THREE.Points(starsGeometry, starsMaterial);
stars.scale.set(50, 50, 50);
scene.add(stars);


// ------------------------------------------------------------
var starsGeometry2 = new THREE.Geometry();
var starsMaterial2 = new THREE.PointsMaterial({
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

stars2 = new THREE.Points(starsGeometry2, starsMaterial2);
stars2.scale.set(70, 150, 100);
scene.add(stars2);



// ---------------------------------------------------------
// SOLAR SYSTEM PLANETS IMPLEMENTED HERE

const loader = new THREE.TextureLoader();

// SUN
var sun_geom = new THREE.SphereGeometry(2300, 80, 80);
var sun_material = new THREE.MeshPhongMaterial({
    emissiveMap: loader.load('images/sun.jpg'),
    emissive: 0xffffff

});
var sun = new THREE.Mesh(sun_geom, sun_material);

// SUN GLOW
var spriteMaterial = new THREE.SpriteMaterial({
    map: new THREE.ImageUtils.loadTexture("images/glow.png"),
    useScreenCoordinates: false,
    color: 0xffffee,
    transparent: false,
    blending: THREE.AdditiveBlending
});
var sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(7000, 7000, 7000);
sun.add(sprite); // This centers the glow at the sun.

scene.add(sun);


// MOON 

var moon = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
        emissiveMap: loader.load('images/moonmap4k.jpg'),
        emissive: 0xffffff,
        bumpMap: loader.load('images/moonbump4k.jpg'),
        bumpScale: 0.005,
       
    })
);
moon.position.set(4000, 0, 0)
scene.add(moon)


// EARTH.

var earth = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
        emissive: 0xffffff,
        emissiveMap: loader.load('images/earthmap1k.jpg'),
        bumpMap: loader.load('images/earthbump1k.jpg'),
        bumpScale: 0.05,
        specularMap: loader.load('images/earthspec1k.jpg'),
        specular: new THREE.Color('grey'),
    })
);


// EARTH CLOUDS
function createClouds() {
    return new THREE.Mesh(
        new THREE.SphereGeometry(800, 80, 80),			
        new THREE.MeshPhongMaterial({
            map: loader.load('images/fair_clouds_8k.jpg'),
            transparent: true,
        })
    );		
}

earth.position.set(8500, 0, 0);
earth.add(createClouds());
scene.add(earth);


// MERCURY

var mercury = new THREE.Mesh(
    new THREE.SphereGeometry(500, 80, 80),
    new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/mercurymap.jpg'),
    bumpMap: loader.load('images/mercurybump.jpg'),
    bumpScale: 0.005,
})
);

mercury.position.set(3500, 0, 0);

scene.add(mercury);


// VENUS

var venus = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/venusmap.jpg'),
    bumpMap: loader.load('images/venusbump.jpg'),
    bumpScale: 0.005,
})
);
venus.position.set(6000, 0, 0);
scene.add(venus);

// MARS

var mars = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/marsmap1k.jpg'),
    bumpMap: loader.load('images/marsbump1k.jpg'),
    bumpScale: 0.005,
})
);

mars.position.set(11000, 0, 0);
scene.add(mars);

// JUPITER 
var jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/jupitermap.jpg')
})
);

jupiter.position.set(13500, 0, 0);
scene.add(jupiter);

// SATURN
var saturn = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/saturnmap.jpg')
})
);
saturn.position.set(16000, 0, 0);
scene.add(saturn);

var radius = 0.45;
var segments = 32;

// SATURN RING

var saturnRing = new THREE.Mesh(
    new THREE.Mesh(new THREE.XRingGeometry(1.2 * radius, 2 * radius, 2 * segments, 5, 0, Math.PI * 2), 
    new THREE.MeshBasicMaterial({
        map: loader.load('images/saturn-rings-2.png'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    }))
);
saturnRing.position.set(16000, 0, 0);

scene.add(saturnRing);


// URANUS
var uranus = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
        emissive: 0xffffff,
        emissiveMap: loader.load('images/uranusmap.jpg')
    })
);
uranus.position.set(18500, 0, 0);
scene.add(uranus);

// NEPTUNE
var neptune =  new THREE.Mesh(
    new THREE.SphereGeometry(1000, 80, 80),
    new THREE.MeshPhongMaterial({
    emissive: 0xffffff,
    emissiveMap: loader.load('images/neptunemap.jpg')
})
);

neptune.position.set(21000, 0, 0);
scene.add(neptune);


// ---------------------------------------------------------------

//----------------------------------------------------------------
// Ambient Lightining and Directional Lightning DONE BELOW

/*
scene.add(new THREE.AmbientLight(0x404040));
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,3,5);
scene.add(light);

// Ambient light to the Scene.
var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);


// Directional Lighting

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.x = 1;
directionalLight.position.y = 1;
directionalLight.position.z = 0.75;
directionalLight.position.normalize();
scene.add(directionalLight);


var directionalLight = new THREE.DirectionalLight(0x808080);
directionalLight.position.x = -1;
directionalLight.position.y = 1;
directionalLight.position.z = -0.75;
directionalLight.position.normalize();
scene.add(directionalLight);
*/



//----------------------------------------------------------------

var t = 0;
var yx = 0;

function render() {
    renderer.render(scene, camera);
}

// Controls using Mouse and Keys.
controls = new THREE.OrbitControls(camera, renderer.domElement);

animate();

function animate() {
    requestAnimationFrame(animate);

    // Sun remains centered while rest of the planets rotate.
    sun.rotation.y += 0.001;

    // Mercury Rotation
    mercury.rotation.y += 0.002;
    mercury.position.x = Math.sin(t * 1) * 4000;
    mercury.position.z = Math.cos(t * 1) * 4000;


    // Venus Rotation
    venus.rotation.y += 0.002;
    venus.position.x = Math.sin(t * 0.1) * 7000;
    venus.position.z = Math.cos(t * 0.1) * 7000;


    // Earth rotation around the Sun.
    earth.rotation.y += 0.002;
    earth.position.x = Math.sin(t * 0.1) * 10000;
    earth.position.z = Math.cos(t * 0.1) * 10000;

    // Mars Rotation
    mars.rotation.y += 0.002;
    mars.position.x = Math.sin(t * 0.1) * 13000;
    mars.position.z = Math.cos(t * 0.1) * 13000;

    // Jupiter Rotation
    jupiter.rotation.y += 0.002;
    jupiter.position.x = Math.sin(t * 0.1) * 16000;
    jupiter.position.z = Math.cos(t * 0.1) * 16000;

    // Saturn Rotation
    saturn.rotation.y += 0.002;
    saturn.position.x = Math.sin(t * 0.1) * 19000;
    saturn.position.z = Math.cos(t * 0.1) * 19000;

    // Saturn Rotation
    saturnRing.rotation.y += 0.002;
    saturnRing.position.x = Math.sin(t * 0.1) * 19000;
    saturnRing.position.z = Math.cos(t * 0.1) * 19000;

    // Uranus Rotation
    uranus.rotation.y += 0.002;
    uranus.position.x = Math.sin(t * 0.1) * 22000;
    uranus.position.z = Math.cos(t * 0.1) * 22000;

    // Neptune Rotation
    neptune.rotation.y += 0.002;
    neptune.position.x = Math.sin(t * 0.1) * 25000;
    neptune.position.z = Math.cos(t * 0.1) * 25000;

    // Uncomment to move screen with cursor.
    //camera.position.y = yx * 5;

    t += Math.PI / 180 * 2;
    camera.lookAt(scene.position);
    controls.update();
    renderer.render(scene, camera);
}
//requestAnimationFrame(update);