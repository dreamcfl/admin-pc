/*
 * 网站页面标题
 */

const title = "vue-admin";
const getTitle = function(til) {
  let allTitle = til + "-" + title;
  return allTitle;
};
export default getTitle;
