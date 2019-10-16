/**
 * cookie封装
 * name 名称
 * value 值
 *  days  天
 */

/* eslint-disable */
export default {
  set: function (name, value, days) {
    var d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    // 转码解码解决safari问题
    value = encodeURIComponent(value)
    window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  },
  get: function (key) {
    var arr1 = document.cookie.split('; '); //将cookie按“; ”分割，数组元素为： cookie名=cookie值
    for (var i=0; i<arr1.length; i++) {  //分割数组里的每个元素
        var arr2 = arr1[i].split('='); //按照“=”分割
        if ( arr2[0] == key ) { //如果数组的第一个元素等于给定的cookie名称
          // 转码解码解决safari问题
            return decodeURIComponent(arr2[1]);  //返回翻译编码后的cookie值
        }
    }
  },
  delete: function (name) {
    this.set(name, '', -1)
  }
}
 /* eslint-disable */