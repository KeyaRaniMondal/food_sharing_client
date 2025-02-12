import { useNavigate } from 'react-router-dom'
import error from '../assets/error.jpg'
const Error = () => {
    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate('/')
    }
    return (
        <div>
            <h2 className="text-5xl mb-10 font-bold text-center mt-10">Page Not Found</h2>
            <button onClick={handleNavigate} className="btn btn-outline flex justify-center mx-auto mt-10 font-bold">Home Page</button>
            <img src={error} alt="" className='w-full h-[600px]' />
        </div>
    )
}
export default Error