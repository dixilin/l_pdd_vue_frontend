import {
  HOME_HOT_CASUAL,
  HOME_HOT_NAV,
  HOME_HOT_SHOP_LIST,
  RECOMMEND_LIST,
  CATEGORY_LIST,
  USER_INFO,
  LOG_OUT,
  CART_LIST,
  LOAD_CART,
  EDIT_CART_COUNT,
  CHANGE_CHECKED_STATUS,
  CHECKED_ALL,
  DELETE_CART_GOOD,
  HOME_SECOND_ROUTE,
  SHOW_LOADING
} from './mutationType'

export default {
  //首页
  [HOME_HOT_CASUAL](state, payload) {
    state.homeHotCasual = payload
  },
  [HOME_HOT_NAV](state, payload) {
    state.homeHotNav = payload
  },
  [HOME_HOT_SHOP_LIST](state, payload) {
    state.homeHotShopList = payload
  },
  //推荐
  [RECOMMEND_LIST](state, payload) {
    if (payload.length) {
      state.recommendShopList = state.recommendShopList.concat(payload)
    } else {
      state.recommendCanLoadMore = false
    }
  },
  //分类
  [CATEGORY_LIST](state, payload) {
    state.categoryList = payload
  },
  //登录
  [USER_INFO](state, payload) {
    localStorage.setItem('userInfo', JSON.stringify(payload))
    state.userInfo = payload
  },
  [LOG_OUT](state){
    localStorage.removeItem('userInfo')
    state.userInfo.token = ''
  },
  [LOAD_CART](state) {
    state.isLoadCart = true
  },
  //购物车列表
  [CART_LIST](state, payload) {
    payload.forEach(item => {
      item.isChecked = false
    })
    state.cartList = payload
  },
  //购物车商品数量编辑
  [EDIT_CART_COUNT](state, payload) {
    for (let i = 0; i < state.cartList.length; i++) {
      if (state.cartList[i].goods_id === payload.goods_id) {
        state.cartList[i].count = payload.count
        return
      }
    }
    state.cartList.unshift(payload)
  },

  //购物车商品选中状态
  [CHANGE_CHECKED_STATUS](state, {
    goods_id,
    checked
  }) {
    for (let i = 0; i < state.cartList.length; i++) {
      if (state.cartList[i].goods_id === goods_id) {
        state.cartList[i].isChecked = checked
        return
      }
    }
  },

  //购物车商品全选或取消全选
  [CHECKED_ALL](state, flag) {
    for (let k of state.cartList) {
      k.isChecked = flag
    }
  },

  //购物车商品删除
  [DELETE_CART_GOOD](state, goods_id) {
    const idx = state.cartList.findIndex(item=>{
      return item.goods_id === goods_id
    })
    state.cartList.splice(idx,1)
  },

  //首页二级路由路径保存
  [HOME_SECOND_ROUTE](state, path) {
    state.homeSecondRoutePath = path
  },
  
  [SHOW_LOADING](state, flag) {
    state.loadingShow = flag
  }
}