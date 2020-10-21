<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="backHandler"
      fixed
      placeholder
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card
        v-for="item in list"
        :key="item.key"
        :price="item.price"
        :desc="title"
        :title="item.trainNumber"
        thumb="https://blog.geohey.com/content/images/2018/04/high-speed-train.jpg"
        @click="cardClickHandler(item)"
      >
        <template #desc>
          <p>{{ title }}</p>
        </template>
      </van-card>
      <van-sku
        :show-add-cart-btn="false"
        v-model="showSku"
        :goods-id="selectedTrainNumber"
        :sku="sku"
        :goods="goods"
        :quota="1"
        @buy-clicked="buyClickHandler"
      >
        <template #sku-header-extra>
          {{ selectedTrainNumber }}
        </template>
      </van-sku>
    </van-list>
  </div>
</template>

<script>
import { NavBar, List, Cell, Card, Sku } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [Card.name]: Card,
    [Sku.name]: Sku,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      showSku: false,
      selectedTrainNumber: "",
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "动车座位", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "A座", // skuValueName：规格值名称
                imgUrl: require("../../assets/img/seat.png"), // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: require("../../assets/img/seat.png"), // 用于预览显示的规格类目图片
              },
              {
                id: "2",
                name: "B座",
                imgUrl: require("../../assets/img/seat.png"), // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: require("../../assets/img/seat.png"), // 用于预览显示的规格类目图片
              },
              {
                id: "3",
                name: "C座",
                imgUrl: require("../../assets/img/seat.png"), // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: require("../../assets/img/seat.png"), // 用于预览显示的规格类目图片
              },
              {
                id: "4",
                name: "D座",
                imgUrl: require("../../assets/img/seat.png"), // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: require("../../assets/img/seat.png"), // 用于预览显示的规格类目图片
              },
              {
                id: "5",
                name: "F座",
                imgUrl: require("../../assets/img/seat.png"), // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: require("../../assets/img/seat.png"), // 用于预览显示的规格类目图片
              },
            ],
            largeImageMode: true, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 1, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            price: (Math.random() * 80000 + 2000).toFixed(2), // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
          {
            id: 2, // skuId
            s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
            price: (Math.random() * 80000 + 2000).toFixed(2), // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
          {
            id: 3, // skuId
            s1: "3", // 规格类目 k_s 为 s1 的对应规格值 id
            price: (Math.random() * 80000 + 2000).toFixed(2), // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
          {
            id: 4, // skuId
            s1: "4", // 规格类目 k_s 为 s1 的对应规格值 id
            price: (Math.random() * 80000 + 2000).toFixed(2), // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
          {
            id: 5, // skuId
            s1: "5", // 规格类目 k_s 为 s1 的对应规格值 id
            price: (Math.random() * 80000 + 2000).toFixed(2), // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: (Math.random() * 800 + 20).toFixed(2), // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture:
          "https://blog.geohey.com/content/images/2018/04/high-speed-train.jpg",
      },
    };
  },
  computed: {
    title() {
      const { from, to, date } = this.$route.query;
      return `${from} ->
      ${to}
      ${date}`;
    },
  },
  methods: {
    backHandler() {
      this.$router.go(-1);
    },
    cardClickHandler(item) {
      const { trainNumber } = item;
      this.selectedTrainNumber = trainNumber;
      this.showSku = true;
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({
            key: this.list.length + 1,
            price: (Math.random() * 800 + 20).toFixed(2),
            trainNumber: `${
              (Math.random() * 10).toFixed(0) % 2 === 0 ? "D" : "G"
            }${(Math.random() * 9001 + 999).toFixed(0)}`,
          });
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    buyClickHandler(sku) {
      const {
        selectedSkuComb: { id },
      } = sku;
      const { selectedTrainNumber } = this;
      const { date } = this.$route.query;
      this.$router.push({
        path: "/order",
        query: {
          trainNumber: selectedTrainNumber,
          seatId: id,
          date,
        },
      });
    },
  },
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
