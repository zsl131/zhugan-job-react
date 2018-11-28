import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import { routerRedux } from 'dva/router'

import Filter from './components/Filter';
import List from './components/List';
import Reject from './components/Reject';

const CompanyAuthApply = ({
  companyAuthApply,
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
    dataSource: companyAuthApply.data,
    loading: loading.models.companyAuthApply,
    location,
    totalElement: companyAuthApply.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdateStatus: (record, status, reason) => {
      if(status==='1') {
          dispatch({
              type: 'companyAuthApply/updateStatus',
              payload: {id: record.id, status: status, reason: reason}
          }).then(() => {
              handleRefresh()
          });
      } else {
        dispatch({type: "companyAuthApply/modifyState", payload: {item:record, rejectVisible: true}})
      }
      //console.log(record, status);
    }
  }

  const rejectOpts = {
    visible: companyAuthApply.rejectVisible,
    item: companyAuthApply.item,
    onCancel: () => {dispatch({type: 'companyAuthApply/modifyState', payload: {rejectVisible: false}})},
    title: `驳回[${companyAuthApply.item.companyName}]的认证申请`,
    onOk: (values) => {
      dispatch({type: "companyAuthApply/updateStatus", payload: {id: companyAuthApply.item.id, status: '2', reason: values.reason}}).then(()=> {
        dispatch({type: "companyAuthApply/modifyState", payload: {rejectVisible: false}})
        handleRefresh()
      });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 个人身份认证管理<b>（{companyAuthApply.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
        {companyAuthApply.rejectVisible && <Reject {...rejectOpts}/>}
    </div>
  );
}

export default connect(({ loading, companyAuthApply }) => ({ loading, companyAuthApply }))(CompanyAuthApply);
