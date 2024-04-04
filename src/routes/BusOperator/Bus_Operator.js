import React, { useState,useEffect } from 'react';
import InputButton from '../../Components/InputButton';
import SideBar from '../../Components/SideBar'
import DropDown from '../../Components/DropDown'
import DynamicTable from '../../Components/TableComponent'
import CsvLink from '../../Components/CsvLink'
import FormInput from '../../Components/FormInputComponent';
import { logout } from '../../features/login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addBusOperatorReducer, deleteBusOperatorReducer, getTotalBusOperatorReducer, showAllBusOperatorReducer, showBusOperatorReducer, showOneBusOperatorReducer, updateBusOperatorReducer } from '../../features/busOperator/busOperatorSlice';

const BusOperator = ()=>{
  const [isEditMode,setIsEditMode]=useState(false)
  const [search, setSearchValue] = useState({ column: '', keyword: '' });
      
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showBusOperatorReducer({page:0,size:10}));
    dispatch(getTotalBusOperatorReducer())

  }, [dispatch]);
  const busOperatorData = useSelector((state) => state.busOperators.busOperatorData);
  const busOperatorCount = useSelector((state) => state.busOperators.busOperatorCount);
  const busOperatorOneData = useSelector((state) => state.busOperators.busOperatorOneData);
  const busOperatorAllData = useSelector((state) => state.busOperators.busOperatorAllData);
  const busOperatorTotalAmount = useSelector((state) => state.busOperators.busOperatorTotalAmount);
  const busOperatorProfit = useSelector((state) => state.busOperators.busOperatorProfit);
  console.log("busOperatorData",busOperatorData)
  console.log("busOperatorCount",busOperatorCount)
  console.log("busOperatorOneData",busOperatorOneData)
  console.log("busOperatorAllData",busOperatorAllData)
  
  useEffect(() => {
    setIsEditMode(!!busOperatorOneData && !!busOperatorOneData.id);
  }, [busOperatorOneData]);

  const handleCSVDownload = ()=>{
    dispatch(showAllBusOperatorReducer)
  }
  const handleSubmit=(event)=> {
      event.preventDefault();
      const formName = event.target.name.value!==''?event.target.name.value:busOperatorOneData.name
      const formContact = event.target.contact.value!==''?event.target.contact.value:busOperatorOneData.contact
      if (busOperatorOneData && busOperatorOneData.id) {
        const formPaid = event.target.paid.value!==''?event.target.paid.value:busOperatorOneData.paid
        const formData = {
          name:formName,
          contact:formContact,
          paid:formPaid
      }
      const id = busOperatorOneData.id
      const updatedFormData = {
        ...formData,
        id: id,
      }
      dispatch(updateBusOperatorReducer(updatedFormData))
      document.getElementById('success').innerText = 'Details updated successfully';

    } else {
      const formData = {
        name:formName,
        contact:formContact,
        paid:0            
      }
      dispatch(addBusOperatorReducer(formData))
      document.getElementById('success').innerText = 'Details entered successfully';
    }
    clearForm();
  };
  const clearForm = () => {
    document.querySelectorAll('form input').forEach(input => input.value = '');
    setIsEditMode(false)
    setTimeout(() => {
      document.getElementById('success').innerText = '';
    }, 5000);
  };    
  const tableColumns = ()=>{
    const data = Array.isArray(busOperatorData) ? busOperatorData : [];
    const allColumns = data.length > 0 ? Object.keys(data[0]) : [];
    const columns = allColumns.map(column => ({
      Header: column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' '), // Convert underscore to space and capitalize
      accessor: column,
    }));
    return columns
  }
  const searchColumns = ()=>{
    const data = Array.isArray(busOperatorData)
    ? busOperatorData.map(({ name, ...rest }) => ({ name }))
    : [];
  
    console.log("bus darta" ,busOperatorData)
    const allColumns = data.length > 0 ? Object.keys(data[0]) : [];
    const columns = allColumns.map(column => ({
      Header: column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' '), // Convert underscore to space and capitalize
      accessor: column,
    }));
    return columns
  }
  const handleColumnChange = (e) => {
    let searchCol = e.target.value;
    const column = searchCol
    console.log("hcc",column)
    setSearchValue({ column, keyword: '' });
  };
  const handleKeywordChange = (e) => {
    console.log("hkc",search.column,e.target.value)
    setSearchValue({ ...search, keyword: e.target.value });
    dispatch(showBusOperatorReducer({ page: 0,size:20, search: search.column, keyword: e.target.value}));
  };
  return (
    <div>
      <DropDown logout={logout}/>
      <SideBar/>
      <div className="default-main">
        <form onSubmit={handleSubmit}>
          <div className="text">
            Bus Operator Details
          </div>
          <h3 id='success'></h3>
          <div className="default-form-row">
            <FormInput
              id="name"
              name="name"
              className="default-form-input"
              placeholder={isEditMode?busOperatorOneData.name:"Enter the Name"}
              required={isEditMode?false:true}
            />
            <FormInput
              id="contact"
              name="contact"
              className="default-form-input"
              placeholder={isEditMode?busOperatorOneData.contact:"Enter the contact"}
              required={isEditMode?false:true}              
            />
          </div> 
          <div className="default-form-row">
            <FormInput
              id="paid"
              name="paid"
              className="default-form-input"
              placeholder={isEditMode?busOperatorOneData.paid:"amount paid(disabled for new entry)"}
              disabled={isEditMode?false:true}              
            />
          </div>  
          <InputButton type="submit" id="inputButton" className="default-form-submit" value={!isEditMode ? 'Submit' : 'Update'}/>
          {isEditMode && (
            <button type="button" className="default-form-clear" onClick={clearForm}>
              Clear
            </button>
            )}  
        </form>
      </div>
      <DynamicTable 
      columns={tableColumns()} 
      data={busOperatorData} 
      deleteAction={deleteBusOperatorReducer} 
      searchColumns = {searchColumns()} 
      handleKeywordChange={handleKeywordChange}
      handleColumnChange={handleColumnChange}
      showOneRowData = {busOperatorOneData} 
      showOneRow = {showOneBusOperatorReducer}
      count= {busOperatorCount}
      showAll={showBusOperatorReducer}
      />
      <div className='csv-totalbox'>
         <div className="totals-box">
          <div>Total Amount: {busOperatorTotalAmount}</div>
          <div>Total Profit: {busOperatorProfit}</div>
        </div> 
        <button className="csv-button" onClick={handleCSVDownload}>
          Download
          {busOperatorAllData && (
            <CsvLink data={busOperatorAllData} columns={tableColumns()}/>
          )}
        </button>
      </div>
    </div>
  );
};
export default BusOperator