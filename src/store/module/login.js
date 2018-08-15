const Login = {
    state: {
        account: {
            username: 'Fick',
            password: '******'
        }
    },
    mutations: {
        logining(state, obj) {
            state.account = obj;
        }
    },
    actions: {
        logining(context) {
            setTimeout(() => {
                context.commit('logining')
            }, 2000);
        }
    }
}

export default Login;