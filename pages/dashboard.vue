<template>
  <div>
    <base-header class="pb-6">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card title="Ultimos 5 Ingresos"
                      type="gradient-green"
                      sub-title="+4.990.00"
                      icon="ni ni-money-coins">

            <!--<template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
              <span class="text-nowrap"></span>
            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card title="Ultimos 5 Gastos"
                      type="gradient-danger"
                      sub-title="-990.00"
                      icon="ni ni-money-coins">

            <!--<template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
              <span class="text-nowrap"></span>
            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card title="Empleados"
                      type="gradient-dark"
                      sub-title="924"
                      icon="ni ni-single-02">

            <template slot="footer">
              <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card title="Tareas Realizadas"
                      type="gradient-info"
                      sub-title="45"
                      icon="ni ni-chart-bar-32">

            <template slot="footer">
              <span class="text-danger mr-2">Trabajos Pendientes</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div class="row" style="justify-content: center;">
        <div class="col-xl-8">
          

          <card class="card-chart card-chart-pie">
  <h5 slot="header" class="card-category">Simple Pie Chart</h5>

  <div class="row">
    <div class="col-6">
      <div class="chart-area">
        <pie-chart
          :chart-data="bigLineChart.chartData"
          :extra-options="bigLineChart.extraOptions"
          :height="300"
        >
        </pie-chart>
      </div>
    </div>

    <div class="col-6">
      <h4 class="card-title">
        <i class="tim-icons  icon-trophy text-success "></i> 10.000$
      </h4>
      <p class="category">A total of $54000</p>
    </div>
  </div>
</card>

        </div>
      </div>
      <!-- End charts-->
    </div>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/argon-core/Charts/config';
  import LineChart from '@/components/argon-core/Charts/LineChart';
  import BarChart from '@/components/argon-core/Charts/BarChart';
  import PieChart from '@/components/argon-core/Charts/PieChart'

  // Components
  import BaseProgress from '@/components/argon-core/BaseProgress';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import StatsCard from '@/components/argon-core/Cards/StatsCard';

  // Lists
  import ActivityFeed from '@/components/pages/dashboard/ActivityFeed.vue';
  import TaskList from '@/components/pages/dashboard/TaskList.vue';
  import UserList from '@/components/pages/dashboard/UserList.vue';
  import ProgressTrackList from '@/components/pages/dashboard/ProgressTrackList.vue';

  // Tables
  import LightTable from '@/components/pages/dashboard/LightTable.vue';
  import SocialTrafficTable from '@/components/pages/dashboard/SocialTrafficTable.vue';
  import PageVisitsTable from '@/components/pages/dashboard/PageVisitsTable.vue';

  export default {
    layout: 'DashboardLayout',
    components: {
      ActivityFeed,
      LineChart,
      BarChart,
      BaseProgress,
      RouteBreadCrumb,
      StatsCard,
      TaskList,
      PageVisitsTable,
      SocialTrafficTable,
      LightTable,
      UserList,
      ProgressTrackList,
      PieChart
    },
    data() {
      return {
        bigLineChart: {
          allData: [
            [60],
            [40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Performance',
                data: [80, 20],
              }
            ],
            labels: ['May', 'Jun'],
          },
          extraOptions: chartConfigs.blueChartOptions,
        }
      };
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    mounted() {
      this.initBigChart(0);
    }
  };
</script>
<style></style>
