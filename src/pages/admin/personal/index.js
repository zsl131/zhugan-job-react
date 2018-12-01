import React from 'react';
import {connect} from 'dva';
import {Icon,message} from 'antd';
import { routerRedux } from 'dva/router'

import Filter from './components/Filter';
import List from './components/List';
import UploadModal from './components/UploadModal';
import PlayVideoModal from './components/PlayVideoModal';

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
    onUploadVideo:(record) => {
      dispatch({type: 'personal/modifyState', payload: {item: record, uploadVisible: true}});
    },
    handlePlayVideo:(record) => {
      dispatch({type: 'personal/modifyState', payload: {item: record, playVideoVisible: true}})
    },
  }

  const uploadOpts = {
    visible: personal.uploadVisible,
    item: personal.item,
    maskClosable: false,
    title: "上传视频资料",
    onCancel: () => {
      dispatch({type: 'personal/modifyState', payload: {uploadVisible: false}})
    },
    finishUpload: ()=> {
      dispatch({type: 'personal/modifyState', payload: {uploadVisible: false}});
      message.success("上传成功");
      handleRefresh();
    }
  }

  const playVideoOpts= {
      visible: personal.playVideoVisible,
      url: personal.item.videoUrl,
      maskClosable: false,
      title: "播放视频资料",
      onCancel: () => {
          dispatch({type: 'personal/modifyState', payload: {playVideoVisible: false}})
      },
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
      {personal.uploadVisible && <UploadModal {...uploadOpts}/>}
      {personal.playVideoVisible && <PlayVideoModal {...playVideoOpts}/>}
    </div>
  );
}

export default connect(({ loading, personal }) => ({ loading, personal }))(Personal);
