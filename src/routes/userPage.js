import React, { useEffect } from 'react';
import './styles/travel.css'
import { useSelector, useDispatch } from 'react-redux';
import InputButton from '../Components/InputButton';
import InputField from '../Components/InputField';
import TopNav from '../Components/TopNav'
import {setSelectedOperatorId,addTripReducer} from '../features/trip/tripSlice'
import {showAllBusReducer} from '../features/bus/busSlice'
import { showAllBusOperatorReducer } from '../features/busOperator/busOperatorSlice';
const Home = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showAllBusOperatorReducer());
    dispatch(showAllBusReducer())
    
  }, [dispatch]);
  const busOperatorData = useSelector((state) => state.busOperators.busOperatorData);
  console.log("busOperatorData",busOperatorData)
  const busData = useSelector((state) => state.buses.busData);
  console.log("busData userPage",busData)
  const selectedOperatorId = useSelector((state) => state.trips.selectedOperatorId);

  const handleOperatorChange = (event) => {
    const selectedOperatorId = event.target.value;
    dispatch(setSelectedOperatorId(selectedOperatorId));
    if (selectedOperatorId) {
      // dispatch(showBusReducer(selectedOperatorId));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
        operator_id: getFieldValue(event, 'operator_id'),
        bus_id: getFieldValue(event, 'bus_id'),
        trip_id: getFieldValue(event, 'trip_id'),
        customer_name: getFieldValue(event, 'customer_name'),
        contact: getFieldValue(event, 'contact'),
        alternate_contact: getFieldValue(event, 'alternate_contact'),
        starting_point: getFieldValue(event, 'starting_point'),
        boarding_point: getFieldValue(event, 'boarding_point'),
        destination_point: getFieldValue(event, 'destination_point'),
        seat_numbers: getFieldValue(event, 'seat_numbers'),
        address: getFieldValue(event, 'address'),
        date_of_journey: getFieldValue(event, 'date_of_journey'),
        age: getFieldValue(event, 'age'),
        number_of_tickets: getFieldValue(event, 'number_of_tickets'),
        total_amount: getFieldValue(event, 'total_amount'),
        payment_status: getPaymentStatus(event),
        paid: getFieldValue(event, 'paid'),
        remarks: getFieldValue(event, 'remarks'),
        agents: getFieldValue(event, 'agents'),
    };
    dispatch(addTripReducer(formData));
    document.getElementById('success').innerText = 'Details entered successfully';
    clearForm();
  };

  const getFieldValue = (event, fieldName) => {
    const value = event.target[fieldName]?.value;
    return value !== undefined && value !== null ? value :  '';
  };
  
  const getPaymentStatus = (event) => {
    const totalAmount = parseInt(event.target.total_amount.value);
    const paidAmount = parseInt(event.target.paid.value);
    return totalAmount === paidAmount ? 'completed' : `pending ${totalAmount - paidAmount}`;
  };

  const clearForm = () => {
    ['operator_id', 'bus_id', 'trip_id', 'customer_name', 'contact', 'alternate_contact',
     'starting_point', 'boarding_point', 'destination_point', 'seat_numbers', 'address',
     'date_of_journey', 'age', 'number_of_tickets', 'total_amount', 'paid', 'remarks', 'agents']
    .forEach(fieldName => {
        document.getElementById(fieldName).value = '';
    });
    setTimeout(() => {
        document.getElementById('success').innerText = '';
    }, 5000);
  };
  return (
    <div>
        <TopNav />
        <div className="trip-main">
            <form className="trip-form" onSubmit={handleSubmit}>
            <h3 id='success'></h3>

              <h3>Enter the Trip details here</h3>
                <InputField type="text" id="trip_id" name="trip_id" className="trip-form-input" placeholder={`PNR Number`}/>
                
                <InputField type="text" id="customer_name" name="customer_name" className="trip-form-input" placeholder="Enter the Customer Name" required/>
                <InputField type="text" id="contact" name="contact" className="trip-form-input" placeholder="Enter the contact" required/>
                <InputField type="text" id="alternate_contact" name="alternate_contact" className="trip-form-input" placeholder="Enter the alternate contact"/>
                <select id="age" name="age" className="trip-select" required>
                  <option value="">Select Age</option>
                  {[...Array(100)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>             
                   <InputField type="text" id="address" name="address" className="trip-form-input" placeholder="Enter the Address" required/>
                <select
                    className='trip-select'
                    id='operator_id'
                    name='operator_id'
                    onChange={handleOperatorChange}
                    required
                >
                  <option value='' disabled selected>
                    Enter the Operator*
                  </option>
                      {Array.isArray(busOperatorData) &&
                        busOperatorData.map((operator) => (
                        <option key={operator.id} value={operator.id}>
                            {operator.name}
                        </option>
                        ))}
                 </select>
                <select className='trip-select' id='bus_id' name='bus_id' required>
                  <option value='' disabled selected>
                    Enter the Bus*
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
                <InputField
                 type="date" 
                 id="date_of_journey"
                 name="date_of_journey" 
                 className="trip-form-input" 
                 placeholder="Enter journey date" 
                 required="required"
                 min={new Date().toISOString().split('T')[0]} 
                 />
                <InputField type="text" id="starting_point" name="starting_point" className="trip-form-input" placeholder="Enter the starting point..." required/>
                <InputField type="text" id="destination_point" name="destination_point" className="trip-form-input" placeholder="Enter the Destination..." required/>
                <InputField type="text" id="boarding_point" name="boarding_point" className="trip-form-input" placeholder="Enter the Bording Point" required/>
                {/* <InputField type="text" id="number_of_tickets" name="number_of_tickets" className="trip-form-input" placeholder="Enter the Number of Tickets" required/> */}
                <select id="number_of_tickets" name="number_of_tickets" className="trip-form-input">
                <option value="">Select Number of Tickets</option>
  {[...Array(50)].map((_, index) => (
    <option key={index + 1} value={index + 1}>{index + 1}</option>
  ))}
</select>
                <InputField type="text" id="seat_numbers" name="seat_numbers" className="trip-form-input" placeholder="Enter the Seat Number"/>
                <InputField type="text" id="total_amount" name="total_amount" className="trip-form-input" placeholder="Enter the total amount.." required/>
                <InputField type="text" id="paid" name="paid" className="trip-form-input" placeholder="Enter the paid amount.." required/>
                <InputField type="text" id="remarks" name="remarks" className="trip-form-input" placeholder="Any Remarks.."/>
                <InputField type="text" id="agents" name="agents" className="trip-form-input" placeholder="Enter if any agents present.."/>
                <InputButton className="trip-form-submit" value="Submit"/>
            </form>
            
        </div>
      </div>
  );
};

export default Home;
