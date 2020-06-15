/**
 * 项目全局配置文件
 */
module.exports = {
  /**
   * 系统信息
   */
  title: '<%= name %>', // 页面 Title
  system: '<%= name %>', // 系统名称

  /**
   * 固定顶部导航栏
   * @type {boolean} true | false
   */
  fixedHeader: true,

  /**
   * 显示侧边栏LOGO
   * @type {boolean} true | false
   */
  sidebarLogo: true,

  /**
   * 是否需要在导航栏显示错误信息栈面板, 默认为生产环境
   * @type {string | array} 'production' | ['production', 'development']
   * 开发环境 ['production', 'development']
   * 生产环境 'production'
   */
  errorLog: ['production']
}
