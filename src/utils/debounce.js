// 防抖
export function _debounce(fn, d) {
  var delay = d || 600;
  var timer;
  return function() {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
// 节流
export function _throttle(fn, d) {
  var last;
  var timer;
  var interval = d || 600;
  return function() {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(th, args);
      }, interval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  };
}
/*
 * 使用方法
 */

// import { _debounce } from "@u/debounce";
//  add:_debounce(function() {})     不丢this
