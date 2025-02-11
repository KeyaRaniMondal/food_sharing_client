import error from '../assets/error.jpg'
const Error = () => {
    return (
        <div>
            <h2 className="text-5xl mb-10 font-bold text-center mt-10">Page Not Found</h2>
            <img src={error} alt="" className='w-full h-[600px]' />
        </div>
    )
}
export default Error