/* 红包 */
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
            .list {
                height: 65px;
                .item {
                    background-color: #ffffff;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    padding: 0 19px 0 10px;
                    overflow: hidden;
                    &::after {
                        position: absolute;
                        left: 10px;
                        bottom: 0;
                        content: '';
                        border-bottom: 1px solid #f5f5f5;
                        width: 100%;
                    }
                    .user {
                        flex: 2;
                        display: flex;
                        align-items: center;
                        .photo {
                            width: 42px;
                            height: 42px;
                            border-radius: 100px;
                            background-color: #f3f3f3;
                        }
                        .other {
                            .name {
                                margin-left: 13px;
                                font-size: 17px;
                            }
                            .top {
                                font-size: 16px;
                                color: #EFCC8F;
                                background-image: url('~@/assets/hb-top.png');
                                background-repeat: no-repeat;
                                background-size: 14px;
                                background-position: left center;
                                margin-left: 3px;
                                display: inline-block;
                                text-indent: 20px;
                            }
                        }
                    }
                    .detail {
                        text-align: right;
                        >div {
                            &:first-child {
                                font-size: 17px;
                                color: #4A4A4A;
                            }
                            &:last-child {
                                font-size: 14px;
                                color: #9B9B9B;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<template>
	<div class="hello">
        <div class="card">
            <header>
                <div>发红包</div>
            </header>
            <div class="detail">
                <div class="photo"></div>
                <div class="from">{{from_user}}的{{symbol}}红包</div>
                <div class="comment">{{comment}}</div>
                <div class="amount">{{amount}}<span>{{symbol}}</span></div>
            </div>

        </div>
		<div class="container">
            <header>已领取{{pass}}/{{count}}，共{{use}}/{{amount}}{{symbol}}</header>
            <div class="list">
                <div class="item">
                    <div class="user">
                        <div class="photo"></div>
                        <div class="other">
                            <span class="name">{{from_user}}</span>
                            <span class="top">手气最佳</span>
                        </div>
                    </div>
                    <div class="detail">
                        <div>1{{symbol}}</div>
                        <div>{{time}}</div>
                    </div>
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
            wxTitle: "发送红包",
            from_user: 'Fick',
            symbol: 'RRT',
            comment: '恭喜发财，祝早日IPO',
            amount: '888',
            time: '12:12',

            pass: 0,
            count: 8,
            use: 0,
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
	}
};
</script>
