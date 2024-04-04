import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CsvLink from '../../Components/CsvLink'
import DynamicTable from '../../Components/TableComponent'
import DropDown from '../../Components/DropDown';
import SideBar from '../../Components/SideBar';
import InputButton from '../../Components/InputButton';
import FormInput from '../../Components/FormInputComponent';
import { showAllTripReducer,updateTripReducer,showOneTripReducer,deleteTripReducer,showTripReducer, addTripReducer } from '../../features/trip/tripSlice';
import { showAllBusOperatorReducer } from '../../features/busOperator/busOperatorSlice';
import { showAllBusReducer } from '../../features/bus/busSlice';
import { logout } from '../../features/login/loginSlice';

const TripData = ()=>{
  const [selectedOperatorId,setSelectedOperatorId] = useState('')
  const [isEditMode,setIsEditMode]=useState(false)
  const [search, setSearchValue] = useState({ column: '', keyword: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = {};
    for (let i = 0; i < event.target.length; i++) {
      const fieldName = event.target[i].name;
      const fieldValue = event.target[i].value;
      if (fieldValue !== '') {
        formData[fieldName] = fieldValue;
      } else if (showOneTripData[fieldName]) {
        formData[fieldName] = showOneTripData[fieldName];
      }
    }
    if (formData.date_of_journey.includes('T')) {
      formData.date_of_journey = formData.date_of_journey.split('T')[0];
    }
    formData.payment_status = parseInt(formData.total_amount) === parseInt(formData.paid)
      ? 'completed'
      : `pending ${formData.total_amount - formData.paid}`;
  
    if (!!isEditMode && !!showOneTripData.trip_id) {
      const id = showOneTripData.id;
      const updatedFormData = {
        ...formData,
        id: id,
      };
      console.log("update trip", updatedFormData);
      dispatch(updateTripReducer(updatedFormData));
    } else {
      dispatch(addTripReducer(formData));
    }
    clearForm();
  };
  
  const clearForm = () => {
       document.querySelectorAll('form input').forEach(input => input.value = '');
      document.querySelectorAll('form select').forEach(select =>select.value = '')
    setIsEditMode(false)
  };
  const handleCSVDownload =  async ()=>{
    dispatch(showAllTripReducer())
    
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showTripReducer({page:0,size:10}))
    dispatch(showAllBusOperatorReducer());
    dispatch(showAllBusReducer())
  }, [dispatch]);
  const busOperatorData = useSelector((state) => state.busOperators.busOperatorAllData);
  const tripData = useSelector((state)=>state.trips.tripData)
  const busData = useSelector((state) => state.buses.busData);
  const showOneTripData = useSelector((state) => state.trips.tripOneData);
  const tripCount = useSelector((state)=> state.trips.tripCount)
  const tripAllData = useSelector((state)=>state.trips.tripAllData)

console.log('tripAllData:', tripAllData);

  useEffect(() => {
    setIsEditMode(!!showOneTripData && !!showOneTripData.trip_id);
  }, [showOneTripData]);

  const handleOperatorChange = (event) => {
    setSelectedOperatorId(event.target.value);
  };

const tableColumns = ()=>{
  const data = Array.isArray(tripData)
  ? tripData.map(({ operator_id,bus_id, ...rest }) => rest)
  : [];
  
  const allColumns = data.length > 0 ? Object.keys(data[0]) : [];
  const columns = allColumns.map(column => ({
    Header: column === 'trip_id' ? 'PNR Number' : column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' '),
    accessor: column,
  }));
  return columns
}

const handleColumnChange = (e) => {
  let searchCol = e.target.value;
  let column = ''
  if(searchCol === "operator_name")
  {
    column = "operator_id"
  }
  else if(searchCol === "bus_name")
  {
    column = "bus_id"
  }
  
  else{
    column = searchCol
  }
  console.log("hcc",column)
  setSearchValue({ column, keyword: '' });
};
const handleKeywordChange = (e) => {
  console.log("hkc",e.target.value)
  setSearchValue({ ...search, keyword: e.target.value });
  dispatch(showTripReducer({ page: 0,size:20, search: search.column, keyword: e.target.value}));
};
const searchColumns = ()=>{
  const data = Array.isArray(tripData)
  ? tripData.map(({ operator_name,bus_name,date_of_journey,customer_name,payment_status,contact, ...rest }) => ({ operator_name,bus_name,date_of_journey,customer_name,payment_status,contact }))
  : [];

  const allColumns = data.length > 0 ? Object.keys(data[0]) : [];
  const columns = allColumns.map(column => ({
    Header: column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' '), // Convert underscore to space and capitalize
    accessor: column,
  }));
  return columns
}

    return (
      <div>
        <DropDown logout={logout}/>
            <SideBar/>
      {isEditMode && (
      <div class="container">
        <form onSubmit={handleSubmit}>
              <h3>Enter the Trip details to be Updated</h3>
<div className="form-row">
              <div className="form-group">
              <label htmlFor="trip_id">PNR Number</label>
              <FormInput
                id="trip_id"
                name="trip_id"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.trip_id : "Enter the PNR Number"}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer_name">Customer Name</label>
              <FormInput
                id="customer_name"
                name="customer_name"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.customer_name : "Enter the Customer Name"}
                required={isEditMode ? false : true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <FormInput
                id="contact"
                name="contact"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.contact : "Enter the contact"}
                required={isEditMode ? false : true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="alternate_contact">Alternate Contact</label>
              <FormInput
                id="alternate_contact"
                name="alternate_contact"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.alternate_contact : "Enter the alternate contact"}
              />
              </div>
            </div>
<div className="form-row">
              <div className="form-group">
              <label htmlFor="age">Age</label>
              <FormInput
                id="age"
                name="age"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.age : "Enter the age"}
                required={isEditMode?false:true}
              />
              </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <FormInput
                id="address"
                name="address"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.address : "Enter the Address"}
                required={isEditMode?false:true}
              />
              </div>
              <div className="form-group">
              <label htmlFor="operator_id">Operator ID</label>
              <div className="input-data">
              <select
                className='trip-select'
                id='operator_id'
                name='operator_id'
                onChange={handleOperatorChange}
              >
                <option value='' disabled selected>
                  Enter the Operator
                </option>
                {console.log("busOperatorData",busOperatorData)}
                  {Array.isArray(busOperatorData) &&
                  busOperatorData.map((operator) => (                  
                    <option key={operator.id} value={operator.id}>
                      {operator.name}
                    </option>
                  ))}
              </select>
              <div className="underline"></div>
            </div>
            </div>
            <div className="form-group">
              <label htmlFor="bus_id">Bus</label>
              <div className="input-data">
              <select className='trip-select' id='bus_id' name='bus_id'>
                <option value='' disabled selected>
                  Enter the Bus
                </option>
                  {console.log("busdara",selectedOperatorId)}
                  {console.log("busdata",busData)}
                {Array.isArray(busData) &&
                  busData   
                  .filter((bus) => bus.bus_operator_id == selectedOperatorId)
                    .map((bus) => (
                      <option key={bus.id} value={bus.id}>
                        {bus.name}
                      </option>
                    ))}
              </select>
              <div className="underline"></div>
            </div>
            </div> 
              </div>
<div className="form-row">

            <div className="form-group">
              <label htmlFor="date_of_journey">Date of Journey</label>
              <div className="input-data">
              <input
                type="date"
                id="date_of_journey"
                name="date_of_journey"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.date_of_journey : "Enter journey date"}
                required={isEditMode?false:true}
                min={new Date().toISOString().split('T')[0]} 
              />
            </div>
            <div className="underline"></div>
              </div>
              <div className="form-group">
                <label htmlFor="starting_point">Starting Point</label>
              <FormInput
                id="starting_point"
                name="starting_point"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.starting_point : "Enter the starting point..."}
                required={isEditMode?false:true}
              />
              </div>
            <div className="form-group">
              <label htmlFor="destination_point">Destination Point</label>
              <FormInput
                id="destination_point"
                name="destination_point"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.destination_point : "Enter the Destination..."}
                required={isEditMode?false:true}
              />
              </div>
            <div className="form-group">
              <label htmlFor="boarding_point">Boarding Point</label>
              <FormInput
                id="boarding_point"
                name="boarding_point"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.boarding_point : "Enter the Bording Point"}
                required={isEditMode?false:true}
              />
              </div>
              </div>
<div className="form-row">
<div className="form-group">
    <label htmlFor="boarding_time">Boarding Time</label>
    <FormInput
      id="boarding_time"
      name="boarding_time"
      className="trip-form-input"
      placeholder={isEditMode ? showOneTripData.boarding_time : "Enter the boarding time.."}
    />
  </div>
            <div className="form-group">
              <label htmlFor="number_of_tickets">Number of Tickets</label>
              <div className="input-data">
              <select id="number_of_tickets" name="number_of_tickets" className="trip-select" >
                <option value='' disabled selected>
                    Enter the Number of Tickets*
                  </option>
                  {[...Array(50)].map((_, index) => (

                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
                <div className="underline"></div>
            </div>
              </div>
            <div className="form-group">
              <label htmlFor="seat_numbers">Seat Numbers</label>
              <FormInput
                id="seat_numbers"
                name="seat_numbers"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.seat_numbers : "Enter the Seat Number"}
                required={isEditMode?false:true}
              />
              </div>
              <div className="form-group">
                <label htmlFor="total_amount">Total Amount</label>
              <FormInput
                id="total_amount"
                name="total_amount"
                className="trip-form-input"
                placeholder={isEditMode ? showOneTripData.total_amount : "Enter the total amount.."}
                required={isEditMode?false:true}
              />
              </div>
              </div>
        <div className="form-row">
        
  <div className="form-group">
    <label htmlFor="paid">Paid</label>
    <FormInput
      id="paid"
      name="paid"
      className="trip-form-input"
      placeholder={isEditMode ? showOneTripData.paid : "Enter the paid amount.."}
      required={isEditMode ? false : true}
    />
  </div>
  
  <div className="form-group">
    <label htmlFor="agents">Agents</label>
    <FormInput
      id="agents"
      name="agents"
      className="trip-form-input"
      placeholder={isEditMode ? showOneTripData.agents : "Enter if any agents present.."}
    />
  </div>
</div>
              <InputButton type="submit" id="inputButton" className="default-form-submit" value={!isEditMode ? 'Submit' : 'Update'}/>
        {isEditMode && (
          <button type="button" className="default-form-clear" onClick={clearForm}>
            Clear
          </button>
            )}
            </form>
      </div>
      )}
            <DynamicTable 
              columns={tableColumns()} 
              data={tripData} 
              deleteAction={deleteTripReducer} 
              searchColumns = {searchColumns()}
              handleKeywordChange={handleKeywordChange}
              handleColumnChange={handleColumnChange}
              showOneRowData = {showOneTripData} 
              showOneRow = {showOneTripReducer}
              count= {tripCount}
              showAll={showTripReducer}
              />
                <button className="csv-button" onClick={handleCSVDownload}>
                  Download
                {tripAllData && (
                  <>
                {console.log("this.props.tripdata",tripAllData)}
          {tripAllData && (<CsvLink data={tripAllData} name="customer" columns={tableColumns()}/>)}
          </>
        )}
  </button>
    </div>
    );
}
export default TripData;
