<template>
    <div class="container">
        <div class="qr">
            <img :src="qrUrl" >
        </div>
        <div class="tips">
            <div class="line1">长按保存图片到相册</div>
            <div class="line2">将二维码放置到任意位置，扫描二维码后</div>
            <div class="line3">粉丝将获得你的通证奖励</div>
        </div>
    </div>
</template>

<script>
export default {
	name: "HelloWorld",
	data() {
		return {
            wxTitle: "通证二维码",
            qrUrl: ''
		};
    },
    created() {
        console.log(this.$route)
        this.$store.dispatch('getQR', {
            tokenid: this.getParams.tid
        }).then(res => {
            this.qrUrl = res.qrcodeurl;
        });
        this.$store.dispatch('getOthers', {
            uid: this.getParams.uid
        }).then(res => {
            console.log('qr-code>>>>>>>', res);
        });
    },
    computed: {
        getParams() {
            return this.$route.query;
        },
    },
	methods: {
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .qr {
            overflow: hidden;
            margin: 40px 15px;
            img {
                width: 100%
            }
        }
        .tips {
            color: #999999;
            font-size: 12px;
            margin-bottom: 70px;
            .line1 {
                color: #666666;
                font-size: 18px;
            }
            .line2 {
                margin-top: 15px;
            }
            .line3 {
                margin-top: 2px;
            }
        }
    }
</style>
