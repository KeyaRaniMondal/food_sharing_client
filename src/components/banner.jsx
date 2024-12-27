import banner from '../assets/bannerbg.jpg';

const Banner = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: "cover", // Optional: Ensures the image covers the div
                backgroundPosition: "center", // Optional: Centers the image
                height: "80vh", // Optional: Adjust height as needed
            }}
       className='mt-2' >
        </div>
    );
};

export default Banner;
