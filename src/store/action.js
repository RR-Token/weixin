import axios from 'axios'

// 获取用户信息
let host = 'https://api.rrtoken.tech'

axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log(error)
    // 这里会拦截401，重新授权
    getAuth();
    return Promise.resolve(error);
})
// 获取微信授权信息，跳转到网站
export const getAuth = () => {
    // 用于授权的apid
    let appid = 'wxad6f9eeeede1e65b'
    // 授权成功后重定向的地址
    let redirect_uri = 'https://mindflow.pro/login/rrtoken'
    // 标识
    let wx_state = 'rrtoken-mp'
    // 登录授权链接
    let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${wx_state}#wechat_redirect`

    // 清除现有token
    // window.localStorage.removeItem('token');
    // 重新拉取授权
    if(!window.localStorage.getItem('token')) {
        alert('准备授权：：：：'+authUrl)
        // window.location.href = authUrl;
    } else {
        alert('授权成功：：:'+window.localStorage.getItem('token'));
    }
}
// 授权成功后缓存token
let _token = window.location.search.split('=')[1];
_token && _token.length > 0 && window.localStorage.setItem('token', window.location.search.split('=')[1]);
// _token && _token.length > 0 && window.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjgwZjY0MWU1NWE4ZDAwMGYzYWFlNTQiLCJpYXQiOjE1MzUxNzkwNjUsImV4cCI6MTUzNzc3MTA2NX0.ywed69aVOgYPBkC7WYmySpAtRfsyLXCq7BNzboL2N68');
// _token && _token.length > 0 && window.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc5MWNmMDM1MDk5NzAwMGYwNjc4ZTAiLCJpYXQiOjE1MzQ5NTEwMTMsImV4cCI6MTUzNzU0MzAxM30.RYP-Ij0IRMzheWbqGYIthDv7SMUqwihDcWrcrREJIu8');
console.log('action.js:token>>>>>>>>>', window.localStorage.getItem('token'));

// 获取指定的用户信息
export const getOthers = ({dispatch, commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/user/${params.uid}`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
        }).then(res => {
            resolve(res.data);
        })
    });
    // 获取费用信息
}

// 获取用户信息
export const getUser = ({dispatch, commit, state}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/user/me`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            }
        }).then(res => {
            // 缓存用户信息
            commit('getUser', res.data);

            // 获取用户的token列表
            dispatch('getTokenList', {
                token: state.token,
                id: state.loginUser._id
            });
            // 获取费用信息
            dispatch('getInfo');

            dispatch('getQRForApp', {
                id: state.loginUser._id
            }).then(res => {
                commit('getQRUrl', res.qrcodeurl)
            });
            resolve();
        })
    });
    // 获取费用信息
}

// 获取我发布的列表
export const getTokenList = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/token`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                user: params.id,
                _sort: 'createdAt:DESC'
            }
        }).then(res => {
            commit('getTokenList', res.data);
            resolve();
        })
    });
}

// 通证详情
export const getTokenDetail = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/token/${params.id}`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            }
        }).then(res => {
            commit('getTokenDetail', res.data);
            resolve(res.data);
        })
    });
}

// 获取粉丝
export const getLiker = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/balance`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                token: params.id,
                _sort: 'createdAt:DESC'
            }
        }).then(res => {
            commit('getLiker', res.data);
            resolve();
        })
    });
}

// 获取余额的流程：现获取symbol，通过symbol获取tokenid，通过tokenid获取余额
// 获取余额
export const getBalance = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        // 获取symbol
        axios.get(`${host}/token`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: params
        }).then(res => {
            commit('setTokenId', res.data[0]._id);
            axios.get(`${host}/balance`, {
                headers: {
                    'Authorization': 'Bearer ' + state.token
                },
                params: {
                    user: state.loginUser._id,
                    token: res.data[0]._id
                }
            }).then(res1 => {
                commit('addToken', res.data[0]);
                resolve(res1.data[0]);
            })
        })
    });
}

// 发布token
export const addToken = ({commit, state}, params) => {
    console.log('-----------------', params.token);
    return new Promise((resolve, reject) => {
        axios.post(`${host}/token`, {
            name: params.name,
            symbol: params.symbol,
            supply: params.supply
        }, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            }
        }).then(res => {
            // commit('addToken', res.data);
            resolve(res);
        })
    });
}

// 获取我持有的
export const getOwerList = ({dispatch, commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/balance`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                user: state.loginUser && state.loginUser._id
            }
        }).then(res => {
            res.data.forEach(item => {
                dispatch('getOthers', {
                    uid: item.token.user
                }).then(res => {
                    item.user = res
                })
            });
            commit('getOwerList', res.data);
            resolve(res.data);
        })
    });
}

// 获取我自己发布的
export const _getOwerList = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/balance/byOwner/${params.user}`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: params
        }).then(res => {
            commit('getOwerList', res.data);
            resolve(res.data);
        })
    });
}

// 获取流水
export const getFlow = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/tx`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                user: params.user,
                token: params.token,
                _sort: 'createdAt:DESC'
            }
        }).then(res => {
            commit('getFlow', res.data);
            resolve(res.data);
        })
    });
}

// 获取奖励方式
export const getReward = ({commit, state}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/reward`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                token: state.tokenDetail._id
            }
        }).then(res => {
            commit('getReward', res.data)
            resolve();
        })
    });
}

// 获取奖励
export const getRewardEarn = ({dispatch, commit, state}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/reward/${state.reward._id}/earn`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                rewardId: state.reward._id
            }
        }).then(res => {
            // 更新列表数据
            dispatch('getTokenList', {
                token: state.token,
                id: state.loginUser._id
            });
            resolve(res.data);
        })
    });
}

// 获取费用信息
export const getInfo = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/info`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            }
        }).then(res => {
            commit('setFee', res.data)
            resolve(res.data);
        })
    });
}

// 提币
export const getWithdraw = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.post(`${host}/withdraw`, {
            token: params._id,
            to_addr: params.to_addr,
            amount: params.amount,
            comment: params.mark
        },{
            headers: {
                'Authorization': 'Bearer ' + state.token
            }
        }).then(res => {
            resolve(res.data);
        })
    });
}

// 优质海报页二维码
export const getQRForApp = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/qrcode`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                user: params.id
            }
        }).then(res => {
            resolve(res.data[0]);
        })
    });
}

// 获取token的二维码地址
export const getQR = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/qrcode`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                token: params.tokenid || window.location.search.split('=')[1]
                // token: '5b5f015ef56f1148fa3005d1'
            }
        }).then(res => {
            resolve(res.data[0]);
        })
    });
}

// 创建红包
export const createEnvelope = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.post(`${host}/envelope`, params,{
            headers: {
                'Authorization': 'Bearer ' + state.token
            }
        }).then(res => {
            resolve(res.data);
        })
    });
}

// 领取红包
export const openEnvelope = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/envelope/${params.id}/open`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                token: params.tokenid || window.location.search.split('=')[1]
            }
        }).then(res => {
            resolve(res.data[0]);
        })
    });
}

// 获取已经领过红包的列表
export const getEnvelopeUsers = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${host}/envelope/${params.id}`, {
            headers: {
                'Authorization': 'Bearer ' + state.token
            },
            params: {
                token: params.tokenid || window.location.search.split('=')[1]
            }
        }).then(res => {
            resolve(res.data[0]);
        })
    });
}
