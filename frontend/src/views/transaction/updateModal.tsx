import React, { useState } from "react";
import { Heading, } from "@app/components";
const AddClass = ({
  isOpen,
  setIsModalOpen,
  formData,
  handleGetData,
  handleUpdate,
  loading,
}: any) => {


  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="inline-block align-bottom bg-white sm:rounded-xl rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-4xl w-full">
          <form>
            <div className="bg-white px-6 pt-5 sm:pb-4 pb-0 py-6 ">
              <div className="flex justify-end ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <Heading
                label="Add Update"
                variant="heading-six"
                element="h6"
                className="!text-[20px] mt-1.5"
              />

              <div className="grid  grid-col-1 sm:space-x-5 space-x-0  mt-3">
                <div className="relative mt-3">
                  <textarea
                    onChange={handleGetData}
                    value={formData.comment}
                    name="comment"
                    className="mt-1.5 border border-[#D9DBE9] indent-2 w-full rounded-[6px] h-[117px]"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="sm:bg-[#DBDDE3] px-4 sm:mt-9 sm:py-6 pt-6 pb-7 sm:px-6  flex sm:justify-end justify-center">
              <button
                className="!bg-[#FFFFFF] text-[#3C3C3C] sm:border-0   border border-[#D9DBE9]  py-[11px] sm:px-[41px] px-[31px] rounded-lg text-[16px] font-medium mr-4"
                onClick={(e: any) => {
                  e.preventDefault(), setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
              <div>
               
                
                  <button onClick={handleUpdate} className="!bg-[#1C1E1F] text-white py-[14px] px-[41px] rounded-lg text-[16px] font-medium ">{loading? <div role="status w-[120px]">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                </div>:"Update"}</button>
            
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
