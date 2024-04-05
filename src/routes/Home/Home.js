import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputButton from '../../Components/InputButton';
import TopNav from '../../Components/TopNav'
import MyModal from '../../Components/Modal';
import DropDown from '../../Components/DropDown';
import FormInput from '../../Components/FormInputComponent';
import './home.css'
import { showAllBusOperatorReducer } from '../../features/busOperator/busOperatorSlice';
import {showAllBusReducer} from '../../features/bus/busSlice'
import {addTripReducer} from '../../features/trip/tripSlice'
const Home = () => {
  const [formData, setFormData] = useState({})
  const [selectedOperatorId,setSelectedOperatorId] = useState('')
  const [showModal,setShowModal] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showAllBusOperatorReducer());
  }, [dispatch]);
  const busOperatorData = useSelector((state) => state.busOperators.busOperatorAllData);
  console.log("busOepratorData",busOperatorData)
  const busData = useSelector((state) => state.buses.busAllData);

  
  const handleOperatorChange = (event) => {
    setSelectedOperatorId(event.target.value);
    dispatch(showAllBusReducer())    
  };

  const getPaymentStatus = (event) => {
    const totalAmount = parseInt(event.target.total_amount.value);
    const paidAmount = parseInt(event.target.paid.value);
    return totalAmount === paidAmount ? 'completed' : `pending ${totalAmount - paidAmount}`;
  }
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = {};
      for (let i = 0; i < event.target.elements.length; i++) {
          const field = event.target.elements[i];
          if (field.name) {
              formData[field.name] = field.value;
          }
      }
      if (formData.date_of_journey.includes('T')) {
        formData.date_of_journey = formData.date_of_journey.split('T')[0];
      }
      formData.payment_status = getPaymentStatus(event);
      dispatch(addTripReducer({formData}));
      setFormData(formData)
      setShowModal(true)
      clearForm();
    };


    const clearForm = () => {
      document.getElementById('trip-form-id').reset();
    }
    const handleCloseModal = () => {
      setShowModal(false)
    };
    const handlePrintBill =  () => {
      const { customer_name, contact, date_of_journey, bus_id,starting_point, destination_point, boarding_point, boarding_time, number_of_tickets, total_amount, paid, age, address, trip_id, seat_numbers } = formData;

      const bus =  busData.find(bus => bus.id == bus_id);
      console.log("bus handleprint",formData)
      console.log("handle print",bus.name)
      const billContent = `
          Customer Name: ${customer_name}
          Contact: ${contact}
          Date of Journey: ${date_of_journey}
          Number of Tickets: ${number_of_tickets}
          Age: ${age}
          Address: ${address}
          PNR Number: ${trip_id}
          ${seat_numbers ? `Seat Numbers: ${seat_numbers}` : ''}
          
          Route: ${starting_point} - ${destination_point}
          Boarding Point: ${boarding_point}
          Boarding Time: ${boarding_time}
          Bus Name: ${bus ? bus.name : ''}
          
          Total Amount: ${total_amount}
          Paid: ${paid}
      `;


      console.log(billContent);

      // Open a new window to print the bill content
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Bill</title>
            <style>
              body {
                padding:30px;
                font-family: Arial, sans-serif;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <pre>${billContent}</pre>
            <script>
              // Automatically close the print window after printing
              window.onload = function() {
                window.print();
                
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    };

    const handleSendWhatsAppMessage = ()=>{
      console.log("send whatsapp message")
    }
    return (
      <div>
        <DropDown/>
        <TopNav />


<div className="container">
            <form onSubmit={handleSubmit} id='trip-form-id'>
            <div className="text">
            Customer Details
            </div>
            <div className="form-row">
              <FormInput id="trip_id" name="trip_id" className="trip-form-input" placeholder={`PNR Number`}/>
              <FormInput id="customer_name" name="customer_name" className="trip-form-input" placeholder="Enter the Customer Name" required/>
              <FormInput id="contact" name="contact" className="trip-form-input" placeholder="Enter the contact" required/>
              <FormInput id="alternate_contact" name="alternate_contact" className="trip-form-input" placeholder="Enter the alternate contact"/>
            </div>
            <div className="form-row">
            <div className="input-data">
            <select id="age" name="age" className="trip-select" required>
                  <option value="">Enter the age</option>
                  {[...Array(100)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
               <div className="underline"></div>
            </div>
         
              
              <FormInput id="address" name="address" className="trip-form-input" placeholder="Enter the Address" required/>
              <div className="input-data">
              <select
                    className='trip-select'
                    id='operator_id'
                    name='operator_id'
                    onChange={handleOperatorChange}
                    required
                >
                  <option value='' disabled selected>
                    Enter the Bus Operator
                  </option>
                      {Array.isArray(busOperatorData) &&
                        busOperatorData.map((operator) => (
                        <option key={operator.id} value={operator.id}>
                            {operator.name}
                        </option>
                        ))}
                 </select>
               <div className="underline"></div>
            </div>
            <div className="input-data">
            <select className='trip-select' id='bus_id' name='bus_id' required>
                  <option value='' disabled selected>
                    Enter the Bus
                  </option>
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
            <div className="form-row">
            <div className="input-data">
              <input  
                 type="date" 
                 id="date_of_journey"
                 name="date_of_journey" 
                 className="trip-form-input trip-date" 
                 placeholder="Enter journey date" 
                 required="required"
                 min={new Date().toISOString().split('T')[0]} 
                 />
                 <div className="underline"></div>
            </div>
              <FormInput id="starting_point" name="starting_point" className="trip-form-input" placeholder="Enter the starting point..." required/>
              <FormInput id="destination_point" name="destination_point" className="trip-form-input" placeholder="Enter the Destination..." required/>
              <FormInput id="boarding_point" name="boarding_point" className="trip-form-input" placeholder="Enter the Bording Point" required/>
            </div>
            <div className="form-row">
              <FormInput id="boarding_time" name="boarding_time" className="trip-form-input" placeholder="Enter the Boarding Time.." required/>
              <div className="input-data">
              <select id="number_of_tickets" name="number_of_tickets" className='trip-select' required>
                <option value='' disabled selected>
                  Enter the Number of Tickets
                  </option>
                  {[...Array(50)].map((_, index) => (

                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
               <div className="underline"></div>
            </div>
              <FormInput id="seat_numbers" name="seat_numbers" className="trip-form-input" placeholder="Enter the Seat Number"/>
              <FormInput id="total_amount" name="total_amount" className="trip-form-input" placeholder="Enter the total amount.." required/>
            </div>
            <div className="form-row">
              <FormInput id="paid" name="paid" className="trip-form-input" placeholder="Enter the paid amount.." required/>
              <FormInput id="agents" name="agents" className="trip-form-input" placeholder="Enter if any agents present.."/>
              <InputButton className="trip-form-submit" value="Submit"/>

            </div>
            </form>
            <MyModal
            show={showModal}
            handleClose={handleCloseModal}
            handlePrintBill={handlePrintBill}
            handleSendWhatsAppMessage={handleSendWhatsAppMessage}
          />
        </div>
      </div>
    );
  }
export default Home;
