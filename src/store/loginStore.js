import { makeAutoObservable } from "mobx"
// import { login } from '../services'

class Store {
  isLogin = localStorage.getItem("name") && localStorage.getItem("token")
  username = localStorage.getItem("name") || ""
  overTime_flag = false
  constructor() {
    makeAutoObservable(this)
  }
  update = (value, key) => {
    this[key] = value
  }

  timeOutPwd = (validDays, psdUpdateTime) => {
    let curTime = new Date()
    let lastUpdateTime = new Date(psdUpdateTime)
    lastUpdateTime.setDate(lastUpdateTime.getDate() + validDays)
    const diff_time =
      (lastUpdateTime.getTime() - curTime.getTime()) / (1000 * 60 * 60 * 24)
    const validTime = validDays / 10
    if (diff_time <= validTime) {
      this.overTime_flag = true
    }
    // this.isFirst = true;
  }
  // login = async (params) => {
  //     const res = await login(params);
  //     return res.data
  // }
}

const store = new Store()
export default store
