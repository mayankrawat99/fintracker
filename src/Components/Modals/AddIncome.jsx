import React from 'react'
import { Form, Modal ,Input,DatePicker,Select,Typography,} from "antd";

import Button from '../Button/Button';

import { useForm } from 'antd/es/form/Form';
import './style.css'
function AddIncome({isIncomeModalVisible,cancelIncomeModal , onFinish}) { 
  const [form] =Form.useForm();

  return (
   <>
   <Modal
  title={<div style={{ marginBottom: '16px', fontSize: '1.15rem' }}>Add Income</div>}
  open={isIncomeModalVisible}
  footer={null}
  onCancel={cancelIncomeModal}
>
  <Form layout="vertical" form={form} onFinish={(values)=>{
    onFinish(values,"Income")
    form.resetFields()}}>
    <Form.Item
      label="Source"
      name="name"
      rules={[{ required: true, message: "Please input the income source!" }]}
    >
      <Input placeholder="Enter Income Source" type="text" className="custom-input" />
    </Form.Item>

    <Form.Item
      label="Amount"
      name="amount"
      rules={[{ required: true, message: "Please input the income amount!" }]}
    >
      <Input type="number" className="custom-input" placeholder="Enter Amount (in ₹)" />
    </Form.Item>

    <Form.Item
      label="Date"
      name="date"
      rules={[{ required: true, message: "Please select the income date!" }]}
    >
      <DatePicker placeholder="Select Date" className="custom-input" format="YYYY-MM-DD" />
    </Form.Item>

    <Form.Item
      label="Tag"
      name="tag"
      rules={[{ required: true, message: "Please select the income type!" }]}
    >
      <Select placeholder="Select Income Type" className="custom-select">
        <Select.Option value="Salary">Salary</Select.Option>
        <Select.Option value="Freelance">Freelance</Select.Option>
        <Select.Option value="Investment">Investment</Select.Option>
        <Select.Option value="Gift">Gift</Select.Option>
        <Select.Option value="Other">Other</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item >
            <Button  text="Add Income" type='submit'   blue={true} />
          </Form.Item>
  </Form>
  
</Modal>
</>
  )
}

export default AddIncome