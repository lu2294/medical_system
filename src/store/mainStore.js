import {
  makeAutoObservable
} from 'mobx';
import {  message } from 'antd'
import commonStore from './commonStore'
import {
  getAppList
} from '@services/system'
class Store {
  topTwoData = [];
  topBottomData = [];
  isRight = false;
  showX = 0;
  clild1 = 200;
  clild2 = 300;
  info = {};
  childHover = 1;
  constructor() {
    makeAutoObservable(this);
  }

  updateLocalStorageData = () => {
    localStorage.setItem('localData', JSON.stringify(this.localStorageData))
  }
  getAppList = () => {
    getAppList({
      activePage: 1,
      itemsCountPerPage: 10
    }).then((res) => {
      if (res.code === '200') {
        const data = res.data
        const active_list = [] //已安装的app
        const no_platform_list = {};
        for (let i = 0; i < data.length; i++) {
          const data_info = data[i]
          const app_name = data_info.appname
          if (app_name === 'uap') {
            commonStore.update(data_info, 'appUapMap', true)
          }
          if (app_name === 'xab') {
            commonStore.update(data_info, 'appXabMap', true)
          }
          if (!data_info.status && !['xdr', 'uap'].includes(app_name)) {
            active_list.push(data_info);
            no_platform_list[app_name] = data_info.title;
          }
        }
        commonStore.update([...active_list], 'activeList', true)
        commonStore.update(data, 'appActiveList', true)
        commonStore.update(no_platform_list, 'no_platform', true)
        this.main_update(data.slice(0, 2), 'topTwoData')
        this.main_update(data.slice(2, data.length), 'topBottomData')
      }else{
        message.error(res.message || '服务出错')
      }
    })
  }
  //更新数据，isLocal为是否存在缓存，避免数据刷新，数据丢失
  main_update = (value, key, isLocal) => {
    if (isLocal) {
      this.localStorageData[key] = value;
      this.updateLocalStorageData();
    }
    this[key] = value
  }
}

const store = new Store();
export default store;