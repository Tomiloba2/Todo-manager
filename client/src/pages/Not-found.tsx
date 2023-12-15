import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate=useNavigate()
    return (
        <div className="bg-blue-800 h-screen relative">
            <section
                className=" max-sm:w-3/4 max-sm:h-3/4
             w-1/2 border-2 border-gray-100 h-1/2 shadow-2xl bg-white
             absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              text-center rounded-xl ">
                <p className="bg-blue-500 rounded-lg text-white text-left text-2xl p-4 relative -top-2">...</p>
                <div className="p-3">
                    <p className="text-9xl">404</p>
                    <h1 className="text-2xl">
                        Page not found
                    </h1>
                    <button
                    onClick={()=>navigate(`/`)}
                     className="mt-3 border-gray-400 border-2 outline-none rounded-md p-2 hover:bg-blue-500 bg-blue-800 text-white">back to home page</button>
                </div>
            </section>
        </div>
    );
}
