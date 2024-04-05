import React, { useState,useEffect } from 'react';
import InputButton from '../../Components/InputButton';
import DynamicTable from '../../Components/TableComponent';
import SideBar from '../../Components/SideBar'
import DropDown from '../../Components/DropDown'
import FormInput from '../../Components/FormInputComponent';
import { showAllBusOperatorReducer } from '../../features/busOperator/busOperatorSlice';
import { addBusReducer, deleteBusReducer, showAllBusReducer, showBusReducer, showOneBusReducer, updateBusReducer } from '../../features/bus/busSlice';
import { useDispatch, useSelector } from 'react-redux';
import CSV from '../../Components/CsvLink';
    const Bus=()=>{
      const [isEditMode,setIsEditMode]=useState(false)
      const [search, setSearchValue] = useState({ column: '', keyword: '' });
      
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(showAllBusOperatorReducer());
        dispatch(showBusReducer({page:0,size:10}))
      }, [dispatch]);
      
      const busData = useSelector((state) => state.buses.busData);
      const busCount = useSelector((state)=> state.buses.busCount)
      const busAllData = useSelector((state)=>state.buses.busAllData)
      const busOneData = useSelector((state)=>state.buses.busOneData)
      const busOperatorData = useSelector((state) => state.busOperators.busOperatorAllData);
      
      console.log('busData:', busData);
      console.log('busCount:', busCount);
      console.log('busAllData:', busAllData);
      console.log('busOneData:', busOneData);
      console.log('busOperatorData:', busOperatorData);

      
      useEffect(() => {
        setIsEditMode(!!busOneData && !!busOneData.id);
      }, [busOneData]);

    const handleCSVDownload = ()=>{
      dispatch(showAllBusReducer())
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = {};
      console.log("event.target",event.target.element)
      for (let i = 0; i < event.target.length-1; i++) {
        const fieldName = event.target[i].name;
        const fieldValue = event.target[i].value;
        if (fieldValue !== '') {
          formData[fieldName] = fieldValue;
        } else if (isEditMode && busOneData[fieldName]) {
          formData[fieldName] = busOneData[fieldName];
        }
      }
      if (isEditMode && busOneData.id) {
        const id = busOneData.id;
        const updatedFormData = {
          ...busOneData,
          ...formData,
          id: id,
        };
        console.log("update Bus", updatedFormData);
        dispatch(updateBusReducer(updatedFormData));
        document.getElementById('success').innerText = 'Details updated successfully';
      } else {
        console.log("formdata=", formData);
        dispatch(addBusReducer(formData));
        document.getElementById('success').innerText = 'Details entered successfully';
      }
      clearForm();
    };
    
      const clearForm = () => {
        document.querySelectorAll('form input').forEach(input => input.value = '');
        document.querySelectorAll('form select').forEach(select =>select.value = '')
        setIsEditMode(false)
        setTimeout(() => {
          document.getElementById('success').innerText = '';
        }, 5000);
      };    
      const tableColumns = ()=>{
        const data = Array.isArray(busData)
  ? busData.map(({ bus_operator_id, ...rest }) => rest)
  : [];

        const allColumns = data.length > 0 ? Object.keys(data[0]) : [];
        const columns = allColumns.map(column => ({
          Header: column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' '), // Convert underscore to space and capitalize
          accessor: column,
        }));
        return columns
      }
      const searchColumns = ()=>{
        const data = Array.isArray(busData)
        ? busData.map(({ bus_operator_name, name, ...rest }) => ({ bus_operator_name, name }))
        : [];
      
        console.log("bus darta" ,data)
        const allColumns = data.length > 0 ? Object.keys(data[0]) : [];
        const columns = allColumns.map(column => ({
          Header: column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' '), // Convert underscore to space and capitalize
          accessor: column,
        }));
        return columns
      }
      const handleColumnChange = (e) => {
        let searchCol = e.target.value;
        let column = ''
        if(searchCol === "bus_operator_name")
        {
           column = "bus_operator_id"
        }
        else{
          column = searchCol
        }
        console.log("hcc",column)
        setSearchValue({ column, keyword: '' });
      };
      const handleKeywordChange = (e) => {
        console.log("hkc",search.column,e.target.value)
        setSearchValue({ ...search, keyword: e.target.value });
        dispatch(showBusReducer({ page: 0,size:20, search: search.column, keyword: e.target.value}));
      };
    return (
        <div>
            <DropDown />
            <SideBar/>
            
           <div className="default-main">
        <form  onSubmit={handleSubmit}>
        <div className="text">
            Bus Details
            </div>
            <div className="default-form-row">
        <h3 id='success'></h3>
        <div className="input-data">
          <select 
          className='default-select' 
          id="bus_operator_id" 
          name='bus_operator_id'
          required = {isEditMode ? false : true}>
          <option disabled selected>{isEditMode?busOneData.bus_operator_id:'Select the Operator'}</option>
          {Array.isArray(busOperatorData) &&
              busOperatorData.map(operator => {
                return (
                  <option key={operator.id} value={operator.id}>
                    {operator.name}
                  </option>
                );
              })}
        </select>
        <div className="underline"></div>
            </div>
          <FormInput
             id="name"
             name="name"
             className="default-form-input"
             placeholder={isEditMode ? busOneData.name : "Enter the Name"}
             required = {isEditMode ? false : true}
           />
           
          </div> 
          <div className="default-form-row">
            <div className="input-data">
          <select 
          name="type" 
          id="type" 
          className="default-select"
          required = {isEditMode ? false : true}>
                <option value="" disabled selected>Select the Bus</option>
                <option value="volvo">Volvo</option>
                <option value="Full AC">FUll AC</option>
                <option value="Second Seater">Second Seater</option>
          </select>
          <div className="underline"></div>
          </div>
          <FormInput
            id="share"
            name="share"
            className="default-form-input"
            placeholder={isEditMode ? busOneData.share : "Enter the share in %"}
            required = {isEditMode ? false : true}
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
        data={busData} 
        deleteAction={deleteBusReducer} 
        searchColumns = {searchColumns()} 
        handleKeywordChange={handleKeywordChange}
        handleColumnChange={handleColumnChange}
        showOneRowData = {busOneData} 
        showOneRow = {showOneBusReducer}
        count= {busCount}
        showAll={showBusReducer}
        csv_showAll={showAllBusReducer}
      csv_data={busAllData}
      csv_name={"bus"}
        />
  {/* <CSV showAll = {showAllBusReducer} data={busAllData} name="bus" columns={tableColumns()}/> */}
        </div>
    ); 
};

export default Bus
 