import {
  makeAutoObservable,runInAction
} from 'mobx';
// import {
//   message
// } from 'antd';
import {
  license_code,
  expire_license_map
} from 'utils/constant';
import {
  getaAcProfileInfo,
  getServiceTag
} from '../services/license';
class Store {
  platformCode = {}; //用于平台主页的
  licenseInfo = {};
  licenseCode = {};
  serviceTag = {};
  constructor() {
    makeAutoObservable(this);
    // this.init()
    // this.setLocalStorageData();
  }
  updateAllLicense() {
    this.licenseCode = {};
    this.getAllLicense('all');
  }

  getAllLicense(moduleType, platformType = 'platform', is_fetch = true) {
    return new Promise((resolve, reject) => {
      // if(JSON.stringify(this.licenseCode) !== "{}" && is_fetch){resolve({
      //   code: '200',
      //   data: this.licenseCode
      // });return;}
      getaAcProfileInfo({
        platformType,
        moduleType
      }).then((res) => {
        const {
          code,
          data
        } = res;
        if (code === '200') {
          const data1 = {}
          for (let key in data) {
            this.license_info = {
              ...this.license_info,
              moduleType: data[key]
            };
            data1[key] = {
              code: data[key].code,
              message: data[key].message,
              lic_per: license_code[data[key].code] || false
            }
            // data1[key] = {code: data[key].code,message:data[key].message,lic_per:true}
          }
          runInAction(()=>{this.licenseCode = data1})
          resolve({
            code: '200',
            data: data1
          })
        } else {
          resolve({
            code: '201'
          })
        }

      })
    })
  }
  getLicense(moduleType, platformType = 'platform') {
    return new Promise((resolve, reject) => {
      if (this.licenseCode && this.licenseCode[moduleType]) {
        resolve(this.licenseCode[moduleType]);
        this.getLicenseExpire(moduleType);
        return
      }
      getaAcProfileInfo({
        platformType,
        moduleType
      }).then((res) => {
        const {
          code,
          data
        } = res;
        this.license_info = {
          ...this.license_info,
          moduleType: data
        };
        this.licenseCode[moduleType] = {
          code,
          message: res.message,
          lic_per: license_code[code] || false
        };
        // this.licenseCode[moduleType] = {code,message:res.message,lic_per:true};
        if (license_code[code]) {
          resolve({
            code,
            message: res.message,
            lic_per: true
          })
        } else {
          resolve({
            code,
            message: res.message,
            lic_per: false
          })
        }
      }).finally(() => {
        this.getLicenseExpire(moduleType)
      })
    })
  }
  // 判断是否过期
  getLicenseExpire(moduleType) {
    if (this.licenseCode[moduleType] && expire_license_map[this.licenseCode[moduleType].code]) {
      window[`license_${moduleType}`] = false
      return false
    }
    window[`license_${moduleType}`] = true
    return true
  }
  getServiceTag() {
    if (JSON.stringify(this.serviceTag) !== "{}") return;
    getServiceTag().then(res => {
      if (res.code === "200") {
        runInAction(()=>{this.serviceTag = res.data})
      } else {
        runInAction(()=>{this.serviceTag = {}})
      }
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

}

const store = new Store();
export default store;