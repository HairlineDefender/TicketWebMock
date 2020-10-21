<template>
  <div>
    <img class="user-poster" src="../../../assets/img/header.png" />
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="8">
        <van-icon name="balance-list-o" />
        已支付
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" />
        售后订单
      </van-col>
      <!-- <van-col span="6">
        <van-icon name="logistics" />
        全部订单
      </van-col> -->
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="friends-o" title="常用旅客" is-link />
      <van-cell icon="label-o" title="实名认证" is-link />
      <van-cell icon="chat-o" title="客服反馈" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from "vant";

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
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
