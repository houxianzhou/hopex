export default {
  reducers: {
    changeState(state, { payload }) {
      return { ...state, ...payload };
    },
  }
}
