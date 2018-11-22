import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const WorkType = ({
  workType,
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
      dispatch({ type: 'workType/modifyState', payload: {addVisible: true}});
    }
  }

  const listOpts = {
    dataSource: workType.data,
    loading: loading.models.workType,
    location,
    totalElement: workType.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'workType/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      dispatch({type: 'workType/loadOne', payload: id});
    }
  }

  const addOpts = {
    visible: workType.addVisible,
    title: "添加标签",
    confirmLoading: loading.effects['workType/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'workType/addOrUpdate', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'workType/modifyState', payload: { addVisible: false } });
    }
  }
  const updateOpts = {
    visible: workType.updateVisible,
    title: `修改岗位[${workType.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: workType.item,
    confirmLoading: loading.effects['workType/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'workType/addOrUpdate', payload: datas }).then(() => {
          dispatch({ type: 'workType/modifyState', payload: { updateVisible: false } });handleRefresh();});
    },
    onCancel: () => {
      dispatch({ type: 'workType/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 工作岗位管理<b>（{workType.totalElements}）</b><span className="headerRemark"></span></h3>
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
      {workType.addVisible && <AddModal {...addOpts}/>}
      {workType.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ workType, loading }) => ({ workType, loading }))(WorkType);
