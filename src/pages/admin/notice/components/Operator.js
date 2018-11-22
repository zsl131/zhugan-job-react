import React from 'react';
import { Button } from 'antd';

const Operator = ({
  onAdd,
  onCategory,
  msg
}) => {
  return(
    <div className="listOperator">
      <Button type="primary" icon="setting" onClick={onCategory}>分类管理</Button>&nbsp;&nbsp;
      <Button type="primary" icon="plus" onClick={onAdd}>{msg?msg:'添加数据'}</Button>
    </div>
  );
}

export default Operator;
