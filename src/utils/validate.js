// placeholder提示
export const placeholderTips = {
  content: "请输入内容",
  number: "请输入数值"
};
/* 限制不能超过 2-15字符 */
export function validateString(rule, value, callback) {
  // var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,15}$/;
  var reg = /^.{2,15}$/;
  if (value === "") {
    callback(new Error("请输入内容"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入内容在2~15字符内（2~15个汉字）"));
  } else {
    callback();
  }
}
/* 限制不能超过 2-15字符  可以特殊字符*/
export function validateStringSpecial(rule, value, callback) {
  var reg = /^.{2,15}$/;
  if (value === "") {
    callback(new Error("请输入内容"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入内容在2~15字符内（2~15个汉字）"));
  } else {
    callback();
  }
}
/* 限制不能超过 1-6字符 */
export function validateString2(rule, value, callback) {
  var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{1,6}$/;
  if (value === "") {
    callback(new Error("请输入内容"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入内容在1~6字符内（1~6个汉字）"));
  } else {
    callback();
  }
}
/*  正整数 */
export function validateNumInt(rule, value, callback) {
  var reg = /^(\+?[1-9][0-9]*)$/;
  if (value === "") {
    callback(new Error("请输入数值"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入正整数"));
  } else {
    callback();
  }
}

/*  0或者正整数 或者不填 ID */
export function validateID(rule, value, callback) {
  var reg = /^(0|\+?[1-9][0-9]*)$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请选择内容"));
  } else {
    callback();
  }
}
/*  0或者正整数 */
export function validateNum(rule, value, callback) {
  var reg = /^(0|\+?[1-9][0-9]*)$/;
  if (value === "") {
    callback(new Error("请输入数值"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入0或者正整数"));
  } else {
    callback();
  }
}

/*限制  正数且最多保留两位小数 */
export function validateNumber(rule, value, callback) {
  // var reg = /^(\d+|\d+\.\d{1,2})$/;  // 含0
  var reg = /^(\+?[1-9][0-9]*|\d+\.\d{1,2})$/;
  if (value === "") {
    callback(new Error("请输入数值"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入正数且最多保留两位小数"));
  } else {
    callback();
  }
}
/*  空或者正整数 */
export function validateNumEmpty(rule, value, callback) {
  var reg = /^(\+?[1-9][0-9]*)$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请输入正整数或者默认不填"));
  } else {
    callback();
  }
}

//  不能为空  图片
export function validateTemplatePicture(rule, value, callback) {
  if (value === "") {
    callback(new Error("请上传图片"));
  } else {
    callback();
  }
}

// 内容
export function validateTemplate(rule, value, callback) {
  if (value === "") {
    callback(new Error("请选择内容"));
  } else {
    callback();
  }
}

// 内容
export function validateTemplateContent(rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入内容"));
  } else {
    callback();
  }
}
/* eslint-disable */
/* 替换符号 ，替换为 / */
export function validateReplace(str) {
  if(str){
    str = str.replace(/\,/g, " /");
  }
  return str;
}
/* eslint-disable */


/*  空或者纯数字 */
export function validateTemplateID(rule, value, callback) {
  var reg = /^(\+?[1-9][0-9]*)$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("银盒子ID默认为纯数字"));
  } else {
    callback();
  }
}
/*  纯数字 */
export function validateTemplateIDII(rule, value, callback) {
  var reg = /^(\+?[1-9][0-9]*)$/;
  if (value === "") {
    callback(new Error( '全额付款必须添加银盒子ID'));
  } else if (!reg.test(value)) {
    callback(new Error("银盒子ID默认为纯数字"));
  } else {
    callback();
  }
}

/*限制  0正数且最多保留两位小数 */
export function validateNumberII(rule, value, callback) {
  // var reg = /^(\d+|\d+\.\d{1,2})$/;  // 不含0
  var reg = /^(0|\+?[1-9][0-9]*|\d+\.\d{1,2})$/;
  if (value === "") {
    callback(new Error("请输入数值"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入0或者正数且最多保留两位小数"));
  } else {
    callback();
  }
}

export function isAbsolutePath(path) {
  return /^(https?|tel|mailto)/.test(path)
}
