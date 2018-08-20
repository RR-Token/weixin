<template>
	<div class="hello">

		<div class="container">
			<scroller ref="my_scrooler" >

                <div class="header">
                    <!-- tabs -->
                    <div class="tab">
                        <div class="active">ERC20（ETH）</div>
                        <div>EOS（即将推出）</div>
                    </div>
                    <div class="tips">
                        ERC20 是基于以太坊的发币协议，也是目前适用范围最广的发币协议，目前市面上大部分通证基于ERC20生成.
                    </div>
                </div>

                <!-- form -->
                <div class="form">
                    <div>
                        <div class="tips">代币全称（例 RenRenToken)</div>
                        <input type="text" v-model="name" placeholder="支持英文、数字，区分大小写">
                    </div>
                    <div>
                        <div class="tips">代币简称（例 RRT）</div>
                        <input type="text" v-model="symbol" placeholder="支持英文、数字，区分大小写">
                    </div>
                    <div>
                        <div class="tips">发行总量（例 10，000，000）</div>
                        <input type="text" v-model="supply" placeholder="请输入大于0的整数">
                    </div>
                    <!-- <div>
                        <div class="tips">小数位数（本货币支持的最大小数位）</div>
                        <input type="text" placeholder="最大支持20位小数，建议18位">
                    </div> -->
                </div>

                <div style="height: 20px;"></div>
			</scroller>
		</div>

		<div class="footer">
			<div class="pay-amount">支付：{{ createFee }}</div>
			<div class="pay">
                <div>
                    <div>余额：<span class="warm">{{ detail && detail.amount }}</span></div>
                    <div :class="['hide', {'show': !isPoor}]">余额不足</div>
                </div>
                <div v-if="isPoor" @click="pay">支付并发布</div>
                <div v-else @click="getRRT">我要赚RRT</div>
            </div>
		</div>

	</div>
</template>

<script>
export default {
	name: "AddToken",
	data() {
		return {
            wxTitle: "我发布的通证",
            name: '',
            symbol: '',
            supply: '',
            detail: null
		};
    },
    computed: {
        isPoor() {
            return this.detail && this.detail.amount > 500 ? true : false;
        },
        // tokenid() {
        //     return this.$route.params.id
        // },
        createFee() {
            return this.$store.state.fee && this.$store.state.fee.CreateFee && this.$store.state.fee.CreateFee.amount;
        }
    },
    created() {
        this.$store.dispatch('getBalance', {
                symbol: 'RRT'
            }).then(res => {
            this.detail = res;
        });
        // 获取发布需要支付的数量
        // 获取费用信息
        this.$store.dispatch('getInfo');
    },
	methods: {
        getRRT() {
            // console.log('跳转到2.2.0', this.$route)
            this.$router.push({path: `/owerdetail/${this.$store.state.tokenid}`});
        },
        pay() {
            if(this.name === this.symbol) {
                alert('代币全程和代币简称不能一样！');
                return;
            }
            this.$store.dispatch('addToken', {
                token: this.$store.state.token,
                name: this.name,
                symbol: this.symbol,
                supply: this.supply
            }).then( res => {
                console.log(res)
                if(res.status == 200) {
                    this.$store.dispatch('getUser')
                    this.$router.back();
                }
            })

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
            background-color: #ffffff;
            max-height: 122px;
            margin-top: 10px;
            padding: 20px 10px;
            box-shadow:6px 0px 12px rgba(1,143,255,0.06);
            .tab {
                display: flex;
                justify-content: center;
                align-items: stretch;
                border-radius: 6px;
                font-size: 14px;
                color: #999999;
                border: 1px solid #018FFF;
                height: 40px;
                line-height: 40px;
                .active {
                    background-color: #018FFF;
                    color: #ffffff;
                }
                >div {
                    flex: 1;
                }
            }
            .tips {
                font-size: 12px;
                color: #999999;
                text-align: left;
                margin-top: 12px;
                line-height: 20px;
            }
        }
        .form {
            background-color: #ffffff;
            padding: 0 10px 20px;
            margin-top: 10px;
            box-shadow:6px 0px 12px rgba(1,143,255,0.06);
            text-align: initial;
            >div {
                width: 100%;
                margin-top: 20px;
                display: inline-block;
                .tips {
                    color: #333333;
                    font-size: 12px;
                    line-height: 18px;
                    margin-bottom: 10px;
                }
                input {
                    width: 100%;
                    height: 44px;
                    padding: 0;
                    background:rgba(248,248,248,1);
                    border-radius: 6px;
                    border: 1px solid #c8c8c8;
                    text-indent: 10px;
                    outline: none;
                }
            }
        }
    }
	.footer {
		background-color: #ffffff;
		height: 66px;
		border-top: 1px solid rgba(177,177,177,.24);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 10px;
        justify-content: space-between;
        .pay-amount {
            font-size: 16px;
            color: #333333;
        }
        .pay {
            display: flex;
            align-items: center;
            >div {
                &:first-child {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                    font-size: 12px;
                    margin-right: 10px;
                }
                &:last-child {
                    background:rgba(1,143,255,1);
                    border-radius: 6px;
                    width: 130px;
                    height: 41px;
                    line-height: 41px;
                    color: #ffffff;
                    font-size: 16px;
                }
            }
            .warm {
                color: #018FFF;
            }
            .hide {
                display: none;
                color: #018FFF;
            }
            .show {
                display: block;
            }
        }
	}
</style>
