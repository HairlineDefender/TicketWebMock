<template>
  <div>
    <img
      class="user-poster"
      src="../../../public/header.png"
    />

    <van-cell-group>
      <van-form @submit="loginHandler">
        <van-field
          v-model="username"
          label="账号"
          left-icon="manager-o"
          placeholder="输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="password"
          label="密码 "
          type="password"
          left-icon="coupon-o"
          placeholder="输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-button
          round
          block
          :loading="isLoading"
          loading-text="登录中..."
          type="primary"
          native-type="submit"
          >立即登录
        </van-button>
      </van-form>
      <!-- <van-button
        size="large"
        :loading="isLoading"
        loading-text="登录中..."
        color="green"
        >立即登录
      </van-button> -->
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Field, Button, Form } from "vant";

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Form.name]: Form,
  },
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    loginHandler() {
      const { username, password } = this;
      if (username === "admin" && password === "123456") {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.$router.push("/main/home");
        }, 1000);
      }
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
