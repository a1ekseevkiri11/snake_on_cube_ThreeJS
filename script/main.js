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
} from "./config three.js";


class World {
  constructor() {
    this.initialize();
    this.initInput();
  }

  initInput(){
    document.getElementById("game-restart").addEventListener("click", (e) => {
      this.restart()
    });
    document.addEventListener("keydown",  (e) => {
      if(e.code === "KeyR"){
        this.restart();
      }
    });
  }

  restart(){
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

    this.camera = new THREE.PerspectiveCamera( optCamera.fov, window.innerWidth / window.innerHeight, optCamera.near, optCamera.far);
    this.camera.position.set(optCamera.x, optCamera.y, optCamera.z);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));


    this.scene = new THREE.Scene();
    this.scene.position.set(optScene.x, optScene.y, optScene.z);

    const ambLight = new THREE.AmbientLight(optAmbLight.color, optAmbLight.inten);
    ambLight.position.set(optAmbLight.x, optAmbLight.y, optAmbLight.z);
    this.scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(optDirLight.color, optDirLight.inten);
    dirLight.position.set(optDirLight.x, optDirLight.y, optDirLight.z);
    this.scene.add(dirLight);


    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.target.set(0, 0, 0);
    // controls.update();
    this.tileMap = new TileMap();
    this.platform = new Platform({scene: this.scene});
    this.initObject();
  }

  initObject(){
    this.berry = new Berry({scene: this.scene}, this.tileMap);
    this.snake = new Snake({scene: this.scene}, this.tileMap, this.berry);
    this.RAF();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  RAF() {
    requestAnimationFrame(() => {
      if(this.snake.dead){
        document.getElementById('game-over').classList.add('active');
        return;
      }
      this.snake.update(this.berry);
      this.renderer.render(this.scene, this.camera);
      this.RAF();
    });
  }
}


window.addEventListener('DOMContentLoaded', () => {
  const APP = new World();
});