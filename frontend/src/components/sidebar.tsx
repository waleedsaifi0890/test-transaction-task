import React, {  useState } from 'react';
import { sideImage } from '@app/data';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const [menuIndex, setMenuIndex] = useState();

  const handleMouseEnter = (index: any) => {
    setMenuOpen(true);
    setMenuIndex(index);
  };
  

  const handleMouseLeave = () => {
    setMenuOpen(false);
  };
 

  return (
    <div className="md:block hidden">
      <div className="flex h-full w-[92px]">
        <nav className="bg-[#1C1D21] w-[92px] fixed  justify-between flex flex-col h-full z-30">
          <div className="mb-10">
            <div className="py-6 border-b-[#2D2F39] border-b-2 w-[40px] mx-auto">
              <div className="rounded-full w-10 h-10  mx-auto relative">
                <img
                  src="/images/Logo png.png"
                  alt=""
                  className="object-contain h-10 w-10"
                />
               
              </div>
            </div>
            <div className="mt-6">
              <ul>
                {sideImage.map((item, index) => (
                  <div key={index} className="w-full relative ">
                    <li
                      onClick={() => navigate(item.route)}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className={`h-[40px] w-[44px] my-icon cursor-pointer ${
                        location.pathname === item.route || item.subPage===location.pathname  ? 'bg-[#000000]' : ''
                      } hover:bg-[#000000] rounded-lg flex items-center justify-center mx-auto mb-[10px] relative`}
                    >
                      <img
                        src={location.pathname===item.route || item.subPage===location.pathname || isMenuOpen && menuIndex===index ?item.img1:item.img}
                        alt="img"
                        className={`  fill-current h-[20px] w-[20px]`}
                      />

                      <div
                        className="absolute w-[140px] z-40 top-0 "
                        style={{
                          transform: 'translate(105px,3px)',
                        }}
                      >
                        {isMenuOpen &&
                          menuIndex === index &&
                          item?.routeName && (
                            <div
                              style={{
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                              }}
                              className=" rounded-lg px-3 h-[36px] justify-center w-fit items-center text-black bg-white  flex cursor-pointer"
                            >
                              <p className="flex-wrap font-medium text-[13px]">
                                {item.routeName}
                              </p>
                            </div>
                          )}
                      </div>
                    </li>
                    {location.pathname === item.route || item.subPage===location.pathname ? (
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

export default Sidebar;
