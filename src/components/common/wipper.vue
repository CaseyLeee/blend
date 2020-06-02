<template>
  <div>
    <!-- 因为从父组件传过来的值是异步获取 所以必须等到content里实际有值再加载 -->
    <div v-if="content.contentinform && content.contentinform.length" class="contentinform">
  
          <img :src="informicon" alt />
    
    
   
        <transition-group
          tag="ul"
          name="list"
          @after-leave="autoPlay(content.contentinform.length)"
        >
          <li v-for="(item,index) in content.contentinform" :key="item.id" v-show="isa===index">
            <span>{{item.title}}</span>
          </li>
        </transition-group>
      
    </div>
    <div v-if="content.contentimg && content.contentimg.length" class="contentimg">
      <div v-if="content.hastitle" class="title">
        <div>特色活动</div>
        <div>{{isa+1}}/{{content.contentimg.length}}</div>
      </div>
      <transition-group tag="ul" name="img" @after-leave="autoPlay(content.contentimg.length)">
        <li v-for="(item,index) in content.contentimg" :key="item.id" v-show="isa===index">
          <img :src="item.img_url" alt />
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  props: ["content"],
  data() {
    return {
      isa: 0,
      informicon: require("../../assets/homepage/inform.png")
    };
  },

  methods: {
    autoPlay(le) {
      setTimeout(() => {
        //一定要用 @after-leave="this.autoPlay"和setTimeout去处理事件的原因应该是 假如用interval 5s执行一次
        // 但是可能在5秒内  即将display=none的动画可能还差一点点没有走完 或者卡在即将走完
        //因为setTimeout里面也有函数要执行 也需要时间之类的？所以就导致没有真正的display就开始下一个5秒
        //如果超过3个以上的不会出问题 但是如果是只有2个 就会导致 会从上面(因为没有回到初始的隐藏就开始下一个5S)到下面  不是原来的下面往上面
        //但是有时候好像又是正常的 ？保险起见这样写
        if (this.isa == le - 1) {
          this.isa = 0;
        } else {
          this.isa++;
        }
      }, 3000);
    }
  },

  mounted() {
    this.autoPlay(0);
  }
};
</script>
<style lang="scss" scoped>
.contentinform {
  display: flex;
  justify-content: center;

  img {
    width: 15%;
    height: 50px;
    border-radius: 7px 0px 0px 7px;
    margin: 0 -5px 0 0;
  }
  .list-enter {
    transform: translateY(100%);
  }
  .list-leave-active {
    transform: translateY(-100%);
    /* position: absolute; 不能放在此处是因为2个li  下面的Li成为absolute 但是没有设置top就会往下排  设置tanslateY=-100会和第一个Li重叠  除非再设置一个top :0 使之不往下排*/
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 3s ease;
  }
  ul {
    width: 75%;
    height: 50px;
    background-color: rgb(240, 232, 232);
    border-radius: 7px;
    overflow: hidden;
    position: relative;
    margin: 0;
  }

  li {
    line-height: 50px;
    position: absolute;
  }
}
.contentimg {
  .title {
    display: flex;
    justify-content: space-between;
  }
  .img-enter {
    transform: translateX(100%);
  }
  .img-leave-active {
    transform: translateX(-100%);
  }

  .img-enter-active,
  .img-leave-active {
    transition: all 3s ease;
  }

  .img-leave {
    transform: translateX(0); //两图贴合滑动
  }

  ul {
    height: 150px;
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: 0;
  }

  li {
    height: 100%;

    position: absolute;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
li {
  list-style: none;
}
</style>