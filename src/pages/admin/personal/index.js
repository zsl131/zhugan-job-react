import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import { routerRedux } from 'dva/router'

import Filter from './components/Filter';
import List from './components/List';

const Personal = ({
  personal,
  loading,
  location,
  dispatch
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

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  const listOpts = {
    dataSource: personal.data,
    loading: loading.models.personal,
    location,
    totalElement: personal.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdateType: (record, newType) => {
      dispatch({ type: 'personal/updateType', payload: { record: record, type: newType } }).then(()=>{handleRefresh()});
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 用户管理<b>（{personal.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
    </div>
  );
}

export default connect(({ loading, personal }) => ({ loading, personal }))(Personal);
