import { useEffect, useRef } from "react";
//校验IP格式
function checkIP(data) {
  const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return data && ipReg.test(data);
}

//校验特殊字符
function checkCS(value) {
  //var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\`)(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
  var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\uff01)(\uffe5)(\u2026\u2026)(\uff08)(\uff09)(\\)(\;)(\:)(\')(\`)(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/); // eslint-disable-line
  return (containSpecial.test(value));
}

//校验中文
function checkCN(value) {
  const pattern = /.*[\u4e00-\u9fa5]+.*$/;
  return pattern.test(value);
}

//校验端口
function checkPort(port) {
  if (/^[1-9]d*|0$/.test(port) && port * 1 >= 0 && port * 1 <= 65535) {
    return true
  }
  return false;
}
//校验时间是否一个月
function checkOneMonth(enddate) {
  var startD = new Date();
  var endD = new Date(enddate);
  var days = parseInt((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24));
  if (days > 30) {
    return true
  }
  return false
}

//SVG转base64
function getBase64Image(img, width, height) {
  var img1 = document.createElement("img");
  img1.src = img
  var canvas = document.createElement("canvas");
  canvas.width = 130;
  canvas.height = 38;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img1, 0, 0, 130, 38);
  var dataURL = canvas.toDataURL("image/png"); // 可选其他值 image/jpeg
  return dataURL;
}

 function isJump(jumpurl){ //传入第一级路由
  const localData = JSON.parse(localStorage.getItem('localData'));
  if(!localData)return false;
  const appPermInfo = localData?.userInfo?.appPermInfo;
  const router_key = localData?.router_key;
  if(localData?.userInfo?.roleId === 'admin')return true;
  if(appPermInfo && router_key && appPermInfo[router_key] && appPermInfo[router_key][jumpurl]){
    return true;
  }else{
    window.messages.error('该用户角色暂无权限！')
    return false;
  }
}

//跳转到日志搜索
export const searchJump = (url, search,first_router) => {
  if(first_router && !isJump(first_router)){return false;}
  if (url && search) {
    window.history_router ? window.history_router.push(`${url}?jump_search=${search}`) :
      window.history.pushState(null, null, `${url}?jump_search=${search}`)
  }
}

//组织管理跳转至产品中心-产品管理
export const productJump = (url, tenantId, status, first_router) => {
  if (first_router && !isJump(first_router)) {
      return false
  }
  if (url) {
    window.history_router ? window.history_router.push(`${url}?tenantId=${tenantId}&status=${status}`) :
    window.history.pushState(null, null, `${url}?tenantId=${tenantId}&status=${status}`)
  }
}


//是否时第一次
const IsFirstRender = () => {
  const isFirst = useRef(true); //不会因为重复 render 重复申明， 类似于类组件的 this.xxx
  const { current } = isFirst;
  //如果是第一次，改变状态并返回true
  if (current) {
    isFirst.current = false;
    return true;
  }
  return current;
}

//依赖更改时候生命周期
/**
 * @param effect 更新时所需要调用的函数
 * @param deps  更新的依赖
 */
const useUpdateEffect = (effect, deps) => {
  //是否是第一次更新
  const isFirst = IsFirstRender();
  useEffect(() => {
    //如果不是第一次执行函数
    if (!isFirst) return effect();
  }, deps);// eslint-disable-line
}
//防抖函数
const DeBounce = (fn, wait) => {
  let timer;
  return function (e) {
    let context = this, args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  }

}

const deviceMapping = {
};

export {
  checkIP,
  checkCS,
  checkCN,
  getBase64Image,
  checkPort,
  checkOneMonth,
  deviceMapping,
  useUpdateEffect,
  DeBounce
}