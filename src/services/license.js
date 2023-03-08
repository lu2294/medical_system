import axios from "../utils/axios.js";

// /**
//  * 系统授权 - 授权信息获取
//  */
// export const acProfileInfo = (params) =>
//   axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/PR/acProfileInfo`, params);

// /**
// * 系统授权 - 授权文件导入
// */
// export const importAcProfile = (params) =>
//   axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/PR/importAcProfile`, params);
/* 导入授权
* @param {*} params
*/
export const getImportAcProfile = (params) =>
  axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/PR/importAcProfile`, params);

/**
 * 授权信息获取
 * @param {*} params
 */
export const getaAcProfileInfo = (params) =>
  axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/PR/acProfileInfo`, params);

/**
 * 授权唯一值获取
 */
export const getServiceTag = () =>
  axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/PR/getServiceTag`)

/**
 * 导入托管产品授权文件  
 **/
export const importAcProfile = (params) =>
  axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/PR/importAcProfile`, params)

/**
 * 托管产品授权文件服务器列表查询
 */
export const deviceInfos = (params) =>
  axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/PR/deviceInfos`, params)

/**
 * 托管产品授权分发
 */
export const productAcProfile = (params) =>
  axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/PR/productAcProfile`, params)

/**
 * 托管产品忽略分发失败记录
 */
export const ignore = (params) =>
  axios.post(`/uapapi/plugins/org.graylog.plugins.forscripts/scripts/PR/ignore`, params)