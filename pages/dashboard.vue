<template>
  <div>
    <base-header class="pb-6">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Ultimos 5 Ingresos"
            type="gradient-green"
            :sub-title="cinco_ingresos"
            icon="ni ni-money-coins"
          >
            <!--<template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
              <span class="text-nowrap"></span>
            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Ultimos 5 Gastos"
            type="gradient-danger"
            :sub-title="cinco_gastos"
            icon="ni ni-money-coins"
          >
            <!--<template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
              <span class="text-nowrap"></span>
            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Empleados"
            type="gradient-dark"
            :sub-title= presentes_empleados
            icon="ni ni-single-02"
          >
            <template slot="footer">
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i> {{ausentes_empleados}}</span
              >
              <span class="text-nowrap">AUSENTES</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Tareas Realizadas"
            type="gradient-info"
            :sub-title="trabajoPen"
            icon="ni ni-chart-bar-32"
          >
            <template slot="footer">
              <span class="text-danger mr-2">Trabajos Pendientes</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div class="row" style="justify-content: center">
        <div class="col-xl-6">
          <card>
            <template slot="header">
              <!-- Subtitle -->
              <h6 class="surtitle">AGRO</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">INGRESOS / GASTOS</h5>
            </template>
            <div class="chart-area">
              <doughnut-chart
                ref="graficaGastoIngreso"
                :height="350"
                :chart-data="doughnutChart.chartData"
                :extra-options="doughnutChart.extraOptions"
              >
              </doughnut-chart>
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

import DoughnutChart from "~/components/argon-core/Charts/DoughnutChart";
import LineChart from "~/components/argon-core/Charts/LineChart";
import BarChart from "~/components/argon-core/Charts/BarChart";
import PieChart from "~/components/argon-core/Charts/PieChart";
import * as chartConfigs from "~/components/argon-core/Charts/config";
import { Charts } from "~/components/argon-core/Charts/config";

// Components
import BaseProgress from "@/components/argon-core/BaseProgress";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/argon-core/Cards/StatsCard";

// Lists
import ActivityFeed from "@/components/pages/dashboard/ActivityFeed.vue";
import TaskList from "@/components/pages/dashboard/TaskList.vue";
import UserList from "@/components/pages/dashboard/UserList.vue";
import ProgressTrackList from "@/components/pages/dashboard/ProgressTrackList.vue";

// Tables
import LightTable from "@/components/pages/dashboard/LightTable.vue";
import SocialTrafficTable from "@/components/pages/dashboard/SocialTrafficTable.vue";
import PageVisitsTable from "@/components/pages/dashboard/PageVisitsTable.vue";

export default {
  layout: "DashboardLayout",
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
    PieChart,
    DoughnutChart,
  },
  data() {
    return {
      doughnutChart: {
        chartData: {
          labels: ["GASTOS", "INGRESOS"],
          datasets: [
            {
              data: [50, 50],
              backgroundColor: [
                Charts.colors.theme["danger"],
                Charts.colors.theme["success"],
              ],
              label: "Dataset 1",
            },
          ],
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: "top",
          },
          animation: {
            animateScale: true,
            animateRotate: true,
          },
        },
      },
      token: this.$cookies.get("token"),
      cinco_ingresos: "0.00",
      cinco_gastos: "0.00",
      trabajoPen: "0",
      panel_gasto : "0.00",
      panel_ingreso : "0.00",
      ausentes_empleados : "0",
      faltantes_empleados : "0",
      presentes_empleados : "0"
    };
  },
  methods: {
    async readPanel() {
      this.cinco_ingresos = "0.00";
      this.cinco_gastos = "0.00";
      this.panel_gasto = "0.00";
      this.panel_ingreso = "0.00";
      this.ausentes_empleados = "0";
      this.faltantes_empleados = "0";
      this.presentes_empleados = "0";
      this.trabajoPen = "0";

      try {
        var datos = await this.$axios.post(
          process.env.baseUrl + "/panel_usuario_empresa",
          {
            token: this.token,
          }
        );

        this.cinco_ingresos = datos.data.cinco_ingresos;
        this.cinco_gastos = datos.data.cinco_gastos;
        this.panel_gasto = datos.data.panel_gasto;
        this.panel_ingreso = datos.data.panel_ingreso;
        this.ausentes_empleados = datos.data.empleados.ausentes.toString();
        this.faltantes_empleados = datos.data.empleados.faltantes.toString();
        this.presentes_empleados = datos.data.empleados.presentes.toString();
        this.trabajoPen = datos.data.trabajoPen.toString();

        this.doughnutChart.chartData.datasets[0].data[0] =
          (parseFloat(this.cinco_gastos.replace(/,/g, "")) / 100) * 100;
        this.doughnutChart.chartData.datasets[0].data[1] =
          (parseFloat(this.cinco_ingresos.replace(/,/g, "")) / 100) * 100;
        /*this.doughnutChart.chartData.datasets[0].data[0] = 75;
        this.doughnutChart.chartData.datasets[0].data[1] = 25;*/

        await this.$nextTick();

        if (this.$refs.graficaGastoIngreso) {
          this.$refs.graficaGastoIngreso.renderChart(
            this.doughnutChart.chartData,
            this.doughnutChart.extraOptions
          );
        }

        /*this.doughnutChart.chartData.datasets[0].data[0] = parseFloat(this.cinco_gastos) * 100
    this.doughnutChart.chartData.datasets[0].data[1] = parseFloat(this.cinco_ingresos) * 100*/
        console.log(this.doughnutChart.chartData);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.readPanel();
  },
};
</script>

<style></style>
