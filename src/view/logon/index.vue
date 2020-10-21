<template>
  <div>
    <img class="user-poster" src="../../assets/img/header.png" />

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
          label="密码"
          type="password"
          left-icon="coupon-o"
          placeholder="输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="rePassword"
          label="重复密码"
          type="password"
          left-icon="coupon-o"
          placeholder="输入密码"
          :rules="[{ required: true, message: '请再次填写密码' }]"
        />
        <van-button
          round
          block
          :loading="isLoading"
          loading-text="注册中..."
          type="primary"
          native-type="submit"
          >立即注册
        </van-button>
      </van-form>
    </van-cell-group>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Icon,
  Cell,
  CellGroup,
  Field,
  Button,
  Form,
  Notify,
} from "vant";

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
      rePassword: "",
      isLoading: false,
    };
  },
  methods: {
    loginHandler() {
      const { username, password, rePassword } = this;
      if (username && password === rePassword) {
        this.isLoading = true;
        return setTimeout(() => {
          this.isLoading = false;
          this.$router.push("/main/home");
        }, 1000);
      }
      if (password !== rePassword) {
        Notify("两次输入的密码必须一致");
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
