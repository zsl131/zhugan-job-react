import React from 'react';
import {Form, Input, Modal,Radio,InputNumber} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
export default class UpdateModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    }

    return(
      <Modal {...this.props} onOk={handleOk} style={{ top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
            <FormItem {...formItemLayout} label="产品名称">
                {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入产品名称"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="适用对象">
                {getFieldDecorator('targetUser', {rules: [{required: true, message: '请选择适用对象'}]})(
                    <RadioGroup>
                        <Radio value="personal">个人</Radio>
                        <Radio value="company">单位</Radio>
                    </RadioGroup>
                )}
            </FormItem>

            <FormItem {...formItemLayout} label="产品类型">
                {getFieldDecorator('type', {rules: [{required: true, message: '请选择产品类型'}]})(
                    <RadioGroup>
                        <Radio value="1">查看次数</Radio>
                        <Radio value="2">刷新次数</Radio>
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="价值次数">
                {getFieldDecorator('worthCount', {rules: [{required: true, message: '请输入购买本产品可使用的次数'}]})(<InputNumber placeholder="价值次数" min={1}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="原价">
                {getFieldDecorator('oriPrice', {rules: [{required: true, message: '请输入本产品的原价'}]})(<InputNumber placeholder="输入原价" min={1}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="现价">
                {getFieldDecorator('price', {rules: [{required: true, message: '请输入本产品的现价'}]})(<InputNumber placeholder="输入现价" min={0}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="可购次数">
                {getFieldDecorator('amountLimit', {rules: [{required: true, message: '每人可购买次数，0表示无限'}]})(<InputNumber placeholder="可购次数" min={0}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="产品状态">
                {getFieldDecorator('status', {rules: [{required: true, message: '请选择产品状态'}]})(
                    <RadioGroup>
                        <Radio value="0">不可使用</Radio>
                        <Radio value="1">开启使用</Radio>
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
                {getFieldDecorator('remark', {rules: [{required: true, message: '备注不能为空'}]})(<Input placeholder="输入产品备注"/>)}
            </FormItem>
        </Form>
      </Modal>
    );
  }
}
