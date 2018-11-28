import React from 'react';
import {Button, Form, Input,Select} from 'antd';

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
        {getFieldDecorator("companyName_like")(<Input placeholder="单位名称"/>)}
      </FormItem>
        <FormItem>
            {getFieldDecorator("companyNo_like")(<Input placeholder="信用代码"/>)}
        </FormItem>
        <FormItem>
            {getFieldDecorator("bossName_like")(<Input placeholder="法人姓名"/>)}
        </FormItem>
        <FormItem>
            {getFieldDecorator("status")(
                <Select placeholder="状态" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="0">待审核</Option>
                    <Option key="1">通过</Option>
                    <Option key="2">驳回</Option>
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
