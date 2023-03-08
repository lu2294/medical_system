import axios from "../utils/axios.js"

/**
 * 登录
 * @param {*} params
 */
export const login = (params) => axios.post(`/account/login`, params)
/**
 * 修改密码
 * @param {*} params
 */
export const changePwd = (params) =>
    axios.post(`/account/rbac/changepsd`, params)
/**
 * 刷新token
 * @param {*} params
 */
export const refreshtToekn = () => axios.get(`/user/refresh_token`)
/**
 * 获取用用户信息
 * @param {*} params
 */
export const getUserInfo = () => axios.get(`/account/rbac/user_info`)
/**
 * 获取用户组织信息
 * @param {*} params
 */
export const loginGetTenant = (params) =>
    axios.get(`/account/user_self/loginGetTenant`, params)

/**
 * 改变用户组织信息
 * @param {*} params
 */
export const changeLoginTenant = (params) =>
    axios.post(`/account/rbac/changeLoginTenant`, params)
/**
 * 退出
 * @param {*} params
 */
export const loginOuts = () => axios.post(`/account/rbac/logout`)
/**
 * 获取资源
 * @param {*} params
 */
export const getResources = (params) => axios.post(`/uap`, params)

/**
 * 获取个人详细信息
 */
export const getSelfInfo = (params) =>
    axios.get(`/account/user_self/selfInfo`, params)
/**
 * 修改个人详细信息
 */
export const updateSelfInfo = (params) =>
    axios.put(`/account/user_self`, params)

/**
 * 获取界面配置
 */
export const getInterfaceSettings = () =>
    axios.get(
        `/uapapi/plugins/org.graylog.plugins.forscripts/scripts/LOGO/getLogo`
    )

/**
 * 获取修改后的大屏名称
 */
export const getDapingCustomData = (params) =>
    axios.get(`/systemapi/system/MIDDLEWARE_CONFIG/getDapingCustomData`, params)
/**
 * 获取归档配置
 */
export const getXdrEvent = () =>
    axios.get(
        `/uapapi/plugins/org.graylog.plugins.forscripts/scripts/STORAGE/getXdrIndexSet`
    )
/**
 * 修改归档配置
 */
export const updateXdrIndexSet = (params) =>
    axios.post(
        `/uapapi/plugins/org.graylog.plugins.forscripts/scripts/STORAGE/updateXdrIndexSet/xdr_event`,
        params
    )
/**
 * 获取归档配置列表
 */
export const getIndexList = (status) =>
    axios.get(
        `/uapapi/plugins/org.graylog.plugins.forscripts/scripts/STORAGE/getIndexList/xdr_event/${status}`
    )
/**
 * 关闭索引
 */
export const closeIndex = (name) =>
    axios.post(
        `/uapapi/plugins/org.graylog.plugins.forscripts/scripts/STORAGE/closeIndex/${name}`
    )
/**
 * 开启索引
 */
export const openIndex = (name) =>
    axios.post(
        `/uapapi/plugins/org.graylog.plugins.forscripts/scripts/STORAGE/openIndex/${name}`
    )
/**
 * 删除索引
 */
export const deleteIndex = (name) =>
    axios.post(
        `/uapapi/plugins/org.graylog.plugins.forscripts/scripts/STORAGE/deleteIndex/${name}`
    )
//     /**
//      * 获取UAP索引
//      */
// export const getIndexSet = () =>
//     axios.get(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/STORAGE/getIndexSet`)
//     /**
//      * 获取UAP索引
//      */
// export const getIndexSetMessage = (url) =>
//     axios.get(`/uapapi/system/indexer/overview/${url}`)

/**
 * 获取归档配置列表
 */
export const getIndexSet = (status) =>
    axios.get(
        `/uapapi/plugins/org.graylog.plugins.forscripts/scripts/STORAGE/getIndexSet`
    )

/**
 * 获取归档配置列表
 */
export const getIndexSetMessage = (url) =>
    axios.get(`/uapapi/system/indexer/overview/${url}`)

export const getESMeta = () =>
    axios.get(
        `/uapapi/plugins/org.graylog.plugins.forscripts/scripts/HOST_CONNECT/getESMeta`
    )

export const reClose = (url) =>
    axios.post(`/uapapi/system/indexer/indices/${url}/close`)

export const reOpen = (url) =>
    axios.post(`/uapapi/system/indexer/indices/${url}/reopen`)

export const deleteIdx = (url) =>
    axios.delete(`/uapapi/system/indexer/indices/${url}`)

export const getSecretInfo = () => axios.get(`/xdrmonitor/getSecretInfo`)

export const setSecretInfo = (params) =>
    axios.post(`/xdrmonitor/setSecretInfo`, params)

export const getMarkInfo = (params) =>
    axios.post(`/xdrmonitor/markInfo`, params)
/**
 * 安装卸载xab APP
 */
export const setAppStatus = (params) =>
    axios.post(`/systemapi/system/appmgmt/setAppStatus`, params)

/*
  获取令牌激活码
*/
export const getOtpKey = (params) =>
    axios.post(`/account/rbac/getOtpKey`, params)

/*
  用户信息中添加绑定令牌认证激活码新增和变更
*/
export const bindOtp = (params) => axios.post(`/account/user/bindOtp`, params)

/*
  查询登录人员绑定的令牌激活码
*/
export const getUserDetail = (params) =>
    axios.get(`/account/user/detail`, params)

/*
 - 动态验证码有效性，前延时30s，总计1分钟内有效
*/
export const validateLogin = (params) =>
    axios.post(`/account/rbac/validateLogon`, params)

       