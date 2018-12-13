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
        {getFieldDecorator("name_like")(<Input placeholder="名称"/>)}
      </FormItem>

        <FormItem>
            {getFieldDecorator("targetUser")(
                <Select placeholder="适用对象" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="personal">个人</Option>
                    <Option key="company">单位</Option>
                </Select>
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator("type")(
                <Select placeholder="类型" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="1">查看次数</Option>
                    <Option key="2">刷新次数</Option>
                </Select>
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator("status")(
                <Select placeholder="状态" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="1">启用</Option>
                    <Option key="0">停用</Option>
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
