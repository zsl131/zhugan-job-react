import * as interceptorService from '../services/interceptorService';
import {getAppConfig, getWxConfig, setAppConfig, setWxConfig} from "../utils/InitSystemUtils";
import router from 'umi/router';

const APP_CONFIG_SESSION_NAME = "appConfig";
const WX_CONFIG_SESSION_NAME = "wxConfig";
export default {
  namespace: 'interceptor',
  state: {
    appConfig:[],
    wxConfig:[],
  },
  reducers: {
    'cacheAppConfig'(state, { payload: data }) {
      sessionStorage.setItem(APP_CONFIG_SESSION_NAME, JSON.stringify(data));
      return {...state, appConfig: data || []};
    },
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    reloadPage(state, {payload}) {
      window.location.reload();
      return {...state};
    }
  },
  effects: {
    *init({ payload }, { put, call }) {

      // const appConfig = sessionStorage.getItem(APP_CONFIG_SESSION_NAME);
      // const wxConfig = sessionStorage.getItem(WX_CONFIG_SESSION_NAME);
      const appConfig = getAppConfig();
      // console.log(appConfig)
      // console.log(appConfig === 'undefined')
      //const wxConfig= getWxConfig();
      // console.log(wxConfig, appConfig)
      if(appConfig == "undefined" || appConfig == null || appConfig == 'null' ) {
        const data = yield call(interceptorService.loadWebBaseConfig);
        // sessionStorage.setItem(APP_CONFIG_SESSION_NAME, JSON.stringify(data.datas.ac));
        // sessionStorage.setItem(WX_CONFIG_SESSION_NAME, JSON.stringify(data.datas.wc));
        const appConfig = data.appConfig;
        if(appConfig == null) {
            router.push("/init");
        } else {
          setAppConfig(JSON.stringify(data.appConfig));
        }
        //setWxConfig(JSON.stringify(data.wxConfig));
        yield put({type: 'modifyState', payload: {appConfig: data.appConfig, wxConfig: data.wxConfig}});
      }  else {
        yield put({type: 'modifyState', payload: {appConfig: JSON.parse(appConfig)}});
      }
    },
    *queryLoginAccount({ payload: code }, { call, put }) {
      const data = yield call(interceptorService.queryLoginAccount, { code: code });
      if(data) {
        yield sessionStorage.setItem("loginAccount", JSON.stringify(data.datas));
        yield put({type: 'reloadPage', payload:{}});
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return dispatch({ type: 'init'})
    }
  }
}
