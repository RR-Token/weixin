<template>
	<div class="hello">

		<div class="container">
			<scroller  
				:on-infinite="infinite"
				ref="my_scrooler"
				>
                <div class="list">
                    <div class="item" v-for="(item, index) in list" :key="index">
                        <div>
                            <div class="photo" v-if="userId === item.from_user._id" :style="'backgroundImage:url('+ item.from_user.pinfo.headimgurl +')'"></div>
                            <div class="photo" v-else :style="'backgroundImage:url('+ item.to_user.pinfo.headimgurl +')'"></div>
                            <div class="info">
                                <div class="name" v-if="userId === item.from_user._id">{{ item.from_user.pinfo.nickname }}</div>
                                <div class="name" v-else>{{ item.to_user.pinfo.nickname }}</div>
                                <div class="rich">
                                    <span class="green" v-if="userId !== item.from_user._id">转入</span>
                                    <span class="red" v-else>转出</span>
                                    <span>{{ item.amount }} {{ item.token.symbol }}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            {{ item.createdAt}}
                        </div>
                    </div>
                </div>
			</scroller>
            <!-- <div v-if="list.length == 0" class="no-data">
                <img src="../assets/no_passport.png" alt="">
                <div class="tips">现在还没有粉丝哦</div>
            </div> -->
		</div>

	</div>
</template>

<script>
export default {
	name: "Likers",
	data() {
		return {
            wxTitle: "流水明细",
            list: []
		};
    },
    computed: {
        userId() {
            return this.$route.params.uid;
        },
        // list() {
        //     return this.$store.state && this.$store.state.flow;
        // }
    },
    created() {
        this.$store.dispatch('getFlow', {
            user: this.userId,
            token: this.$route.params.tid
        }).then(res => {
            res.forEach(item => {
                // 转为本地时间
                let location_date = new Date(item.createdAt);
                item.createdAt = location_date.getFullYear() + '-' 
                    + (location_date.getMonth() + 1) + '-' 
                    + location_date.getDate() + ' ' 
                    + location_date.getHours() + ':' 
                    + location_date.getMinutes() + ':' 
                    + location_date.getSeconds(); 
            });
            this.list = res;
        });
    },
    mounted() {
        console.log('=============', this.$route)
    },
	methods: {
		refresh() {
			console.log('refresh')
		},
		infinite(done) {
			console.log('infinite', this.count)
			// if(this.count > 10) {
				setTimeout(() => {
					done(true);
				}, 1500);
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
        }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.container {
		height: 100vh;
		background-color: rgba(242,244,248,1);
		overflow: hidden;
        position: relative;
        .list {
            margin: 10px 0 0 ;
            .item {
                background-color: #ffffff;
                width: 100%;
                height: 88px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 15px;
                position: relative;
                box-sizing: border-box;
                &::after {
                    position: absolute;
                    content: '';
                    bottom: 0;
                    width: 100%;
                    left: 15px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }
                >div {
                    &:first-child {
                        display: flex;
                        align-items: center;
                        .info {
                            text-align: left;
                            margin-left: 10px;
                            .green {
                                color: #40D638;
                            }
                            .red {
                                color: #FF3E3E;
                            }
                        }
                    }
                    &:last-child {
                        font-size: 12px;
                        color: #333333;
                    }
                }
                .photo {
                    width: 49px;
                    height: 49px;
                    border-radius: 100%;
                    background-color: rgba(242,244,248,1);
                    background-size: 100% 100%;
                }
                .name {
                    font-size: 16px;
                    color: #333333;
                }
                .rich {
                    font-size: 12px;
                    color: #018FFF;
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
</style>
