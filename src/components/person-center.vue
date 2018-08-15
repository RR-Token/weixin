<template>
	<div class="hello">
		<div class="container">

			<scroller>

				<div class="person">
					<div class="photo" :style="'backgroundImage:url('+ userInfo.headimgurl +''"></div>
					<div class="name">{{ userInfo.username }}</div>
				</div>
				<div class="amount">
					<div>
						<div>现金余额：</div>
						<div class="light">0</div>
					</div>
				</div>
				<div class="tixian" @click="getMoney">
					<div>提现</div>
				</div>

				<div style="height: 15px"></div>

				<a class="nav border-bottom " href="https://www.rrtoken.tech/#/blog-details/5b46b3dea41d58000f85dd19">
					<div>帮助</div>
				</a>
				
				<router-link tag="div" class="nav" :to="{path: '/poster'}">
					<div>生成我的专属海报</div>
				</router-link>
				
			</scroller>

		</div>

		<!-- footer -->
		<div class="footer">
			<div @click="toList">
                <img src="../assets/nav1.png" alt="">
                我发布的
            </div>
			<div @click="toOwer">
                <img src="../assets/nav2.png" alt="">
                我持有的
            </div>
			<div class="actived">
                <img src="../assets/nav3_active.png" alt="">
                个人中心
            </div>
		</div>

		<!-- mask -->
        <div class="mask" v-if="maskShow">
            <div class="msg">
                <div>

                    <div class="top">
                        <span>提现</span>
                    </div>
                    <div class="bottom">
                        <div class="msg2">
                            <div class="form">
                                <div>可提现：495</div>
                                <div>余额：500</div>
                            </div>
                            <div class="btn">
                                <div class="tips">
									<div>超过100元可以提现，平台收取1%服务费</div>
									<div>提现申请后，将在24小时内打入你的微信钱包</div>
								</div>
                                <div class="btn-default">确定</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="close" @click="close"></div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
  	name: "PersonCenter",
	data() {
		return {
			wxTitle: "个人中心",
            maskShow: false,
            isPoor: false
		};
	},
    computed: {
        userInfo() {
            return  this.$store.state.loginUser;
        }
    },
	methods: {
		close() {
			this.maskShow = false;
        },
        getMoney() {
            // this.maskShow = true;
        },
		toOwer() {
            this.$router.push({path: `/ower/${this.userInfo._id}`})
        },
        toList() {
            this.$router.push({path: '/'})
        }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.container {
		a {
			text-decoration: none;
		}
		height: calc(100vh - 49px);
		background-color: rgba(242,244,248,1);
		overflow: hidden;
		position: relative;
		.person {
			background-color: #ffffff;
			height: 162px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.photo {
				width: 80px;
				height: 80px;
				background-color: rgba(242,244,248,1);
				background-position: center;
				background-size: cover;
				border-radius: 100%;
			}
			.name {
				font-size: 15px;
				color: #747F8B;
				margin-top: 10px;
			}
		}
		.amount {
			background-color: #ffffff;
			height: 49px;
			>div {
				height: 100%;
				margin: 0 20px;
				position: relative;
				overflow: hidden;
				font-size: 15px;
				color: #333333;
				display: flex;
				justify-content: space-between;
				align-items: center;
				&::before {
					content: '';
					width: 100%;
					height: 1px;
					background-color: rgba(157, 165, 174,.1);
					position: absolute;
					top: 0;
					left: 0;
				}
				&::after {
					content: '';
					width: 100%;
					height: 1px;
					background-color: rgba(157, 165, 174,.1);
					position: absolute;
					bottom: 0;
					left: 0;
				}
			}
			.light {
				color: #018FFF;
			}
		}
		.tixian {
			height: 86.5px;
			background-color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
			>div {
				width: 47.6%;
				height: 44px;
				line-height: 44px;
				color: #ffffff;
				text-align: center;
				background: rgba(87,176,255,1);
				box-shadow: 10px 0px 20px rgba(89,186,255,0.4);
				border-radius: 9px;
			}
		}
		.nav {
			background-color: #ffffff;
			height: 55px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #333333;
			padding: 0 20px;
			font-size: 15px;
		}
		.border-bottom {
			position: relative;
			overflow: hidden;
			&::after {
				content: '';
				width: 100%;
				height: 1px;
				background-color: rgba(157, 165, 174, .5);
				position: absolute;
				bottom: 0;
				left: 0;
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
                    .msg2 {
                        display: inline-block;
                        margin-top: 17.5px;
                        width: 100%;
                        .form {
                            padding: 0 20px;
                            >div {
								&:first-child {
									font-size: 18px;
									color: #018FFF;
								}
								&:last-child {
									margin-top: 17px;
									font-size: 13px;
									color: #666666;
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
								margin-top: 32.5px;
                            }
                        }
                    }
                }
            }
        }
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
