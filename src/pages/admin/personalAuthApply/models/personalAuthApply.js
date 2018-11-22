import * as accountService from '../services/objectService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item: {},
    rejectVisible: false,
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
    *updateStatus ({ payload: obj }, { call }) {
      const data = yield call(accountService.verify, obj);
      // yield put({ type: 'updateTypePage', payload: obj });
      if(data) {message.success(data.message);}
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(( location ) => {
        if(location.pathname === "/admin/personalAuthApply") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
