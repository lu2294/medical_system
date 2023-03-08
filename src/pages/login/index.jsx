import React, { useState, useEffect, useRef} from 'react'
import { Input, Button, Form, Alert, Select, Modal, Tooltip, message, Checkbox } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { UserOutlined, LockOutlined, ApartmentOutlined } from '@ant-design/icons'
import { observer, inject } from 'mobx-react'
import Icon from '@components/icon'
import { aesDecrypt } from 'utils/cryptor'
import { errCode, tokenTypeList} from 'utils/constant'
import dayjs from 'dayjs'
import { login, changePwd, loginGetTenant, getSecretInfo, setSecretInfo, getOtpKey, bindOtp, getUserDetail, validateLogin} from '../../services'
import './index.less'
const { Option } = Select

const App = ({ loginStore, commonStore }) => {
	const history = useHistory()
	const [errorMessage, setErrorMessage] = useState('')
	const [error, setError] = useState(false)
	const [origionList, setOrigionList] = useState([])
	const [isChangePassWord, setIsChangePassWord] = useState(false)
	const location = useLocation()
	const [userName, setUserName] = useState('')
	const [psdMinLen, setPsdMinLen] = useState('8')
	const [readCheck, setReadCheck] = useState(false);
	const [agreeFlag, setAgreeFlag] = useState(true);
	const [isFirstBindQRcode, setIsFirstBindQRcode] = useState(false);
	const [otpFlagIsVisibleFirstLogin, setOtpFlagIsVisibleFirstLogin] = useState(false)
	const [otpFlagIsVisibleSecondLogin, setOtpFlagIsVisibleSecondLogin] = useState(false)
	const [form] = Form.useForm()
	const [form1] = Form.useForm()

	const [otpFlag, setOtpFlag ] = useState("AIS-OTP") //令牌类型
	const [otpFlagKey, setOtpFlagKey ] = useState("") //令牌内容
	const [loadings, setLoadings] = useState([]);  //获取激活码
	// const [clickTimes, setClickTimes] = useState(0);  //第几次点击绑定按钮
	const [curSecond, setCurSecond] = useState(10); //第一次点击绑定，设置倒计时
	const [verificationCode, setVerificationCode] = useState(""); //令牌验证码

	const onFinish = async (values) => {
		setUserName('');
		const params = { ...values, usrpsd: aesDecrypt(values.usrpsd) }
		const res = await login({ ...params })
		if (res.code === 200) {
			const data = res.data || {}
			// delete data.token
			if (data.token) { // 安全基线，抓包delete token
				localStorage.setItem('token', data && data.token)
				localStorage.setItem('name', data && data.name)
				loginStore.update(data.name, 'username',true)
        history.push('/')
			} else {
				message.error('登陆出错或暂无此用户');
			}
		} else {
			message.error('登陆出错或暂无此用户')
		}
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	const onClose = () => {
		setError(false)
	}
	const userNameBlur = (e) => {
		const userId = e.target.value
		setOrigionList([])
		if (userId && userId.trim() !== '') {
			loginGetTenant({ userId }).then((v) => {
				if (v.ok) {
					setOrigionList(v.data.tenInfo || [])
				} else {
					form.setFields([{ name: 'userId', errors: [`${errCode[v.reason]}`] }])
				}
			})
		}
	}
	const handleOk = () => {
		form1.validateFields().then((values) => {
			if (!values) return
			const params = {
				reNewPsd: aesDecrypt(values.reNewPsd),
				newPsd: aesDecrypt(values.newPsd),
				oldPsd: aesDecrypt(values.oldPsd)
			}
			changePwd(params).then((v) => {
				if (v && v.ok) {
					setUserName('')
					setIsChangePassWord(false)
          onFinish({...form.getFieldsValue(),usrpsd:values.newPsd})
					// form.setFieldsValue({ usrpsd: '' })
					// message.success('修改成功,请重新登录')
				} else {
					message.error(errCode[v.reason] || '修改失败')
				}
			})
		})
	}
	const userNameChange = () => {
		form.setFieldsValue({ tenantId: undefined })
	}

	return (
		<div className="main-login">
			<div className="container">
				<div className="ais-login-lefticon" />
				<div className="ais-login-leftlogo">
					<h1>管理平台</h1>
				</div>
				<div className="ais-login-leftform">
					{error ? (
						<Alert message={errorMessage} type="error" closable onClose={onClose} className="login-error" />
					) : null}
					<Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
						<Form.Item name="userId" rules={[{ required: true, message: '请输入账号' }]}>
							<Input
								size="large"
								onBlur={userNameBlur}
								onChange={userNameChange}
								className="login-user-name"
								autoComplete="new-password"
								autoFocus
								placeholder="&nbsp;&nbsp;账号"
								prefix={<UserOutlined className="site-form-item-icon" />}
							/>
						</Form.Item>
						<Form.Item name="usrpsd" rules={[{ required: true, message: '请输入密码' }]}>
							<Input
								type="password"
								className="login-user-name"
								size="large"
								autoComplete="new-password"
								placeholder="&nbsp;&nbsp;密码"
								prefix={<LockOutlined className="site-form-item-icon" />}
							/>
						</Form.Item>
						<Form.Item>
							<Button htmlType="submit" className="login-button">
								{' '}
								登 录
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className="login-right" />
			<div className="login-bottom">
				<div />
			</div>
		</div>
	)
}

export default inject('loginStore','commonStore')(observer(App))
