import {
  makeAutoObservable
} from 'mobx';
import {
  getUserInfo,
  getInterfaceSettings,
  // loginGetTenant,
} from '../services';
class Store {
  isMain = true;
  isBigScreen = false; //判断是否大屏，如果是全屏展示
  isDown = false;
  appList = []; //header里面子app展示主要的数据
  localStorageData = {};
  activeName = '信池统一安全管理平台';
  updateUapStatus = false;
  appActiveList = [];
  roleId = undefined;
  userId = undefined;
  userInfo = {}; // 储存用户信息,权限信息，角色信息储存
  activeList = []; //状态为0的app
  appPermInfo = {};
  interfaceSettings = {}; //界面设置
  uap_theme = ''; //uap主题色 
  isUap = (localStorage.getItem('isUap') === undefined ? false : JSON.parse(localStorage.getItem('isUap')));
  routeList = {}; //代表子app打开的url，router。实时更新，保证进入的是最新的url,router
  router_key = 'uap';
  is_first_up = false;
  appUapMap = {};
  no_platform = {};
  appXabMap = {};
  currentTenantId = 'root';
  otpFlag = false;
  constructor() {
    makeAutoObservable(this);
    this.setLocalStorageData();
  }

  getUserInfo = async () => {
    getInterfaceSettings().then(v => {
      if (v && v.code === 200) {
        this.update(v.message || {}, "interfaceSettings");
        if (!v.message) {
          this.update('', "uap_theme", true)
        } else {
          this.update(v.message.uap_theme ? v.message.uap_theme : '', "uap_theme", true)
        }
      }
    })


    // loginGetTenant({userId: this.userId}).then(v => {
    //   if(v && v.code === "200") {
    //     this.update(v.data.tenInfo || {}, "tenInfo")
    //   }
    // })
    await getUserInfo().then((v) => {
      if (v.ok) {
        const userInfo = v.data.userInfo || {};
        this.update(userInfo.appPermInfo, 'appPermInfo');
        delete userInfo.token;
        //  delete userInfo.appPermInfo;
        this.update(userInfo, 'userInfo', true);
        this.update(userInfo.roleId, 'roleId', true);
        this.update(userInfo.userId, 'userId', true);
        this.update(userInfo.currentTenantId, 'currentTenantId', true);
        localStorage.setItem('name', userInfo.userId);
      }
    })
  }

  getUserInfoPromise = () => {
    return new Promise(async (rosolve) => {
      await getUserInfo().then((v) => {
        if (v.ok) {
          const userInfo = v.data.userInfo || {};
          rosolve(userInfo)
        }
      })
    })
  }


  updateLocalStorageData = () => {
    localStorage.setItem('localData', JSON.stringify(this.localStorageData))
  }
  // mobx等一些状态管理数据库，  刷新数据后都会清空原有的数据，先采取折中方案，存在本地缓存中
  setLocalStorageData = () => {
    if (localStorage.getItem('localData')) {
      const data = JSON.parse(localStorage.getItem('localData'));
      this.localStorageData = {
        ...data
      }
      Object.keys(data).forEach((v) => {
        this[v] = data[v];
      })
    }
  }
  //更新数据，isLocal为是否存在缓存，避免数据刷新，数据丢失
  update = (value, key, isLocal) => {
    if (isLocal) {
      this.localStorageData[key] = value;
      this.updateLocalStorageData();
    }
    this[key] = value
  }
  updateAppListData = (arr = []) => {
    if (Array.isArray(arr)) {
      this.update(arr, 'appActiveList');
      // const data1 = [];
      const data2 = [];
      for (let i of arr) {
        if (!i.status) {

        }
      }
      // const data2 = arr.filter((v) => (v.status === 0));
      if (data2.length) {
        let appNameList = []
        for (let i = 0; i < data2.length; i++) {
          appNameList.push(data2[i].appname);
        }
        this.update([...appNameList], 'activeList', true);
      } else {
        this.update([], 'activeList', true);
      }

    }
  }
}

const store = new Store();
export default store;