import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
// import { Message } from "element-ui";
// import Cookie from "@u/cookie";
Vue.use(Router);

import Layout from "@/layout";
import getTitle from "@u/getTitle";

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@v/login"),
    meta: { title: "登录" },
    hidden: true
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@v/error-page/404.vue"),
    hidden: true
  },
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/dashbord",
    children: [
      {
        path: "dashbord",
        name: "Dashbord",
        component: () => import("@v/dashboard"),
        meta: { title: "首页", icon: "el-icon-s-data" }
      }
    ]
  },
  {
    path: "/personal",
    name: "Personal",
    component: Layout,
    redirect: "/personal/index",
    hidden: true,
    children: [
      {
        path: "index",
        name: "Personal-index",
        component: () => import("@v/personal"),
        meta: { title: "个人中心" }
      }
    ]
  }
];
/*动态添加routers*/
export const asyncRoutes = [
  {
    path: "/permission",
    name: "Permission",
    component: Layout,
    redirect: "/permission/page-use",
    meta: {
      title: "权限",
      icon: "el-icon-lock"
    },
    children: [
      {
        path: "page-user",
        name: "PageUser",
        component: () => import("@v/permission/page-user"),
        meta: { title: "用户页面", icon: "el-icon-user" }
      },
      {
        path: "roles",
        name: "Roles",
        component: () => import("@v/permission/roles"),
        meta: { title: "权限设置", icon: "el-icon-s-tools" }
      }
    ]
  },
  {
    path: "/table",
    name: "Table",
    redirect: "/table/base-table",
    component: Layout,
    meta: {
      title: "表格",
      icon: "el-icon-table iconfont"
    },
    children: [
      {
        path: "base-table",
        name: "BaseTable",
        component: () => import("@v/table/common-table"),
        meta: { title: "普通表格" }
      },
      {
        path: "complex-table",
        name: "ComplexTable",
        component: () => import("@v/table/complex-table"),
        meta: { title: "复杂表格" }
      }
    ]
  },
  {
    path: "/components",
    component: Layout,
    name: "Components",
    redirect: "/components/slide-yz",
    meta: { icon: "el-icon-coin", title: "组件" },
    children: [
      {
        path: "upload",
        name: "Upload",
        component: () => import("@v/components/pushImg"),
        meta: { icon: "el-icon-upload", title: "上传图片" }
      }
    ]
  },
  {
    path: "/echarts",
    component: Layout,
    name: "Echarts",
    redirect: "/echarts/slide-chart",
    meta: { icon: "el-icon-s-marketing", title: "Echarts" },
    children: [
      {
        path: "slide-chart",
        name: "Sldie-chart",
        component: () => import("@v/echarts/slide-chart"),
        meta: { title: "滑动charts" }
      },
      {
        path: "dynamic-chart",
        name: "Dynamic-chart",
        component: () => import("@v/echarts/dynamic-chart"),
        meta: { title: "切换charts" }
      }
    ]
  },
  {
    path: "/excel",
    component: Layout,
    name: "Excel",
    redirect: "/excel-operate/excel-out",
    meta: { icon: "el-icon-excel iconfont", title: "Excel" },
    children: [
      {
        path: "excel-out",
        name: "Excel-out",
        component: () => import("@v/excel-operate/excel-out"),
        meta: { title: "Excel导出" }
      },
      {
        path: "excel-in",
        name: "Excel-in",
        component: () => import("@v/excel-operate/excel-in"),
        meta: { title: "Excel导入" }
      }
    ]
  },
  {
    path: "/error",
    component: Layout,
    name: "error",
    redirect: "/error/404",
    meta: {
      title: "其他",
      icon: "el-icon-table iconfont"
    },
    children: [
      {
        path: "404",
        name: "Page404",
        component: () => import("@v/error-page/404"),
        meta: { title: "404", icon: "el-icon-s-release" }
      }
    ]
  }
];
const creatRouter = () => {
  return new Router({
    routes: currencyRoutes,
    scrollBehavior() {
      return { x: 0, y: 0 };
    }
  });
};
const router = creatRouter();
// 解决addRoute不能删除动态路由问题
export function resetRouter() {
  const reset = creatRouter();
  router.matcher = reset.matcher;
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
  document.title = getTitle(to.meta.title);
  if (to.path === "/login") {
    next();
  } else {
    if (store.getters.token) {
      const hasRoles = store.getters.addRoutes.length > 0;
      if (hasRoles || store.getters.isFindRouter) {
        next();
      } else {
        var roles = [];
        const addRoutes = await store.dispatch(
          "permission/getAsyncRoutes",
          roles
        );
        // window.console.log(addRoutes);
        router.addRoutes(addRoutes);
        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true });
      }
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
});

export default router;
