import { query } from "@services/example";

export default {
  namespace: 'home',
  state: {
    name: 'home'
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'fetch'
      })
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const res = yield call(query)
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
