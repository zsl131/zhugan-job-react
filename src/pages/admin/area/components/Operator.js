import React from 'react';
import { Button, Popconfirm } from 'antd';

const Operator = ({
  onInit,
}) => {
  return(
    <div className="listOperator"><Popconfirm title="确定初始化区域吗？此操作需要花费几分钟" placement="right" onConfirm={onInit}><Button type="primary" icon="reload" >初始化区域</Button></Popconfirm></div>
  );
}

export default Operator;
