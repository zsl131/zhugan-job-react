import React from 'react';
import {Pagination, Table} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '名称',
    // dataIndex: 'name'
    render: (record) => {
        return (
            <span>{record.targetUser=="personal"?"个人":"单位"} - {record.name}</span>
        )
    }
  }, {
    title: '价值',
    // dataIndex: 'count'
    render: (record) => {
        return (
            <span>{record.type=="1"?"查看次数":"刷新次数"} - {record.worthCount} 次</span>
        )
    }
  }, {
      title: '现价/原价',
      render: (record) => {
          return (
              <span>{record.price} / {record.oriPrice}</span>
          )
      }
  }, {
      title: "限领/已领",
      render: (record) => {
          return (
              <span>{record.amountLimit == 0?"无限":record.amountLimit} / {record.buyCount}</span>
          )
      }
  }, {
      title: "状态",
      render:(record) => {
          return (
              record.status == "0"?<span className="red">停用</span>:<span className="blue">启用</span>
          )
      }
  }, {
      title: '备注',
      dataIndex: 'remark'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.text} {...delOpts}/>
      );
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
