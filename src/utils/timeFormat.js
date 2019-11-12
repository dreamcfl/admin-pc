export default {
  // 格式：2019-01-20 12:34:24
  // 引入 import timeFormat from "@u/timeFormat";
  // 例子  window.console.log(timeFormat.formatTime("2019-07-16T09:27:43.000+0000"));
  // 例子  window.console.log(timeFormat.formatTime(标准时间"));
  formatTime: function(data) {
    if (!data) {
      return "";
    }
    var newTime = new Date(+new Date(data) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
    return newTime;
  },

  // 格式：2019-01-20 08 精确到小时
  hoursTime: function(val) {
    if (!val) {
      return "";
    }
    let date = new Date(val);
    var month = zeroFill(date.getMonth() + 1); // 月
    var day = zeroFill(date.getDate()); // 日
    var hour = zeroFill(date.getHours()); // 时

    // 当前时间
    var curTime =
      date.getFullYear() + "-" + month + "-" + day + " " + hour + ":00:00";
    return curTime;
    /**
     * 补零
     */
    function zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    }
  },
  // 格式：2019-01-20
  currentTime: function(val) {
    if (!val) {
      return "";
    }
    var date = new Date(val);
    var month = zeroFill(date.getMonth() + 1); // 月
    var day = zeroFill(date.getDate()); // 日

    // 当前时间
    var curTime = date.getFullYear() + "-" + month + "-" + day;
    return curTime;
    /**
     * 补零
     */
    function zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    }
  },
  // 格式：18:00
  minuteTime: function(val) {
    if (!val) {
      return "";
    }
    let date = new Date(val);
    var hours = zeroFill(date.getHours()); // 小时
    var minutes = zeroFill(date.getMinutes()); // 分钟

    // 当前时间
    var curTime = hours + ":" + minutes;
    return curTime;
    /**
     * 补零
     */
    function zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    }
  },
  // 案例 formatFloat(1.2+1.2,2)   formatFloat(1.2*1.2,2) // 最多两位小数
  formatFloat:function(f, digit){
    /**
      * js计算丢精度的问题
      */
     var m = Math.pow(10, digit);
     return Math.round(f * m, 10) / m;
   }
};
