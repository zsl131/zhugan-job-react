import * as objectService from '../services/objectService';
import { message } from 'antd';
import * as menuService from "../../menu/services/menuService";

export default {
  state: {
    data:[],
    item:{},
    totalElements:0,
    addVisible: false,
    updateVisible: false,
    settingVisible: false,
  },
  reducers: {
    'modifyState'(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      // console.log("listObj:::", query);
      const data = yield call(objectService.list, query);
      yield put({ type:'modifyState', payload: {data: data.data, totalElements: data.size} });
    },
    *update({ payload: obj }, { call, put }) {
      const data = yield call(objectService.update, obj);
      if(data) {
        message.success(data.message);
        yield put({ type: 'modifyState', payload: { settingVisible: false } });
      }
    },
    *initArea({payload:id}, {call}) {
      const data = yield call(objectService.init,{});
      message.success(data.message);
    },
    *loadOne({payload: id}, {call, put}) {
      const data = yield call(objectService.loadOne, {id});
      yield put({ type: 'modifyState', payload: { item: data.obj, settingVisible: true } });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/area') {
          dispatch({ type: 'index', payload: location.query });
        }
      })
    }
  }
}
