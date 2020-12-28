import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
import Home from '../views/Home/'

const Recommend = () => import(/* webpackChunkName: "group-foo" */ '../views/Recommend/')
const Category = () => import(/* webpackChunkName: "group-foo" */ '../views/Category/')
const Cart = () => import(/* webpackChunkName: "group-foo" */ '../views/Cart/')
const Mine = () => import(/* webpackChunkName: "group-foo" */ '../views/Mine/')
const SearchGood = () => import(/* webpackChunkName: "group-foo" */ '../views/SearchGood/')
const Login = () => import(/* webpackChunkName: "group-foo" */ '../views/Login/')
const Register = () => import(/* webpackChunkName: "group-foo" */ '../views/Register/')
const error404 = () => import(/* webpackChunkName: "group-foo" */ '../views/error/404')


//二级路由
import HomeHot from '../views/Home/children/hot'
const HomeClothes = () => import(/* webpackChunkName: "group-foo" */ '../views/Home/children/clothes')
const HomeShoesBags = () => import(/* webpackChunkName: "group-foo" */ '../views/Home/children/shoesBags')
const HomeUnderwear = () => import(/* webpackChunkName: "group-foo" */ '../views/Home/children/underwear')
const HomeStore = () => import(/* webpackChunkName: "group-foo" */ '../views/Home/children/store')
const HomeMomBaby = () => import(/* webpackChunkName: "group-foo" */ '../views/Home/children/momBaby')
const homeAppliance = () => import(/* webpackChunkName: "group-foo" */ '../views/Home/children/appliance')
const HomeManClothes = () => import(/* webpackChunkName: "group-foo" */ '../views/Home/children/manClothes')
const HomeFood = () => import(/* webpackChunkName: "group-foo" */ '../views/Home/children/food')

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home/hot',
  }, {
    path: '/home',
    redirect: '/home/hot',
    name: 'Home',
    component: Home,
    children: [{
        path: '/home/hot',
        name: 'home-hot',
        component: HomeHot,
        meta: {
          noAuth: true
        },
      },
      {
        path: '/home/clothes',
        name: 'home-clothes',
        component: HomeClothes,
        meta: {
          noAuth: true
        },
      },
      {
        path: '/home/shoesBags',
        name: 'home-shoesBags',
        component: HomeShoesBags,
        meta: {
          noAuth: true
        },
      },
      {
        path: '/home/appliance',
        name: 'home-appliance',
        component: homeAppliance,
        meta: {
          noAuth: true
        },
      },
      {
        path: '/home/food',
        name: 'home-food',
        component: HomeFood,
        meta: {
          noAuth: true
        },
      },
      {
        path: '/home/manClothes',
        name: 'home-manClothes',
        component: HomeManClothes,
        meta: {
          noAuth: true
        },
      },
      {
        path: '/home/momBaby',
        name: 'home-momBaby',
        component: HomeMomBaby,
        meta: {
          noAuth: true
        },
      },
      {
        path: '/home/store',
        name: 'home-store',
        component: HomeStore,
        meta: {
          noAuth: true
        },
      },
      {
        path: '/home/underwear',
        name: 'home-underwear',
        component: HomeUnderwear,
        meta: {
          noAuth: true
        },
      }
    ]
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      noAuth: true
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  {
    path: '/searchGood/:name',
    name: 'SearchGood',
    component: SearchGood,
    meta: {
      hideBottom: true,
      noAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hideBottom: true,
      noAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      hideBottom: true,
      noAuth: true
    }
  },
  {
    path: '*',
    name: '404',
    component: error404,
    meta: {
      hideBottom: true,
      noAuth: true
    }
  }
]



const router = new VueRouter({
  routes
})

import store from '@/store'
import {
  USER_INFO
} from '@/store/mutationType'
router.beforeEach((to, _from, next) => {
  if (!to.meta.noAuth) {
    if (!store.state.userInfo.token) {
      if (!localStorage.getItem('userInfo')) {
        router.push('/login')
        return
      }
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      store.commit(USER_INFO, userInfo)
    }
    next()
  } else {
    next()
  }
})

export default router