import React, { useState } from 'react';
import { Heading, Button, Input, Select } from '@app/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const AddClass = ({
  isOpen,
  setIsModalOpen,
  formData,
  handleGetData,
  handleUpdate
}: any) => {
  const initialValues = {
    ClassName: '',
    Subject: '',
    Grade: '',
    Age: '',
  };



  const [selectOptions, setSelectOptions] = useState<
    { key: string; label: string }[]
  >([
    { key: 'true', label: 'True' },
    { key: 'false', label: 'False' },
  ]);
  const [selectOptions1, setSelectOptions1] = useState<
    { key: string; label: string }[]
  >([
    { key: 'true', label: 'True' },
    { key: 'false', label: 'False' },
  ]);

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
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
                  onClick={()=>setIsModalOpen(false)}
                
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <Heading
                label="Update"
                variant="heading-six"
                element="h6"
                className="!text-[20px] mt-1.5"
              />

              <div className="grid sm:grid-cols-2 grid-colc-1 sm:space-x-5 space-x-0 sm:mt-10 mt-6">
                <div className="relative">
                  <Select
                    label="Allowed"
                    options={selectOptions}
                    name="allowed"
                    onChange={handleGetData}
                    value={formData.allowed}
                 
                  />
                 
                </div>
                <div className="relative sm:mt-0 mt-[14px]">
                  <Select
                    label="Suspicious"
                    options={selectOptions1}
                    name="suspicious"
                    value={formData.suspicious}
                    onChange={handleGetData}

                  />

                </div>
              </div>
              <div className="grid  grid-col-1 sm:space-x-5 space-x-0  mt-3">
                <div className="relative mt-3">
                  <p className="font-semibold">Comment</p>
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
                onClick={(e:any)=>{e.preventDefault(),setIsModalOpen(false)}}
               
              >
                Cancel
              </button>
              <Button.Semantic
                className="!bg-[#1C1E1F] text-white py-[11px] px-[41px] rounded-lg text-[16px] font-medium "
                variant="primary"
                size="regular"
                label="Update"
                onClick={handleUpdate}
               
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
