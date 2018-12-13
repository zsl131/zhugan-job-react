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
    *addOrUpdate({ payload: obj }, { call, put }) {
      const data = yield call(objectService.addOrUpdate, obj);
      if(data) {
        yield put({ type: 'modifyState', payload: { addVisible: false } });
      }
    },
    *deleteObj({ payload: id }, { call, put }) {
      const data = yield call(objectService.deleteObj, {id});
      if(data) {message.success(data.message);}
    },
    *loadOne({payload: id}, {call, put}) {
      const data = yield call(objectService.loadOne, {id});
      // console.log(data)
      yield put({ type: 'modifyState', payload: { item: data.obj, updateVisible: true } });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/production') {
          dispatch({ type: 'index', payload: location.query });
        }
      })
    }
  }
}
