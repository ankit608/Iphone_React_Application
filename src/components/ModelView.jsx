import React, { Suspense } from 'react'
import { OrbitControls, View } from '@react-three/drei'
import Lights from './Lights'
import IPhone from './IPhone'
import*as THREE from 'three'
import { Html } from '@react-three/drei'
import Loader from './Loader'


function ModelView({index,groupRef,gsapType,controlRef,setRotationState,size,item}) {
  return (
     <View index={index} id={gsapType} className={` w-full h-full absolute ${index === 2 ? 'right-[-100%]':''}`} >

     <ambientLight intensity={0.3}></ambientLight> 
     <perspectiveCamera makeDefault position={[0,0,4]}></perspectiveCamera> 
     <Lights></Lights>
     <OrbitControls makeDefault ref={controlRef} enableZoom={false} enablePan={false} rotateSpeed={0.4} target={new THREE.Vector3(0,0,0)} onEnd={()=>setRotationState(controlRef.current.getAzimuthalAngle())}></OrbitControls>
     <group >
     <Suspense fallback={<Html><Loader></Loader></Html>}>
      <IPhone scale={index===1 ? [20,20,20]:[25,25,25]} item={item} size={size}></IPhone>
     </Suspense>
     </group>
    
    
     </View> 
  )
}

export default ModelView
