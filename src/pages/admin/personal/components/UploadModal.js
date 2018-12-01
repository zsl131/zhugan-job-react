import React from 'react';
import {Form, Icon, Modal, Upload,Button} from 'antd';

const UploadModal = ({
 finishUpload,
  item,
  ...modalProps
}) => {

  const handleOk = (e) => {
    e.preventDefault();
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  }

  const handleChange = (file) => {
    if(file.file.status==='done') {
      finishUpload()
    } else if(file.file.status ==='removed' && file.file.response) {
    }
  }

  return(
    <Modal {...modalOpts}>
        {!item || item.checkPhone!='1' ? "用户未绑定手机号码不可以上传视频":
          <Upload
              action="/api/video/upload"
              data={{'id':item.id, "phone":item.phone}}
              onChange={handleChange}
              accept="video/*"
          >
              <div>
                  <Button type="primary">
                      <Icon type="plus" />
                      选择视频文件
                  </Button>
              </div>
          </Upload>
        }
    </Modal>
  );
}

export default Form.create()(UploadModal);
