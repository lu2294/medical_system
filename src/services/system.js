import axios from "../utils/axios.js";
// 平台-系统管理APP

/**
 * 组织管理列表
 * @param {*} params
 */
export const getTenant = (params) =>
  axios.post("/systemapi/system/tenant/getTenant", params);
/**
* 组织管理添加
* @param {*} params
*/
export const addTenant = (params) =>
  axios.post("/systemapi/system/tenant/addTenant", params);
/**
 * 组织管理删除
 * @param {*} params
 */
export const deleteTenant = (params) =>
  axios.post("/systemapi/system/tenant/deleteTenant", params);
/**
* 组织管理获取token
* @param {*} params
*/
export const getTokenByTentant = (params) =>
  axios.post("/systemapi/system/tenant/getTokenByTentant", params);
/**
 * 组织管理token刷新
 * @param {*} params
 */
export const refreshToken = (params) =>
  axios.post("/systemapi/system/tenant/refreshToken", params);
/**
* 组织管理编辑
* @param {*} params
*/
export const editTenant = (params) =>
  axios.post("/systemapi/system/tenant/editTenant", params);
/**
* 版本信息
*/
export const getAppList = (params) =>
  axios.post(`/account/getAppList`, params)

/**
* 获取资源
* @param {*} params
*/
export const finWait = () =>
  axios.get(`/systemapi/system/appmgmt/finWait`);

/**
 * 获取审计日志查询条件
 */
export const filterCondition = (params) =>
  axios.get(`/systemapi/system/audit_log/filterCondition`, params)

/**
 * 获取审计日志
 */

export const getLogs = (params) =>
  axios.get(`/systemapi/system/audit_log/logs`, params)

/**
 * 更新界面设置
 */
export const upsertLogo = (params)=>
  axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/LOGO/upsertLogo`,params)

/**
 * 修改大屏名称
 */ 
export const setDapingCustomData = (params) => 
  axios.post(`/systemapi/system/MIDDLEWARE_CONFIG/setDapingCustomData`, params)