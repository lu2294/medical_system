import React, { useState, useEffect } from 'react';
import { Progress,Menu, Dropdown, Image, Tooltip, Modal, Form, Input, message, Button,Popover, Tabs, Row,Checkbox, Col, Tag, Alert, Select } from 'antd';
import { observer, inject } from "mobx-react";
import dayjs from 'dayjs';
import { checkIP } from 'utils/utils';
// import { toJS } from "mobx";
import { useHistory, useLocation } from "react-router-dom";
import { CaretDownOutlined, CloseOutlined, EditOutlined, SaveOutlined,InfoCircleOutlined } from '@ant-design/icons';
import { finWait } from '../../services/system';
import { aesDecrypt } from 'utils/cryptor';
// import dayjs from 'dayjs';
import { tokenTypeList } from 'utils/constant'
import classNames from 'classnames';
import Icon from '@components/icon';
import logoIMG from 'images/login/login1.png';
import xabIMG from 'images/xab.svg';
import exchangeIMG from 'images/exchange.svg';
import memberIMG from 'images/member.svg';
import xab_icon from 'images/main/h_xab.png'
import xab_three_use from 'images/xab/xab_three_use.svg'
import xab_active from 'images/xab/xab_active.svg'
import { routeUrlList, errCode, xdr_list, big_screen } from 'utils/constant';
import './index.less'
import { Buried } from 'utils/buried.js';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { bindOtp, getOtpKey } from "@services/index.js"
window.messages = message;
let timer = null;
let timer_sass = null;
const { TabPane } = Tabs;
const { Option } = Select;
const PRESET_ACCOUNT_MAP = {
  "admin": "该角色拥有该平台完全控制管理权限",
  "userManager": "该角色拥有对该平台账号的管理权限",
  "audit": "该角色拥有操作审计的管理权限",
  "analysis": "该角色拥有该平台数据分析类服务的查看权限",
}
const defaultValue = { "nickname": "", "phone": "", "email": "", "IM": "", "remark": "" };
const Index = (props) => {
  const { commonStore, loginStore, licenseStore,mainStore } = props;
  const {no_platform,appXabMap} = commonStore;
  const [formUpdatePwd] = Form.useForm();
  const [formUserInfo] = Form.useForm();
  const [formAuthority] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  // const [isEditPassWord, setIsEditPassWord] = useState(false);
  const [isEditPassWord, setIsEditPassWord] = useState(loginStore.overTime_flag);
  const [checkIpEnableSnap, setCheckIpEnableSnap] = useState(0);//暂存IP Block
  const [checkIpDescListSnap, setCheckIpDescListSnap] = useState([]);//暂存可登录IP地址
  const [checkIpDescValue, setCheckIpDescValue] = useState('');
  const [checkIpDescList, setCheckIpDescList] = useState([]);
  // const [checkIpEnable, setCheckIpEnable] = useState(0);


  const [isXDRVersionVisiable, setIsXDRVersionVisiable] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [form2, setForm2] = useState({});//当前用户权限
  const [form3, setForm3] = useState([]);
  const [psdMinLen, setPsdMinLen] = useState(8);
  // const [defaultRole, setDefaultRole] = useState({});//当前用户所属角色的app权限
  const [flagInfoUpdate, setFlagInfoUpdate] = useState(false);
  const [isUserInfoVisiable, setIsUserInfoVisiable] = useState(false);
  const [isSassShow, setIsSassShow] = useState(false);
  const [isSassPerShow, setIsSassPerShow] = useState(false);
  const [sassPer, setSassPer] = useState(0);
  const [tenantArr, setTenantArr] = useState([]);
  const [tenantId, setTenantId] = useState('');
  const [xabActiveUse, setXabActiveUse] = useState(false);

  const [otpFlag, setOtpFlag] = useState("")//查看详情时的默认令牌类型，根据接口返回值来设置，可为空
  const [otpFlagKey, setOtpFlagKey] = useState("")  //查看详情时的默认 激活码
  const [loadings, setLoadings] = useState([]);  //获取激活码时的loading状态
  const [isotpFlagUpdate, setIsotpFlagUpdate] = useState(false);  //用户管理-查看详情 个人信息 编辑标志位
  useEffect(() => {
    const { pathname } = location;
    const { update } = commonStore;
    let pathUrl = String(pathname).split('/')[1];
    if (!pathUrl) {update('安全管理平台', 'activeName', true); return; }
    if (pathUrl && no_platform[pathUrl]) {
      update(no_platform[pathUrl], 'activeName', true);
    } else {
      if (xdr_list.includes(pathname)) {
        update('XDR联动中心', 'activeName', true);
      } else {
        update('安全运维中心', 'activeName', true);
      }  
    }
  }, [location.pathname]);// eslint-disable-line


  const tabClick = () => {
    commonStore.update(!commonStore.isDown, 'isDown')
  }

  
  const updateLastAppChildUrl = () => {
    const { pathname, search } = location;//最后的url;
    const { update, routeList } = commonStore;
    let pathUrl = pathname;
    const first_pathname = pathUrl.split('/')[1];
    if (pathname === '/') return;
    if (first_pathname && no_platform[first_pathname]) {
      //更新数据
      Object.keys(routeUrlList).forEach((urlname) => {
        if (pathUrl.startsWith(routeUrlList[urlname])) {
          update(Object.assign(routeList, {
            [urlname]: pathUrl + search
          }), 'routeList', true);
        }
      })
    } else {
      // 平台融合，导致所有路由前缀不合一，特殊处理
      if (xdr_list.includes(pathname)) {
        update(Object.assign(routeList, {
          'xdr': pathUrl + search
        }), 'routeList', true);
      } else {
        update(Object.assign(routeList, {
          'uap': pathUrl + search
        }), 'routeList', true);
      }
    }
  }
  const mianClick = () => {
    const { activeName, update } = commonStore;
    updateLastAppChildUrl();
    if (activeName === '信池统一安全管理平台') return;
    update('信池统一安全管理平台', 'activeName', true);
    history.push('/');
    commonStore.update(true, 'isMain');
  }
  const childAppClick = (e, v) => {
    e.stopPropagation();
    const { update, activeName, routeList } = commonStore;
    const { name, router,appname } = v;
    if (activeName === name) return;//处于当前子模块时，不给他点击
    if (routeList[appname]) {
      history.push(`${routeList[appname]}`);
    } else {
      history.push(`${router}`);
    }
    updateLastAppChildUrl();
    update(name, 'activeName', true);
    update(false, 'isMain');
  }
  const returnMainClick = (e, v) => {
    e.stopPropagation();
    const { appList, update, routeList, activeName } = commonStore;
    const { name } = v;
    if (routeList[name]) {
      delete routeList[name];
      update(routeList, 'routeList', true);
    }
    update(appList.filter((data) => (data.name !== name)), 'appList', true);
    if (name === activeName) {
      update(true, 'isMain');
      update('信池统一安全管理平台', 'activeName', true);
      history.push('/');
    }
  }
  // 清空所有数据
  const loginout = () => {
        localStorage.clear();
        loginStore.update(false, 'isLogin');
        window.location.href = '/login';
  }

  const showVersion = async () => {
    await licenseStore.getServiceTag()
    setIsXDRVersionVisiable(!isXDRVersionVisiable);
  }



  const returnXDR = () => {
    mianClick();
    // window.location.href = '/'
  };
  const menu = (
    <Menu className="header-menu">
      <Menu.Item icon={<Icon type="icon-exit" />}>
        <a onClick={() => loginout()}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  const onCopy = () => {
    message.success('复制成功')
  }
  
  const sassClick = ()=>{
    setIsSassShow(true)
  }
  const cancelSass = ()=>{
    setIsSassShow(false);
    setIsSassPerShow(false);
    setSassPer(0)
  }
  const sassUpdate =() => {
    setSassPer(0);
    timer_sass = setInterval(()=>{
      setSassPer((prevCount)=>prevCount + 20)
    },500)
    setIsSassPerShow(true);
  }
  const sassOpen = ()=>{
    const {router,title} = appXabMap;
    const { update, appList, routeList } = commonStore
    if(router){
      if (appList.length) {
				let isExit = false
				for (let i of appList) {
					if (i.name === title) {
						isExit = true
					}
				}
				if (!isExit) {
					update([...appList, {icon:xab_icon,name:title,router}], 'appList', true)
				}
			} else {
				update([...appList, {icon:xab_icon,name:title,router}], 'appList', true)
			}
      update(
				Object.assign(routeList, {
					[title]: router
				}),
				'routeList',
				true
			)
      setIsSassShow(false);
      setSassPer(0);
      update(title, 'activeName', true)
      setIsSassPerShow(false);
      history.push(router);
    }else{
      message.error('信息出错')
    }
  }
  const onCheckIpEnable = (e) => {
    // if (!e.target.checked) {
    //   setAccountInfo({ ...accountInfo, checkIpEnable: 0 });
    // } else {
    //   setAccountInfo({ ...accountInfo, checkIpEnable: 1 });
    // }
    setCheckIpEnableSnap(e.target.checked ? 1 : 0);

  }

  const popoverContent = (
    <div className='checkIpDescPopover'>
      <p>请输入绑定IP地址或IP段，多个可用;间隔</p>
      <p>回车键确认</p>
      <p>例：10.21.11.1;10.12.10.8</p>
      <p>&nbsp; &nbsp; &nbsp; &nbsp;10.13.2.2-10.43.2.1;10.13.2.1-10.43.8.4</p>
    </div>
  )


  return (
    <>
      <div className={classNames({ 'main-header-show': true, 'xdr-display-empty': commonStore.isBigScreen })}>
        <div className="main-header-top">
          <div className="top-content-left ml20">
            <Image height={'100%'} style={{ padding: 11 }} preview={false} src={logoIMG} onClick={returnXDR} />
            <span className="top-content-left-content" onClick={() => { tabClick() }}>
              <span>{'安全管理平台产品解决方案'}</span>
              <Image preview={false} src={exchangeIMG} />
            </span>
          </div>
          <div className='top-content-right-first'>

          </div>
          <div className="top-content-right">
            <Tooltip placement="bottom" title={'远程托管安全运营'}>
              <a onClick={()=>{sassClick()}} className='main_header_sass'><Image preview={false} src={xabActiveUse ? xab_active: xabIMG} /></a>
            </Tooltip>
            <Image preview={false} src={memberIMG} />
            {(loginStore.username ? <Dropdown overlay={menu} className='header-or-drop'>
               <span>{loginStore.username}</span>
              </Dropdown> : <a className="login-title" href="/login">登录</a>)}
          </div>
        </div>
        <div className={classNames('main-header-center', { 'tab-down1': !commonStore.isDown && !commonStore.isUap, 'tab-up1': commonStore.isDown && !commonStore.isUap })}>
          {/* 返回主应用按钮 */}
          <div className="father-content">
            <div className={classNames('main', { 'is-choose': commonStore.activeName === "信池统一安全管理平台" })} onClick={mianClick}>
            </div>
            <span className="line"></span>
          </div>
          {/* 子应用按钮 */}
          <div className="child-content">
            {commonStore.appList.map((v, k) => {
              return <Tooltip placement="bottom" title={v.name === '信安帮' ? '远程托管安全运营': v.name} color={'#5a84ee'} key={v.icon + k} overlayClassName="child-tip">
                <div className={classNames('child', { 'is-choose': commonStore.activeName === v.name })} onClick={(e) => childAppClick(e, v)}>
                  {/* <span>{v.name}</span> */}
                  {v.icon ? <Image preview={false} src={v.icon} className="child-app-icon" /> : null}
                  <span className="closes" onClick={(e) => returnMainClick(e, v)}><CloseOutlined className="i-close" style={{ color: "#fff", fontSize: 9, position: 'absolute', top: "17%", left: '25%' }} /></span>
                </div>
              </Tooltip>
            })}
          </div>
        </div>
      </div>
      {commonStore.isUap && commonStore.updateUapStatus ?
        <div className="uap-content">
          <span className="top-content-left-content" onClick={() => { tabClick() }}>
            <span>{commonStore.activeName}</span>
            <Image preview={false} src={exchangeIMG} />
          </span>
        </div> : null}
        {props.children ? props.children : null}
        {/* 版本介绍 */}
      {isXDRVersionVisiable ? <Modal
        className="xdr_version_modal"
        centered
        visible={isXDRVersionVisiable}
        onCancel={showVersion}
        // width={310}
        footer={null}
      >
        <div className="xdr_version_modal_bg"></div>
        <div className="xdr_version_modal_content">
        <p>当前版本：V{commonStore.appUapMap.version ? commonStore.appUapMap.version : "--"}</p>
        <p>更新时间：{commonStore.appUapMap.updateTime ? dayjs(commonStore.appUapMap.updateTime).format('YYYY-MM-DD'): "--"}</p>
          <p>服务序列号：<span className="_number_serial">{licenseStore?.serviceTag?.serviceTag}</span>
            &nbsp;&nbsp;
            <CopyToClipboard text={licenseStore?.serviceTag?.serviceTag} onCopy={onCopy}>
              <span>
                <Icon classname="main_hover" type="icon-copy" />
              </span>
            </CopyToClipboard>
          </p>
          <Button className="xdr_version_modal_cancel" onClick={() => showVersion()}>关闭</Button>
        </div>
      </Modal>: null}
      {/* saaa中心 */}
      {isSassShow ? <Modal
        className="xdr_sass_induce"
        title="信安帮"
        centered
        visible={isSassShow}
        onCancel={cancelSass}
        footer={commonStore.roleId === 'admin' ? (appXabMap.status ? [
          <Button key="back" onClick={()=>{sassUpdate()}} type="primary">{appXabMap.status ? '安装' : '卸载'}</Button>,
          <Button key="submit"  onClick={cancelSass}>取消</Button>] : [
            <Button key="open" type="primary"  onClick={()=>{sassOpen()}}>打开</Button>,
            <Button className={appXabMap.status ? '' : 'xab_uninstall'} key="back" onClick={()=>{sassUpdate()}} type={appXabMap.status ? 'primary' : ''}>{appXabMap.status ? '安装' : '卸载'}</Button>,
            <Button key="submit"  onClick={cancelSass}>取消</Button>]) : [<Button key="submit"  onClick={cancelSass}>取消</Button>]}
      >
       <div className='xdr_sass_content'>
         <div className='xdr_sass_left'></div>
         <div className='xdr_sass_right'>
           <p>远程托管安全运营</p>
           <p>云端安全运营专家团队为您远程提供巡检、按需和常态化安全运营服务。解决资产漏洞不清晰、真实威胁不可见、告警聚合效果差、产品联动效率低等问题，将黑客入侵、病毒感染等安全风险降至最低。</p>
           <Image src={xab_three_use} style={{margin:"10px 0"}} preview={false}/>
         </div>
         {isSassPerShow ? <Progress className='xdr_sass_pro' percent={sassPer}/> : null}
       </div>
      </Modal>: null}
    </>
  );
}

export default inject('commonStore', 'loginStore', 'licenseStore','mainStore')(observer(Index));