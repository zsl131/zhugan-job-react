import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {

  state= {
    item: {}
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const item = this.props.item;
    setFieldsValue(item);
    this.setState({item: item})
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
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator("countyCode")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="区域">
            <span>{this.state.item.provinceName}{this.state.item.cityName}{this.state.item.countyName}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="管理员姓名">
            {getFieldDecorator('adminName', {rules: [{required: true, message: '管理员姓名不能为空'}]})(<Input placeholder="输入管理员姓名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="管理员电话">
            {getFieldDecorator('adminPhone', {rules: [{required: true, message: '管理员电话不能为空'}]})(<Input placeholder="输入管理员电话" maxLength="11" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
