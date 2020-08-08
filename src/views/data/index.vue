<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      </el-breadcrumb>
       <el-card class="char_bgc">
         <el-row :gutter="10">
           <el-col :span="12" style="text-align: center;">
              <p>行业情况分析</p>
              <div id="bar" style="height: 150px"></div>
           </el-col>
           <el-col :span="12" style="text-align: center;">
              <p>年龄分布状况</p>
              <div id="pie" style="height: 150px"></div>
           </el-col>
         </el-row>
         <el-row type="flex" justify="center">
            <el-col :span="12" style="text-align: center;">
              <p>地区分布</p>
              <div id="pie2" style="height: 150px"></div>
            </el-col>
         </el-row>
          <!-- <div id="main" style="width: 600px;height:400px;"></div> -->
      </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: {
    // 柱状图
    drawChart1() {
      // 实例化对象
      const myChart = this.$echarts.init(document.getElementById('bar'));
      const option = {
          color: ['#2f89cf'],
          tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              top: '10px',
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [{
              type: 'category',
              data: ['旅游行业', '金融行业', '游戏行业', '教育培训', '医疗行业', '电商行业', '社交行业'],
              // data: ['旅游行业', '金融行业', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                  alignWithLabel: true
              },
              // 修改刻度标签
              axisLabel: {
                  color: "#fff",
                  fontSize: '7'
              },
              // 修改x轴线是否显示隐藏
              axisLine: {
                  show: false
              },

          }],
          yAxis: [{
              type: 'value',
              // 修改刻度标签
              axisLabel: {
                  color: "#fff",
                  fontSize: '12'
              },
              // y轴线条改为了2像素
              axisLine: {
                  lineStyle: {
                      color: '#333',
                      width: 2
                  }
              },
              // y轴分割线
              splitLine: {
                  lineStyle: {
                      color: 'rgba(255,255,255,.1)'
                  }
              }
          }],
          series: [{
              name: '直接访问',
              type: 'bar',
              barWidth: '35%',
              data: [10, 52, 200, 334, 390, 330, 220],
              itemStyle: {
                  barBorderRadius: 5
              }
          }]
      };
      // 把配置项给实例对象
      myChart.setOption(option);
      // 4. 让图表跟随屏幕自动的去适配
      window.addEventListener('resize', function() {
          myChart.resize();
      })
    },
    
    // 饼图
    drawChart2() {
      // 1. 实例化对象
          const myChart = this.$echarts.init(document.getElementById('pie'));
          // 2. 指定配置
          const option = {
              color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab'],
              tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              legend: {
                  bottom: '5',
                  itemWidth: 10,
                  itemHeight: 10,
                  // 修改图例组件的字体大小
                  textStyle: {
                      color: '#fff',
                      fontSize: 8
                  },
                  // series中有name值   legend中的data可省略
                  // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [{
                  name: '访问来源',
                  type: 'pie',
                  // 设置饼图在容器中的位置  x轴方向,y轴方向
                  center: ['50%', '40%'],
                  // 修改内圆半径和外圆半径为 百分比是相对于容器宽度来说的
                  radius: ['40%', '60%'],
                  avoidLabelOverlap: false,
                  // 图形上的文字
                  label: {
                      show: false,
                      position: 'center'
                  },
                  //是否显示视觉引导线
                  labelLine: {
                      show: false
                  },
                  data: [
                      { value: 4, name: '10岁以下' },
                      { value: 20, name: '20-29岁' },
                      { value: 15, name: '30-39岁' },
                      { value: 5, name: '40-49岁' },
                      { value: 7, name: '50岁以上' }
                  ]
              }]
          };
        // 3. 把配置给实例对象
        myChart.setOption(option);
        // 4. 让图表跟随屏幕自动的去适配
        window.addEventListener('resize', function() {
            myChart.resize();
        })
    },
    drawChart3() {
        // 1.实例化对象
        const myChart = this.$echarts.init(document.getElementById('pie2'));
        // 2. 指定配置 
        const option = {
            color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                top: 'bottom',
                bottom: '-10',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    fontSize: 8,
                    color: '#fff'
                }
            },
            series: [{
                name: '地区分布',
                type: 'pie',
                radius: ['15%', '60%'],
                center: ['50%', '45%'],
                roseType: 'radius',
                label: {
                    fontSize: 10
                },
                labelLine: {
                    length: 5
                },
                data: [
                    { value: 10, name: '云南' },
                    { value: 5, name: '江西' },
                    { value: 15, name: '北京' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 35, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 40, name: '湖北' }
                ]
            }]
        };
        // 3. 把配置给到配置对象
        myChart.setOption(option);
        // 4. 让图表跟随屏幕自动的去适配
        window.addEventListener('resize', function() {
            myChart.resize();
        })
      }
},
  // 渲染到页面中
  mounted() {
    this.drawChart1();
    this.drawChart2();
    this.drawChart3();
  } 
}

</script>
<style lang='less' scoped>
.char_bgc {
  // background-color: rgba(0,0,0,.5);
  background-color: #555;
  p {
    color: #fff;
    font-size: 15px;
    background-color: #1facff;
    border-radius: 10px;
  }
}
</style>