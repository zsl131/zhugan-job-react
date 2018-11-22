import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'

import SettingModal from './components/SettingModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const Area = ({
  area,
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
    onInit() {
      // console.log("UserIndex operator");
      dispatch({ type: 'area/initArea', payload: {}}).then(()=>{handleRefresh()});
    }
  }

  const listOpts = {
    dataSource: area.data,
    loading: loading.models.area,
    location,
    totalElement: area.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'area/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onSetAdmin: (id) => {
      dispatch({type: 'area/loadOne', payload: id});
    }
  }

  const settingOpts = {
    visible: area.settingVisible,
    title: `设置管理员[${area.item.countyName}]`,
    item: area.item,
    confirmLoading: loading.effects['area/update'],
    onOk(datas) {
      dispatch({ type: 'area/update', payload: datas }).then(() => { handleRefresh();});
    },
    onCancel: () => {
      dispatch({ type: 'area/modifyState', payload: { settingVisible: false } });
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
        <h3><Icon type="bars"/> 区域管理<b>（{area.totalElements}）</b><span className="headerRemark"></span></h3>
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
      {area.settingVisible && <SettingModal {...settingOpts}/>}
    </div>
  );
}

export default connect(({ area, loading }) => ({ area, loading }))(Area);
