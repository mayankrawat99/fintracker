import React, { useEffect, useState } from 'react';
import './style.css';
import { Card, Row } from 'antd';
import Button from '../Button/Button';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Modal,  message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

function Cards({ OpenIncomeModal, OpenExpenseModal, income, expenses, currentBalance ,deleteAll }) {
  useEffect(() => {
    // Check for scroll-snap support
    const cardRow = document.querySelector(".card-row");
    if (cardRow && CSS.supports("scroll-snap-type", "x mandatory") === false) {
        cardRow.classList.add("no-snap");
    }
}, []);
  const [user] = useAuthState(auth)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dashCardStyle={
    backgroundColor: 'rgba(221, 238, 255)',
    borderRadius: '20px',
    padding: '3px 9px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '10px',
    width: 'max-content',
}
  // Function to format the amount as Indian Rupees without decimals
  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  const handleDeleteAll = async () => {
    
    // Call deleteAll and then close the modal
    await deleteAll(); // Assume deleteAll is defined in parent and handles async
    setIsModalVisible(false); // Close the modal after deletion
  };

  return (
    <>
      <Row className='card-row'>
        <Card className='card dash-card' style={{ background: 'linear-gradient(344deg, rgb(178 210 241), #007bff)' }}>
          <h2 className='card-title dash-title'>Current Balance</h2>
          <p className='expense-display' style={dashCardStyle}> 
            {currentBalance < 0 ? (
              <>
                <ArrowDownOutlined className='custom-arrow' style={{ color: 'red', stroke: 'red'}} aria-label="Negative Balance Icon" />
                <span style={{ color: 'red' }}>{formatCurrency(Math.abs(currentBalance))}</span> {/* Display absolute value */}
              </>
            ) : currentBalance > 0 ? (
              <>
                <ArrowUpOutlined className='custom-arrow' style={{ color: 'green',stroke:'green'}} aria-label="Positive Balance Icon" />
                <span style={{ color: 'green' }}>{formatCurrency(currentBalance)}</span>
              </>
            ) : (
              <>
                <span style={{ color: '#000' }}>{formatCurrency(currentBalance)}</span> {/* Zero Balance */}
              </>
            )}
          </p>


          <button className="add-expense-btn" onClick={()=>setIsModalVisible(true)}>
            Reset Balance  
          </button>
          <div className="delete">
          <Modal
            title={
              <span style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                <ExclamationCircleOutlined style={{ fontSize: '28px', marginRight: '8px', color: '#ff4d4f' }} />
                Confirm Deletion
              </span>
            }
            open={isModalVisible}
            onOk={handleDeleteAll}
            onCancel={() => setIsModalVisible(false)}
            okText="Yes, delete all"
            cancelText="No, keep them"
            width={430}
            style={{ top: '20px' }}
            styles={{ fontSize: '16px', color: '#333', }} // Body text styling
            footer={[ 
              <button className='confirmbtn' key="back" onClick={() => setIsModalVisible(false)} style={{ backgroundColor: '#007bff', }} >No, keep them</button>, 
              <button className='confirmbtn' key="submit" type="primary" onClick={handleDeleteAll} style={{ backgroundColor: '#ff4d4f',}} >Yes, delete all!</button>
            ]}
          >
            <p style={{ fontSize: '16px',textAlign:'center' }}>
              Please make sure to export your data as a CSV before resetting. This action cannot be undone.
            </p>
          </Modal>
          </div>
        </Card>
        <Card className='card'>
          <h2 className='card-title'>Total Income</h2>
          <p>{formatCurrency(income)}</p>
          <Button onClick={OpenIncomeModal} blue={true} text={"Add Income"}/>
        </Card>
        <Card className='card'>
          <h2 className='card-title'>Total Expenses</h2>
          <p>{formatCurrency(expenses)}</p>
          <Button onClick={OpenExpenseModal} blue={true} text={"Add Expense"}/>
        </Card>
      </Row> 
    </>  
  );
}

export default Cards;
