import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const Production = ({
  production,
  location,
  dispatch,
  loading
}) => {
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
      dispatch({ type: 'production/modifyState', payload: {addVisible: true}});
    }
  }

  const listOpts = {
    dataSource: production.data,
    loading: loading.models.production,
    location,
    totalElement: production.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'production/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      dispatch({type: 'production/loadOne', payload: id});
    }
  }

  const addOpts = {
    maskClosable: false,
    visible: production.addVisible,
    title: "添加产品",
    confirmLoading: loading.effects['production/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'production/addOrUpdate', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'production/modifyState', payload: { addVisible: false } });
    }
  }
  const updateOpts = {
    maskClosable: false,
    visible: production.updateVisible,
    title: `修改产品[${production.item.name}]`,
    item: production.item,
    confirmLoading: loading.effects['production/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'production/addOrUpdate', payload: datas }).then(() => {
          dispatch({ type: 'production/modifyState', payload: { updateVisible: false } });handleRefresh();});
    },
    onCancel: () => {
      dispatch({ type: 'production/modifyState', payload: { updateVisible: false } });
    }
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 产品管理<b>（{production.totalElements}）</b><span className="headerRemark"></span></h3>
        {/*<div className="listOperator"><Button type="primary" icon="plus">添加用户</Button></div>*/}
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        {/*<Table dataSource={users.datas} columns={columns} loading={loading.models.users} rowKey="id"/>*/}
        <List {...listOpts} />
      </div>
      {production.addVisible && <AddModal {...addOpts}/>}
      {production.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ production, loading }) => ({ production, loading }))(Production);
