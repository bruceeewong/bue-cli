const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'project name',
        default: this.appname,
      }
    ]).then(answers => {
      this.answers = answers
    })
  }

  writing() {
    // 先拷贝可见文件
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.answers
    )

    // 再拷贝隐藏文件
    const hideFiles = [
      '.editorconfig',
      '.env.development',
      '.env.staging',
      '.env.production',
      '.eslintignore',
      '.eslintrc.js',
      '.gitignore',
    ]
    hideFiles.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item)
      )
    })
    // const templates = [
    //   'build/index.js',

    //   'mock/modules/demo.js',
    //   'mock/modules/mockData.js',
    //   'mock/index.js',
    //   'mock/mock-server.js',

    //   'public/favicon.ico',
    //   'public/index.html',

    //   'src/api/base.js',
    //   'src/api/request.js',

    //   'src/assets/404_images/404_cloud.png',
    //   'src/assets/404_images/404.png',
    //   'src/assets/logo.png',

    //   'src/components/common/Breadcrum/index.vue',
    //   'src/components/common/ErrorLog/index.vue',
    //   'src/components/common/Hamburger/index.vue',
    //   'src/components/common/IconTip/index.vue',
    //   'src/components/common/SvgIcon/index.vue',
    //   'src/components/custom',

    //   'src/components/exceptions/error-handler.js',
    //   'src/components/exceptions/base-exception.js',
    //   'src/components/exceptions/network-exception.js',
    //   'src/components/exceptions/request-exception.js',
    //   'src/components/exceptions/validation-exception.js',
    // ]
  }
}