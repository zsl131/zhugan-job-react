import React from 'react';
import {Pagination, Table, Menu, Dropdown, Icon, Popconfirm, Popover} from 'antd';
import styles from "./list.css";

const List = ({
  onPageChange,
  onUpdateStatus,
  totalElement,
  ...listOpts
}) => {

  const columns = [{
    title: '姓名',
    // dataIndex: "name"
    render: (record) => {
        return <div>{record.name}({record.sex === '1'?"男":"女"})</div>
    }
    /*render: (text, record) => {
      return (
        <a href={record.headimg} target="_blank" rel="noopener noreferrer"><img src={record.headimg} alt={record.nickname} className={styles.avatarImg}/></a>
      )
    }*/
  }, {
    title: '信息',
    // dataIndex: 'nickname'
    render: (record) => {
        return <div>
            <p>{record.identity}</p>
            <p>{record.address}</p>
        </div>
    }
  }, {
    title: '身份证正面',
    render: (record) => {
        return (
            <Popover trigger="hover" content={<img src={record.frontPic} alt={record.name} />} title={`${record.name}的身份证正面`}>
            <a href={record.frontPic} target="_blank" rel="noopener noreferrer"><img src={record.frontPic} alt={record.name} className={styles.avatarImg}/></a>
            </Popover>
        )
    }
  }, {
      title: '身份证背面',
      render: (record) => {
          return (
              <Popover trigger="hover" content={<img src={record.backPic} alt={record.name} />} title={`${record.name}的身份证背面`}>
              <a href={record.backPic} target="_blank" rel="noopener noreferrer"><img src={record.backPic} alt={record.name} className={styles.avatarImg}/></a>
              </Popover>
          )
      }
  }, {
      title: '手持身份证',
      render: (record) => {
          return (
              <a href={record.handPic} target="_blank" rel="noopener noreferrer"><img src={record.handPic} alt={record.name} className={styles.avatarImg}/></a>
          )
      }
  }, {
    title: '状态',
    render: (record) => {
      switch (record.status) {
          case "0": return <span>待审核</span>
          case "1": return <span className="blue">审核通过</span>
          case "2": return <span className="red">审核驳回</span>
      }
    }
  }, {
    title: '提交日期',
    dataIndex: 'createTime'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
          record.status === '0' || record.status === '2'?
          <div>
            <Popconfirm title={`确定通过[${record.name}]的认证申请吗？`} onConfirm={() => onUpdateStatus(record, "1", "通过")}>
              <a href="###"><Icon type="check"/> 通过</a>
            </Popconfirm>
              &nbsp;&nbsp;
          <a href="###" onClick={() => onUpdateStatus(record, "2")}><Icon type="stop"/> 驳回</a>
          </div>:"-"
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
