<template>
	<div class="hello">

		<div class="container">
			<scroller>
				
                <div class="my-info">
                    <div class="photo">
                        <div :style="'backgroundImage:url('+ headimgurl +')'"></div>
                        <div>{{ tokenDetail.user && tokenDetail.user.pinfo && tokenDetail.user.pinfo.nickname }}</div>
                    </div>
                    <div class="others">
                        <div>发 行 方：<span>{{ tokenDetail.user && tokenDetail.user.pinfo && tokenDetail.user.pinfo.nickname }}</span></div>
                        <div>通证名称：<span>{{ tokenDetail.name }}</span></div>
                        <div class="largeLenght">合约地址：<span>{{ tokenDetail.user && tokenDetail.user.email }}</span></div>
                        <div>总发行量：<span>{{ tokenDetail.supply }}</span></div>
                        <div>我的持有数：<span class="linght">{{tokenDetail.totalOwner }} 个</span></div>
                    </div>
				</div>

                <div class="center-nav">
                    <div>获取更多</div>
                    <router-link tag="div" :to="{path: `/flow/${getUserId}`}">
                        流水详情
                    </router-link>
                </div>

                <div class="box">
                    <div v-if="isSelf">
                        <div>+ 15000 RRT</div>
                        <div>人人通证优质KOL计划（已加入）</div>
                    </div>
                    <div v-else @click="getRewardMoney">
                        <div>点击获取更多通证</div>
                        <div>随机获取 1-10 个通证奖励</div>
                    </div>

                    <!-- <div>
                        <div>+ 50 RRT/人</div>
                        <div>每新增一个粉丝获得奖励</div>
                    </div>
                    <div>
                        <div>+ 10 RRT/人</div>
                        <div>转发文章获得奖励</div>
                    </div>
                    <div>
                        <div>+ 至少5 RRT/人</div>
                        <div>获得赞赏，同事获得RRT奖励</div>
                    </div> -->
                </div>

                <div style="height: 30px;"></div>

			</scroller>

		</div>

        <div class="bottom-btn">
            <div>发红包(即将推出)</div>
            <div @click="getMoney">提取</div>
        </div>

        <!-- mask -->
        <div class="mask" v-if="maskShow">
            <div class="msg">
                <div>

                    <div class="top">
                        <span v-if="!isReward && isPoor">您的RRT不足</span>
                        <span v-else-if="!isReward && !isPoor">提币到钱包</span>
                        <span v-else>恭喜！</span>
                    </div>
                    <div class="bottom">
                        <div class="msg2" v-if="!isReward">
                            <div class="form">
                                <input type="text" placeholder="请输入收款人钱包地址" v-model="to_addr">
                                <input type="text" placeholder="请输入备注" v-model="mark">
                            </div>
                            <div class="btn">
                                <div class="btn-default" @click="getCoin">确定</div>
                                <div class="tips">本次转出消耗  {{ withdrawFee }} RRT（<span class="light">余额{{ tokenDetail.totalOwner }}</span>）</div>
                            </div>
                        </div>
                        <div v-else class="msg2 msg2-1">
                            您获得了{{ num }}个{{ tokenDetail.name }}通证
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
            wxTitle: "RRT通证详情",
            isPoor: false,
            isReward: false,
            maskShow: false,
            num: 0,
            to_addr: '0x323Ded3940D4018eC4a54540677F7Ea76B1342DB',
            mark: ''
		};
    },
    computed: {
        tokenDetail() {
            return this.$store.state.tokenDetail || '';
        },
        getUserId() {
            return this.$store.state.loginUser && this.$store.state.loginUser._id;
        },
        getDetailId() {
            return this.$route.params.id;
        },
        isSelf() {
            // 判断是不是平台
            return this.tokenDetail.name === 'renrentoken';
        },
        rewardList() {
            return this.$store.state.reward;
        },
        headimgurl() {
            return this.tokenDetail.user && this.tokenDetail.user.pinfo && this.tokenDetail.user.pinfo.headimgurl;
        },
        withdrawFee() {
            return this.$store.state.fee && this.$store.state.fee.WithdrawFee && this.$store.state.fee.WithdrawFee.amount;
        }
    },
    created() {
        // 获取详情
        this.$store.dispatch('getTokenDetail', {
            id: this.getDetailId
        }).then(res => {
            this.$store.dispatch('getReward');
        });
    },
	methods: {
        close() {
			this.maskShow = false;
        },
        getMoney() {
            this.isReward = false;
            this.maskShow = true;
        },
        getRewardMoney() {
            this.isReward = true;
            // 获取通证奖励
            this.$store.dispatch('getRewardEarn').then(res => {
                this.num = res.earned;
                this.maskShow = true;
            });
        },
        getCoin() {
            // 地址不能为空
            if(this.to_addr === '') {
                alert('地址不能为空');
                return;
            }
            // if(this.withdrawFee > this.tokenDetail.totalOwner) {
            //     alert('余额不足');
            //     return;
            // }
            this.$store.dispatch('getWithdraw', {
                _id: this.getDetailId,
                to_addr: this.to_addr,
                amount: this.withdrawFee,
                // amount: 1,
                mark: this.mark
            }).then(res => {
                console.log(res)
                this.close();
            })
        }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.container {
        height: calc(100vh - 61px);
		background-color: rgba(242,244,248,1);
		overflow: hidden;
        position: relative;
        .my-info {
            margin: 17.5px 10px 24px;
            height: 150px;
            border-radius:9px;
            box-shadow:6px 0px 12px rgba(1,143,255,0.08);
            background:rgba(255,255,255,1);
            display: flex;
            text-align: left;
            .photo {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                &::after {
                    position: absolute;
                    top: 7px;
                    right: 0;
                    content: '';
                    width: 2px;
                    height: 90%;
                    // background-color: rgba(229,229,229,1);
                    border-right: 2px dashed rgba(229,229,229,1);
                }
                >div {
                    &:first-child {
                        width: 49px;
                        height: 49px;
                        background-color: rgba(242,244,248,1);
                        border-radius: 100%;
                        background-image: url('~@/assets/photo.png');
                        background-position: center;
                        background-size: cover;
                    }
                    &:last-child {
                        font-size: 14px;
                        color: #333333;
                        margin-top: 10px;
                        text-align: center;
                    }
                }
            }
            .others {
                overflow: hidden;
                flex: 2;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                padding: 0 15px;
                font-size: 13px;
                position: relative;
                &::before {
                    content: '';
                    position: absolute;
                    left: -6px;
                    top: -5px;
                    width: 10px;
                    height: 10px;
                    border-radius: 100%;
                    background: #f2f4f8
                }
                &::after {
                    content: '';
                    position: absolute;
                    left: -6px;
                    bottom: -5px;
                    width: 10px;
                    height: 10px;
                    border-radius: 100%;
                    background: #f2f4f8
                }
                .linght {
                    color: #018FFF;
                }
                >div {
                    color:rgba(102,102,102,1);
                    >span {
                        color: #03020D;
                    }
                    &:not(:first-child) {
                        margin-top: 6.5px;
                    }
                }
                .largeLenght {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 100%;
                }
            }
        }
        .box {
            margin-top: 15px;
            >div {
                margin: 0 10px 10px;
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
                &:nth-child(4) {
                    &::before {
                        background: rgba(0,252,255,1);
                        background: -moz-linear-gradient(top, rgba(0,252,255,1) 0%, rgba(32,237,240,1) 50%, rgba(29,233,211,1) 100%);
                        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,252,255,1)), color-stop(50%, rgba(32,237,240,1)), color-stop(100%, rgba(29,233,211,1)));
                        background: -webkit-linear-gradient(top, rgba(0,252,255,1) 0%, rgba(32,237,240,1) 50%, rgba(29,233,211,1) 100%);
                        background: -o-linear-gradient(top, rgba(0,252,255,1) 0%, rgba(32,237,240,1) 50%, rgba(29,233,211,1) 100%);
                        background: -ms-linear-gradient(top, rgba(0,252,255,1) 0%, rgba(32,237,240,1) 50%, rgba(29,233,211,1) 100%);
                        background: linear-gradient(to bottom, rgba(0,252,255,1) 0%, rgba(32,237,240,1) 50%, rgba(29,233,211,1) 100%);
                        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00fcff', endColorstr='#1de9d3', GradientType=0 );
                    }
                }
            }
        }
        .center-nav {
            background-color: transparent;
            display: flex;
            justify-content: space-between;
            margin: 0 10px 0;
            >div {
                &:first-child {
                    font-size: 18px;
                    color: #333333;
                }
                &:last-child {
                    font-size: 16px;
                    color: #018FFF;
                }
            }
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
                        .form {
                            padding: 0 20px;
                            ::-webkit-input-placeholder {
                                color: #C8C8C8;
                            }
                            input {
                                width: 100%;
                                height: 36px;
                                line-height: 36px;
                                font-size: 14px;
                                border-radius: 6px;
                                background:rgba(248,248,248,1);
                                border: 1px solid #c8c8c8;
                                padding: 0 10px;
                                box-sizing: border-box;
                                color: #333333;
                                outline: none;
                                &:last-child {
                                    margin-top: 24px;
                                }
                            }
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
    }
    .bottom-btn {
        background: #ffffff;
        height: 61px;
        border-top: 1px solid rgba(177,177,177,.24);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        >div {
            width: 45%;
            height: 41px;
            text-align: center;
            line-height: 41px;
            border-radius: 6px;
            font-size: 16px;
            &:first-child {
                color: #A8A8A8;
                background:rgba(202,202,202,1);
            }
            &:last-child {
                color: #ffffff;
                background: #018FFF;
            }
        }
    }
</style>
