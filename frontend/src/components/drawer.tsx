import { sideImage } from '@app/data';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Drawer = ({ toggleDrawer, isOpen }: any) => {
  const navigate = useNavigate();
  const location =useLocation()
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState();


  return (
   
    <div className="md:hidden block">
    <div className="flex h-full w-[67px]">
      <nav className="bg-[#1C1D21] w-[67px] fixed  justify-between flex flex-col h-full z-20">
      <div className="mb-10">
          <div className="py-[15px] relative border-b-[#2D2F39] border-b-2 w-[40px] mx-auto">
            <img
              src="/images/Logo png.png"
              alt=""
              className="rounded-full w-8 h-12  mx-auto"
            />
            <div onClick={toggleDrawer} className={`bg-[#1c1e1f] ${isOpen?"":"hidden"} rounded-lg w-[26px] h-[26px] absolute right-[-30px] flex justify-center items-center`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </div>
          <div className="mt-14">
            <ul>
              {sideImage.map((item, index) => (
                <div
                  className="w-full relative"
                >
                  <li  onClick={() => navigate(item.route)} className={`${
                        location.pathname === item.route || item.subPage===location.pathname  ? 'bg-[#000000]' : ''
                      } h-[40px] w-[44px] cursor-pointer hover:bg-[#000000] rounded-lg flex items-center justify-center mx-auto mb-[10px] relative`}>
                    <img
                      src={location.pathname===item.route || item.subPage===location.pathname ? item.img1:item.img}
                      alt=""
                      className="fill-current  text-gray-300  h-[20px] w-[20px]"
                    />
                    <div
                      className="absolute z-40 top-0 text-black bg-white hover:bg-[#7C8198] hover:text-white rounded-lg"
                      style={{
                        transform: 'translate(90px,0px)',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      }}
                    >
                      <li>
                        {isMenuOpen && menuIndex === index && (
                          <ul className="py-2 px-4 w-32  flex cursor-pointer">
                            <li className="flex-wrap">Menu Item 1</li>
                          </ul>
                        )}
                      </li>
                    </div>
                  </li>
                  {location.pathname === item.route || item.subPage===location.pathname ?  (
                      <img
                        className="absolute right-[-2px] top-4"
                        src="/images/Polygon 1.svg"
                        alt=""
                      />
                    ):""}
                </div>
              ))}
            </ul>
          </div>
        </div>
       
      </nav>
      <div className=" py-4 text-[#1C1D21] bg-gray-200 h-screen "></div>
    </div>
  </div>
  );
};

export default Drawer;
