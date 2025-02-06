import NotFound from '../assets/notfound2.png';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={NotFound} alt="Page Not Found" className="w-[500px] h-auto" // Adjust the width as needed
 />
      <h1 className="mt-5 text-2xl font-poppins text-[#117C90] text-center">
        Page Not Found
      </h1>
    </div>
  );
}
