
import axios from "../utils/axios.js";
import dayjs from "dayjs";
import { getMarkInfo } from '@services'
const BURIED_MAP = ["/uap/ais/threatoverview", "/uap/ais/xdrorch", "/uap/ais/tdadashboard", "/uap/ais/stategrid"]
const BURIED_MAP_NUM = {
  "/uap/ais/threatoverview": "1",
  "/uap/ais/xdrorch": "2",
  "/uap/ais/tdadashboard": "3",
  "/uap/ais/stategrid": "4"
}

var time = null;
const Buried = (location) => {

  if (BURIED_MAP.includes(location.pathname)) {

    fetch({ "time": dayjs().format('YYYY-MM-DD HH:mm:ss'), "userName": localStorage.getItem('name'), "screenId": BURIED_MAP_NUM[location.pathname] })
    clearInterval(time);
    time = setInterval(() => {
      fetch({ "time": dayjs().format('YYYY-MM-DD HH:mm:ss'), "userName": localStorage.getItem('name'), "screenId": BURIED_MAP_NUM[location.pathname] })
    }, 1000 * 60 * 5)
  } else {
    clearInterval(time)
  }
}
const getTimes = (params)=>{
  getMarkInfo({...params,clickTime:dayjs().format('YYYY-MM-DD HH:mm:ss')})
}

function fetch(params) {
  axios.post(`/xdrmonitor/enterTime`, params)
}

export { Buried,getTimes }