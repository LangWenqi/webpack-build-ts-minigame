class BF {
  constructor(platform?: string) {
    this.platform = platform || 'wx';
  }
  platform = '';

  show() {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  }
}
if (typeof window !== 'undefined') {
  window.BF = BF;
}
// 引擎中打包后文件作为插件挂载在全局，使用 export default 后ts认为是正常js文件，提示未定义，需注释
// export default BF;
