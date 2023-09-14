import { Layout } from "@app/components";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { TransactionArray } from "../../types/transaction";
import { UpdateModal } from '@app/views/transaction/index';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment"

const TransactionDetails = () => {
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const params = useParams();
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionArray>();
    const [formData, setFormData] = useState({
      comment: '',
    });
    const [loading,setLoading]=useState(false)
  const fetchTransactionDetails = async () => {
    try {
      const response = await api.get(`/transaction/${params.id}`);
      setTransactionDetails(response.data.data);
      setLoader(false);
    } catch (error: any) {
      setLoader(false);

      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchTransactionDetails();
  }, []);
  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value; // Get the selected value as a string
 
  
    setFormData({ ...formData, [e.target.name]: selectedValue });
  };

  const handleUpdate =async (e:React.MouseEvent) =>{
    e.preventDefault()
    setLoading(true)
    let data ={
      comment:formData.comment
    }
    try {
      const response = await api.post(`/transaction/${params.id}/comment`,data);
    
      setTransactionDetails(response.data.data)
      toast.success(response.data.message);
    setLoading(false)

      setIsModalOpen(false)

    } catch (error: any) {
    setLoading(false)

      toast.error(error.response.data.message);
      console.error('Error fetching transaction data:', error);
    }
  }

  const handleOpenModal = () =>{
    setFormData({...formData,comment:transactionDetails?.comment??""})
    setIsModalOpen(true)
  }
  return (
    <React.Fragment>
      <title>SyllAI - Transaction Details</title>
      <Layout
        isButton={false}
        isDefferent={false}
        simpleHeading="Transection Details"
      >
        <div className="relative items-center block h-[100vh] sm:p-6 p-4 bg-white   rounded-lg ">
          <div>
            <div className="ms:ms:mx-4    mt-10 border  bg-gray-100">
              <div className="p-5 flex items-end ">
                <p className="font-semibold">Transection Details</p>
                <p className="text-sm ml-2">{moment(transactionDetails?.createdAt).add(10, 'days').calendar()}</p>
              </div>
            </div>
            <div className="ms:mx-4  mt-2 border  bg-gray-100 rounded-md">
              <div className="p-5 flex justify-between border-b items-end ">
                <p className="font-semibold">Payment Status</p>
                <p className="text-sm ml-2">
                  {transactionDetails?.isAllowed === true ? "True" : "False"}
                </p>
              </div>
              <div className="p-5 flex justify-between border-b items-end ">
                <p className="font-semibold">Suspicious</p>
                <p className="text-sm ml-2">
                  {transactionDetails?.isSuspicious === true ? "True" : "False"}
                </p>
              </div>
              <div className="p-5 flex justify-between border-b items-end ">
                <p className="font-semibold">Total Amount</p>
                <p className="text-sm ml-2">${transactionDetails?.amount}</p>
              </div>
              <div className="p-5 flex justify-between border-b items-end ">
                <p className="font-medium">Market value</p>
                <p className="text-sm ml-2">${transactionDetails?.amount}</p>
              </div>
            </div>
            <div className="ms:mx-4 mt-5">
              <p className="font-semibold text-[25px]">Description</p>
              <div className="   border  bg-gray-100 rounded-md">
                <div className="p-5 flex justify-between border-b items-end ">
                  <p className="font-normal text-sm">
                    {transactionDetails?.description}
                  </p>
                </div>
              </div>
            </div>
            {transactionDetails?.comment? <div className="ms:mx-4 mt-5">
              <p className="font-semibold text-[25px]">Comment</p>
              <div className="   border  bg-gray-100 rounded-md">
                <div className="p-5 flex justify-between border-b items-end ">
                  <p className="font-normal text-sm">
                    {transactionDetails?.comment}
                  </p>
                </div>
              </div>
            </div>:""}
           
            <button className="border px-4 py-2 mt-4 bg-[#F3F4F6] rounded-md" onClick={handleOpenModal}>Add Comment</button>
          </div>
          {loader ? (
            <div
              role="status"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/2 bg-wh"
            >
              <svg
                aria-hidden="true"
                className="w-20 h-20 mr-2 text-gray-200 animate-spin fill-blue-600"
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
      </Layout>
      <div>
          <UpdateModal
            isOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            formData={formData}
            handleGetData={handleFormData}
            handleUpdate={handleUpdate}
            loading={loading}
            
          />
         
        </div>
        <ToastContainer />
    </React.Fragment>
  );
};

export default TransactionDetails;
