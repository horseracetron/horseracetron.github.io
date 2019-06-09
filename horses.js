const loadHorse = function() {

  var gltf = null;
  var mixer = null;
  var mixer_1 = null;
  var clock = new THREE.Clock();
  var controls;
  var controls_1;
  var camera;
  var object;

  function initScene() {
    var scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 );
    scene.add( directionalLight );

    var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
    directionalLight2.position.set( 0, 5, -5 );
    scene.add( directionalLight2 );

    return scene;
  }

  function init() {
     var container = $('#container');
     var container_1 = $('#container_1');

      width = container.width();
      height = container.height();

      scene = initScene();
      camera = new THREE.PerspectiveCamera( 30, width / height, 0.01, 10000 );
      //camera.position.set(2, 2, 3);
      camera.position.x = -8;

      var target = new THREE.Vector3(0,0,0);

      camera.lookAt(target);

      var loader = new THREE.GLTFLoader();
      loader.setCrossOrigin( 'anonymous' ); // r84 以降は明示的に setCrossOrigin() を指定する必要がある

      var scale = 0.02;
      //var url = "https://cdn.rawgit.com/cx20/gltf-test/e5c46e508942f1686ed84fcb1e2e1132de80490a/tutorialModels/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
      //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
      //var url = "https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf";
      //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/2bdcb263/polly/project_polly.gltf";
      //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf";
      //var url = "https://cdn.rawgit.com/cx20/jsdo-static-contents/8a3e977a/models/gltf/2.0/BearOnBalloons/scene.gltf";
      //var url = "https://cdn.rawgit.com/mrdoob/rome-gltf/784089b4/files/models/life_soup/quadruped_fox.gltf";
      var url = "https://rawcdn.githack.com/mrdoob/three.js/bc0c2c59398f8d0f2442ced77432bee83f870966/examples/models/gltf/Horse.glb";

      loader.load(url, function (data) {
        gltf = data;

        object = gltf.scene;
        object.scale.set(scale, scale, scale);
        object.translateZ(-7);
        object.translateY(-2);
        var animations = gltf.animations;
        if ( animations && animations.length ) {
            mixer = new THREE.AnimationMixer( object );
            for ( var i = 0; i < animations.length; i ++ ) {
              animations[i].duration = 0.225;
              animations[i].tracks[0].times = [0, 0.015, 0.03, 0.045, 0.06, 0.075, 0.09, 0.105, 0.12, 0.135, 0.15, 0.165, 0.18, 0.195, 0.21, 0.225];
                var animation = animations[ i ];
                mixer.clipAction( animation ).play();
            }
        }

        scene.add(object);
      });

      renderer = new THREE.WebGLRenderer({alpha:true});
      renderer_1 = new THREE.WebGLRenderer({alpha:true});


      controls = new THREE.OrbitControls( camera, renderer.domElement );
      controls_1 = new THREE.OrbitControls( camera, renderer_1.domElement );

      controls.userPan = false;
      controls.userPanSpeed = 0.0;
      controls.enableKeys = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.75;

      renderer.gammaOutput = true;
      renderer.autoClear = false;
      renderer.setSize(width, height);

      controls_1.userPan = false;
      controls_1.userPanSpeed = 0.0;
      controls_1.enableKeys = false;
      controls_1.enableDamping = true;
      controls_1.dampingFactor = 0.75;

      renderer_1.gammaOutput = true;
      renderer_1.autoClear = false;
      renderer_1.setSize(width, height);

      container.append(renderer.domElement);
      container_1.append(renderer_1.domElement);

  }

  function animate() {
      requestAnimationFrame( animate );
      if (mixer) mixer.update(clock.getDelta());
      controls.update();
      controls_1.update();
      render();
  }

  function render() {
      renderer.render( scene, camera );
      renderer_1.render( scene, camera );
  }

 return { init, animate };

}

$(document).ready(function() {
  let obj = loadHorse();
  obj.init('container');
  obj.animate();
});
