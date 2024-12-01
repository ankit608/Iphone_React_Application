import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'

const VideoCarousel = () => {

    const videoRef = useRef([])
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([])

    
    const [video,setVideo] = useState({
        isEnd:false,
        startPlay:false,
        videoID:0,
        isLastVideo:false,
        isPlaying:false

    })
   
    
     const[loadedData,setLoadedData] = useState([]);
    const {isEnd,videoID,isLastVideo,isPlaying,startPlay} = video
    useGSAP(()=>{
        gsap.to("#slider",{
            transform: `translateX(${-100*videoID}%)`,
            duration:2,
            ease: 'power2.inOut'


        })
        gsap.to('#video',{
                  scrollTrigger:{
                   trigger:'#video',
                   toggleActions:'restart none none none'
            },
            onComplete:()=>{
                setVideo((pre)=>({
                    ...pre,
                    startPlay: true,
                    isPlaying: true
                }))
            }
        })
},[isEnd,videoID])
 
    useEffect(()=>{
           
        if(loadedData.length>3){
            if(!isPlaying){
                videoRef.current[videoID].pause();
            }else{
                startPlay && videoRef.current[videoID].play()
            }
        }

    },[startPlay,videoID,isPlaying,loadedData])

    const handleLoadedMetedata = (i,e)=>setLoadedData((pre)=>[...pre,e])
    const handleProcess = (type,i) =>{
        switch(type){
            case 'video-end':
                setVideo((prevVideo)=>({
                    ...prevVideo,isEnd: true, videoID: i+1
                }))
                break;
            case 'video-last':
                setVideo((pre)=>({
                    ...pre,isLastVideo:false,
                    videoID:0
                })) 
            case 'play':
                setVideo((pre)=>(
                    { ...pre,isPlaying:!pre.isPlaying}
                ))
                break;  
            case 'pause':
                 setVideo((pre)=>({...pre,isPlaying: !pre.isPlaying}))         
            default:
                break;
        }
    }

    useEffect(()=>{
             let currnetProgress = 0;
            let span = videoSpanRef.current;

            if(span[videoID]){
                let anim = gsap.to(span[videoID],{
                    onUpdate:()=>{
                         const progress = Math.ceil(anim.progress()*100);
                    if(progress!=currnetProgress){
                        currnetProgress = progress;

                        gsap.to(videoDivRef.current[videoID],{
                            width:window.innerWidth <760 ? '10vw' : window.innerWidth<1200?'10vw':'4vw'
                        })

                        gsap.to(span[videoID],{
                            width: `${currnetProgress}%`,
                            backgroundColor:'white'
                        })
                    }  
                    },

                    onComplete:() => {
                       if(isPlaying){
                               gsap.to(videoDivRef.current[videoID],{
                                width:'12px'

                               })
                               gsap.to(span[videoID],{
                                backgroundColor:'#afafaf'
                               })
                       }
                    }
                })

                if(videoID === 0){
                    anim.restart()
                }

                const animUpdate = ()=>{
                    anim.progress((videoRef.current[videoID].currentTime)/hightlightsSlides[videoID].videoDuration)
                }

                if(isPlaying){
                    gsap.ticker.add(animUpdate)
                }else{
                    gsap.ticker.remove(animUpdate)
                }
            }

           
    },[videoID,startPlay])
  return (
     <>
     <div className='flex items-center'>
           {hightlightsSlides.map((list,i)=>{
           return(
            <div key={list.id} id="slider" className='sm:pr-20 pr-10'>
                <div className='video-carousel_container'>
                    <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                        <video id='video' playsInline={true} preload='auto' muted ref={(el)=>(videoRef.current[i]=el)} 
                        onPlay={()=>{
                             setVideo((prevVideo)=>({
                                ...prevVideo, isPlaying:true
                             }))
                        }}
                        className={`${list.id===2 && 'translate-x-44'} pointer-events-none`}
                        onLoadedMetadata={(e)=>{
                             handleLoadedMetedata(i,e)
                        }}
                        onEnded={()=>{
                            i !==3 ? handleProcess('video-end',i):handleProcess('video-last')
                        }}
                        >
                            <source src={list.video} type='video/mp4'></source>
                        </video>
                    </div>
                    <div className='absolute top-12 left-[5%] z-10'>
                        {
                            list.textLists.map((text)=>{
                                return(
                                    <p key={text} className='md:text-2xl text-xl'>
                                        {text}

                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
             </div>
           )  
           })}
     </div>
     <div className='relative flex-center mt-10'>
     <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'> 
     {videoRef.current.map((_,i)=>(
                <span key={i} ref={(el)=>(videoDivRef.current[i]=el)} className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
                       <span key={i} ref={(el)=>(videoSpanRef.current[i]=el)} className='absolute h-full w-full rounded-full'>
                        
                       </span>
                </span>
                
            ))}
        </div>
        <div className='control-btn'>
            <img src={isLastVideo ? replayImg: !isPlaying ? playImg: pauseImg} alt={isLastVideo ? 'replay':!isPlaying ? 'play':'pause'} onClick={isLastVideo?()=> handleProcess('play'):()=>handleProcess('pause')}></img>
        </div>
     </div>
     </>
  )
}

export default VideoCarousel
