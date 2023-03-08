import React, {
	useState,
	useEffect
} from 'react';
import {
	observer,
	inject
} from "mobx-react";
import {
  Button,
	Image,
  Descriptions,
  Input,
  Alert,
	message,
	Modal,
  Spin,
  Popover
} from 'antd';
import {
	useHistory
} from "react-router-dom";
import classNames from 'classnames';
import { updateUser } from '@services/accountAuthority.js';
import { getAppList } from '../../services/system';
import { errCode } from 'utils/constant';
import { checkIP } from 'utils/utils';
import { getImportAcProfile } from '../../services/license';
import XdrPlayer from '@components/player';
import {
	RouteFunction
} from 'utils/routes';
import Icon from '@components/icon';
// import icon1 from 'images/icon1.svg';
// import icon2 from 'images/icon2.svg';
// import icon3 from 'images/icon3.svg';
import icon4 from 'images/icon4.svg';
import icon5 from 'images/icon5.svg';
import icon6 from 'images/icon6.svg';
// import icon7 from 'images/icon7.svg';
import messageIcon from 'images/tipicon.svg';
import { InfoCircleOutlined } from '@ant-design/icons';
import './index.less';
const appJson = {
  'xdr': {
    appname: "xdr",
    author: [""],
    name: 'XDR联动中心',
    isSystem: true,
    image: 'img4',
    icon: icon4,
    detail: "密钥管理：管理安全产品注册到平台所需的密钥</br>账号管理：管理平台的组织、账号，角色及密码安全策略；实现等保要求的分级分权管控和多级账号管理场景</br>审计日志：对平台的操作行为进行审计记录，为企业安全审计提供回溯</br>还提供其他系统设置，如界面LOGO，主题色等配置",
    discription: "XDR联动中心",
    status: 0,
    title: "XDR联动中心",
  },
  'tdp': {
    image: 'img5',
    icon: icon5,
    router: 'tdp/threat/alert',
    author: [""],
    appPermission: 'tdp',
  },
  'dsp': {
    image: 'img5',
    icon: icon5,
    router: 'tdp/threat/alert',
    author: [""],
  },
  'esm': {
    image: 'img5',
    icon: icon5,
    router: 'tdp/threat/alert',
    author: [""],
  },
  'aep': {
    image: 'img5',
    icon: icon5,
    router: 'tdp/threat/alert',
    author: [""],
  },
  'uap': {
    appname: "uap",
    author: [""],
    name: '安全运维中心',
    isSystem: true,
    image: 'img4',
    icon: icon4,
    detail: "密钥管理：管理安全产品注册到平台所需的密钥</br>账号管理：管理平台的组织、账号，角色及密码安全策略；实现等保要求的分级分权管控和多级账号管理场景</br>审计日志：对平台的操作行为进行审计记录，为企业安全审计提供回溯</br>还提供其他系统设置，如界面LOGO，主题色等配置",
    discription: "平台的管理配置，戳这里",
    status: 0,
    title: "安全运维中心",
    
  },
}
const Main = ({
	commonStore,mainStore,licenseStore
}) => {
	// const {
	// 	appPermInfo,
	// 	roleId
	// } = commonStore;
	
	const history = useHistory();
	// const [isRight, setIsRught] = useState(false);
	const [imgShowBounce, setImgShowBounce] = useState(true);
	const [appList, setAppList] = useState([]);
	const [isPlayer, setIsPlayer] = useState(false);
	const [isLicense, setIsLicense] = useState(false);
	const [isAdminIp, setIsAdminIp] = useState(false);
	const [adminIp, setAdminIp] = useState('');
	const {
		// appActiveList,
		update
	} = commonStore;
  const {
    childHover,
    showX,
    clild1,
    clild2,
		isRight,
    info,
		main_update
	} = mainStore;

	const clild3 = 400;
	useEffect(() => {
      _getAppList();
	}, []); // eslint-disable-line
  const _getAppList =   async ()=>{
    const params = { "activePage": 1, "itemsCountPerPage": 6 }
    getAppList(params).then(async (res) => {
            if (res.code === "200") {
              const arr = [];
                const active_list = [];//已安装的app
                const data = res.data;
                for (let i = 0; i < data.length; i++) {
                  const data_info = data[i];
                  if (appJson[data_info.appname]) {
                    data_info.name = data[i].appname;
                    if(!data_info.status){
                      const app_name = data_info.appname;
                      if(app_name === 'uap' || app_name === 'xdr'){ //只检测uap的授权
                        arr.push(Object.assign(data_info, {...appJson[data[i].appname],lic_per:true,router: new RouteFunction(app_name)
                             .get_first_router()}))
                      }else if(app_name === 'tdp'){
                         arr.push(Object.assign(data_info, {...appJson[data[i].appname],lic_per:true}))
                      }else{
                        arr.push(Object.assign(data_info, appJson[data[i].appname]))
                      }
                      active_list.push(app_name);
                    }else{
                      arr.push(Object.assign(data_info, appJson[data[i].appname]))
                    }
                  }
                }
                update([...active_list], 'activeList', true);
                update(arr, 'appActiveList', true);
                setAppList(arrHandle(arr));
                main_update(arr[0],'info');
                
            }
        })
  }
  const handleCancel = ()=>{
    setIsAdminIp(false);
  }
	const arrHandle = (arr) => {
		const len = arr.length;
		const list = [];
		if (len >= 3) {
			for (let i = 0; i < 3; i++) {
				if (arr[6 - (3 - i)]) {
					arr[i].number = i * 2 + 1;
					arr[6 - (3 - i)].number = i * 2 + 2
					list.push([arr[i], arr[6 - (3 - i)]])
				} else {
					arr[i].number = i * 2 + 1;
					list.push([arr[i], {}])
				}
			}
		} else {
			// 初始化一定有两个APP，XDR和UAP
			list.push([{
				...arr[0],
				number: 1
			}, {}], [{
				...arr[1],
				number: 3
			}, {}], [{}, {}])
		}
		return list;
	};
	const appHover = ( num, isactive, data) => {
		if (isactive || !data) return;
		if (num === 3 || num === 4) {
			if (!isRight) {
        main_update(50,'showX');
        main_update(0,'clild1');
				main_update(true,'isRight');
			}

		} else if (num === 5 || num === 6) {
      main_update(100,'showX');
      main_update(0,'clild1');
      main_update(100,'clild2');
			// setShowX(100);
			// setClild1(0);
			// setClild2(100);
			main_update(true,'isRight');
		} else if (num === 1 || num === 2) {
			if (isRight) {
        main_update(50,'showX');
        main_update(0,'clild1');
        main_update(300,'clild2');
				// setShowX(50);
				// setClild1(0);
				// setClild2(300);
			}
		}
		setTimeout(() => {
			setImgShowBounce(false);
		}, 200)
		setTimeout(() => {
      main_update(data,'info');
      main_update(num,'childHover');
			setImgShowBounce(true);
		}, 300)
	};
	const appOpenClick = (data) => {
		if (data) {
			const {
				update,
				appList,
				routeList
			} = commonStore;
			const {
				router,
				name
			} = data;
			update(data.name, 'activeName', true);
			if (appList.length) {
				let isExit = false;
				for (let i of appList) {
					if (i.name === name) {
						isExit = true
					}
				}
				if (!isExit) {
					update([...appList, data], 'appList', true)
				}
			} else {
				update([...appList, data], 'appList', true);
			}
			if (routeList[name]) {
				history.push(`${routeList[name]}`); //当点击过后，再点击回到原先的页面，不刷新，否则刷新
			} else {
				history.push(`${router}`);
			}
			update(Object.assign(routeList, {
				[name]: router
			}), 'routeList', true);
		}
	}

	const renderDetail = (arr) => {
		if (arr) {
			const list = String(arr)
				.split('</br>');
			return list.map((v) => (<div key={v}>{v}</div>))
		}
		return <span></span>
	}
	const xdrPlayer = () => {
		commonStore.update(false, 'isDown')
		setIsPlayer(true)
	}
  const showLicese =()=>{
    setIsLicense(true)
  }
	return (
		<div className="main-content">
            <div className="logo">
                <span><h1>奇安信产品解决方案</h1></span>
            </div>
            <div className="center">
            {/* <Spin /> */}
                <div className="center-content">
                    <div className="show" style={{ transition: "transform 500ms cubic-bezier(0.8, 0, 0.2, 1) 0s", transform: `translate(${showX}%, 0)` }}>
                        <div className="top">
                            <div className="card-head">
                                <span className="card-name">{info?.title || ''}</span>
                                {info?.status === 0 && !info?.isSystem ?
                                    (<><div className="card-version">版本：{info?.version}</div><div className="card-version">安装时间：{info?.updateTime}</div></>)
                                    : null}

                            </div>
                            <div className="card-detail">
                                {info?.status === 0 && !info?.isSystem ? <div className="card-detail-title">应用介绍</div> : null}
                                <div className="card-detail-content">
                                    {renderDetail(info?.detail)}
                                </div>
                            </div>
                            {/* <div className="card-bottom">
                                <Icon type="icon-bianzu10" classname="icon" />
                                <span className="ml mr xdr-player" onClick={xdrPlayer}>视频介绍</span>
                                <span className="line"></span>
                                <span className="ml">新的功能介绍</span>
                            </div> */}
                            {imgShowBounce ? <span className={'card-img fadeIn ' + info?.image}></span> : null}
                        </div>

                        {/* {
                                !info.noAcess ? info.isauthorize ?
                                    <div className="bottom-left"><Icon type="icon-qiyong" />
                                        <a className="license" onClick={() => authorizeClick(false)}>查看授权情况</a>
                                    </div> :
                                    <div className="bottom-left"><Icon type="icon-weishouquan" />
                                        <a className="license">暂未授权，前往授权即可使用完整功能。</a>
                                    </div> : <div className="bottom-left"></div>
                            } */}
                        {
                            info?.status === 0 ?
                                <div className="bottom">
                                    <div className="bottom-left"></div>
                                    {(!info?.lic_per) ?
                                        <div className="bottom-right-role bg-role">
                                            <Button type="primary"  onClick={showLicese}>授权</Button>
                                        </div>
                                        :
                                        <div className="bottom-right bg1" onClick={() => { appOpenClick({ name: info.title, router: info.router, icon: info.icon }) }}>
                                            <span className="title">前往打开</span>
                                            <Icon type="icon-lujing13" className="icon" />
                                        </div>
                                    }

                                </div> :
                                info?.status === 1 ? <div className="bottom-no-acess"><Image preview={false} src={messageIcon} />您尚未安装此应用，可以联系奇安信技术支持获取安装包及操作指南。</div> :
                                    <div className="bottom-no-acess">
                                        <Image preview={false} src={messageIcon} />此应用尚未发布，您可以参与到我们的规划中并向我们反馈您的想法。
                                    </div>
                        }

                    </div>
                    {appList.length > 0 && appList.map((v1, k1) => {
                        const translateY = (k1 === 0 ? clild1 : (k1 === 1 ? clild2 : clild3));
                        const key = (k1 === 0 ? (childHover === k1 + 1 || childHover === k1 + 2) : (childHover === (k1 * 2) + 1 || childHover === (k1 * 2) + 2));
                        return <div key={k1} className="chlild " style={{ transition: "transform 500ms cubic-bezier(0.8, 0, 0.2, 1) 0s", transform: `translate(${translateY}%, 0)`, zIndex: `${key ? 99 : 0}` }}>
                            {v1.map((v, k) => {
                                if (v.appname) {
                                    return <div key={v.appname} className={classNames("app hover", { 'app-border': childHover === v?.number })} onClick={() => appHover(v.number, false, v)}>
                                        <div className={classNames("child-app-title", { 'color1': childHover === v?.number, 'color2': childHover !== v?.number })}>{v?.title || ''}{v?.status === 2 ? <span className="child-app-active2">规划中</span> : v?.status === 1 ? <span className="child-app-active1">未安装</span> : null}</div>
                                        <div className="child-app-icon" ><Image preview={false} src={v?.icon} /></div>
                                        <div className="child-app-introduce">{v?.discription || ''}</div>
                                        {childHover === v?.number ? <div className="child-app-background"><Image preview={false} src={v.icon} width={"100%"} height={"100%"} /></div> : null}

                                    </div>
                                } else {
                                    return <div key={k} className={classNames("app app-disable")} onClick={() => appHover(6, true)}>
                                        <div className="child-app-title">敬请期待</div>
                                        <div className="child-app-icon" ><Image preview={false} src={icon6} /></div>
                                        <div>更多能力，敬请期待</div>
                                    </div>
                                }

                            })}
                        </div>
                    })}
                </div>
            </div>
            <div className="footer">
                {commonStore.interfaceSettings.footer ? commonStore.interfaceSettings.footer : `Copyright © ${new Date().getFullYear()} 亚信科技（成都）有限公司 版权所有`}
            </div>
            {isPlayer ? <Modal className="player-wrapper" visible={isPlayer} width="60vw" wrapClassName="main-model" onCancel={() => { setIsPlayer(false) }} centered={true} footer={false}>
                <XdrPlayer url={'https://media.w3.org/2010/05/sintel/trailer.mp4'} />
            </Modal> : null}
        </div>
	);
}

export default inject('commonStore','mainStore','licenseStore')(observer(Main));