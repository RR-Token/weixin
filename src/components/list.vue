<template>
	<div class="hello">
        <div class="remoce-catch" @click="removeStore">清除缓存</div>
		<div class="container">
				<!-- :on-infinite="infinite" -->
			<scroller  
                v-if="tokenList"
				ref="my_scrooler"
				>
				<div v-for="(item, index) in tokenList" :key="index" @click="toDetail(item._id)">
                    <div style="height: 10px"></div>
                    <div class="item">
                        <div>
                            <div>{{ item.name.substring(0, 1)}}</div>
                            <div>{{ item.name }}</div>
                            <div>{{ item._id}}</div>
                        </div>
                        <div>
                            <span>{{ item.supply }}</span>
                            <span>{{ ((item.totalTx/item.supply)*100).toFixed(2) }}%已发放</span>
                            <span>{{ item.totalOwner }}个账户持有</span>
                        </div>
                    </div>
                    <div style="height: 6px"></div>
				</div>
			</scroller>
            <router-link tag="div" :to="{path: '/addToken'}" class="btn-add">发布</router-link>
            <div v-if="tokenList.length == 0" class="no-data">
                <img src="../assets/no_passport.png" alt="">
                <div class="tips">发布你的专属通证，更紧密连接你的粉丝</div>
                <router-link class="router-add" tag="div" :to="{path: '/addToken'}">发布</router-link>
            </div>
		</div>

		<div class="footer">
			<div class="actived">
                <img src="../assets/nav1_active.png" alt="">
                我发布的
            </div>
			<div @click="toOwer">
                <img src="../assets/nav2.png" alt="">
                我持有的
            </div>
			<div @click="toPerson">
                <img src="../assets/nav3.png" alt="">
                个人中心
            </div>
		</div>

	</div>
</template>

<script>

export default {
	name: "token_list",
	data() {
		return {
			wxTitle: "我发布的通证",
			count: 0
		};
    },
    computed: {
        getUserId() {
            return this.$store.state.loginUser._id;
        },
        getToken() {
            return this.$store.state.token;
        },
        tokenList() {
            return this.$store.state.tokenList || [];
        }
    },
	methods: {
        removeStore() {
            window.localStorage.removeItem('token');
            alert('清除缓存:'+window.localStorage.getItem('token'))
        },
		refresh() {
			console.log('refresh')
		},
		infinite(done) {
			// console.log('infinite', this.count)
			// if(this.count > 10) {
				// setTimeout(() => {
				// 	done(true);
				// }, 1500);
			// 	return
			// }
			// setTimeout(() => {
			// 	for(let i = 1; i <= 5; i++) {
			// 		this.list.push(i);
			// 	}
			// 	this.count += 5;

			// 	setTimeout(() => {
			// 		done()	
			// 	});
			// }, 1500);
        },
        toPerson() {
            this.$router.push({path: '/personcenter'})
        },
        toOwer() {
            this.$router.push({path: `/ower/${this.getUserId}`})
        },
        toDetail(id) {
            this.$router.push({path: `/detail/${id}`})
        }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .remoce-catch {
        padding: 0 15px;
        color: red;
        height: 44px;
        text-align: right;
        line-height: 44px;
    }
	.container {
		height: calc(100vh - 49px - 44px);
		// height: calc(100vh - 49px);
		background-color: rgba(242,244,248,1);
		overflow: hidden;
		position: relative;
		.item {
			background-color: #ffffff;
			width: calc(100% - 20px);
			height: 170px;
			margin: 0 10px;
			border-radius: 8px;
            box-shadow: 6px 0px 12px rgba(1,143,255,0.08);
            >div {
                &:first-child {
                    height: 125px;
                    text-align: center;
                    >div {
                        &:first-child {
                            margin: 20px auto 0;
                            width: 44px;
                            height: 44px;
                            line-height: 44px;
                            color: #ffffff;
                            background-color: #018FFF;
                            font-size: 23px;
                            border-radius: 100%;
                            display: inline-block;
                        }
                        &:nth-child(2) {
                            font-size: 16px;
                            color: #03020D;
                            font-weight: bold;
                            margin: 10px auto 0;
                        }
                        &:last-child {
                            font-size: 13px;
                            color: #666666;
                            margin: 10px auto 0;
                        }
                    }
                }
                &:last-child {
                    height: 45px;
                    position: relative;
                    margin: 0 10px;
                    padding: 0 2px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    overflow: hidden;
                    font-size: 13px;
                    color: #03020D;
                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        border-top: 1px solid rgba(231,235,241,1);
                    }
                }
            }
        }
        .no-data {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 17.5px;
            img {
                margin-top: 70px;
                width: 100px;
                height: 115px;
            }
            .tips {
                margin-top: 42px;
                color: #333333;
                font-size: 16px;
                text-align: center;
            }
            .router-add {
                width: 100%;
                height: 44px;
                background:rgba(1,143,255,1);
                color: #ffffff;
                line-height: 44px;
                text-align: center;
                margin-top: 23.5px;
                border-radius: 6px;
            }
        }
    }
    .btn-add {
        position: absolute;
        background:rgba(1,143,255,1);
        box-shadow:8px 0px 16px rgba(1,143,255,0.18);
        width: 49px;
        height: 49px;
        color: #ffffff;
        font-size: 16px;
        line-height: 49px;
        border-radius: 100%;
        bottom: 33px;
        right: 11.5px;
    }
	.footer {
		background-color: #ffffff;
		height: 49px;
		border-top: 1px solid rgba(177,177,177,.24);
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
        >div {
            display: inherit;
            flex-direction: column;
            align-items: center;
            font-size: 11px;
            img {
                width: 24px;
                margin-bottom: 3px;
            }
        }
        .actived {
            color: #018FFF;
        }
	}
</style>
