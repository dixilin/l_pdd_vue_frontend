import {
  getHomeHotCasual,
  getHomeHotNav,
  getHomeShopList
} from '@/apis/home'

import {
  getRecommendList
} from '@/apis/recommend'

import {
  getCategoryList
} from '@/apis/category'

import {
  getCartList,
  addCart,
  deleteCart
} from '@/apis/cart'

import {
  HOME_HOT_CASUAL,
  HOME_HOT_NAV,
  HOME_HOT_SHOP_LIST,
  RECOMMEND_LIST,
  CATEGORY_LIST,
  SHOW_LOADING,
  CART_LIST,
  LOAD_CART,
  EDIT_CART_COUNT,
  CHANGE_CHECKED_STATUS,
  CHECKED_ALL,
  DELETE_CART_GOOD,
  USER_INFO,
  LOG_OUT,
  HOME_SECOND_ROUTE
} from './mutationType'

export default {
  //首页接口
  async reqHomeHotCasual({commit}) {
    const result = await getHomeHotCasual()
    if(result && result.success_code === 200){
      commit(HOME_HOT_CASUAL, result.data )
    }
  },
  async reqHomeHotNav({commit}){
    const result = await getHomeHotNav()
    if(result && result.success_code === 200){
      commit(HOME_HOT_NAV,result.data)
    }
  },
  async reqHomeShopList({commit}){
    const result = await getHomeShopList()
    if(result && result.success_code === 200){
      commit(HOME_HOT_SHOP_LIST,result.data)
    }
  },
  //推荐接口 
  async reqRecommendList({commit},data){
    const result = await getRecommendList(data)
    if(result && result.success_code === 200){
      commit(RECOMMEND_LIST,result.data)
    }
  },
  //分类
  async reqCategoryList({commit},data){
    const result = await getCategoryList(data)
    if(result && result.success_code === 200){
      commit(CATEGORY_LIST,result.data)
    }
  },
  //保存用户信息及token
  saveUserInfo({commit},data){
    commit(USER_INFO,data)
  },

  toLogOut({commit}){
    commit(LOG_OUT)
  },

  //更改加载过购物车页面状态 
  async changeLoadCartStatus({commit}){
      commit(LOAD_CART)
  },

  //获取购物车列表
  async reqCartList({commit},data){
    const result = await getCartList(data)
    if(result && result.status === 'success'){
      commit(CART_LIST,result.data)
    }
  },

  //编辑购物车数量
  async handleCartCount({ commit,rootState },data){
    const result = await addCart(data.data)
    //如果存在callback
    setTimeout(()=>{
      if(data.cb){
        data.cb(result)
      }
    },50)
    if(result && result.status === 'success' && rootState.isLoadCart === true){
      commit(EDIT_CART_COUNT,data.goods)
    }
  },

  //购物车商品选中状态修改
  async handleChecked({commit},data){
    commit(CHANGE_CHECKED_STATUS,data)
  },

  //商品全选
  handleCheckedAll({commit},flag){
    commit(CHECKED_ALL,flag)
  },

  //购物车商品删除
  async handelDeleteCart({commit},data){
    const result = await deleteCart(data)
    if(result && result.status === 'success'){
      commit(DELETE_CART_GOOD,data.goods_id)
    }
  }, 

  //首页二级路由路径保存
  homeSecondRoutePath({commit},path){
    commit(HOME_SECOND_ROUTE,path)
  },

  //loading
  isShowLoading({commit},param){
    commit(SHOW_LOADING,param)
  }
}
