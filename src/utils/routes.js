const route_List = {
  'uap': [{
      keys: '1',
      icon: 'icon-bingdufanghu',
      name: '安全总览',
      perId: 'safetyOverview',
      isSubMenu: true,
      children: [{
        keys: '/scene/threatOverview',
        name: '威胁总览仪表盘'
      }]
    },
    {
      keys: '2',
      icon: 'icon-shijianhebaogao',
      name: '日志中心',
      perId: 'logCenter',
      isSubMenu: true,
      children: [
        {
          keys: '2-1',
          name: '快捷查询',
          isSubMenu: true,
          children: [{
            keys: '/scene/query?is_type=anti_extortion',
            icon: 'icon-lingxing',
            name: '勒索攻击'
          }, {
            keys: '/scene/query?is_type=cyber_attack',
            icon: 'icon-lingxing',
            name: '网络攻击'
          }, {
            keys: '/scene/query?is_type=weak_pw',
            icon: 'icon-lingxing',
            name: '弱口令'
          }, {
            keys: '/scene/query?is_type=mining_virus',
            icon: 'icon-lingxing',
            name: '挖矿事件'
          }, {
            keys: '/scene/query?is_type=anti_virus',
            icon: 'icon-lingxing',
            name: '恶意程序'
          }, {
            keys: '/scene/query?is_type=web_reputation',
            icon: 'icon-lingxing',
            name: 'Web信誉'
          }, {
            keys: '/scene/query?is_type=anti_brute_force_cracking',
            icon: 'icon-lingxing',
            name: '防暴力破解'
          }, {
            keys: '/scene/query?is_type=integrity_monitoring',
            icon: 'icon-lingxing',
            name: '完整性监控'
          }, {
            keys: '/scene/query?is_type=log_review',
            icon: 'icon-lingxing',
            name: '日志审查'
          }, {
            keys: '/scene/query?is_type=application_control',
            icon: 'icon-lingxing',
            name: '应用程序控制'
          }, {
            keys: '/scene/query?is_type=risks_violations',
            icon: 'icon-lingxing',
            name: '风险/违规'
          }]
        },
        {
          keys: '/scene/squery',
          name: '高级查询'
        },
        {
          keys: '/system/audit',
          name: '系统日志'
        }
      ]
    },
    {
      keys: '3',
      icon: 'icon-jingbao',
      name: '告警管理',
      perId: 'alarmCenter',
      isSubMenu: true,
      children: [{
        keys: '/uap/ais/alarmmanage?is_type=ALARM_RULES',
        name: '告警规则'
      }, {
        keys: '/uap/ais/alarmmanage?is_type=ALARM_HISTORY',
        name: '告警记录'
      }],
      authority: false //不做校验
    },
    {
      keys: '4',
      icon: 'icon-kehuduan',
      name: '产品中心',
      perId: 'productCatalog',
      isSubMenu: true,
      children: [{
          keys: '/system/assetManage',
          name: '产品管理'
        }, {
          keys: '/uap/ais/patchlist',
          name: '产品补丁'
        }
        // ,
        // {
        //   keys: '/uap/ais/remotemanage',
        //   name: '设备管理'
        // }
      ]
    },
    {
      keys: '/eum/tactics',
      icon: 'icon-celve',
      name: '策略同步',
      perId: 'policySynchronization'
    },
    {
      keys: '/uap/ais/activeupdate',
      perId: 'featureCenter',
      icon: 'icon-wangluojiqiren',
      name: '特征中心',
    },
    {
      keys: '10',
      perId: 'unifiedAuthorization',
      icon: 'icon-ruokoulingjiance',
      name: '统一授权',
      is_root_show: true,
      isSubMenu: true,
      children: [{
          keys: '/system/productLicense',
          name: '产品授权'
        },
        {
          keys: '/system/license',
          name: '系统授权'
        }
      ]
    },
    {
      keys: '6',
      icon: 'icon-shouquanxiangqing',
      name: '报表中心',
      perId: 'reportCenter',
      isSubMenu: true,
      children: [{
        keys: '/uap/ais/reports?is_type=XDR',
        name: 'XDR报表'
      }, {
        keys: '/uap/ais/reports?is_type=TDA',
        name: '深度威胁发现报表'
      }, {
        keys: '/uap/ais/reports?is_type=THREAT',
        name: 'NDR报表'
      }, {
        keys: '/uap/ais/reports?is_type=VIRUS',
        name: '终端病毒报表'
      }]
    },
    {
      keys: '5',
      icon: 'icon-shezhi',
      name: '系统管理',
      isSubMenu: true,
      perId: 'systemManagement',
      children: [{
          keys: '5-1',
          name: '系统设置',
          children: [{
              keys: '/system/interfaceSettings',
              is_root_show: true,
              icon: 'icon-lingxing',
              name: '界面设置'
            },
            {
              keys: '/uap/ais/config?is_type=proxy',
              is_root_show: true,
              icon: 'icon-lingxing',
              name: '代理设置',
            },
            {
              keys: '/uap/ais/config?is_type=email',
              is_root_show: true,
              icon: 'icon-lingxing',
              name: '邮件设置',
            },
            {
              keys: '/uap/ais/config?is_type=receivers',
              icon: 'icon-lingxing',
              name: '联系人',
            },
            {
              keys: '/system/logoutput',
              icon: 'icon-lingxing',
              name: '日志外发'
            },
          ]
        },
        {
          keys: '/system/organize',
          name: '组织管理'
        },
        {
          keys: '5-2',
          name: '账号管理',
          children: [{
              keys: '/system/accountManage',
              icon: 'icon-lingxing',
              name: '用户管理'
            },
            {
              keys: '/system/accountAuthority',
              icon: 'icon-lingxing',
              name: '角色权限'
            },
            {
              keys: '/system/accountPW',
              icon: 'icon-lingxing',
              name: '密码策略'
            }
          ]
        },
        {
          keys: '/system/secretkey',
          name: '密钥管理',
        },
        // {
        //   keys:'/uap/ais/authenticationmanage',
        //   name: '白名单'
        // },
        {
          keys: '5-3',
          is_root_show: true,
          name: '系统维护',
          children: [{
              keys: '/system/fileconfig',
              icon: 'icon-lingxing',
              name: '日志归档'
            },
            {
              keys: '/uap/ais/logstream',
              icon: 'icon-lingxing',
              name: '系统监控'
            },
            {
              keys: '/system/inputMonitor',
              icon: 'icon-lingxing',
              name: '日志输入监控'
            }
          ]
        },
        {
          keys: '/uap/ais/about',
          is_root_show: true,
          name: '关于'
        }
      ]
    }
  ],
  'xdr': [{
      keys: '7',
      icon: 'icon-loudongguanli',
      name: '安全分析',
      perId: 'safetyAnalysis',
      isSubMenu: true,
      children: [{
        keys: '/scene/exploit?is_type=1',
        name: '勒索治理'
      }, {
        keys: '/scene/exploit?is_type=2',
        name: '挖矿治理'
      }, {
        keys: '/scene/exploit?is_type=3',
        name: '邮件威胁'
      }]

    },
    {
      keys: '/scene/search',
      icon: 'icon-shijianhebaogao',
      name: '智能搜索',
      perId: 'intelligentSearch'
    },
    {
      keys: '8',
      icon: 'icon-jiancexiangying',
      name: '调查取证',
      isSubMenu: true,
      perId: 'investigation',
      children: [{
        keys: '/uap/ais/seniorbacktrack?is_type=ctdi_analyse',
        name: '威胁分析'
      }, {
        keys: '/uap/ais/seniorbacktrack?is_type=ctdi_analyse_history',
        name: '分析历史'
      }]
    },
    {
      keys: '/scene/dispose',
      icon: 'icon-zhongduanchuzhi',
      name: '处置中心',
      perId: 'disposalCenter'
    },
    {
      keys: '9',
      icon: 'icon-gaojiweixie',
      name: '威胁情报',
      isSubMenu: true,
      perId: 'threatGovernance',
      children: [{
        keys: '/uap/ais/threatgov',
        name: '本地威胁情报管理'
      }, {
        // keys: '/uap/ais/tip',
        keys: "/system/comingSoon",
        name: '云端威胁情报查询'
      }]
    },
  ]
}
const audit_router_list = [{
  keys: '2',
  icon: 'icon-key2',
  name: '日志中心',
  perId: 'logCenter',
  isSubMenu: true,
  children: [{
    keys: '/system/audit',
    name: '系统日志'
  }]
}];
const local_router_data = {}
export class RouteFunction {
  constructor(key) {

    this.key = key;
  }
  update_localStorage = (key, value) => {
    local_router_data[key] = value;
    localStorage.setItem('local_router_data', JSON.stringify(local_router_data));
  }
  #get_filter_router = () => {
    const localData = JSON.parse(localStorage.getItem('localData'));
    const userInfo = localData.userInfo;
    if (userInfo.appPermInfo) {
      const appPermInfo = userInfo.appPermInfo;
      const is_key = appPermInfo[this.key] || {};
      const key_list = {};
      if (JSON.stringify(is_key) !== '{}') {
        for (let i in appPermInfo[this.key]) {
          key_list[i] = true
        }
      }
      const filter_list = route_List[this.key].filter((a) => {
        return (key_list[a.perId])
      })
      return filter_list
    }
  }
  get_first_router = () => {
    const local_router = JSON.parse(localStorage.getItem('local_router_data'));
    if (local_router && local_router[`${this.key}_url`]) return local_router[`${this.key}_url`];
    const list = this.renderRouteList(this.key) || [];
    let url = '';
    if (Array.isArray(list) && list.length) {
      const first = list[0];
      if (first.children) {
        const second = first.children[0];
        if (second.children) {
          const three = second.children[0];
          url = three['keys']
        } else {
          url = second['keys']
        }
      } else {
        url = first['keys']
      }
    }
    this.update_localStorage(`${this.key}_url`, url);
    return url
  }
  renderRouteList = () => {
    const localData = JSON.parse(localStorage.getItem('localData')) || {};
    const local_router = JSON.parse(localStorage.getItem('local_router_data'));
    if (local_router && local_router[this.key]) return local_router[this.key];
    if (!localData?.userInfo?.roleId) return;
    const userInfo = localData?.userInfo || {};
    const roleId = userInfo.roleId || 'admin';
    if (roleId === 'admin') {
      this.update_localStorage(this.key, route_List[this.key]);
      return route_List[this.key]
    };
    if (roleId === 'audit') {
      const list = (this.key === 'uap' ? [...audit_router_list] : [])
      this.update_localStorage(this.key, list);
      return list;
    };
    const list1 = this.#get_filter_router(this.key);
    this.update_localStorage(this.key, list1);
    return list1;
  }
}
// const update_localStorage = (key,value)=>{
//   local_router_data[key] = value;
//   localStorage.setItem('local_router_data',JSON.stringify(local_router_data));
// }
// const get_filter_router = (key) => {
//   const localData = JSON.parse(localStorage.getItem('localData'));
//   const userInfo = localData.userInfo;
//   if (userInfo.appPermInfo) {
//     const appPermInfo = userInfo.appPermInfo;
//     const is_key = appPermInfo[key] || {};
//     const key_list = {};
//     if (JSON.stringify(is_key) !== '{}') {
//       for (let i in appPermInfo[key]) {
//         key_list[i] = true
//       }
//     }
//     const filter_list =   route_List[key].filter((a) => {
//       return(key_list[a.perId])       
//     })
//     return filter_list
//   }
// }
// const get_first_router = (key) => {
//   const local_router = JSON.parse(localStorage.getItem('local_router_data'));
//   if(local_router && local_router[`${key}_url`])return local_router[`${key}_url`];
//   const list = renderRouteList(key) || [];
//   let url = '';
//   if (Array.isArray(list) && list.length) {
//     const first = list[0];
//     if (first.children) {
//       const second = first.children[0];
//       if (second.children) {
//         const three = second.children[0];
//         url = three['keys']
//       } else {
//         url = second['keys']
//       }
//     } else {
//       url = first['keys']
//     }
//   }
//   update_localStorage(`${key}_url`,url);
//   return url
// }
// const renderRouteList = (key = 'uap') => {
//   const localData = JSON.parse(localStorage.getItem('localData')) || {};
//   const local_router = JSON.parse(localStorage.getItem('local_router_data'));
//   if(local_router && local_router[key])return local_router[key];
//   if (!localData?.userInfo?.roleId) return;
//   const userInfo = localData?.userInfo || {};
//   const roleId = userInfo.roleId || 'admin';
//   if (roleId === 'admin') {
//     update_localStorage(key,route_List[key]);  
//     return route_List[key]
//   };
//   if (roleId === 'audit'){
//     const list = (key === 'uap' ? [...audit_router_list] : [])
//     update_localStorage(key,list);  
//     return list;
//   };
//   const list1 = get_filter_router(key);
//   update_localStorage(key,list1);  
//   return list1;
// }

// export {
//   route_List,
//   renderRouteList,
//   get_first_router
// }