import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const DataEdu = ({
  dataEdu,
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
      dispatch({ type: 'dataEdu/modifyState', payload: {addVisible: true}});
    }
  }

  const listOpts = {
    dataSource: dataEdu.data,
    loading: loading.models.dataEdu,
    location,
    totalElement: dataEdu.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'dataEdu/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      dispatch({type: 'dataEdu/loadOne', payload: id});
    }
  }

  const addOpts = {
    visible: dataEdu.addVisible,
    title: "添加学历",
    confirmLoading: loading.effects['dataEdu/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'dataEdu/addOrUpdate', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'dataEdu/modifyState', payload: { addVisible: false } });
    }
  }
  const updateOpts = {
    visible: dataEdu.updateVisible,
    title: `修改学历[${dataEdu.item.name}]`,
    item: dataEdu.item,
    confirmLoading: loading.effects['dataEdu/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'dataEdu/addOrUpdate', payload: datas }).then(() => {
          dispatch({ type: 'dataEdu/modifyState', payload: { updateVisible: false } });handleRefresh();});
    },
    onCancel: () => {
      dispatch({ type: 'dataEdu/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 学历管理<b>（{dataEdu.totalElements}）</b></h3>
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
      {dataEdu.addVisible && <AddModal {...addOpts}/>}
      {dataEdu.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ dataEdu, loading }) => ({ dataEdu, loading }))(DataEdu);
