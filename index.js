import * as THREE from "three";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, monkey;

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

    const loader = new GLTFLoader();

    loader.load("monkey.glb", (gltf) => {
        gltf.scene.traverse((object) => {
            if (object.isMesh) {
                object.material = new THREE.MeshNormalMaterial();
                monkey = object;
            }
        })
        scene.add(gltf.scene);
    });
    
    camera.position.z = 8;
}

function animate() {
    requestAnimationFrame(animate);
    
    // if (monkey) {
    //     monkey.rotation.x += 0.01;
    //     monkey.rotation.y += 0.01;
    // }
    
    renderer.render(scene, camera);
}

function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", resizeWindow);

init();

let dragging = false;
let previousX = 0;
let previousY = 0;

renderer.domElement.addEventListener("pointerdown", (e) => {
    dragging = true;
    previousX = e.clientX;
    previousY = e.clientY;
});

renderer.domElement.addEventListener("pointermove", (e) => {
    if (!dragging || !monkey) return;
    const dx = e.clientX - previousX;
    const dy = e.clientY - previousY;
    monkey.rotation.y += dx * 0.01;
    monkey.rotation.x += dy * 0.01;
    previousX = e.clientX;
    previousY = e.clientY;
});

renderer.domElement.addEventListener("pointerup", (e) => {
    dragging = false;
});

renderer.domElement.addEventListener("pointerlieve", (e) => {
    dragging = false;
});

animate();
