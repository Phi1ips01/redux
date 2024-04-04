import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DynamicTable from '../../Components/TableComponent';
import SideBar from '../../Components/SideBar';
import DropDown from '../../Components/DropDown';
import InputButton from '../../Components/InputButton';
import CsvLink from '../../Components/CsvLink'
import FormInput from '../../Components/FormInputComponent';
import {addUserReducer,showAllUserReducer,showOneUserReducer,showUserReducer,updateUserReducer,deleteUserReducer} from '../../features/user/userSlice'
import { logout } from '../../features/login/loginSlice';
const User = ()=>{
  const [isEditMode,setIsEditMode]=useState(false)
  const [search, setSearchValue] = useState({ column: '', keyword: '' });
 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(showUserReducer({ page: 0, size: 10 }))
}, [dispatch]);
    const userData = useSelector((state) => state.users.userData)
    const userAllData = useSelector((state) => state.users.userAllData)
    const userOneData = useSelector((state) => state.users.userOneData)
    const userCount = useSelector((state) => state.users.userCount)
    console.log("userData",userData)
    console.log("userCount",userCount)
    console.log("userOneData",userOneData)
    console.log("userAllData",userAllData)  
    useEffect(() => {
    setIsEditMode(!!userOneData && !!userOneData.id);
  }, [userOneData]);
  const handleSubmit = (event) => {
    console.log("handle submit",userOneData);
    event.preventDefault();
    const handleFormField = (event, fieldName, defaultValue) => {
      return event.target[fieldName].value !== '' ? event.target[fieldName].value : defaultValue;
      };
      
    const showOneUserData = userOneData
    const formData = {
        username: handleFormField(event, 'username', showOneUserData.username),
        email: handleFormField(event, 'email', showOneUserData.email),
        password: handleFormField(event, 'password', showOneUserData.password),
        role: handleFormField(event, 'role', showOneUserData.role)
    };
      if (!!userOneData && !!isEditMode) {
        const id = userOneData.id
        const updatedFormData = {
          ...formData,
          id: id,
        }
        dispatch(updateUserReducer(updatedFormData))
        document.getElementById('success').innerText = 'Details updated successfully';

      } else {
        dispatch(addUserReducer(formData))
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
  const handleCSVDownload = ()=>{
    dispatch(showAllUserReducer())
  }
  const tableColumns = ()=>{
    const data = Array.isArray(userData) ? userData : [];
    const allColumns = data.length > 0 ? Object.keys(data[0]) : [];
    const columns = allColumns.map(column => ({
      Header: column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' '), // Convert underscore to space and capitalize
      accessor: column,
    }));
    return columns
  }
  const searchColumns = ()=>{
    const data = Array.isArray(userData)
    ? userData.map(({ username,email,role, ...rest }) => ({ username,email,role }))
    : [];
  
    console.log("bus darta" ,userData)
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
    dispatch(showUserReducer({ page: 0,size:20, search: search.column, keyword: e.target.value}));
  };
  

    return (
      <div>
            <DropDown logout={logout}/>
        <SideBar />

        <div className="default-main">
        <form onSubmit={handleSubmit}>
        <div className="text">
            User Details
            </div>
        <h3 id='success'></h3>
          <div className="default-form-row">
          <FormInput
               id="username"
               name="username"
               className="default-form-input"
               placeholder={isEditMode ? userOneData.username : "Enter the username.."}
               required={isEditMode ? false : true}
              />
            <FormInput
              id="email"
              name="email"
              className="default-form-input"
              placeholder={isEditMode ? userOneData.email : "Enter the Email.."}
              required={isEditMode ? false : true}       
            />
          </div> 
          <div className="default-form-row">
          <FormInput
               id="password"
               name="password"
               className="default-form-input"
               placeholder={isEditMode ? userOneData.password : "Enter the password"}
               required={isEditMode ? false : true}
              />
            <FormInput
              id="role"
              name="role"
              className="default-form-input"
              placeholder={isEditMode ? userOneData.role : "Enter the role"}
              required={isEditMode ? false : true}
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
          data={userData} 
          deleteAction={deleteUserReducer} 
          handleKeywordChange={handleKeywordChange}
          handleColumnChange={handleColumnChange}
          searchColumns={searchColumns()} 
          showOneRowData = {userOneData} 
          showOneRow = {showOneUserReducer} 
          count= {userCount}
          showAll={showUserReducer}
          />
           <button className="csv-button" onClick={handleCSVDownload}>
            Download
                {userAllData && (
          <CsvLink data={userAllData} columns={tableColumns()}/>
        )}
  </button>
      </div>
    );
  }

export default User;
