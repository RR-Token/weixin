/* 打开红包 */
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    *{
        font-family: 'PingFangSC-Medium';
        color: #000000;
    }
    .hello {
        background-color: #F1F1F1;
        height: 100vh;
        box-sizing: border-box;
        overflow-y: auto;
        .card {
            padding-top: 82%;
            margin-top: -82%;
            background-color: #ffffff;
            header {
                padding-top: 36.26666%;
                background-image: url('~@/assets/hb-header-bg.png');
                background-size: 100%;
                background-repeat: no-repeat;
                >div {
                    color: #E5D99B;
                    font-size: 19px;
                    margin-top: -30%;
                }
            }
            .detail {
                display: flex;
                flex-direction: column;
                align-items: center;
                .photo {
                    width: 75px;
                    height: 75px;
                    border-radius: 100px;
                    background-color: #f3f3f3;
                    margin-top: -37px;
                }
                .from {
                    font-size: 17px;
                    margin-top: 8px;
                    margin-right: 3px;
                    background-image: url('~@/assets/hb-ping.png');
                    background-repeat: no-repeat;
                    background-size: 17px;
                    background-position: right center;
                    padding-right: 25px;
                }
                .comment {
                    font-size: 14px;
                    color: #4A4A4A;
                    text-align: center;
                    margin-top: 5px;
                }
                .amount {
                    font-size: 49px;
                    margin-bottom: 20px;
                    font-family: 'DIN-Medium';
                    >span {
                        font-size: 19px;
                        margin-left: 5px;
                    }
                }
            }
        }
        .container {
            background-color: transparent;
            header {
                padding: 0 15px;
                height: 36px;
                line-height: 36px;
                color: #9B9B9B;
                font-size: 14px;
                text-align: left;
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
                min-width: 305px;
                height: 409px;
                background-image: url('~@/assets/hb-bg.png');
                background-size: 100%;
                background-repeat: no-repeat;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                .close {
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    width: 30px;
                    height: 30px;
                    background-image: url('~@/assets/hb-close.png');
                    background-size: 100%;
                    background-repeat: no-repeat;
                }
                .photo {
                    width: 75px;
                    height: 75px;
                    border-radius: 100px;
                    background-color: #f3f3f3;
                    margin-top: 39px;
                }
                .from_user {
                    font-size: 11px;
                    color: #ffffff;
                    font-size: 14px;
                    margin-top: 10px;
                }
                .comment {
                    font-size: 18px;
                    color: #ffffff;
                    margin: 15px 35px 0;
                }
                .open-btn {
                    width: 89px;
                    height: 89px;
                    background-image: url('~@/assets/hb-open.png');
                    background-size: 100%;
                    background-repeat: no-repeat;
                    position: absolute;
                    top: 63%;
                }
                .tips {
                    font-size: 14px;
                    color: #EFCC8F;
                    position: absolute;
                    bottom: 20px;
                }
            }
        }
    }
</style>

<template>
	<div class="hello">
        <div class="card">
            <header>
                <div>拼手气红包</div>
            </header>
            <div class="detail">
                <div class="photo"></div>
                <div class="from">{{from_user}}的{{symbol}}红包</div>
                <div class="comment">{{comment}}</div>
                <div class="amount" @click="showEnvelope"><span>{{amount}}</span></div>
            </div>

        </div>
		<div class="container">
            <!-- <header>已领取{{pass}}/{{count}}，共{{use}}/{{amount}}{{symbol}}</header> -->
		</div>

        <!-- mask -->
            <div class="mask" v-if="maskShow">
                <div class="msg">
                    <div class="photo"></div>
                    <div class="from_user">{{from_user}}的{{symbol}}红包</div>
                    <div class="comment">{{comment}}</div>
                    <div class="open-btn"></div>
                    <div class="tips">金额随机</div>
                </div>
            </div>
	</div>
</template>

<script>
export default {
	name: "Detail",
	data() {
		return {
            wxTitle: "发送红包",
            from_user: 'Fick',
            symbol: 'RRT',
            comment: '恭喜发财，祝早日IPO',
            amount: '点击获取红包',
            maskShow: true

            // pass: 0,
            // count: 8,
            // use: 0,
		};
    },
    created() {
		// 获取详情
        // this.$store.dispatch('getTokenDetail', {
		// 	id: this.$route.params.id,
        // }).then(res => {
		// 	console.log(':::::::::::', res)
        //     this.yue = res.supply;
        // });
    },
	methods: {
        showEnvelope() {
            this.maskShow = true;
        }
	}
};
</script>
