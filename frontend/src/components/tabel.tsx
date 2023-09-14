import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TransactionTable({
  currentItems,
  loader,
  UpdateSuspicious,
  UpdateAllowed,
}: any) {
  const navigate = useNavigate();
  return (
    <section className=" text-gray-600  sm:px-4">
      <div className="relative items-center block  sm:p-6 p-4 bg-whiterounded-lg  ">
        <div className="flex flex-col justify-center">
          <div className="w-full max-w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Transactions</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Amount</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Description
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Comment</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Allowed</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Suspiciouse
                        </div>
                      </th>
                    
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {currentItems.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center cursor-pointer">
                            <div
                              className="font-medium text-gray-800 hover:text-blue-500"
                              onClick={() =>
                                navigate(`/transaction-details/${item.id}`)
                              }
                            >
                              {item?.amount}
                            </div>
                          </div>
                        </td>
                        <td className="p-4  max-w-[200px] cursor-pointer ">
                          <div
                            className="text-left hover:text-blue-500"
                            onClick={() =>
                              navigate(`/transaction-details/${item.id}`)
                            }
                          >
                            {item?.description}
                          </div>
                        </td>
                        <td className="p-4 max-w-[200px] ">
                          <div className="text-left font-medium ">
                            {item?.comment === ""
                              ? "Add Comment"
                              : item?.comment}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                        <div className="relative flex flex-col items-center justify-center overflow-hidden">
                            <div className="flex">
                              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={item?.isAllowed}
                                  readOnly
                                />
                                <div
                                  onClick={() => {
                                    UpdateAllowed(item);
                                
                                  }}
                                  className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                ></div>
                              </label>
                            </div>
                          </div>
                         
                        </td>
                        <td className="p-4 font-medium whitespace-nowrap">
                          <div className="relative flex flex-col items-center justify-center overflow-hidden">
                            <div className="flex">
                              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={item?.isSuspicious}
                                  readOnly
                                />
                                <div
                                  onClick={() => {
                                    UpdateSuspicious(item);
                                
                                  }}
                                  className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                ></div>
                              </label>
                            </div>
                          </div>
                        </td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {loader ? (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-20 h-20 mr-2 text-gray-200 animate-spin  fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default TransactionTable;
