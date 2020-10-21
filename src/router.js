import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    name: "login",
    component: () => import("./view/login"),
    meta: {
      title: "登录",
    },
  },
  {
    name: "logon",
    component: () => import("./view/logon"),
    meta: {
      title: "注册",
    },
  },
  {
    name: "main",
    component: () => import("./view/main"),
    children: [
      {
        name: "home",
        component: () => import("./view/main/home"),
        meta: {
          title: "主页",
        },
      },
      {
        name: "mine",
        component: () => import("./view/main/mine"),
        meta: {
          title: "我的",
        },
      },
      {
        path: "*",
        redirect: "home",
      },
    ],
  },
  {
    name: "search",
    component: () => import("./view/search"),
    meta: {
      title: "查询车票",
    },
  },
  {
    name: "order",
    component: () => import("./view/order"),
    meta: {
      title: "下单",
    },
  },
  {
    name: "cart",
    component: () => import("./view/cart"),
    meta: {
      title: "购物车",
    },
  },
  {
    name: "goods",
    component: () => import("./view/goods"),
    meta: {
      title: "商品详情",
    },
  },
  {
    path: "*",
    redirect: "/login",
  },
];
/**
 * add route path '/'
 * @param {route[]} routes
 * @param {boolean} root
 */
const addRoutePath = (routes, root = true) => {
  routes.forEach((route) => {
    route.path = route.path || (root ? "/" : "") + (route.name || "");
    if (route.children) {
      addRoutePath(route.children, false);
    }
  });
};

// 要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。

addRoutePath(routes);

const router = new Router({ routes, mode: "history" });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export { router };
