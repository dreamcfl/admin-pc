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
    window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  },
  get: function (name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null
  },
  delete: function (name) {
    this.set(name, '', -1)
  }
}
 /* eslint-disable */