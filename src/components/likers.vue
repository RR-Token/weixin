<template>
	<div class="hello">

		<div class="container">
			<scroller  
				:on-infinite="infinite"
				ref="my_scrooler"
				>
                <div class="list">
                    <div class="item" v-for="(item, index) in liker" :key="index">
                        <div>
                            <div class="photo" :style="'backgroundImage: url('+ item.user.pinfo.headimgurl +')'"></div>
                            <div class="info">
                                <div class="name" >{{ item.user.pinfo.nickname }}</div>
                                <div class="rich">拥有{{ item.amount }}个 RRT Token</div>
                            </div>
                        </div>
                        <div>
                            {{ item.createdAt.substring(0, 10) }}
                        </div>
                    </div>
                </div>
			</scroller>
            <div v-if="list.length == 0" class="no-data">
                <img src="../assets/no_passport.png" alt="">
                <div class="tips">现在还没有粉丝哦</div>
            </div>
		</div>

	</div>
</template>

<script>
export default {
	name: "Likers",
	data() {
		return {
			wxTitle: "粉丝列表",
			list: [0],
			count: 0
		};
    },
    computed: {
        getDetailId() {
            return this.$route.params.id;
        },
        liker() {
            return this.$store.state.likers;
        }
    },
    created() {
        this.$store.dispatch('getLiker', {
            id: this.getDetailId
        });
    },
	methods: {
		refresh() {
			console.log('refresh')
		},
		infinite(done) {
			console.log('infinite', this.count)
			if(this.count > 10) {
				setTimeout(() => {
					done(true);
				}, 1500);
				return
			}
			setTimeout(() => {
				for(let i = 1; i <= 5; i++) {
					this.list.push(i);
				}
				this.count += 5;

				setTimeout(() => {
					done()	
				});
			}, 1500);
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
