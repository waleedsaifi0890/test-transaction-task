import React, { Dispatch, SetStateAction } from 'react';
interface propsTypes{
  currentPage:number;
  totalPages:number;
  setCurrentPage:Dispatch<SetStateAction<number>>
  setItemsPerPage:Dispatch<SetStateAction<number>>
}

const Pagination = ({currentPage,totalPages,setCurrentPage,setItemsPerPage}:propsTypes) => {
    const handlePageChange = (page: number) => {
     
     if(totalPages!=0){
      setCurrentPage(page);
     }
       
      };

    /// This is the custome pagination where we have to handle a situation when we have alot of pages, in that situation 
    //  we have to add ... dots whithin the page number so that's why we create the getPageRange 
    
      const getPageRange = () => {
        let range:(number| string)[] = [];
        if (totalPages <= 6) {
          range = Array.from({ length: totalPages }, (_, index) => index + 1);
        } else {
          if (currentPage <= 3) {
            range = Array.from({ length: 5 }, (_, index) => index + 1);
            range.push('...');
            range.push(totalPages);
          } else if (currentPage >= totalPages - 2) {
            range.push(1);
            range.push('...');
            range = range.concat(
              Array.from({ length: 5 }, (_, index) => totalPages - 4 + index)
            );
          } else {
            range.push(1);
            range.push('...');
            range = range.concat(
              Array.from({ length: 3 }, (_, index) => currentPage - 1 + index)
            );
            range.push('...');
            range.push(totalPages);
          }
        }
        return range;
      };

      // handleChangeRow  is for changes the number of row on the page


      const handleChangeRow = (e:any) => {
        setItemsPerPage(parseInt(e.target.value));
      };
    return (
        <React.Fragment>
            

          <div className="flex items-center md:justify-between justify-center px-4  pl-8 pr-20 ">
            <div className="md:block hidden" />
            <div className="">
              <div>
                <nav
                  className="inline-flex -space-x-px "
                  aria-label="Pagination"
                >
                  <p
                    className={` cursor-pointer font-semibold px-[5px] py-2 text-[#333333] text-[13px] ${
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <span>Prev</span>
                  </p>
                  {getPageRange().map((page:any, index:number) => (
                    <div key={index} className="px-[4px]">
                      <React.Fragment>
                        {page === '...' ? (
                          <span className="inline-flex items-center px-1 py-2 rounded-lg text-sm font-semibold">
                            ...
                          </span>
                        ) : (
                          <a
                            href="#"
                            className={`inline-flex  justify-center items-center h-[32px] w-[32px] rounded-lg text-[13px] font-semibold ${
                              page === currentPage
                                ? 'bg-[#1C1E1F] text-white'
                                : ' ring-1 ring-[#D9DBE9]'
                            }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </a>
                        )}
                      </React.Fragment>
                    </div>
                  ))}
                  <p
                    className={` cursor-pointer   px-[5px] py-2 text-[#333333] font-semibold text-[13px] ${
                      currentPage === totalPages || totalPages===0
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <span className="">Next</span>
                  </p>
                </nav>
              </div>
            </div>
            <div className="md:block hidden">
              <div className='flex items-center'>
                <p className='text-sm font-semibold mr-2.5'>Rows</p>
                <select
                className="border px-[17px] py-[10px]  rounded-lg custom-select"
                onChange={handleChangeRow}
                disabled={totalPages==0?true:false}
              >
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>

              </select>
              </div>
            </div>
          </div>
        </React.Fragment>
    );
};

export default Pagination;