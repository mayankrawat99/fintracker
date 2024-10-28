import { Flex, Input, Radio, Select, Table,Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import Papa, { parse, unparse } from 'papaparse';
import './style.css';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import formatDate from '../../assets/formatDate.js'
import { DeleteOutlined } from '@ant-design/icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';


function Ttable({ transactions, addTransaction, fetchTransactions }) {
  const fileInputRef = useRef();
  const[user]=useAuthState(auth)
  const [search, setsearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type', },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width:'100px',
      render: (text) => text.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
    { title: 'Tag', dataIndex: 'tag', key: 'tag',responsive: ["sm"] },
    {
      title: 'Action',
      key: 'action',
     
          fixed: 'right',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this record?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
          type="text"
          danger
          text={<div style={{display:'flex',gap:'2px', fontSize:'14px', alignItems:"center"}}><DeleteOutlined style={{fontSize:'14px'}} />{isMobile()?'':'Delete'}</div> }
           style={{padding:'6px 10px' ,width:'max-content'}}                      // Assume each record has a unique id
       />
       
        </Popconfirm>
      ),
    },
  ];

  let filterTransactions = transactions.filter((transaction) => {
    const name = transaction.name?.toLowerCase() || "";
    const type = transaction.type?.toLowerCase() || "";
    return name.includes(search.toLowerCase()) && type.includes(typeFilter || "");
  });
 
  let formattedTransactions = transactions.map(transaction => ({
    ...transaction,
    date: formatDate(transaction.date),
  }));

  let sortTransaction = [...filterTransactions].sort((a, b) => {
    if (sortKey === 'date') {
      return new Date(formatDate(a.date)) - new Date(formatDate(b.date));
    }
    if (sortKey === 'amount') {
      return a.amount - b.amount;
    }
    return 0;
  });

  function ExportCSV() {
    if(transactions.length>0){
    const fieldNames = columns.map(col => col.dataIndex);
    const csv = unparse({
      fields: fieldNames,
      data: formattedTransactions,
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    toast.error('No transactions to export');
  }
  }

  function importCsv(event) {
    event.preventDefault();
    const headerMapping = {
      name: 'name',
      type: 'type',
      date: 'date',
      amount: 'amount',
      tag: 'tag',
    };

    try {
      parse(event.target.files[0], {
        header: true,
        complete: async ({ data }) => {

          if (data.length === 0) {
            toast.error('No data found');
            return;
          }

          const transactionsToAdd = data
            .map(transaction => ({
              name: transaction[headerMapping.name] || '',
              type: transaction[headerMapping.type] || 'Unknown',
              date: transaction[headerMapping.date] || new Date().toISOString().split('T')[0],
              amount: parseFloat(transaction[headerMapping.amount]) || 0,
              tag: transaction[headerMapping.tag] || 'Uncategorized',
            }))
            .filter(({ name }) => name);

          if (transactionsToAdd.length === 0) {
            toast.error('No valid transactions to import.');
            return;
          }

          await Promise.all(transactionsToAdd.map(transaction => addTransaction(transaction, true)));

          toast.success('All transactions added');
          fetchTransactions();
        },
        error: (error) => {
          console.error('Error:', error);
          toast.error('Failed to parse CSV');
        }
      });
    } catch {
      toast.error('Something went wrong!');
    }
  }
  const deleteUserTransactions = async (transactionId) => {
    try {
      const transactionRef = doc(db, `user/${user.uid}/transactions`, transactionId); // Reference the specific transaction by ID
      await deleteDoc(transactionRef); // Use deleteDoc to delete the document
      toast.success('Transaction deleted!');
    } catch (error) {
      toast.error('Error deleting transaction:', error);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = (id) => {
    // Call your delete function here
    deleteUserTransactions(id);
    fetchTransactions(); // Update the table after deletion

  };

  const isMobile = () => {
    if(window.innerWidth < 768)
    return true
  else{
    return false; // Default to desktop mode if not mobile
  } // Define your breakpoint for mobile
  };

  

  return (
    <>
      <div className='search' style={{ display: 'flex', gap: '10px', padding: '29px 34px 14px 34px', justifyContent: 'center' }}>
        <img src={searchIcon} alt="" className='sIcon' />
        <Input className='search-input' type="text" placeholder="Search by Name " value={search} onChange={(e) => setsearch(e.target.value)} />
        <Select placeholder={'Filter'} value={typeFilter} style={{ width: "24rem", boxShadow: 'var(--shadow)' }}
          onChange={(value) => setTypeFilter(value)} allowClear>
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </div>
      <div className="wrapper">
        <div className='tabletitle' style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <p>My Transactions</p>
          <Radio.Group className='radio' defaultValue="" optionType="button" value={sortKey} onChange={(e) => setSortKey(e.target.value)} >
            <Radio.Button className='input-radio' value="">No Sort</Radio.Button>
            <Radio.Button className='input-radio' value="date">Sort by Date</Radio.Button>
            <Radio.Button className='input-radio' value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div className='titlebtn' style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <Button text={'Export to CSV'} blue={true} onClick={ExportCSV} />
            <Button text={'Import from CSV'} onClick={handleButtonClick} />
            <input ref={fileInputRef} type='file' required accept='.csv' id='file-csv' onChange={importCsv} style={{ display: "none" }} />
          </div>
        </div>
        <Table dataSource={sortTransaction} columns={columns} rowKey='id'     scroll={{ x: 'max-content' }} pagination={{ pageSize: isMobile()? 4:6 }} sticky  />
      </div>
    </>
  );
}

export default Ttable;
