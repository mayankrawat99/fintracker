import React from 'react'
import { Form, Modal ,Input,DatePicker,Select,Typography, } from "antd";
import Button from '../Button/Button';
import { useForm } from 'antd/es/form/Form';
import './style.css'

function AddExpense({cancelExpenseModal,isExpenseModalVisible,onFinish}) {
  const [form] =useForm()
  return (
  <>
 <Modal
  title={<div style={{marginBottom: '16px', fontSize: '1.15rem' }}>Add Expense</div>}
  open={isExpenseModalVisible}
  footer={null}
  onCancel={cancelExpenseModal}
>
  <Form layout="vertical" form={form} onFinish={(values)=>{
    onFinish(values,"Expense")
    form.resetFields();

  }}>
    {/* Expense Name Field */}
    <Form.Item 
      label="Expense Name" 
      name="name"
      rules={[{ required: true, message: "Please input the name of the expense!" }]}
    >
      <Input placeholder="Enter Expense Name" type="text" className="custom-input" />
    </Form.Item>

    {/* Amount Field */}
    <Form.Item
      label="Amount"
      name="amount"
      rules={[{ required: true, message: "Please input the expense amount!" }]}
    >
      <Input type="number" className="custom-input" placeholder="Enter Amount (in ₹)" />
    </Form.Item>

    {/* Date Field */}
    <Form.Item
      label="Date"
      name="date"
      rules={[{ required: true, message: "Please select the expense date!" }]}
    >
      <DatePicker placeholder="Select Date" className="custom-input" format="YYYY-MM-DD" />
    </Form.Item>

    {/* Expense Type Field */}
    <Form.Item 
      label="Tag"
      name="tag" 
      rules={[{ required: true, message: "Please select the type!" }]}
    >
      <Select placeholder="Select Category" className="custom-select">
        <Select.Option value="Housing">Housing</Select.Option>
        <Select.Option value="Transportation">Transportation</Select.Option>
        <Select.Option value="Groceries">Groceries</Select.Option>
        <Select.Option value="Dining-out">Dining Out</Select.Option>
        <Select.Option value="Entertainment">Entertainment</Select.Option>
        <Select.Option value="Healthcare">Healthcare</Select.Option>
        <Select.Option value="Personal-care">Personal Care</Select.Option>
        <Select.Option value="Miscellaneous">Miscellaneous</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item >
            <Button  text="Add Expense"  type='submit'  blue={true} />
          </Form.Item>
  </Form>
</Modal>

    </>
  )
}

export default AddExpense