import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { Descriptions, Input, Alert, message, Modal, Spin, Popover,Image } from 'antd'
import { useHistory } from 'react-router-dom'
import { getTimes } from 'utils/buried.js'
import { updateUser } from '@services/accountAuthority.js'
import { errCode } from 'utils/constant'
import { checkIP } from 'utils/utils'
import { getImportAcProfile } from '../../services/license'
// import XdrPlayer from '@components/player'
import { RouteFunction } from 'utils/routes'
import Icon from '@components/icon'
// import icon1 from 'images/icon1.svg';
// import icon2 from 'images/icon2.svg';
// import icon3 from 'images/icon3.svg';
import xdr_icon from 'images/main/h_xdr.png'
import uap_icon from 'images/main/h_uap.png'
import aep_icon from 'images/main/h_aep.png'
import tdp_icon from 'images/main/h_tdp.png'
import dsp_icon from 'images/main/h_dsp.png'
import esm_icon from 'images/main/h_esm.png'
import xab_icon from 'images/main/h_xab.png'
import xab_use from 'images/xab/xab_use.svg'
import './index.less'
import { InfoCircleOutlined } from '@ant-design/icons'

const main_icon = {
	xdr: xdr_icon,
	uap: uap_icon,
	aep: aep_icon,
	tdp: tdp_icon,
	dsp: dsp_icon,
	esm: esm_icon,
	xab: xab_icon
}
const Main = ({ commonStore, mainStore, licenseStore }) => {
	const history = useHistory()
	const { licenseCode } = licenseStore
	const { topTwoData, topBottomData } = mainStore
	const [ isAdminIp, setIsAdminIp ] = useState(false)
	const [ adminIp, setAdminIp ] = useState('')
	const [ isLicense, setIsLicense ] = useState(false)
	const [ isSpinLoading, setIsSpinLoading ] = useState(false)
	// const [ topTwoData, setTopTwoData ] = useState([])
	// const [ topBottomData, setTopBottomData ] = useState([])
	useEffect(() => {
		const _init = async () => {
			await _getLicense()
			await _getAppList()
		}
		_init()
	}, []) // eslint-disable-line
	const _getAppList = async () => {
		setIsSpinLoading(true)
		await mainStore.getAppList()
		setIsSpinLoading(false)
	}
	const _getLicense = async () => {
		const res = await licenseStore.getAllLicense('all', 'platform')
		if (res && res.code === '200') {
			const res1 = res.data
			_setAdminIp(res1['uap'])
		}
	}
	const _setAdminIp = (licenInfo) => {
		if (!commonStore.is_first_up && (licenInfo && licenInfo.code === '200')) {
			commonStore.getUserInfoPromise().then((res) => {
				if (res.userId === 'admin' && !res.checkIpEnable) {
					setIsAdminIp(true)
					commonStore.update(true, 'is_first_up', true)
				}
			})
		}
	}
	const handleCancel = () => {
		setIsAdminIp(false)
	}
	const ipChange = (e) => {
		setAdminIp(e.target.value)
	}
	const handleIpOk = () => {
		if (adminIp) {
			let data = adminIp.split(';')
			let data1 = []
			data.forEach((item) => {
				item.split('-').map((item_) => data1.push(item_))
			})
			let flag = false
			for (let i = 0; i < data1.length; i++) {
				if (!checkIP(data1[i])) {
					message.error('IP格式有误')
					flag = true
					break
				}
			}
			if (flag) {
				return
			} else {
				updateUser({ userId: 'admin', checkIpEnable: 1, checkIpDesc: adminIp }).then((res) => {
					if (res && res.ok) {
						setIsAdminIp(false)
						message.success('Admin绑定IP成功')
					} else {
						message.error(errCode[res.reason])
					}
				})
			}
		} else {
			message.error('IP不能为空')
		}
	}
	const appOpenClick = (data) => {
		if (data) {
			const { update, appList, routeList, appPermInfo,roleId } = commonStore
			const { router, name, appname } = data
			if (!router || (roleId !== 'admin' && (!appPermInfo[appname] || JSON.stringify(appPermInfo[appname]) === '{}'))) {
				message.error(`应用错误或该账号暂无权限访问${name}!`)
				return
			}
			if (appList.length) {
				let isExit = false
				for (let i of appList) {
					if (i.appname === appname) {
						isExit = true
					}
				}
				if (!isExit) {
					update([ ...appList, data ], 'appList', true)
				}
			} else {
				update([ ...appList, data ], 'appList', true)
			}
			getTimes({ moduleName: appname, category: 1 })
			if (routeList[appname]) {
				history.push(`${routeList[appname]}`) //当点击过后，再点击回到原先的页面，不刷新，否则刷新
			} else {
				history.push(`${router}`)
			}
			update(data.name, 'activeName', true)
			update(
				Object.assign(routeList, {
					[appname]: router
				}),
				'routeList',
				true
			)
		}
	}
	const showLicese = () => {
		setIsLicense(true)
	}
	const importLicense = ({ acProfile }) => {
		if (acProfile) {
			getImportAcProfile({ platformType: 'platform', acProfile }).then((v) => {
				if (v.code === '200') {
					_getLicense()
					setIsLicense(false)
					message.success('授权成功！')
				} else {
					message.error(v.message)
				}
			})
		}
	}
	const popoverContent = (
		<div className="checkIpDescPopover">
			<p>请输入绑定IP地址或IP段，多个可用;间隔</p>
			<p>例：10.21.11.1;10.12.10.8</p>
			<p>&nbsp; &nbsp; &nbsp; &nbsp;10.13.2.2-10.43.2.1;10.13.2.1-10.43.8.4</p>
		</div>
	)
	return (
		<div className="xdr_main_content">
			<Spin spinning={isSpinLoading} className="xdr_main_loading" />
			<div className="xdr_main_logo">
				<span>
					<h1>安全管理平台产品解决方案</h1>
				</span>
			</div>
			<div className="xdr_main_device" />
			<div className="xdr_main_center">
				<div className="xdr_main_center_top">
					<div className="xdr_main_center_top2">
						{topTwoData.length > 0 &&
							topTwoData.map((item) => {
								const item_license = licenseCode[item.appname]
								const { appname, title, status, discription, router } = item
								let item_status = 'update'
								let item_router = router
								if (appname === 'xdr' || appname === 'uap') {
									item_router = new RouteFunction(appname).get_first_router()
								}
								if (!status) {
									if (item_license && item_license['lic_per']) {
										item_status = 'active'
									} else {
										item_status = 'licesne'
									}
									if (appname === 'xab') item_status = 'active'
								}
								return (
									<div
										onClick={() => {
											if (!status && item_status === 'active') {
												appOpenClick({
													name: title,
													router: item_router,
													icon: main_icon[appname],
													appname
												})
											} else if (!status && item_status === 'licesne' && appname === 'uap') {
												showLicese()
											}
										}}
										className={`xdr_main_center_top2_content xdr_main_center_top2_content_${item_status}`}
										key={appname}
									>
										<div className={`xdr_main_center_top2_content_img xdr_main_${appname}`} />
										<div
											className={`xdr_main_center_top2_content_c xdr_main_center_top2_content_c_${appname}`}
										>
											<span className={`xdr_main_center_top2_content_icon xdr_${item_status}`} />
											<p className="xdr_main_center_top2_content_title">{title}</p>
											{!status ? item_status === 'active' ? (
												<a>
													<span className="xdr_main_center_top2_content_tips">
														{discription}
													</span>
													<Icon
														type="icon-lujing13"
														classname="xdr_main_center_top2_content_jump"
													/>
												</a>
											) : appname === 'uap' ? (
												<a>
													<span className="xdr_main_center_top2_content_tips">
														{discription}
													</span>
													<Icon
														type="icon-lujing13"
														classname="xdr_main_center_top2_content_jump"
													/>
												</a>
											) : (
												<span className="xdr_main_center_show2">{discription}</span>
											) : (
												<span className="xdr_main_center_show">{discription}</span>
											)}
										</div>
									</div>
								)
							})}
					</div>
				</div>
				<div className="xdr_main_center_bottom">
					{topBottomData.length > 0 &&
						topBottomData.map((item) => {
							const item_license = licenseCode[item.appname]
							const { appname, title, status, discription, router } = item
							let item_status = 'update'
							let item_router = router
							if (appname === 'xdr' || appname === 'uap') {
								item_router = new RouteFunction(appname).get_first_router()
							}
							if (!status) {
								if (item_license && item_license['lic_per']) {
									item_status = 'active'
								} else {
									item_status = 'licesne'
								}
								if (appname === 'xab') item_status = 'active'
							}
							return (
								<div
									onClick={() => {
										if (!status && item_status === 'active') {
											appOpenClick({
												name: title,
												router: item_router,
												icon: main_icon[appname],
												appname
											})
										} else if (!status && item_status === 'licesne' && appname === 'uap') {
											showLicese()
										}
									}}
									className={`xdr_main_center_bottom_content_item xdr_main_center_bottom_content_item_${item_status}`}
									key={appname}
								>
									<span className={`xdr_main_center_item_icon xdr_${item_status}`} />
									<div className={`xdr_main_center_item_img xdr_main_${appname}`} />
									<p className="xdr_main_center_item_title">{title}</p>
									{!status ? item_status === 'active' ? (
										<a>
											<span className="xdr_main_center_top2_content_tips">{discription}</span>
											<Icon type="icon-lujing13" classname="xdr_main_center_item_jump" />
                      {appname === 'xab' ? <div className='xab_use_image'><Image src={xab_use} /> </div>: null}
										</a>
									) : appname === 'uap' ? (
										<a>
											<span className="xdr_main_center_top2_content_tips">{discription}</span>
											<Icon type="icon-lujing13" classname="xdr_main_center_item_jump" />
										</a>
									) : (
										<span className="xdr_main_center_show1">{discription}</span>
									) : (
										<span className="xdr_main_center_show1">{discription}</span>
									)}
								</div>
							)
						})}
				</div>
			</div>
			<div className="xdr_main_footer">
				{commonStore.interfaceSettings.footer ? (
					commonStore.interfaceSettings.footer
				) : (
					`Copyright © ${new Date().getFullYear()} 亚信科技（成都）有限公司 版权所有`
				)}
			</div>
			{isAdminIp ? (
				<Modal
					className="admin-ip-tip"
					title="绑定IP地址"
					visible={true}
					closable={false}
					onOk={handleIpOk}
					onCancel={handleCancel}
				>
					<Alert message="Admin为超级管理员，具有全部权限，建议对IP或者IP段进行限制！" banner />
					<Descriptions column={1}>
						<Descriptions.Item label="IP地址" style={{ lineHeight: '32px' }}>
							<Input
								style={{ width: 380 }}
								value={adminIp}
								placeholder="请输入绑定IP地址或IP段，多个可用;间隔"
								onChange={ipChange}
							/>
							<Popover content={popoverContent}>
								&nbsp;&nbsp;<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
							</Popover>
						</Descriptions.Item>
					</Descriptions>
				</Modal>
			) : null}
		</div>
	)
}

export default inject('commonStore', 'mainStore', 'licenseStore')(observer(Main))
