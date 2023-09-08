import React from 'react';
import { useLocation } from 'react-router-dom';
interface button {
  record: number;
  pageTitle: string;
  simpleHeading?: string;
  back?: string;
  selectClass?: string;
  toggleDrawer:()=>void;
  isOpen?:boolean,
}
const Header = ({
  record,
  pageTitle,
  simpleHeading,
  selectClass,
  back,
  toggleDrawer,
  isOpen,
}: button): JSX.Element => {
  const location=useLocation()

 
  return (
    <React.Fragment>
      <div className={`md:pl-8 relative pl-4 md:pr-20 pr-4 flex justify-between z-10  header-shadow items-center sm:h-[92px] h-[75px] ${location.pathname==="/sheila-chatbot" && selectClass !== 'No class'?" border-b":""} sm:border-b border-1 border-[#d9dbe98f]`}>
       
        <div className="flex  items-center">
          {!isOpen? <div
            onClick={toggleDrawer}
            className="h-[35px] w-[35px] bg-[#1c1e1f] rounded-lg md:hidden flex  justify-center items-center mr-2.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>:""}
         

          {
          simpleHeading ? (
            <p className="font-[500]  sm:text-[18px] text-[14px] text-[#14142A] ">
              {simpleHeading}{' '}
            </p>
          ) : back ? (
            <div
              onClick={() => window.history.back()}
              className="flex justify-center items-center cursor-pointer"
            >
              <img
                src="/images/left.svg"
                alt=""
                className="w-[30px] h-[30px] mr-[10px]"
              />
              <p className="font-[500] sm:text-lg sm:text-[18px] text-[14px] text-[#14142A] ">
                {back}{' '}
              </p>
            </div>
          ) : (
            <p className="font-[500] sm:text-lg sm:text-[18px] text-[14px] text-[#14142A] ">
              {pageTitle}{' '}
              <span className="text-[#767676] font-[500] pl-[3px]">
                {' '}
                ({record})
              </span>
            </p>
          )}
        </div>
       
       
      
       
      </div>
    </React.Fragment>
  );
};

export default Header;
