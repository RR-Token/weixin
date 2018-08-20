<template>
    <div class="container" :style="'backgroundImage:url('+ require('@/assets/body-bg.png') +''">
        <div class="title">
            <div>没有自己的通证，怎么好意</div>
            <div>思说是新时代的KOL？</div>
        </div>

        <div class="person">
            <div class="photo" :style="'backgroundImage:url('+ headimgurl +''"></div>
            <div class="name">{{ username }}</div>
        </div>

        <div class="desc">
            <!-- <div style="height: 25px;"></div> -->
            <div>已发行{{ rank.many }}种通证被{{ rank.count }}个粉丝持有</div>
            <!-- <div>战胜了97%的KOL</div> -->
        </div>

        <div class="code" :style="'backgroundImage:url('+ require('@/assets/qr-bg.png') +''">
            <div><img :src="qrUrl" class="qrcode"></div>
            <div>扫描二维码，获取我的通证</div>
        </div>
    </div>
</template>

<script>
export default {
	name: "Poster",
	data() {
		return {
            wxTitle: "我的海报",
		};
	},
    computed: {
        userInfo() {
            return this.$store.state.loginUser;
        },
        headimgurl() {
            return this.userInfo && this.userInfo.headimgurl;
        },
        username() {
            return this.userInfo && this.userInfo.username;
        },
        qrUrl() {
            return this.$store.state.qrurl;
        },
        tokenList() {
            return this.$store.state.tokenList || [];
        },
        fensiNum() {
            let num = 0;
            this.tokenList.length > 0 && this.tokenList.forEach(item => {
                num += parseInt(item.totalOwner);
            });
            return num || 0;
        },
        rank() {
            return {
                many: this.tokenList.length,
                count: this.fensiNum
            }
        }
    },
    created() {
        this.$store.dispatch('getUser');
    },
	methods: {
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.container {
        // height: 100vh;
        background-size: 100% 100%;
		background-color: rgba(242,244,248,1);
		// overflow: hidden;
        position: relative;
        padding: 48px 40px;
        box-sizing: border-box;
        .title {
            color: #ffffff;
            font-size: 24px;
            text-align: left;
            div {
                &:last-child {
                    margin-top: 10px;
                }
            }
        }
        .person {
            display: flex;
			flex-direction: column;
			justify-content: center;
            align-items: center;
            margin-top: 30px;
			.photo {
				width: 100px;
                height: 100px;
                border: 2px solid rgba(242,244,248,1);
                background-color: rgba(242,244,248,1);
				background-position: center;
				background-size: cover;
				border-radius: 100%;
			}
			.name {
				font-size: 18px;
				color: #ffffff;
				margin-top: 15px;
			}
        }
        .desc {
            color: #018fff;
            font-size: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            div {
                &:last-child{
                    margin-top: 10px;
                }
            }
        }
        .code {
            margin-top: 68px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .qrcode {
                width: 100%;
            }
            div {
                &:first-child {
                    width: 105px;
                    height: 105px;
                    background: #ffffff;
                    background-position: center;
                    background-size: cover;
                }
                &:last-child {
                    font-size: 14px;
                    margin-top: 13px;
                    color: #FFFFFF;
                }
            }
        }
    }
    @media screen and (max-height: 666px){
        .container {
            padding: 35px 40px;
            .title {
                font-size: 20px;
            }
            .desc {
                background-image: url('~@/assets/tag-bg.png');
                background-size: 100% 100%;
                height: 120px;
            }
            .code {
                margin-top: 50px;
            }
        }
    }
</style>
