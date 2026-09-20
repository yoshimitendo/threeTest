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
            console.log(object);
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
    
    if (monkey) {
        monkey.rotation.x += 0.01;
        monkey.rotation.y += 0.01;
    }
    
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
