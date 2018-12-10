import React from 'react';
import {Icon, Pagination, Popconfirm, Table} from 'antd';
import styles from "./list.css";

const List = ({
  onPageChange,
  onUpdateStatus,
  totalElement,
  ...listOpts
}) => {

  const columns = [{
    title: '头像',
    render: (text, record) => {
      return (
        <a href={record.headimg} target="_blank" rel="noopener noreferrer"><img src={record.headimg} alt={record.nickname} className={styles.avatarImg}/></a>
      )
    }
  }, {
    title: '姓名',
    // dataIndex: 'nickname'
    render: (record) => {
      return (
        <div>
          <p>{record.nickname}-{record.areaName?record.areaName:"未设置区域"}</p>
          <p>{record.tags}</p>
        </div>
      )
    }
  }, {
    title: '工作',
    render: (record) => {
      return (
        <div>
          <p>{record.workNames}</p>
          <p>{record.phone}</p>
        </div>
      )
    }
  }, {
    title: '次数',
    // dataIndex: 'createTime'
    render: (record) => {
      return (
          <div>
            <p>浏览：{record.readCount}</p>
            <p>更新：{record.updateCount}</p>
          </div>
      )
    }
  }, {
      title: '日期',
      // dataIndex: 'createTime'
      render: (record) => {
          return (
              <div>
                  <p>创建：{record.createTime}</p>
                  <p>更新：{record.updateTime}</p>
              </div>
          )
      }
  }, {
      title: "简历内容",
      dataIndex: 'remark'
  }, {
      title: '简历状态',
      render: (record) => {
          switch (record.status) {
              case "0": return <span>隐藏</span>; break;
              case "1": return <span className="blue">显示</span>; break;
              case "2": return <span className="blue">审核中</span>; break;
              case "3": return <span className="red">被驳回-{record.rejectReason}</span>; break;
          }
      }
  }, {
    title: "操作",
    render: (record) => {
      return (
      <div>
          {record.status=='2'?
          <div>
              <Popconfirm title={`确定通过[${record.name}]的简历审核吗？`} onConfirm={() => onUpdateStatus(record, "1", "通过")}>
                  <a href="###"><Icon type="check"/> 通过</a>
              </Popconfirm>
              &nbsp;&nbsp;
              <a href="###" onClick={() => onUpdateStatus(record, "3")}><Icon type="stop"/> 驳回</a>
          </div>
          :"-"}
      </div>
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
