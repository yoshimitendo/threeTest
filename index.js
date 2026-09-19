import * as THREE from "three";

let scene, camera, renderer, cube;

function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    );
    
    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
    const geometyr = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x0000ff})
    cube = new THREE.Mesh(geometyr, material);
    scene.add(cube);
    
    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", resizeWindow);

init();
animate();
