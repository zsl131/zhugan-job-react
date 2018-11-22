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

  const handleSynch = (record) => {
    onSynch(record);
  }

  const dropdownCon = (record) => {
    const menus = menu(record);
    return (
      <Dropdown overlay={menus}>
        <a className="ant-dropdown-link" href="###">
          {typeStr(record.type)}
           <Icon type="down" />
        </a>
      </Dropdown>
    );
  }

  const typeStr = (type) => {
    switch(type) {
      case "1" : return "学生"; break;
      case "2" : return "学生家长"; break;
      case "5" : return "公司员工"; break;
      case "10" : return "管理员"; break;
      default: return "游客";
    }
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
