import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <main className="h-screen w-full flex flex-col justify-center items-center space-y-8 bg-[#101010]">
                <div className="flex justify-center">
                  <img src="/images/logo.svg" alt="logo" className="object-contain" />
                </div>
                <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
                <div className="bg-[#f8f802] px-2 text-3xl rounded">  
                    Page Not Found
                </div>
                <button className="mt-5">
                    <a
                    className="relative inline-block text-sm font-medium text-[#f8f802] group active:text-yellow-500 focus:outline-none focus:ring"
                    >
                        <span
                        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#f8f802] group-hover:translate-y-0 group-hover:translate-x-0"
                        ></span>

                        <span className="relative block px-8 py-3 bg-[#000000] border border-current">
                            <p onClick={() => navigate("/classes")}>Go back</p>
                        </span>
                    </a>
                </button>
            </main>
        </React.Fragment>
    );
};

export default Error;
