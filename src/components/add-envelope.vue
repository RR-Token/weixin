/* 发红包 */
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    *{
        font-family: 'PingFangSC-Medium';
        color: #000000;
    }
    .hello {
        background-color: #F1F1F1;
        padding: 27px 15px 0;
        height: 100vh;
        box-sizing: border-box;
    }
    header {
        font-size: 19px;
    }
	.container {
        .tips {
            font-size: 14px;
            text-align: left;
            margin-top: 15px;
            .change-type {
                color: #2b8ddc;
            }
        }
        .ipt-box {
            margin-top: 4.5px;
            .item {
                height: 56px;
                width: 100%;
                font-size: 17px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0 15px 0 10px;
                margin-top: 15px;
                background-color: #ffffff;
                >div {
                    line-height: 56px;
                    text-align: right;
                    width: 70%;
                }
                input {
                    text-align: right;
                    height: 35px;
                    width: 78%;
                    border: none;
                    outline: none;
                    font-size: 17px;
                }
                ::-webkit-input-placeholder {
                    color: #9B9B9B;
                    font-size: 17px;
                    line-height: 35px;
                }
            }
            .amount {
                background-image: url('~@/assets/hb-ping.png');
                background-repeat: no-repeat;
                background-size: 17px;
                background-position: 10px center;
                &::before {
                    content: '总金额';
                    text-indent: 21px;
                }
            }
            .number {
                &::before {
                    content: '红包个数';
                }
            }
            .msg {
                height: 106px;
                padding: 10px 15px;
                align-items: baseline;
                textarea {
                    text-align: left;
                    font-size: 17px;
                    width: 100%;
                    height: 100%;
                    resize: none;
                    border: none;
                    outline: none;
                }
                ::-webkit-input-placeholder {
                    line-height: inherit;
                }
            }
        }
        .info {
            width: 100%;
            margin-top: 20px;
            text-align: center;
            .view-amount {
                font-family: 'DIN-Medium';
                font-size: 49px;
                span {
                    font-size: 19px;
                }
            }
            .yue {
                font-size: 17px;
                color: #4A4A4A;
                span {
                    margin-left: 3px;
                    color: #000000;
                }
			}
			.excess {
				color: #F44744!important;
			}
            .send-btn {
                margin: 15px 45px;
                height: 45px;
                text-align: center;
                line-height: 45px;
                color: #ffffff;
                background-color: #F44744;
                border-radius: 6px;
                font-size: 17px;
			}
			.no-active {
				background-color: rgba(244, 71, 68, .35);
			}
        }
    }
</style>

<template>
	<div class="hello">
        <header>发红包</header>

		<div class="container">
			<div class="tips">
                当前为群拼手气红包，<span class="change-type">点击更换类型</span>
            </div>
            <div class="ipt-box">
                <div class="item amount">
                    <div>
                        <input type="number" placeholder="0.00" v-model="amount" @input="validate">
                        <span>{{symbol.toLocaleUpperCase()}}</span>
                    </div>
                </div>
                <div class="item number">
                    <div>
                        <input type="number" placeholder="填写个数" v-model="number" @input="validate">
                        <span>个</span>
                    </div>
                </div>
                <div class="item msg">
                    <textarea type="text" placeholder="恭喜发财，大吉大利" maxlength="140" v-model="comment"></textarea>
                </div>
            </div>

            <div class="info">
                <div class="view-amount">{{amount === '' ? 0 : amount}}<span>{{symbol.toLocaleUpperCase()}}</span></div>
                <div class="yue">
                    可用余额
                    <span :class="{'excess': isExcess}">{{yue}}</span>
                    {{symbol.toLocaleUpperCase()}}
                </div>
                <div v-if="isActive" @click="envelopo" class="send-btn">发红包</div>
                <div v-else class="send-btn no-active">发红包</div>
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
            amount: '',
            number: '',
            comment: '',
			yue: 0,
			isActive: false,
            isExcess: false,
            symbol: ''
		};
    },
    computed: {
    },
    created() {
		// 获取详情
        this.$store.dispatch('getTokenDetail', {
			id: this.$route.params.id,
        }).then(res => {
			console.log(':::::::::::', res)
            this.yue = res.supply;
            this.symbol = res.symbol;
        });
    },
	methods: {
        validate() {
			// 验证输入合法性
			let reg = /^[1-9]{1,9}$/;
			if(reg.test(this.amount)&&reg.test(this.number)) {
				this.isActive = true;
			} else {
				this.isActive = false;
			}
			// 截断多余的
			this.amount = this.amount.length <= 9 ? this.amount : this.amount.substring(0, 9);
			this.number = this.number.length <= 9 ? this.number : this.number.substring(0, 9);
			// 验证是否超过余额
			this.isExcess = this.amount > this.yue ? true : false;
        },
       	envelopo() {
            this.$router.push('/openEnvelope')
			// this.$store.dispatch('createEnvelope', {
			// 	token: this.$route.params.id,
			// 	amount: parseInt(this.amount)
			// }).then(res => {
			// 	// 发送成功后，跳转到红包页面
			// })
       	}
	}
};
</script>
