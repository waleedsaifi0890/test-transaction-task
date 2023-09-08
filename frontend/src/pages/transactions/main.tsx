import React, { useState, useEffect } from 'react';
import {
  Heading,
  Layout,
  FullPageTable,
  Pagination,
} from '@app/components';
import { UpdateModal } from '@app/views/transaction/index';
import api from '../../utils/api';
import {TransactionArray} from "../../types/transaction"

const Classes = () => {
  const [transactionData, setTransactionData] = useState<TransactionArray[]>([]);
  const [searchResult, setSearchResult] = useState<TransactionArray[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchState, setSearchState] = useState('');
  const [selectedForm, setSelectedForm] = useState<any>();
  const [loader,setLoader]=useState(false)



  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, transactionData.length);
  const currentItems = searchResult.slice(startIndex, endIndex);

  const [formData, setFormData] = useState({
    allowed: false,
    suspicious: false,
    comment: '',
  });
  const fetchTransactionData = async () => {
    
    try {
      const response = await api.get('/transaction');
    setLoader(false)

      // Sort the most recent record to the top
      const sortedData = [...response.data].sort((a, b) => {
        const dateB = new Date(b.createdAt);
        const dateA = new Date(a.createdAt);

        if (dateB < dateA) {
          return -1; // `b` comes before `a` in the sorted order
        } else if (dateB > dateA) {
          return 1; // `b` comes after `a` in the sorted order
        } else {
          return 0; // `a` and `b` have the same date, no need to change their relative order
        }
      });

      // Now it is sorted remove createdAt so it doesn't display in the table
      const modifiedData = sortedData.map((item) => {
        const { createdAt, ...rest } = item;
        return rest;
      });

      setTransactionData(modifiedData);
      setSearchResult(modifiedData);
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
  

 
  const handleGetData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value; // Get the selected value as a string
    let newValue;
  
    // Check if the selected value represents "true" or "false" and convert it to a boolean
    if (selectedValue === "true") {
      newValue = true;
    } else if (selectedValue === "false") {
      newValue = false;
    } else {
      // Handle other cases or invalid values here, e.g., set to a default value
      newValue = selectedValue; // You can set it to true or any other default value
    }
  
    setFormData({ ...formData, [e.target.name]: newValue });
  };
  

  const handleRowClick = (rowData: TransactionArray,index:number) => {
    setIsModalOpen(true);
    setSelectedForm(rowData);
    setFormData({
      ...formData,
      allowed: rowData.isAllowed,
      suspicious: rowData.isSuspicious,
      comment: rowData.comment,
    });

  };

  const handleUpdate =async (e:React.MouseEvent) =>{
    e.preventDefault()
    let data ={
      isAllowed:formData.allowed,
      isSuspicious:formData.suspicious,
      comment:formData.comment
    }
    try {
      const response = await api.put(`/transaction/${selectedForm._id}`,data);

    

      let findIndex = transactionData.findIndex((item:any)=>item._id===response.data._id)
      let records = transactionData

      records[findIndex]=response.data

      setTransactionData([...records])
      setIsModalOpen(false)

    } catch (error: any) {
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
              placeholder="Search transation"
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
         
          <FullPageTable
            currentItems={currentItems}
            handleRowClick={handleRowClick}
            loader={loader}
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
              <p
                onClick={() => {
                  setTransactionData(transactionData);
                  setSearchState('');
                }}
                className="text-black underline text-center cursor-pointer mt-2"
              >
                Click here to view all
              </p>
            </div>
          )}
          <div className="py-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
        </div>
        <div>
          <UpdateModal
            isOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            formData={formData}
            handleGetData={handleGetData}
            handleUpdate={handleUpdate}
            
          />
         
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Classes;
