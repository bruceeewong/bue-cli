import defaultSettings from '@/settings'
import has from '@/utils/has'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings,
  fixedHeader,
  sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (has(state, key)) {
      // eslint-disable-next-line no-param-reassign
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

