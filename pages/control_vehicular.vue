<template>
  <div class="content">
    <base-header>
      <card
        class="no-border-card col"
        style="margin-bottom: 0.5rem"
        body-classes="px-0 pb-1 card-bodyTopOpcionesRPagosVehiculoPRoduccionPanelDespachoBusqueda cardSelectRubrosEstadosPagosVehiculoProduccionContainerPanelDespachoBusqueda"
        footer-classes="pb-2"
      >
        <div
          class="cardTextoRPagosVehiculoProduccionPanelDespachoBusqueda"
        ></div>

        <div
          class="cardSelectRubrosEstadosPagosVehiculoProduccionContainerPanelDespachoBusqueda"
        >
          <div class="buttonCenterEndDerecha">
            <base-button icon type="primary" size="sm" @click="readVehiculos()">
              <span class="btn-inner--icon"
                ><i class="el-icon-search"></i
              ></span>
            </base-button>
            <base-button
              type="default"
              size="sm"
              @click="showModalAddNewVehiculo()"
              title="ADD Proveedor"
            >
              <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
            </base-button>
          </div>
        </div>
      </card>

      <card
        class="no-border-card"
        style="margin-bottom: 0.5rem"
        body-classes="card-bodyRPagosVehiculoProduccion px-0 pb-1"
        footer-classes="pb-2"
      >
        <el-table
          height="calc(100vh - 8.5rem)"
          ref="filterTable"
          :data="tableDataVehiculos"
          style="width: 100%"
        >
          <el-table-column label="" width="90">
            <template slot-scope="scope">
              <base-button
                size="sm"
                title="CONTROL VEHICULAR"
                @click="showModalControlVehicular(scope.row)"
                type="default"
                ><i class="ni ni-settings"></i
              ></base-button>
            </template>
          </el-table-column>

          <el-table-column prop="PlacaVehiculo" label="PLACA" width="150">
          </el-table-column>
          <el-table-column prop="DetalleVehiculo" label="DETALLE" width="200">
          </el-table-column>

          <el-table-column prop="KmInicial" label="KM INICIAL" width="150">
          </el-table-column>
          <el-table-column prop="KmMantenimiento" label="KM FINAL" width="150">
          </el-table-column>
          <el-table-column prop="NoServicios" label="N° SERVICIOS" width="170">
          </el-table-column>
          <el-table-column prop="NombreSucursal" label="SUCURSAL" width="300">
          </el-table-column>
        </el-table>
      </card>

      <modal :show.sync="modalAddVehiculo">
        <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
          <form
            class="needs-validation"
            @submit.prevent="handleSubmit(firstFormSubmit)"
          >
            <div class="form-row">
              <div class="col-md-12">
                <el-select
                  v-model="mSelectSucursal"
                  style="margin-bottom: 1rem; width: 100%"
                  placeholder="SUCURSAL"
                >
                  <el-option
                    v-for="item in mListSucursales"
                    :key="item.FK_Code_Sucursal"
                    :label="item.NombreSucursal"
                    :value="item.FK_Code_Sucursal"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="form-row">
              <div class="col-md-6">
                <base-input
                  name="PLACA"
                  placeholder="PLACA"
                  prepend-icon="ni ni-bus-front-12"
                  rules="required"
                  v-model="PlacaVehicular"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  name="KM INICIAL"
                  placeholder="KM INICIAL"
                  prepend-icon="ni ni-delivery-fast"
                  rules="required"
                  v-model="KmInicial"
                >
                </base-input>
              </div>
            </div>

            <div class="text-right">
              <base-button type="danger" @click="closeModalAddPersonal()"
                >CANCELAR</base-button
              >
              <base-button
                type="primary"
                @click="insertNewVehiculo()"
                native-type="submit"
                >GUARDAR</base-button
              >
            </div>
          </form>
        </validation-observer>
      </modal>

      <modal :show.sync="modalControlVehicular">
        <h5 slot="header" class="modal-title" id="modal-title-default"><strong>{{objSelectControlVehicular == null ? "" : objSelectControlVehicular.PlacaVehiculo}}</strong></h5>
        
        <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
          <form
            class="needs-validation"
            @submit.prevent="handleSubmit(firstFormSubmit)"
          >
            <div class="form-row">
              <div class="col-md-6">
                <el-date-picker
                  type="date"
                  placeholder="PROXIMO SERVICIO"
                  v-model="fechaInicialControlVehicular"
                >
                </el-date-picker>
              </div>
              <div class="col-md-6">
                <base-input
                  name="CANTIDAD GASOLINA"
                  placeholder="CANTIDAD GASOLINA"
                  prepend-icon="ni ni-delivery-fast"
                  rules="required"
                  v-model="CantGasolinaControlVehicular"
                >
                </base-input>
              </div>
            </div>

            <div class="form-row" style="margin-bottom: 1rem">
              <badge type="primary" class="ml-2">REGISTRO CONTROL CARGA</badge>
            </div>

            <div class="form-row">
              <div class="col-md-6">
                <base-input
                  name="N° TICKET"
                  placeholder="N° TICKET"
                  prepend-icon="ni ni-single-copy-04"
                  rules="required"
                  v-model="NTicketControlVehicular"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  name="KM CARGA"
                  placeholder="KM CARGA"
                  prepend-icon="ni ni-delivery-fast"
                  rules="required"
                  v-model="KmCargaControlVehicular"
                >
                </base-input>
              </div>
            </div>

            <div class="text-right">
              <base-button type="danger" @click="closeModalControlVehicular()"
                >CANCELAR</base-button
              >
              <base-button
                type="primary"
                @click="insertControlVehiculo()"
                native-type="submit"
                >GUARDAR</base-button
              >
            </div>
          </form>
        </validation-observer>
      </modal>

      .
    </base-header>
  </div>
</template>
<script>
import {
  Table,
  TableColumn,
  Select,
  Option,
  Autocomplete,
  DatePicker,
  RadioButton,
  Radio,
  Notification,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Popover,
  Button,
  Loading,
  Switch,
  Badge,
} from "element-ui";
import { getFecha_dd_mm_yyyy } from '../util/fechas'

export default {
  layout: "DashboardLayout",
  components: {
    [Switch.name]: Switch,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [Notification.name]: Notification,
    [Autocomplete.name]: Autocomplete,
    [TableColumn.name]: TableColumn,
    [RadioButton.name]: RadioButton,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    [CheckboxButton.name]: CheckboxButton,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popover.name]: Popover,
    [Button.name]: Button,
    [Badge.name]: Badge,
  },
  data() {
    return {
      modalAddVehiculo: false,
      modalControlVehicular: false,
      tableDataVehiculos: [],
      mListSucursales: [],
      mSelectSucursal: null,
      PlacaVehicular: null,
      KmInicial: null,
      token: this.$cookies.get("token"),
      FotoVehiculo:
        "https://firebasestorage.googleapis.com/v0/b/carga-colombiana.appspot.com/o/vehiculo.jpg?alt=media",
      objSelectControlVehicular:null,  
      fechaInicialControlVehicular: null,
      CantGasolinaControlVehicular:null,
      NTicketControlVehicular:null,
      KmCargaControlVehicular:null
    };
  },
  methods: {

    async insertControlVehiculo() {

      console.log(this.objSelectControlVehicular)
      console.log(  this.fechaInicialControlVehicular)
      console.log(  this.CantGasolinaControlVehicular)
      console.log(  this.NTicketControlVehicular)
      console.log(  this.KmCargaControlVehicular)

      if (
        this.objSelectControlVehicular != null &&
        this.fechaInicialControlVehicular != null &&
        this.CantGasolinaControlVehicular != null &&
        this.NTicketControlVehicular != null &&
        this.KmCargaControlVehicular != null
      ) {
        try {

          var datos = await this.$axios.post(
            process.env.baseUrl + "/register_gasto_vehiculo",
            {
              token: this.token,
              placa: this.objSelectControlVehicular.PlacaVehiculo,
              precio: this.CantGasolinaControlVehicular,
              fecha: getFecha_dd_mm_yyyy(this.fechaInicialControlVehicular),
              factura: this.NTicketControlVehicular,
              foto: this.FotoVehiculo,
              KmCarga: this.KmCargaControlVehicular
            }
          );

          console.log(datos.data)

          if (datos.data.status_code == 200) {
            this.closeModalControlVehicular();
            this.clearModalControlVehicular();
            this.readVehiculos();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

    showModalControlVehicular(item) {
      this.modalControlVehicular = true;
      this.objSelectControlVehicular = item
    },
    closeModalControlVehicular() {
      this.modalControlVehicular = false;
    },
    clearModalControlVehicular(){
      this.objSelectControlVehicular = null  
      this.fechaInicialControlVehicular =  null
      this.CantGasolinaControlVehicular = null
      this.NTicketControlVehicular = null
      this.KmCargaControlVehicular = null
    },
    showModalAddNewVehiculo() {
      this.modalAddVehiculo = true;
    },
    closeModalAddNewVehiculo() {
      this.modalAddVehiculo = false;
    },
    async insertNewVehiculo() {
      if (
        this.mSelectSucursal != null &&
        this.PlacaVehicular != null &&
        this.KmInicial != null
      ) {
        try {
          var datos = await this.$axios.post(
            process.env.baseUrl + "/register_vehiculo",
            {
              token: this.token,
              PlacaVehiculo: this.PlacaVehicular,
              Fk_sucursal: this.mSelectSucursal,
              KmInicial: this.KmInicial,
              FotoVehiculo: this.FotoVehiculo,
            }
          );

          if (datos.data.status_code == 200) {
            this.closeModalAddNewVehiculo();
            this.clearModalAddVehiculo();
            this.readVehiculos();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async readVehiculos() {
      this.tableDataVehiculos = [];
      try {
        var datos = await this.$axios.post(
          process.env.baseUrl + "/read_vehiculo_user",
          {
            token: this.token,
          }
        );

        this.tableDataVehiculos.push(...datos.data.datos);
      } catch (error) {
        console.log(error);
      }

      // console.log(datos.data)
    },
    async readSucursales() {
      try {
        this.mListSucursales = [];
        var datos = await this.$axios.post(
          process.env.baseUrl + "/list_sucursal_usuario",
          {
            token: this.token,
          }
        );

        this.mListSucursales.push(...datos.data.data);
      } catch (error) {
        console.log(error);
      }

      // console.log(datos.data)
    },
    clearModalAddVehiculo() {
      this.mSelectSucursal = null;
      this.PlacaVehicular = null;
      this.KmInicial = null;
    },

  },
  mounted() {
    this.readVehiculos();
    this.readSucursales();
  },
};
</script>
<style>
.containerModalRecorridoPanelDespacho {
  display: flex;
}
.cardControlesMarc {
  height: calc(80vh);
  width: 18rem;
}
.current-row {
  background-color: rgba(0, 0, 0, 0.178);
}

.el-table__body tr.current-row > td.el-table__cell {
  background-color: rgba(0, 0, 0, 0.178) !important;
}

.mapa {
  width: 100%;
  height: calc(80vh);
}

.form-controlPersonal {
  display: block;
  width: 100%;
  /* height: calc(1.5em + 1.25rem + 2px); */
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #8898aa;
  background-color: #fff;
  background-clip: padding-box;
  outline: none;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  margin-bottom: 0rem;
  box-shadow: 0 3px 2px rgba(233, 236, 239, 0.05);
  transition: all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.el-loading-text {
  color: black !important;
}

.el-icon-loading {
  color: black !important;
}

.cardTextoRPagosVehiculoProduccionPanelDespachoBusqueda {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cardopcinesRPagosVehiculoProduccionPanelDespachoBusqueda {
  display: flex;
  align-items: center;
}

.cardSelectRubrosEstadosPagosVehiculoProduccionContainerPanelDespachoBusqueda {
  display: flex;
  justify-content: space-between;
}

.el-table .warning-row-panelControlProduccion {
  background: rgba(255, 0, 0, 0.342) !important;
}

.el-table .success-row-panelControlProduccion {
  background: hsla(34, 88%, 61%, 0.384) !important;
}

.el-table .finalizado-row-panelControlProduccion {
  background: rgba(140, 248, 126, 0.384) !important;
}

.el-table .diferido-row-panelControlProduccion {
  background: hsla(226, 88%, 61%, 0.274) !important;
}

.no-border-card .card-footer {
  border-top: 0;
}

.card-bodyRPagosVehiculoProduccion {
  padding: 0rem !important;
  height: calc(100vh - 8rem);
  overflow: none;
}

.card-bodyTopOpcionesRPagosVehiculoPRoduccionPanelDespachoBusqueda {
  padding-top: 0.25rem !important;
}
.cardOpcinesRPagosVehiculoProduccionPanelDespachoBusqueda {
  display: flex;
  align-items: center;
}

.buttonCenterEndDerecha {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
