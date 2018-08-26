<template>
	<div class="hello">

		<div class="container">
			<scroller>
				
                <div class="header">
                    <div class="photo" :style="'backgroundImage:url('+ headimgurl +''"></div>
                    <div class="name">{{ detail && detail.username }}</div>
				</div>
                
                <div class="info">
                    <div class="line1">赞赏即可获得我的 {{ tokenDetail.name }} 通证</div>
                    <div class="line2">{{ tokenDetail.name }} 通证基于区块链</div>
                    <div class="line3">是未来我的各项粉丝福利的凭证</div>
                </div>

                <div class="box">
                    <!-- <div @click="getRewardMoney">
                        <div>0 元</div>
                        <div>1 RRT Token</div>
                    </div> -->
                    <div @click="getRewardMoney">
                        <div>点击获取更多通证</div>
                        <div>随机获取 1-10 个通证奖励</div>
                    </div>
                    <!-- <div>
                        <div>1 元</div>
                        <div>10 RRT Token</div>
                    </div>
                    <div>
                        <div>10 元</div>
                        <div>100 RRT Token</div>
                    </div> -->
                </div>

                <!-- <div class="desc">
                    <div>赞赏同时，您和您的粉丝都将获得平台RRT奖励。</div>
                    <div>奖励数量为赞赏金额*0.5（奖励系数）。</div>
                </div> -->

                <div style="height: 10px;"></div>

			</scroller>

		</div>

        <router-link class="add-token" tag="div" :to="{path: '/'}">
            <div>我也要发通证</div>
        </router-link>

         <!-- mask -->
        <div class="mask" v-if="maskShow">
            <div class="msg">
                <div>

                    <div class="top">
                        <span v-if="num==0">今日领取完毕</span>
                        <span v-else>恭喜！</span>
                    </div>
                    <div class="bottom">
                        <div class="msg2 msg2-1">
                            <div v-if="num==0">请明日再来领取：）</div>
                            <div v-else>您获得了{{ num }}个{{ tokenDetail.name }}通证</div>
                            <div class="btn">
                                <div class="btn-default" @click="close">确定</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-if="!isReward" class="close" @click="close"></div>
            </div>
        </div>

	</div>
</template>

<script>
export default {
	name: "Detail",
	data() {
		return {
            wxTitle: "通证发放详情",
            detail: null,
            maskShow: false,
            num: 0,
		};
    },
    computed: {
        tokenDetail() {
            return this.$store.state.tokenDetail || '';
        },
        queryData() {
            return this.$route.query;
        },
        headimgurl() {
            return this.detail && this.detail.headimgurl;
        }
    },
    created() {
        console.log('!!!!!!!!!!!!!!!!!!', this.queryData)
        // 获取用户信息
        let self = this;
        this.$store.dispatch('getOthers', {
            uid: this.queryData.uid
        }).then(res => {
            console.log(res)
            self.detail = res;
        });

        // 获取奖励
        this.$store.dispatch('getTokenDetail', {
            id: this.queryData.tid
        }).then(res => {
            this.$store.dispatch('getReward');
        });
    },
	methods: {
        close() {
            this.maskShow = false;
            this.$router.push({path: `/ower/${this.queryData.uid}`});
        },
        getRewardMoney() {
            // 获取通证奖励
            this.$store.dispatch('getRewardEarn').then(res => {
                this.num = res.earned;
                this.maskShow = true;
            });
        }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.container {
        height: calc(100vh - 66px);
		background-color: rgba(242,244,248,1);
		overflow: hidden;
        position: relative;
        .header {
            background: url('~@/assets/tongzheng_bg.png');
            background-position: center;
            background-size: cover;
            height: 165px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .photo {
                width: 59px;
                height: 59px;
                border: 1px solid rgba(242,244,248,1);
                background-position: center;
                background-size: cover;
                border-radius: 100%;
                margin-top: 30px;
            }
            .name {
                font-size: 14px;
                color: #ffffff;
                margin-top: 10px;
            }
        }
        .info {
            margin: -30px 15px 0;
            background: #ffffff;
            box-shadow:1px 5px 62px rgba(218,201,168,0.38);
            border-radius: 10px;
            height: 111.5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .line1 {
                margin-top: 20px;
                font-size: 14px;
                color: #018FFF;
            }
            .line2 {
                margin-top: 15px;
                color: #666666;
                font-size: 12px;
            }
            .line3 {
                margin-top: 5px;
                color: #666666;
                font-size: 12px;
            }
        }
        .box {
            margin-top: 24px;
            >div {
                margin: 0 15px 10px;
                height: 80px;
                background:rgba(255,255,255,1);
                border-radius:10px;
                box-shadow:1px 5px 62px rgba(218,201,168,0.32);
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                padding: 0 28.5px;
                >div {
                    &:first-child {
                        color: #707882;
                        font-size: 19px;
                    }
                    &:last-child {
                        margin-top: 5px;
                        color: #A5ABB3;
                        font-size: 13px;
                    }
                }
                &::before {
                    position: absolute;
                    content: '';
                    width: 6px;
                    height: 36px;
                    top: 22px;
                    left: 0;
                    border-radius: 10px;

                }
                // 渐变
                &:nth-child(1) {
                    &::before {
                        background: rgba(255,83,155,1);
                        background: -moz-linear-gradient(top, rgba(255,83,155,1) 0%, rgba(255,76,146,1) 52%, rgba(252,83,99,1) 100%);
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,83,155,1)), color-stop(52%, rgba(255,76,146,1)), color-stop(100%, rgba(252,83,99,1)));
                        background: -webkit-linear-gradient(top, rgba(255,83,155,1) 0%, rgba(255,76,146,1) 52%, rgba(252,83,99,1) 100%);
                        background: -o-linear-gradient(top, rgba(255,83,155,1) 0%, rgba(255,76,146,1) 52%, rgba(252,83,99,1) 100%);
                        background: -ms-linear-gradient(top, rgba(255,83,155,1) 0%, rgba(255,76,146,1) 52%, rgba(252,83,99,1) 100%);
                        background: linear-gradient(to bottom, rgba(255,83,155,1) 0%, rgba(255,76,146,1) 52%, rgba(252,83,99,1) 100%);
                        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff539b', endColorstr='#fc5363', GradientType=0 );
                    }
                }
                &:nth-child(2) {
                    &::before {
                        box-shadow:1px 5px 35px rgba(218,201,168,0.32);
                        background: rgba(255,190,75,1);
                        background: -moz-linear-gradient(top, rgba(255,190,75,1) 0%, rgba(255,187,75,1) 52%, rgba(255,162,62,1) 100%);
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,190,75,1)), color-stop(52%, rgba(255,187,75,1)), color-stop(100%, rgba(255,162,62,1)));
                        background: -webkit-linear-gradient(top, rgba(255,190,75,1) 0%, rgba(255,187,75,1) 52%, rgba(255,162,62,1) 100%);
                        background: -o-linear-gradient(top, rgba(255,190,75,1) 0%, rgba(255,187,75,1) 52%, rgba(255,162,62,1) 100%);
                        background: -ms-linear-gradient(top, rgba(255,190,75,1) 0%, rgba(255,187,75,1) 52%, rgba(255,162,62,1) 100%);
                        background: linear-gradient(to bottom, rgba(255,190,75,1) 0%, rgba(255,187,75,1) 52%, rgba(255,162,62,1) 100%);
                        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffbe4b', endColorstr='#ffa23e', GradientType=0 );
                    }
                }
                &:nth-child(3) {
                    &::before {
                        background: rgba(95,217,255,1);
                        background: -moz-linear-gradient(top, rgba(95,217,255,1) 0%, rgba(94,210,255,1) 52%, rgba(89,184,255,1) 100%);
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(95,217,255,1)), color-stop(52%, rgba(94,210,255,1)), color-stop(100%, rgba(89,184,255,1)));
                        background: -webkit-linear-gradient(top, rgba(95,217,255,1) 0%, rgba(94,210,255,1) 52%, rgba(89,184,255,1) 100%);
                        background: -o-linear-gradient(top, rgba(95,217,255,1) 0%, rgba(94,210,255,1) 52%, rgba(89,184,255,1) 100%);
                        background: -ms-linear-gradient(top, rgba(95,217,255,1) 0%, rgba(94,210,255,1) 52%, rgba(89,184,255,1) 100%);
                        background: linear-gradient(to bottom, rgba(95,217,255,1) 0%, rgba(94,210,255,1) 52%, rgba(89,184,255,1) 100%);
                        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5fd9ff', endColorstr='#59b8ff', GradientType=0 );
                    }
                }
            }
        }
        .desc {
            color: #74708D;
            font-size: 13px;
            margin: 15px 15px 10px;
            >div {
                text-align: left;
                &:last-child {
                    margin-top: 5px;
                }
            }
        }
    }
    .add-token {
        background: #ffffff;
        height: 66px;
        border-top: 1px solid rgba(177,177,177,.24);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        div {
            margin: 0 10px;
            background: #018FFF;
            color: #ffffff;
            border-radius: 6px;
            font-size: 16px;
            width: 100%;
            height: 41px;
            line-height: 41px;
        }
    }
    .mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        .msg {
            width: 80%;
            .close {
                width: 32px;
                height: 32px;
                border-radius: 100%;
                background-color: transparent;
                background-image: url('~@/assets/close.png');
                background-position: center;
                background-size: cover;
                margin: 29px auto;
            }
            >div {
                width: 100%;
                border-radius: 9px;
                overflow: hidden;
                .top {
                    width: 100%;
                    height: 120px;
                    color: #ffffff;
                    background-image: url('~@/assets/bg.png');
                    background-position: center;
                    background-size: cover;
                    font-size: 18px;
                    span {
                        margin-top: 42px;
                        display: inline-block;
                    }
                }
                .bottom {
                    width: 100%;
                    height: 240px;
                    background: #ffffff;
                    .msg2-1 {
                        height: 200px;
                        line-height: 90px;
                        .btn {
                            margin-top: 75px;
                        }
                    }
                    .msg2 {
                        display: inline-block;
                        margin-top: 17.5px;
                        width: 100%;
                        }
                        .btn {
                            .light {
                                color: #F32727;
                            }
                            .btn1 {
                                background: #ffffff;
                                color: #018FFF;
                                border: 1px solid #018FFF;
                                border-radius: 6px;
                                height: 32px;
                                line-height: 32px;
                                font-size: 16px;
                                width: 46.6667%;
                                margin: 30px auto 21.5px;
                            }
                            .btn-default {
                                background-color: #018FFF;
                                border-radius: 6px;
                                height: 32px;
                                line-height: 32px;
                                color: #ffffff;
                                font-size: 16px;
                                width: 46.6667%;
                                margin: 30px auto 21.5px;
                            }
                            .tips {
                                font-size: 13px;
                                color: #9CA4B1;
                            }
                        }
                    }
                }
            }
    }
</style>
