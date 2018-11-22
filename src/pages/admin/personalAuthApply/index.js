import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import { routerRedux } from 'dva/router'

import Filter from './components/Filter';
import List from './components/List';
import Reject from './components/Reject';

const PersonalAuthApply = ({
  personalAuthApply,
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
    dataSource: personalAuthApply.data,
    loading: loading.models.personalAuthApply,
    location,
    totalElement: personalAuthApply.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdateStatus: (record, status, reason) => {
      if(status==='1') {
          dispatch({
              type: 'personalAuthApply/updateStatus',
              payload: {id: record.id, status: status, reason: reason}
          }).then(() => {
              handleRefresh()
          });
      } else {
        dispatch({type: "personalAuthApply/modifyState", payload: {item:record, rejectVisible: true}})
      }
      //console.log(record, status);
    }
  }

  const rejectOpts = {
    visible: personalAuthApply.rejectVisible,
    item: personalAuthApply.item,
    onCancel: () => {dispatch({type: 'personalAuthApply/modifyState', payload: {rejectVisible: false}})},
    title: `驳回[${personalAuthApply.item.name}]的认证申请`,
    onOk: (values) => {
      dispatch({type: "personalAuthApply/updateStatus", payload: {id: personalAuthApply.item.id, status: '2', reason: values.reason}}).then(()=> {
        dispatch({type: "personalAuthApply/modifyState", payload: {rejectVisible: false}})
        handleRefresh()
      });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 个人身份认证管理<b>（{personalAuthApply.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
        {personalAuthApply.rejectVisible && <Reject {...rejectOpts}/>}
    </div>
  );
}

export default connect(({ loading, personalAuthApply }) => ({ loading, personalAuthApply }))(PersonalAuthApply);
