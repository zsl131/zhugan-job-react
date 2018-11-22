import * as objectService from '../services/objectService';

export default {
  namespace: 'adminIndex',
  state : {
    noConfigTemplateMessage:[],
    noConfigScore:[]
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *findNoConfigTemplateMessage({payload: query}, {call,put}) {
      const data = yield call(objectService.findNoConfigTemplateMessage, query);
      console.log(data)
      if(data) {
        yield put({type: "modifyState", payload: {noConfigTemplateMessage: data.templateMessage, noConfigScore: data.score}});
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        if(location.pathname === "/admin/index") {
          //dispatch({type: "findNoConfigTemplateMessage", payload: location.query});
        }
      })
    }
  }
}
