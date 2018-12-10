import React from 'react';
import {connect} from 'dva';
import {Icon,message} from 'antd';
import { routerRedux } from 'dva/router'

import Filter from './components/Filter';
import List from './components/List';
import Reject from './components/Reject';

const Resume = ({
  resume,
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
    dataSource: resume.data,
    loading: loading.models.resume,
    location,
    totalElement: resume.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdateStatus: (record, status, reason) => {
        if(status==='1') {
            dispatch({
                type: 'resume/updateStatus',
                payload: {id: record.id, status: status, reason: reason}
            }).then(() => {
                handleRefresh()
            });
        } else {
            dispatch({type: "resume/modifyState", payload: {item:record, rejectVisible: true}})
        }
        //console.log(record, status);
    }
  }

    const rejectOpts = {
        visible: resume.rejectVisible,
        item: resume.item,
        onCancel: () => {dispatch({type: 'resume/modifyState', payload: {rejectVisible: false}})},
        title: `驳回[${resume.item.name}]的简历`,
        onOk: (values) => {
            dispatch({type: "resume/updateStatus", payload: {id: resume.item.id, status: '3', reason: values.rejectReason}}).then(()=> {
                dispatch({type: "resume/modifyState", payload: {rejectVisible: false}})
                handleRefresh()
            });
        }
    }


  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 简历管理<b>（{resume.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {resume.rejectVisible && <Reject {...rejectOpts}/>}
    </div>
  );
}

export default connect(({ loading, resume }) => ({ loading, resume }))(Resume);
