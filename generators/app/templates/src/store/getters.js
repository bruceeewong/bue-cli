const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  errorLogs: state => state.errorLog.logs
}
export default getters
