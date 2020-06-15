const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'project name',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'author',
        message: 'author name',
      },
      {
        type: 'input',
        name: 'email',
        message: 'your email',
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
  }
}