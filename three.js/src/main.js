import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// BoxGeometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.x = -5;
scene.add(box);

// CircleGeometry
const circleGeometry = new THREE.CircleGeometry(1, 32);
const circleMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.x = -3;
scene.add(circle);

// Load the GLTF model from GitHub
const loader = new GLTFLoader();
const url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/refs/heads/main/2.0/Fox/glTF/Fox.gltf';

loader.load(url, function (gltf) {
  const model = gltf.scene;
  model.position.x = 0; // Adjust position if needed
  scene.add(model);

  function animate() {
    requestAnimationFrame(animate);
    model.rotation.x += 0.01;
    model.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}, undefined, function (error) {
  console.error('An error happened', error);
});

function animate() {
  requestAnimationFrame(animate);
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  circle.rotation.x += 0.01;
  circle.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();