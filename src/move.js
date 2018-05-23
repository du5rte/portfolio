import * as THREE from 'three'

export function split(val) {
  return (val - 1/2) * 2
}

export function ratio(val, { min=0, max=1 }={}) {
  return (val - min) / (max - min)
}

export function limit(val, { min=-1, max=1 }={}) {
  return val > max ? max : val < min ? min : val;
}

export function moveFromMousePosition(mouse) {
  const rx = ratio(mouse.clientX, { max: window.innerWidth })
  const ry = ratio(mouse.clientY, { max: window.innerHeight })

  const x = split(rx)
  const y = split(ry)

  return { x, y }
}


export function moveFromDeviceOrientation(device, screenOrientation) {
  // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
  // camera.rotation.reorder( 'YXZ' );
  // const quaternion = camera

  var quaternion = new THREE.Quaternion();

  const alphaOffset = 0

  var alpha = device.alpha ? THREE.Math.degToRad( device.alpha ) + alphaOffset : 0; // Z
  var beta = device.beta ? THREE.Math.degToRad( device.beta ) : 0; // X'
  var gamma = device.gamma ? THREE.Math.degToRad( device.gamma ) : 0; // Y''
  var orient = screenOrientation ? THREE.Math.degToRad( screenOrientation ) : 0; // O

  var zee = new THREE.Vector3( 0, 0, 1 );

  var euler = new THREE.Euler();

  var q0 = new THREE.Quaternion();
  var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

  euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

  quaternion.setFromEuler( euler ); // orient the device
  quaternion.multiply( q1 ); // camera looks out the back of the device, not the top
  quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

  var vector = new THREE.Vector3( 0, 0, 1 );

  vector.applyQuaternion( quaternion );

  const rx = ratio(vector.x, { max: 2/3 })
  const ry = ratio(-vector.y, { max: 2/3 })

  const x = limit(rx)
  const y = limit(ry)

  return { x, y }
}
