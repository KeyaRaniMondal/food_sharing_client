import bannermp from '../../public/banner.mp4'
import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg'
import '../App.css'
const Banner=()=>{
    return(
        <div className='grid grid-cols-3 grid-rows-2'>
<video
    onMouseOver={(e) => e.currentTarget.play()}
    onMouseLeave={(e) => e.currentTarget.pause()}
    loop
    muted
    preload="metadata"
    id="video"
>
    <source src={bannermp} type="video/mp4" />
</video>

<img src={bg1} alt="" />
<img src={bg2} alt="" />

        </div>
    )
}
export default Banner