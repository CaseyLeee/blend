<template>
  <div>
    <div class="top"></div>

    <div class="rapidtop">
      <div v-for="item in listTop" :key="item.id">
        <div class="content">
          <img :src="item.id==1?rapidl:rapidr" />
          <div class="content-pro">
            <span>{{item.title}}</span>
            <span>{{item.subtitle}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="rapiddown">
      <div v-for="item in listDown" :key="item.id" class="content">
        <img :src="item.img_url" alt />
        <span>{{item.title}}</span>
      </div>
    </div>
    <hr />
    <div class="inform">
      <wipper :content="inform"></wipper>
    </div>
     <hr />
    <div class="activity">
      <wipper :content="imgs"></wipper>
    </div>
    <div class="cloud" >
     
    </div>
  </div>
</template>
<script>
import wipper from "../common/wipper";
export default {
  data() {
    return {
      listTop: [],
      listDown: [],

      rapidl: require("../../assets/topimg.png"),
      rapidl: require("../../assets/homepage/rapid-l.png"),
      rapidr: require("../../assets/homepage/rapid-r.png"),

      inform: {
        style: "inform",
        contentinform: []
      },
      imgs: {
        style: "imgs",
        hastitle:true,
        contentimg: [
          { id: 1, img_url: require("../../assets/homepage/swiper-1.jpg") },
          { id: 2, img_url: require("../../assets/homepage/swiper-2.jpg") },
          { id: 3, img_url: require("../../assets/homepage/swiper-3.jpg") },
          { id: 4, img_url: require("../../assets/homepage/swiper-4.jpg") }
        ]
      }
    };
  },
  components: { wipper },
  created() {
    this.axios
      .get("/rapidtop", {
        params: {}
      })
      .then(res => {
        if (res.status == 0) {
        } else {
          this.listTop = res.data.list;
        }
      });
    this.axios
      .get("/rapiddown", {
        params: {}
      })
      .then(res => {
        if (res.status == 0) {
        } else {
          let imgs = [
            require("../../assets/homepage/rapid-1.png"),
            require("../../assets/homepage/rapid-2.png"),
            require("../../assets/homepage/rapid-3.png"),
            require("../../assets/homepage/rapid-4.png"),
            require("../../assets/homepage/rapid-5.png")
          ];
          this.listDown = res.data.list.map((item, index) => {
            this.$set(item, "img_url", imgs[index]);
            return item;
          });
          console.log(this.listDown);
        }
      });
    this.axios
      .get("/inform", {
        params: {}
      })
      .then(res => {
        if (res.status == 0) {
        } else {
          this.inform.contentinform = res.data.list;
        }
      });
  }
};
</script>
<style lang="scss"  scoped>
.top {
  background: url("~@/assets/topimg.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 120px;
}
.rapidtop {
  display: flex;
  justify-content: space-between;

  height: 75px;
  background-color: red($color: #000000);
  .content {
    border-radius: 5%;
    background-image: linear-gradient(#e66465, #9198e5);
    margin: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: center;
    .content-pro {
      text-align: left;
      padding-left: 10px;
    }
    img {
      width: 20%;
      height: 40%;
    }
  }
}
span {
  display: block;
}
.rapiddown {
  display: flex;
  margin-top: 30px;
  .content {
    width: 20%;
    font-size: 12px;
    img {
      width: 75%;
      height: 40px;
    }
  }
}
hr {
  height: 7px;
  background-color: #f2f3f5;
  border: none;
  margin: 13px -8px;
}
</style>