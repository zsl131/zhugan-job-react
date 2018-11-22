import React from 'react';
import {Button, Menu, Pagination, Popconfirm, Table} from 'antd';
import styles from "./list.css";

const List = ({
  onPageChange,
  onUpdateType,
  onSynch,
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
          <p>{record.nickname}</p>
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
          <p>{record.hasPic==='0'?<span className="red">无图片</span>:<Button icon="eye" onClick={()=>{}}>图片</Button>}</p>
          <p>{record.hasVideo==='0'?<span className="red">无视频</span>:<Button icon="play-circle" onClick={()=>{}}>视频</Button>}</p>
      </div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <Popconfirm title={`确定将[${record.nickname}]与微信端同步吗？`} onConfirm={() => handleSynch(record)} cancelText="取消" okText="确定">
          {/*<a href="###"><Icon type="reload"/> 同步</a>*/}
        </Popconfirm>
      );
    }
  }];

  const handleSynch = (record) => {
    onSynch(record);
  }

  const confirmOpts = {
    okText: '确定设置',
    cancelText: '取消',
    placement: 'bottom'
  }

  const menu = (record) => {
    const type = record.type;
    const nickname = record.nickname;
    return (
      <Menu key="key">
        {type === '0'?'':
          <Menu.Item key="0">
            <Popconfirm title={`确定设置[${nickname}]为：游客 吗？`}
                        onConfirm={() => handleSetType(record, "0")} {...confirmOpts}>设置为：游客</Popconfirm>
          </Menu.Item>
        }
        {type === '1'?'':
          <Menu.Item key="1">
            <Popconfirm title={`确定设置[${nickname}]为：学生 吗？`}
                        onConfirm={() => handleSetType(record, "1")} {...confirmOpts}>设置为：学生</Popconfirm>
          </Menu.Item>
        }
        {type === '2' ? '' :
          <Menu.Item key="2">
            <Popconfirm title={`确定设置[${nickname}]为：学生家长 吗？`}
                        onConfirm={() => handleSetType(record, "2")} {...confirmOpts}>设置为：学生家长</Popconfirm>
          </Menu.Item>
        }
        {type === '5' ? '' :
          <Menu.Item key="5">
            <Popconfirm title={`确定设置[${nickname}]为：公司员工 吗？`}
                        onConfirm={() => handleSetType(record, "5")} {...confirmOpts}>设置为：公司员工</Popconfirm>
          </Menu.Item>
        }
        {type === '10' ? '' :
          <Menu.Item key="10">
            <Popconfirm title={`确定设置[${nickname}]为：管理员 吗？`}
                        onConfirm={() => handleSetType(record, "10")} {...confirmOpts}>设置为：管理员</Popconfirm>
          </Menu.Item>
        }
      </Menu>
    );
  }

  const handleSetType = (record, newType) => {
    onUpdateType(record, newType);
  }

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
