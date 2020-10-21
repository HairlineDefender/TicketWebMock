<template>
  <div>
    <img
      class="user-poster"
      src="../../../assets/img/header.png"
    />

    <van-cell-group>
      <van-form @submit="searchHandler">
        <van-field
          readonly
          clickable
          label="出发地"
          :value="departurePlace"
          placeholder="选择城市"
          @click="showDepartureAddressPicker = true"
          :rules="[{ required: true, message: '请选择出发地' }]"
        />

        <van-field
          readonly
          clickable
          label="目的地"
          :value="destinationPlace"
          placeholder="选择城市"
          @click="showDestinationAddressPicker = true"
          :rules="[{ required: true, message: '请选择目的地' }]"
        />
        <van-field
          readonly
          clickable
          label="出行日期"
          :value="departureDate"
          placeholder="选择出发日期"
          @click="showCalendar = true"
          :rules="[{ required: true, message: '请选择出行日期' }]"
        />

        <van-button
          round
          block
          :loading="isLoading"
          loading-text="搜索中..."
          type="primary"
          native-type="submit"
          >查找车票
        </van-button>
      </van-form>
      <van-popup v-model="showDepartureAddressPicker" round position="bottom">
        <van-area
          show-toolbar
          :area-list="area"
          @cancel="showDepartureAddressPicker = false"
          @confirm="departureConfirmHandler"
        />
      </van-popup>
      <van-popup v-model="showDestinationAddressPicker" round position="bottom">
        <van-area
          show-toolbar
          :area-list="area"
          @cancel="showDestinationAddressPicker = false"
          @confirm="destinationConfirmHandler"
        />
      </van-popup>
      <van-calendar v-model="showCalendar" @confirm="departureDateHandler" />
    </van-cell-group>
  </div>
</template>

<script>
import {
  Field,
  Popup,
  Area,
  Cell,
  CellGroup,
  Button,
  Form,
  Calendar,
} from "vant";
import ChineseCityList from "../../../assets/area";
export default {
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Form.name]: Form,
    [Calendar.name]: Calendar,
  },
  data() {
    return {
      showDepartureAddressPicker: false,
      showDestinationAddressPicker: false,
      departurePlace: "",
      destinationPlace: "",
      area: ChineseCityList,
      isLoading: false,
      showCalendar: false,
      departureDate: null,
    };
  },
  methods: {
    departureConfirmHandler(value) {
      // eslint-disable-next-line no-console
      console.log(value);
      if (Array.isArray(value)) {
        value = value.map((v) => v.name).join(" ");
      }
      this.departurePlace = value;
      this.showDepartureAddressPicker = false;
    },
    destinationConfirmHandler(value) {
      if (Array.isArray(value)) {
        value = value.map((v) => v.name).join(" ");
      }
      this.destinationPlace = value;
      this.showDestinationAddressPicker = false;
    },
    searchHandler() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        // 使用 / 代表前往根目录
        this.$router.push({
          path: "/search",
          query: {
            from: this.departurePlace,
            to: this.destinationPlace,
            date: this.departureDate,
          },
        });
      }, 1000);
    },
    departureDateHandler(departureDate) {
      this.departureDate = `${departureDate.getFullYear()}/${departureDate.getMonth() +
        1}/${departureDate.getDate()}`;
      this.showCalendar = false;
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
