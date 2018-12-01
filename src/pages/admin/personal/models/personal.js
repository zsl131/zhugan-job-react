import * as accountService from '../services/objectService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item: {},
    uploadVisible: false,
    playVideoVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      const data = yield call(accountService.list, query);
      yield put({ type: 'modifyState', payload: { data: data.data, totalElements: data.size } });
    },
    *updateType ({ payload: obj }, { call, put }) {
      const record = obj.record; const type = obj.type;
      const data = yield call(accountService.updateType, {id: record.id, type: type});
      // yield put({ type: 'updateTypePage', payload: obj });
      if(data) {message.success(data.message);}
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(( location ) => {
        if(location.pathname === "/admin/personal") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
