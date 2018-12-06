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
        {getFieldDecorator("name_like")(<Input placeholder="姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("phone_like")(<Input placeholder="电话"/>)}
      </FormItem>
    <FormItem>
        {getFieldDecorator("areaName_like")(<Input placeholder="区域"/>)}
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
            {getFieldDecorator("checkPhone")(
                <Select placeholder="手机认证" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="1">已认证</Option>
                    <Option key="0">未认证</Option>
                </Select>
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator("checkIdcard")(
                <Select placeholder="身份认证" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="0">未认证</Option>
                    <Option key="1">已认证</Option>
                    <Option key="2">审核中</Option>
                    <Option key="3">被驳回</Option>
                </Select>
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator("checkCompany")(
                <Select placeholder="企业认证" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="0">未认证</Option>
                    <Option key="1">已认证</Option>
                    <Option key="2">审核中</Option>
                    <Option key="3">被驳回</Option>
                </Select>
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator("hasPic")(
                <Select placeholder="有无图片" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="0">无图片</Option>
                    <Option key="1">有图片</Option>
                </Select>
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator("hasVideo")(
                <Select placeholder="有无视频" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="0">无视频</Option>
                    <Option key="1">有视频</Option>
                </Select>
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator("type")(
                <Select placeholder="用户类型" style={{ width: '100px' }}>
                    <Option key="*">=全部=</Option>
                    <Option key="0">未识别</Option>
                    <Option key="1">个人</Option>
                    <Option key="2">企业</Option>
                    <Option key="10">管理员</Option>
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
