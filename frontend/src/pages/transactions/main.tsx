import React, { useState, useEffect } from 'react';
import {
  Heading,
  Layout,
  TransactionTable,
  Pagination,
} from '@app/components';
import api from '../../utils/api';
import {TransactionArray} from "../../types/transaction"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Classes = () => {

  //  State for Getting all Record 
  const [transactionData, setTransactionData] = useState<TransactionArray[]>([]);

  //  Search Filter array

  const [searchResult, setSearchResult] = useState<TransactionArray[]>([]);

  //  Pop Modal state 


  //  Search input field state 
  const [searchState, setSearchState] = useState('');

  const [loader,setLoader]=useState(false)


// ****************** Pagination States *******************

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, transactionData.length);
  const currentItems = searchResult.slice(startIndex, endIndex);

  // function  for getting all transacton

  const fetchTransactionData = async () => {
    
    try {
      const response = await api.get('/transaction');
    setLoader(false)

      

      setTransactionData([...response.data.data]);
      setSearchResult([...response.data.data]);
    } catch (error: any) {
    setLoader(false)

      console.error('Error fetching transaction data:', error);
    }
  };

  useEffect(() => {
    setLoader(true)

    fetchTransactionData();
  }, []);

  // Set searchResult to all data if searchbox is empty
  useEffect(() => {
    if (searchState === '') {
      setSearchResult(transactionData);
    }
  }, [transactionData, searchState]);


  //********************** Search filter ****************** //

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(e.target.value);
    const filteredData = transactionData.filter((filter) => {
      const searchString = e.target.value.toLowerCase();
  
      // Convert non-string values to strings before applying .toLowerCase()
      const amountString = filter.amount.toString().toLowerCase();
      const commentString = filter.comment.toString().toLowerCase();
      const isAllowedString = filter.isAllowed.toString().toLowerCase();
      const isSuspiciousString = filter.isSuspicious.toString().toLowerCase();
  
      return (
        amountString.includes(searchString) ||
        commentString.includes(searchString) ||
        isAllowedString.includes(searchString) ||
        isSuspiciousString.includes(searchString)
      );
    });
  
    if (filteredData.length > 0) {
      setCurrentPage(1);
    }
  
    setSearchResult(filteredData);
  };

  const UpdateData = (response:any) =>{
    toast.success(response.data.message);
    let findIndex = transactionData.findIndex((item:any)=>item.id===response.data.data.id)
    let records = transactionData
    records[findIndex]=response.data.data
    setTransactionData([...records])
  }
 
  const UpdateSuspicious = async (data:any) =>{
    
    try {
    
      const response = await api.post(`/transaction/${data.id}/flag`,{isSuspicious:data?.isSuspicious?false:true});
      UpdateData(response)

    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.error('Error fetching transaction data:', error);
    }
  }
  const UpdateAllowed =async (data:any) =>{
    try {
    
      const response = await api.post(`/transaction/${data.id}/allow`,{isAllowed:data?.isAllowed?false:true});
      UpdateData(response)

    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.error('Error fetching transaction data:', error);
    }
  }


  return (
    <React.Fragment>
      <title>Test-Task</title>
      <Layout
        record={searchResult.length}
        pageTitle="Transactions"
        isButton={false}
      >
        <div className="md:flex hidden justify-between items-center mt-7 mb-8 sm:px-8 -z-10">
          <div className="flex ">
           
          
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search transaction"
              value={searchState}
              className="h-9 max-w-[194px] w-[100%] indent-8 border border-[#b8bacd] rounded  change"
              onChange={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-[#6E7191] absolute top-[11px] left-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
        <div className='className="relative overflow-x-auto'>
         
          <TransactionTable
            currentItems={currentItems}
            loader={loader}
            UpdateSuspicious={UpdateSuspicious}
            UpdateAllowed={UpdateAllowed}
          />
          {transactionData.length > 0 ? (
            ''
          ) : (
            <div className="mt-5">
              <Heading
                label="No results found"
                variant="heading-three"
                element="h3"
                className="text-center"
              />
              
            </div>
          )}
          {transactionData.length>0? <div className="py-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>:""}
         
        </div>
        <div>
          
         
        </div>
      </Layout>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Classes;
