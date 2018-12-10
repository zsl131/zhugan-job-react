import React from 'react';
import {Form, Icon, Input, Modal} from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {

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
          <FormItem {...formItemLayout} label="驳回原因">
            {getFieldDecorator('rejectReason', {rules: [{required: true, message: '驳回原因不能为空'}]})(<Input placeholder="输入驳回原因" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
