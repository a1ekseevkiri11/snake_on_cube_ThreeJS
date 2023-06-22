// import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

import { TileMap } from './tileMap.js';
import { Snake } from './snake.js';
import { Berry } from './berry.js';
import { Platform } from './platform.js';

import {
  optCamera,
  optScene,
  optAmbLight,
  optDirLight,
} from "./config scene.js";



import { optHeadSnake} from "./config geometry.js";
// const proportion = optCamera.z / optPlatform.sizeZ;

class World {
  constructor() {
    this.clock =  new THREE.Clock();
    this.initialize();
    this.initInput();
  }

  initInput(){

    document.getElementById("restart").addEventListener("click", () => {
      this.restart()
    });
    
    document.addEventListener("keydown",  (e) => {
      if(e.code === "KeyR"){
        this.restart();
      }
    });


    if(localStorage.getItem('camera') === '2D'){
      this.followCameraFlag = localStorage.getItem('camera');
      document.getElementById('camera').textContent = this.followCameraFlag;
    }
    else{
      this.followCameraFlag = '3D';
      document.getElementById('camera').textContent = this.followCameraFlag;
    }

    document.getElementById("camera").addEventListener("click", () => {
      if(this.followCameraFlag === "3D"){
        this.followCameraFlag = "2D";
        document.getElementById('camera').textContent = this.followCameraFlag;
        return;
      }
      this.followCameraFlag = "3D";
      document.getElementById('camera').textContent = this.followCameraFlag;
    });
  }

  restart(){
    localStorage.setItem('camera', this.followCameraFlag);
    document.getElementById('game-over').classList.remove('active');
    this.snake.deleteSnake();
    this.initObject();
    return;
  }

  initialize() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.antialias = "true";
    this.renderer.setClearColor(optScene.color);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio * 2);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.onWindowResize();
    }, false);

    this.scene = new THREE.Scene();
    this.scene.position.set(optScene.x, optScene.y, optScene.z);

    this.camera = new THREE.PerspectiveCamera( optCamera.fov, window.innerWidth / window.innerHeight, optCamera.near, optCamera.far);
    this.camera.position.set(optCamera.x, optCamera.y, optCamera.z);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    const ambLight = new THREE.AmbientLight(optAmbLight.color, optAmbLight.inten);
    ambLight.position.set(optAmbLight.x, optAmbLight.y, optAmbLight.z);
    this.scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(optDirLight.color, optDirLight.inten, 500, 0.01);
    dirLight.position.set(optDirLight.x, optDirLight.y, optDirLight.z);
    dirLight.castShadow = true;
    this.scene.add(dirLight);


    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.target.set(0, 0, 0);
    // this.controls.update();

    this.tileMap = new TileMap();
    this.platform = new Platform({scene: this.scene});
    this.initObject();
    this.RAF();
  }

  initObject(){
    this.berry = new Berry({scene: this.scene}, this.tileMap);
    this.snake = new Snake({scene: this.scene}, this.tileMap, this.berry);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  update(){
    if(this.snake.dead){
      document.getElementById('game-over').classList.add('active');
      return;
    }
    const previousSnakeHeadPosition = this.snake.headMesh.position;
    if(optHeadSnake.spead < this.clock.getDelta()){
      this.clock.start();
    }
    this.snake.update();
    if(this.followCameraFlag === "3D"){
      this.followCamera(previousSnakeHeadPosition, this.snake.headMesh.position);
    }
    else if(this.scene.rotation.x !== 0 ||
      this.scene.rotation.y !== 0 ||
      this.scene.rotation.z !== 0){
        this.scene.rotation.x = 0;
        this.scene.rotation.y = 0;
        this.scene.rotation.z = 0;
    }
  }

  followCamera(pos1, pos2){
    let delta = this.clock.getDelta();
    this.scene.rotation.y = -(pos2.x - pos1.x * (optHeadSnake.spead - delta)) * optScene.angleRotation;
    this.scene.rotation.x = (pos2.y - pos1.y * (optHeadSnake.spead - delta)) * optScene.angleRotation;
  }

  RAF() {
    requestAnimationFrame(() => {
      this.update();
      this.renderer.render(this.scene, this.camera);
      this.RAF();
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const APP = new World();
});