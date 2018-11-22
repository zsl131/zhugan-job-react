import React from 'react';
import {Pagination, Table, Button} from 'antd';

const List = ({
  onSetAdmin,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const columns = [{
    title: '省',
    dataIndex: 'provinceName'
  }, {
      title: '市',
      dataIndex: 'cityName'
  }, {
      title: '县',
      dataIndex: 'countyName'
  }, {
      title: '状态',
      render: (record) => {
        return record.status=='1'?<span className="red">已开通</span>:<span>未开通</span>
      }
  }, {
    title: "管理员",
    render: (record) => {
      return (<span>{record.adminName}-{record.adminPhone}</span>)
    }
  }, {
    title: '操作',
    render: (record) => {
      return (
        <Button icon="setting" type="primary" onClick={()=>onSetAdmin(record.id)}> 设置管理员</Button>
      )
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default List;
