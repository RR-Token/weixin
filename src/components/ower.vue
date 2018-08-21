<template>
	<div class="hello">
        <div class="tab">
            <div :class="[{'actived': isActive}]" @click="changeTab(true)">KOL的</div>
            <div :class="[{'actived': !isActive}]" @click="changeTab(false)">我发布的</div>
        </div>
		<div class="container">
			<scroller 
                v-if="owerList && owerList.length > 0"
				:on-infinite="infinite"
				ref="my_scrooler"
				>
                <div style="height: 10px;"></div>
                <!-- list -->
                <div v-for="(item, index) in owerList" :key="index">
                    <div class="item" @click="toDetail(item.token._id)">
                        <div class="photo" :style="'backgroundImage:url('+ item.user.pinfo.headimgurl +')'"></div>
                        <div class="name">{{ item.user.pinfo.nickname }}</div>
                        <div class="rrt">{{ item.token.name }}</div>
                        <div class="count">持有数量：{{ item.amount }}个</div>
                    </div>
                    <div style="height: 10px;"></div>
                </div>
			</scroller>
            <!-- 无数据展现 -->
            <div v-else class="no-data">
                <img src="../assets/no_passport.png" alt="">
                <div class="tips">发布你的专属通证，更紧密连接你的粉丝</div>
                <router-link class="router-add" tag="div" :to="{path: '/addToken'}">发布</router-link>
            </div>
		</div>

		<div class="footer">
			<div @click="toList">
                <img src="../assets/nav1.png" alt="">
                我发布的
            </div>
			<div class="actived">
                <img src="../assets/nav2_active.png" alt="">
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
	name: "Ower",
	data() {
		return {
			wxTitle: "我持有的",
            count: 0,
            isActive: true,
		};
    },
    computed: {
        userId() {
            return this.$route.params.uid;
        },
        list() {
            return this.$store.state.owerList;
        },
        owerList() {
            return this.list
        },
        selfList() {
            let _arr = this.list && this.list.filter(item => item.user._id === this.userId);
            return _arr;
        }
    },
    created() {
        // 默认获取KOL
        this.getKol();
    },
	methods: {
        getKol() {
            this.$store.dispatch('getOwerList', {
                user: this.userId
            })
        },
        getSelf() {
            this.$store.dispatch('_getOwerList', {
                user: this.userId
            })
        },
		refresh() {
			console.log('refresh')
		},
		infinite(done) {
			console.log('infinite', this.count)
			// if(this.count > 10) {
			// 	setTimeout(() => {
					done(true);
			// 	}, 1500);
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
        toList() {
            this.$router.push({path: '/'})
        },
        toDetail(id) {
            this.$router.push({path: `/owerdetail/${id}`});
        },
        changeTab(b) {
            this.isActive = b;
            this.isActive ? this.getKol() : this.getSelf();
        }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .tab {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 44px;
        color: #333333;
        font-size: 14px;
        background-color: #ffffff;
        >div {
            width: 80px;
            height: 100%;
            line-height: 44px;
        }
        .actived {
            color: #018FFF;
            position: relative;
            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: #018FFF;
            }
        }
    }
	.container {
		height: calc(100vh - 49px - 44px);
		background-color: rgba(242,244,248,1);
		overflow: hidden;
		position: relative;
		.item {
			background-color: #ffffff;
			width: calc(100% - 20px);
			height: 170px;
			margin: 0 10px 0 10px;
			border-radius: 8px;
            box-shadow: 6px 0px 12px rgba(1,143,255,0.08);
            .photo{
                margin: 19px auto 0;
                width: 44px;
                height: 44px;
                display: inline-block;
                background-color: rgba(242,244,248,1);
                border-radius: 100%;
                background-position: center;
                background-size: 100% 100%;
            }
            .name {
                font-size: 14px;
                color: #333333;
                margin: 10px auto 0;
            }
            .rrt {
                font-size: 16px;
                color: #03020D;
                margin: 15px auto 0;
            }
            .count {
                font-size: 13px;
                color: #018FFF;
                margin: 11.5px auto 0;
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
