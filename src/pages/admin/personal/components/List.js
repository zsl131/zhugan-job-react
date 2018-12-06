import React from 'react';
import {Button, Menu, Pagination, Popconfirm, Table, Tooltip} from 'antd';
import styles from "./list.css";

const List = ({
  onPageChange,
  onUploadVideo,
  handlePlayVideo,
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
    title: '昵称',
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
    title: '用户类型',
    render: (record) => {
      switch (record.type) {
        case "0": return <span>未识别</span>; break;
        case "1": return <span className="blue">个人用户</span>; break;
        case "2": return <span className="red">用人单位</span>; break;
        case "10": return <span>管理员</span>; break;
      }
    }
  }, {
    title: '个人身份',
    render: (text, record) => {
      switch (record.checkIdcard) {
        case "0": return <span>未认证</span>
        case "2": return <span className="blue">审核中</span>
        case "3": return <span className="red">被驳回<p>{record.reason}</p></span>
        case "1": return <div><p>{record.name}[{record.sex==='1'?"男":"女"}]-{record.identity}</p><p>{record.address}</p></div>
      }
    }
  }, {
    title: '工作状态',
    render: (record) => {
      return (
        <div>
          <p>{record.workStatus==='0'?"未设置":(record.workStatus==='1'?<span className="blue">工作中</span>:<span className="red">待业</span>)}</p>
          <p>{record.checkPhone==='0'?"未设置":record.phone}</p>
        </div>
      )
    }
  }, {
    title: '入驻日期',
    dataIndex: 'createTime'
  }, {
    title: "资料",
    render: (record) => {
      return (
      <div>
          {/*<p>{record.hasPic==='0'?<span className="red">无图片</span>:<Button icon="eye" onClick={()=>{}}>图片</Button>}</p>*/}
          <Tooltip placement="top" title="上传视频"><Button icon="upload" onClick={()=>{onUploadVideo(record)}} shape="circle"/></Tooltip>&nbsp;&nbsp;
          {record.hasVideo==='1' && <Tooltip  placement="top" title="播放视频"><Button type="primary" icon="play-circle" onClick={()=>handlePlayVideo(record)} shape="circle"/></Tooltip>}
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
