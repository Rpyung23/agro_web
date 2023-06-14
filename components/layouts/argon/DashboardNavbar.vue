<template>
  <base-nav container-classes="container-fluid" class="navbar-top border-bottom navbar-expand"
    :class="{ 'bg-success navbar-dark': type === 'default' }">
    <div id="titleGestionInteligente" class="col barraTitle">
      <span class="titleNavbar text-white mb-0 font-weight-bold">AGRO WEB
      </span>
    </div>
    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center ml-md-auto">
      <li class="nav-item d-xl-none">
        <!-- Sidenav toggler -->
        <div class="pr-3 sidenav-toggler" :class="{
          active: $sidebar.showSidebar,
          'sidenav-toggler-dark': type === 'default',
          'sidenav-toggler-light': type === 'light',
        }" @click="toggleSidebar">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>

      <!--<li class="nav-item d-sm-none">
        <a class="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>-->

      <iframe id="reloj" src="https://free.timeanddate.com/clock/i8cxjbwb/n4622/fn8/fs18/fcfff/tc2a8d62/pa6/th1/ta1"
        frameborder="0" width="142" height="32"></iframe>


      <!--<span class="reloj">{{ hora }}</span>-->
      <div class="espacio" v-if="oEspacio" style="margin-right:0.8rem;">

      </div>


    </ul>
    <ul class="navbar-nav align-items-center ml-auto ml-md-0">
      <base-dropdown menu-on-right class="nav-item" tag="li" title-tag="a" title-classes="nav-link pr-0">
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <div class="media align-items-center">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" src="../../../static/img/brand/logo_agro_splash.png" />
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold"></span>
            </div>
          </div>
        </a>

        <template>
          <li class="dropdown-item">
            <i class="ni ni-circle-08"></i>
            <span>{{
                  nameUsuario
              }}</span>
          </li>
          <div class="dropdown-divider"></div>
          <a :href="hrefLogOut" class="dropdown-item" @click="cerrarSession()">
            <i class="ni ni-user-run"></i>
            <span>Cerrar Sesión</span>
          </a>
        </template>
      </base-dropdown>
    </ul>


    <!--Classic modal-->
    <modal :show.sync="ModalClasicAjustes">
      <h6 slot="header" class="modal-title">Type your modal title</h6>

      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
        blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language
        ocean.</p>
      <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a
        paradisematic country, in which roasted parts of sentences fly into your mouth.</p>


      <template slot="footer">
        <base-button type="primary">Save changes</base-button>
        <base-button type="link" class="ml-auto" @click="ModalClasicAjustes = false">Close</base-button>
      </template>

    </modal>


  </base-nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { Modal, BaseAlert } from '@/components/argon-core';
import BaseNav from "@/components/argon-core/Navbar/BaseNav.vue";
import { Badge } from "element-ui";


export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal,
    BaseAlert,
    [Badge.name]: Badge,
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      ModalClasicAjustes:false,
      hora: "00:00:00",
      nameUsuario: "SIN NOMBRE",
      mListaAlertasDispositivosNotificaciones: [],
      mListaAlertasDispositivosNotificacionesAux: [],
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      visibleBadgeNotification: false,
      hrefLogOut:"./",
      searchQuery: "",
      oEspacio:false
    };
  },
  methods: {
    showAjustes() {
      this.ModalClasicAjustes = true
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    cerrarSession() {
      this.$cookies.set("token", null)
      this.$cookies.set("logo", null)
      this.$cookies.set("names", null)
      this.$router.push({ path: "/" + this.$cookies.get("empresa"), replace: true });
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
  mounted() {

    /*this.mueveReloj();*/
    this.nameUsuario = this.$cookies.get("namesUsuario")
    this.hrefLogOut = "./"+this.$cookies.get("empresa");
    /*setInterval(() => {
      this.mueveReloj();
    }, 1000);*/

  },
};
</script>
<style>
@font-face {
  font-family: "digital-7";
  src: url("assets/css/nucleo/fonts/digital-7.ttf") format("truetype");
}

.container-list-Notificaiones-Alerta {
  height: 20rem !important;
  overflow: auto;
}

.barraTitle {
  display: flex;
  justify-content: center;
  align-content: center;
}

.titleNavbar {
  font-weight: 700;
  font-size: 1.45rem;
}


#t1 {
  color: white !important;
  /*background-color: #172b4d;*/
  background-color: #2a8d62 !important;
  width: 8.5rem !important;
  font-size: 1.5rem !important;
  font-family: "digital-7" !important;
  text-align: center !important;
  border-radius: 10px !important;
}

@media only screen and (max-width: 70em) {
  #titleGestionInteligente {
    display: none;
  }
}
</style>
