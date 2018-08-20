const mutations = {
    // global，缓存token
    getAuth(state, token) {
        state.token = token;
    },
    // 获取用户信息
    getUser(state, obj) {
        state.loginUser = obj;
    },
    getTokenList(state, obj) {
        state.tokenList = obj
    },
    getTokenDetail(state, obj) {
        state.tokenDetail = obj
    },
    getOwerList(state, obj) {
        state.owerList = obj
    },
    getLiker(state, obj) {
        state.likers = obj
    },
    addToken(state, obj) {
        console.log(obj);
    },
    getFlow(state, obj) {
        state.flow = obj;
    },
    getReward(state, obj) {
        // 因为现阶段只返回了一种方式
        state.reward = obj[0];
    },
    setFee(state, obj) {
        // 获取费用信息
        state.fee = obj;
    },
    setTokenId(state, obj) {
        // 因为现阶段只返回了一种方式
        state.tokenid = obj;
    },
    getQRUrl(state, obj) {
        // 因为现阶段只返回了一种方式
        state.qrurl = obj;
    }
}

export default mutations;