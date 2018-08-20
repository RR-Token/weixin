<template>
	<div class="hello">

		<div class="container">
			<scroller>
				
                <div class="header" :style="'backgroundImage:url('+ require('@/assets/tongzheng_bg.png') +''">
                    <div class="photo" :style="'backgroundImage:url('+ headimgurl +''"></div>
                    <div class="name">{{ nickname }}</div>
				</div>
                
                <div class="info">
                    <div class="number" @click="copyAddress">区块号：{{ chain_addr }}</div>
                    <div class="details">
                        <div>
                            <div>地&nbsp;&nbsp;&nbsp;&nbsp;址：<span>{{ tokenDetail.block_number }}...</span></div>
                            <div>总发行量：<span>{{ tokenDetail.supply }}</span></div>
                        </div>
                        <div>
                            <div>持有账户：<span>{{ tokenDetail.totalOwner }}个</span></div>
                            <div>交 易 数：<span>{{ tokenDetail.totalTx }}个</span></div>
                        </div>
                    </div>
                </div>

                <div class="meun">
                    <div @click="getMoney"></div>
                    <!-- <div></div> -->
                    <router-link tag="div" :to="{path: '/qrcode/', query:{tid: getDetailId, uid: userInfo && userInfo._id}}"></router-link>
                    <div></div>
                </div>

                <div class="desc">
                    <div>赞赏同时，您和您的粉丝都将获得平台RRT奖励。</div>
                    <div>奖励数量为赞赏金额*0.5（奖励系数）。</div>
                </div>

                <router-link class="fllower" tag="div" :to="{path: `/likers/${getDetailId}`}">粉丝列表</router-link>

                <div style="height: 20px;"></div>
			</scroller>

            <!-- mask -->
            <div class="mask" v-if="maskShow">
                <div class="msg">
                    <div>

                        <div class="top">
                            <span v-if="!isReward && isPoor">您的RRT不足</span>
                            <span v-else-if="!isReward && !isPoor">提币到钱包</span>
                            <span v-else-if="num==0">今日领取完毕</span>
                            <span v-else>恭喜！</span>
                        </div>
                        <div class="bottom">
                            <div class="msg1" v-if="isPoor">
                                <div class="tips">
                                    <div>持有500 RRT以上的账号才能</div>
                                    <div>管理100个及以上粉丝</div>
                                </div>
                                <div class="btn">
                                    <div @click="close">取消</div>
                                    <router-link tag="div" :to="{path: `/owerdetail/${getDetailId}`}">赚取RRT</router-link>
                                </div>
                            </div>

                            <!-- 余额充足 -->
                            <div class="msg2"  v-if="!isReward && !isPoor">
                                <div class="form">
                                    <input v-model="to_addr" type="text" placeholder="请输入收款人钱包地址">
                                    <input v-model="mark" type="text" placeholder="请输入备注">
                                </div>
                                <!-- <div class="btn">
                                    <div class="btn-default" @click="getCoin">确定</div>
                                    <div class="tips">本次转出消耗 {{ withdrawFee }} RRT（<span class="light">余额{{ amount }}</span>）</div>
                                </div> -->
                                <div class="btn">
                                    <div class="btn-default" @click="getCoin">{{ isPoor ? '去获取RRT' : '确定'}}</div>
                                    <div class="tips">本次转出消耗 {{ withdrawFee }} RRT（<span class="light">余额{{ amount }}</span>）</div>
                                </div>
                            </div>

                            <!-- 已经领取过的提示 -->
                            <div v-else-if="isReward" class="msg2 msg2-1">
                                <div v-if="num==0">请明日再来领取：）</div>
                                <div v-else>您获得了{{ num }}个{{ tokenDetail.name }}通证</div>
                                <div class="btn">
                                    <div class="btn-default" @click="close">确定</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="close" @click="close"></div>
                </div>
            </div>
		</div>

	</div>
</template>

<script>
export default {
	name: "Detail",
	data() {
		return {
            wxTitle: "通证详情",
            isReward: false,
            maskShow: false,
            // to_addr: '0x323Ded3940D4018eC4a54540677F7Ea76B1342DB',
            to_addr: '',
            mark: '',
            amount: 0
		};
    },
    computed: {
        userInfo() {
            return this.$store.state.loginUser;
        },
        tokenDetail() {
            return this.$store.state.tokenDetail || '';
        },
        getDetailId() {
            return this.$route.params.id;
        },
        headimgurl() {
            return this.tokenDetail.user && this.tokenDetail.user.pinfo && this.tokenDetail.user.pinfo.headimgurl;
        },
        nickname() {
            return this.tokenDetail.user && this.tokenDetail.user.pinfo && this.tokenDetail.user.pinfo.nickname;
        },
        chain_addr() {
            return !this.tokenDetail.chain_addr && !this.tokenDetail.block_number ? '上链中' : this.tokenDetail.chain_addr;
        },
        withdrawFee() {
            return this.$store.state.fee && this.$store.state.fee.WithdrawFee && this.$store.state.fee.WithdrawFee.amount;
        },
        isPoor() {
            return this.withdrawFee > this.amount ? true : false;
        }
    },
    created() {
        // 获取详情
        this.$store.dispatch('getTokenDetail', {
            id: this.getDetailId
        }).then(res => {
            this.$store.dispatch('getReward');
        });

        // 获取余额
        this.$store.dispatch('getBalance', {
                symbol: 'RRT'
            }).then(res => {
            this.amount = res.amount;
        });
    },
	methods: {
        copyAddress() {
            // 动态创建 input 元素
            var aux = document.createElement("input");

            // 获得需要复制的内容
            aux.setAttribute("value", this.chain_addr);

            // 添加到 DOM 元素中
            document.body.appendChild(aux);

            // 执行选中
            // 注意: 只有 input 和 textarea 可以执行 select() 方法.
            aux.select();
            
            // 获得选中的内容
            var content = window.getSelection().toString();
                
            // 执行复制命令
            document.execCommand("copy");

            // 将 input 元素移除
            document.body.removeChild(aux);

            // 提示
            alert('已复制')
        },
		close() {
			this.maskShow = false;
        },
        getMoney() {
            this.maskShow = true;
        },
        
        getCoin() {
            // 如果余额不足，引导去赚取token的页面
            if(this.isPoor) {
                // this.$route.push({path: ``})
                return;
            }
            // 地址不能为空
            if(this.to_addr === '') {
                alert('地址不能为空');
                return;
            }
            if(this.isPoor) {
                alert('余额不足');
                return;
            }
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
        height: 100vh;
		background-color: rgba(242,244,248,1);
		overflow: hidden;
        position: relative;
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
                        .msg1 {
                            display: inline-block;
                            margin-top: 37.5px;
                            width: 100%;
                            .tips {
                                color: #333333;
                                font-size: 16px;
                                div {
                                    &:last-child {
                                        margin-top: 10px;
                                    }
                                }
                            }
                            .btn {
                                margin: 60px 25px;
                                display: flex;
                                justify-content: space-between;
                                div {
                                    width: 45%;
                                    height: 32px;
                                    line-height: 32px;
                                    font-size: 16px;
                                    border-radius: 6px;
                                    &:first-child {
                                        border: 1px solid #018FFF;
                                    }
                                    &:last-child {
                                        background: #018FFF;
                                        color: #ffffff;
                                    }
                                }
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
        .header {
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
            height: 145px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .number {
                width: 150px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #018FFF;
                border-radius: 4px;
                font-size: 15px;
                color: #ffffff;
                margin-top: 20px;
            }
            .details {
                display: flex;
                color: #999999;
                font-size: 12px;
                width: 100%;
                justify-content: space-around;
                margin-top: 20px;
                div {
                    text-align: left;
                    span {
                       color: #333333 
                    }
                    >div {
                        &:last-child {
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
        .meun {
            display: flex;
            height: 110px;
            margin: 30px 15px 0;
            justify-content: space-between;
            >div {
                width: 101px;
                height: 110px;
                background-position: center;
                background-size: cover;
                &:nth-child(1) {
                    background-image: url('~@/assets/tibi.png');
                }
                &:nth-child(2) {
                    background-image: url('~@/assets/shouquzanshang.png');
                }
                &:nth-child(3) {
                    background-image: url('~@/assets/hongbao.png');
                }
            }
        }
        .desc {
            color: #74708D;
            font-size: 13px;
            margin: 15px 15px 0;
            >div {
                text-align: left;
                &:last-child {
                    margin-top: 5px;
                }
            }
        }
        .fllower {
            margin: 40px 15px 0;
            height: 44px;
            line-height: 44px;
            color: #ffffff;
            font-size: 18px;
            background: #018FFF;
            border-radius: 6px;
        }
    }
</style>
