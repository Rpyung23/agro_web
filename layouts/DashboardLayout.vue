<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot-scope="props" slot="links">

        <sidebar-item translate="no"  :link="{
          name: 'Dashboard',
          icon: 'ni ni-chart-bar-32',
          path: './dashboard',
        }">
        </sidebar-item>

        <sidebar-item translate="no"  :link="{
          name: 'Sucursales / Ranchos',
          icon: 'ni ni-box-2',
          path: '/sucursal',
        }">
        </sidebar-item>


        <sidebar-item translate="no"  :link="{
          name: 'Agenda',
          icon: 'ni ni-badge',
          path: '/agenda',
        }">
        </sidebar-item>


        <sidebar-item translate="no"  :link="{
          name: 'Personal',
          icon: 'ni ni-single-02',
          path: '/personal',
        }">
        </sidebar-item>


        <sidebar-item translate="no"  :link="{
          name: 'Asistencia',
          icon: 'ni ni-collection',
          path: '/asistencia',
        }">
        </sidebar-item>

        <sidebar-item translate="no"  :link="{
          name: 'Sueldos',
          icon: 'ni ni-money-coins',
          path: '/sueldo',
        }">
        </sidebar-item>

        <sidebar-item translate="no"  :link="{
          name: 'Control Vehicular',
          icon: 'ni ni-delivery-fast',
          path: '/control_vehicular',
        }">
        </sidebar-item>

        <sidebar-item translate="no"  :link="{
          name: 'Contabilidad',
          icon: 'ni ni-money-coins',
        }">
        <sidebar-item :link="{ name: 'INGRESOS', path: './ingresos' }" translate="no"/>
          <sidebar-item :link="{ name: 'GASTOS', path: './gastos' }" translate="no"/>

        </sidebar-item>

        <sidebar-item translate="no"  :link="{
          name: 'Trabajos Pendientes',
          icon: 'ni ni-ruler-pencil',
          path: '/trabajos',
        }">
        </sidebar-item>



      </template>

    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.name == 'alternative' ? 'light' : 'default'"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <nuxt></nuxt>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "~/components/layouts/argon/DashboardNavbar.vue";
import DashboardContent from "~/components/layouts/argon/Content.vue";


export default {
  components: {
    DashboardNavbar,
    DashboardContent,
  },
  data() {
    return {
    }
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("navbar-inner");
        initScrollbar("main-content");
        initScrollbar("sidenav");
      }
    }
  },
  mounted() 
  {
    this.initScrollbar()
  },
};
</script>
<style lang="scss">
</style>
