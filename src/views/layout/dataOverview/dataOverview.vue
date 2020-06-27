<template>
  <div class="dataOver">
    <el-card>
      <div class="data">
        <div class="item">
          <div class="top">{{ info.increment_users }}</div>
          <p class="txt">今日新增用户</p>
        </div>
        <div class="item">
          <div class="top">{{ info.total_users }}</div>
          <p class="txt">总用户量</p>
        </div>
        <div class="item">
          <div class="top">{{ info.increment_questions }}</div>
          <p class="txt">新增试题</p>
        </div>
        <div class="item">
          <div class="top">{{ info.total_questions }}</div>
          <p class="txt">总试题量</p>
        </div>
        <div class="item">
          <div class="top">{{ info.total_done_questions }}</div>
          <p class="txt">总刷题量</p>
        </div>
        <div class="item">
          <div class="top">{{ info.personal_questions }}</div>
          <p class="txt">人均刷题量</p>
        </div>
      </div>
    </el-card>
    <el-card class="el_card">
      <div ref="echarts" class="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import { getDataList, getDataStatistics } from '@/api/dataOver.js';
import echarts from 'echarts';
export default {
  data() {
    return {
      info: '',
      myEcharts: '',
      list: [],
    };
  },
  created() {
    getDataList().then((res) => {
      this.info = res.data;
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.myEcharts = echarts.init(this.$refs.echarts);
    });
    getDataStatistics().then((res) => {
      window.console.log(res);
      this.list = res.data;
      let nameArr = res.data.map((item) => {
        return item.name;
      });
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          right: 50,
          top: 150,
          data: nameArr,
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: res.data,
          },
        ],
        color: ['#f76137', '#f9b358', '#409eff'],
      };
      this.myEcharts.setOption(option);
    });
  },
};
</script>

<style lang="less">
.dataOver {
  .el_card {
    margin-top: 15px;
  }
  .echarts {
    height: 400px;
  }
  .data {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      .top {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid #0086fa;
        text-align: center;
        line-height: 100px;
        font-size: 25px;
        color: #0086fa;
      }
      .txt {
        font-size: 16px;
        text-align: center;
        color: #737373;
        margin-top: 10px;
      }
      &:nth-child(3),
      &:nth-child(4) {
        .top {
          border: 2px solid #f76137;
          color: #f76137;
        }
        .txt {
          color: #f76137;
        }
      }
      &:nth-child(5),
      &:nth-child(6) {
        .top {
          border: 2px solid #55cd78;
          color: #55cd78;
        }
        .txt {
          color: #55cd78;
        }
      }
    }
  }
}
</style>
