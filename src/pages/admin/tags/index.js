import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const Tags = ({
  tags,
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
      dispatch({ type: 'tags/modifyState', payload: {addVisible: true}});
    }
  }

  const listOpts = {
    dataSource: tags.data,
    loading: loading.models.tags,
    location,
    totalElement: tags.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'tags/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      dispatch({type: 'tags/loadOne', payload: id});
    }
  }

  const addOpts = {
    visible: tags.addVisible,
    title: "添加标签",
    confirmLoading: loading.effects['tags/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'tags/addOrUpdate', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'tags/modifyState', payload: { addVisible: false } });
    }
  }
  const updateOpts = {
    visible: tags.updateVisible,
    title: `修改标签[${tags.item.text}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: tags.item,
    confirmLoading: loading.effects['tags/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'tags/addOrUpdate', payload: datas }).then(() => {
          dispatch({ type: 'tags/modifyState', payload: { updateVisible: false } });handleRefresh();});
    },
    onCancel: () => {
      dispatch({ type: 'tags/modifyState', payload: { updateVisible: false } });
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
        <h3><Icon type="bars"/> 标签管理<b>（{tags.totalElements}）</b><span className="headerRemark">用于求职人员设置自己的标签</span></h3>
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
      {tags.addVisible && <AddModal {...addOpts}/>}
      {tags.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ tags, loading }) => ({ tags, loading }))(Tags);
