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
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <van-submit-bar
      :price="price"
      button-text="提交订单"
      @submit="submitHandler"
      :loading="isLoading"
    />
  </div>
</template>

<script>
import { NavBar, SubmitBar, CellGroup, AddressList, Toast } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [SubmitBar.name]: SubmitBar,
    [CellGroup.name]: CellGroup,
    [AddressList.name]: AddressList,
  },
  data() {
    return {
      chosenAddressId: "1",
      price: 0,
      isLoading: false,
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      disabledList: [],
    };
  },
  computed: {
    title() {
      const { trainNumber, date } = this.$route.query;
      return `${trainNumber}-${date}`;
    },
  },
  methods: {
    backHandler() {
      this.$router.go(-1);
    },
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    submitHandler() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.$router.push("/main/home");
      }, 700);
    },
  },
  mounted() {
    const { price } = this.$route.query;
    this.price = parseInt(price * 100);
  },
};
</script>

<style>
.van-submit-bar__bar > .van-submit-bar__text {
  text-align: left;
}
.van-address-list__bottom {
  position: inherit;
}
</style>
