import React from 'react';
import {Icon, Pagination, Popconfirm, Popover, Table} from 'antd';
import styles from "./list.css";

const List = ({
  onPageChange,
  onUpdateStatus,
  totalElement,
  ...listOpts
}) => {

  const columns = [{
    title: '人员',
    // dataIndex: "bossName"
      render:(record) => {
        return (
            <div>
                <p>申请人：{record.personalName}-{record.personalPhone}</p>
                <p>法人：{record.bossName}</p>
            </div>
        )
      }
  }, {
    title: '信息',
    // dataIndex: 'nickname'
    render: (record) => {
        return <div>
            <p>单位名称：{record.companyName}</p>
            <p>信用代码：{record.companyNo}</p>
        </div>
    }
  }, {
      title: "地址",
      render:(record) => {
          return (
              <div>
                  <p>地址：{record.companyAddress}</p>
                  <p>申请日期：{record.createTime}</p>
              </div>
          )
      }
  }, {
    title: '法人身份证',
    render: (record) => {
        return (
            <Popover trigger="hover" content={<img src={record.frontPic} alt={record.bossName} />} title={`${record.bossName}的身份证正面`}>
            <a href={record.frontPic} target="_blank" rel="noopener noreferrer"><img src={record.frontPic} alt={record.bossName} className={styles.avatarImg}/></a>
            </Popover>
        )
    }
  }, {
      title: '营业执照',
      render: (record) => {
          return (
              <a href={record.licensePic} target="_blank" rel="noopener noreferrer"><img src={record.licensePic} alt={record.companyName} className={styles.avatarImg}/></a>
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
    title: '操作',
    render: (text, record) => {
      return (
          record.status === '0' || record.status === '2'?
          <div>
            <Popconfirm title={`确定通过[${record.companyName}]的认证申请吗？`} onConfirm={() => onUpdateStatus(record, "1", "通过")}>
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
