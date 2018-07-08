import { Imu, _ } from '@utils';

export default {
  effects: {
    * createRequestParams({ payload = {} }, { call, put, select }) {
      const model = yield select(({ user, theme, home }) => (
        {
          ...user, ...theme,
          market: home.market
        }
      ))

      const { userInfo: { userId, userToken } = {}, version, lang, market } = model
      let result = Imu.fromJS(payload)
      if (_.get(payload, 'head')) {
        result = result.setIn(['head', 'timestamps'], String(Date.now()))
          .setIn(['head', 'version'], String(version))
          .setIn(['head', 'lang'], String(lang))
          .setIn(['head', 'userId'], String(userId))
          .setIn(['head', 'userToken'], String(userToken))

      }
      if (_.get(payload, 'param')) {
        result = result.setIn(['param', 'market'], String(market))
      }
      return result.toJS()
    }
  },

  reducers: {
    changeState(state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
