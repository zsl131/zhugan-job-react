import React from 'react';
import {Button, Form, Input, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Filter = ({
  onFilter,
  form: {
    getFieldDecorator,
    validateFields,
  }
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((errors, values) => {
      // console.log("filter", errors, values);
      onFilter(values);
    });
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("provinceName_like")(<Input placeholder="省份"/>)}
      </FormItem>
    <FormItem>
        {getFieldDecorator("cityName_like")(<Input placeholder="市"/>)}
    </FormItem>
    <FormItem>
        {getFieldDecorator("countyName_like")(<Input placeholder="县"/>)}
    </FormItem>
    <FormItem>
        {getFieldDecorator("adminName_like")(<Input placeholder="姓名"/>)}
    </FormItem>
    <FormItem>
        {getFieldDecorator("adminPhone_like")(<Input placeholder="手机号码"/>)}
    </FormItem>
    <FormItem>
        {getFieldDecorator("status")(
            <Select placeholder="状态" style={{ width: '100px' }}>
                <Option key="*">=全部=</Option>
                <Option key="1">开通</Option>
                <Option key="0">未开通</Option>
            </Select>
        )}
    </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);
