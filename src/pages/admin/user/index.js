import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import RoleModal from './components/RoleModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';
import {Helmet} from 'react-helmet';

const User = ({ location, loading, user, dispatch }) => {

  const { query, pathname } = location;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    }));
  }

  const operatorOpts = {
    onAdd() {
      // console.log("UserIndex operator");
      dispatch({ type: 'user/showModal'});
    }
  }

  const listOpts = {
    dataSource: user.datas,
    loading: loading.models.user,
    location,
    totalElement: user.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'user/delete', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      // dispatch({ type: 'user/userList', payload: { page: page-1} });
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      dispatch({ type: 'user/update', payload: id });
    },
    onMatchRole: (id, nickname) => {
      // console.log(id, nickname);
      dispatch({ type: 'user/setModalVisible', payload: {curId: id, curNickname: nickname} });
      dispatch({ type: 'user/onMatchRole', payload: id });
    }
  }

  const modalOpts = {
    visible: user.modalVisible,
    title: "添加用户",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['user/saveUser'],
    onOk(datas) {
      dispatch({ type: 'user/saveUser', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'user/hideModal' });
    }
  }
  const updateOpts = {
    visible: user.updateModalVisible,
    title: `修改用户[${user.item.nickname}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: user.item,
    confirmLoading: loading.effects['user/saveUser'],
    onOk(datas) {
      dispatch({ type: 'user/hideUpdateModal' });
      dispatch({ type: 'user/saveUser', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'user/hideUpdateModal' });
    }
  }

  const roleOpts = {
    visible: user.roleVisible,
    title: `为【${user.curNickname}】分配角色`,
    okText: '确认保存',
    cancelText: '取消',
    authRoleIds: user.authRoleIds,
    roleList: user.roleList,
    confirmLoading: loading.effects['user/saveUser'],
    onOk() {
      dispatch({ type: 'user/setModalVisible', payload: { roleVisible: false } });
      // dispatch({ type: 'user/saveUser', payload: datas }).then(() => {handleRefresh()});
      dispatch({ type: 'user/setRoles', payload: { uid: user.curId, rids: user.selectRoleIds } });
    },
    onSetRole(rid) {
      // dispatch({ type: 'user/setRoles', payload: { uid: user.curId, rids: rid } });
      dispatch({ type: 'user/setModalVisible', payload: { selectRoleIds: rid } });
    },
    onCancel() {
      dispatch({ type: 'user/setModalVisible', payload: { roleVisible: false } });
    }
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  return (
    <div>
      <Helmet>
        <title>用户管理</title>
      </Helmet>
      <div className="listHeader">
        <h3><Icon type="bars"/> 用户管理<b>（{user.totalElements}）</b></h3>
        {/*<div className="listOperator"><Button type="primary" icon="plus">添加用户</Button></div>*/}
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        {/*<Table dataSource={user.datas} columns={columns} loading={loading.models.user} rowKey="id"/>*/}
        <List {...listOpts} />
      </div>
      {user.modalVisible && <AddModal {...modalOpts}/>}
      {user.updateModalVisible && <UpdateModal {...updateOpts}/>}
      {user.roleVisible && <RoleModal {...roleOpts}/>}
    </div>
  );
}

/*function mapStateToProps(state) {
  console.log("===", state);
  const { user } = state.user;
  console.log("=-=-=-=-", user);
  return {
    ...state,
    user: user,
    loading: state.loading.models.user,
  };
}*/

export default connect((({ user, loading }) => ({ user, loading })))(User);
