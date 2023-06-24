<template>
  <div class="content">
    <base-header>
      <card
        class="no-border-card col"
        style="margin-bottom: 0.5rem"
        body-classes="px-0 pb-1 card-bodyTopOpcionesRPagosVehiculoPRoduccionPanelDespachoBusqueda cardSelectRubrosEstadosPagosVehiculoProduccionContainerPanelDespachoBusqueda"
        footer-classes="pb-2"
      >
        <div class="cardTextoRPagosVehiculoProduccionPanelDespachoBusqueda">
          <el-select
            v-model="mSelectSucursalIngreso"
            style="margin-right: 0.5rem"
            placeholder="SUCURSAL"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in mListSucursalesIngreso"
              :key="item.FK_Code_Sucursal"
              :label="item.NombreSucursal"
              :value="item.FK_Code_Sucursal"
            >
            </el-option>
          </el-select>

          <el-date-picker
            type="date"
            placeholder="Select date and time"
            style="margin-right: 0.5rem"
            v-model="fechaInicioIngreso"
          >
          </el-date-picker>

          <el-date-picker
            type="date"
            placeholder="Select date and time"
            v-model="fechaFinalIngreso"
          >
          </el-date-picker>
        </div>

        <div
          class="cardSelectRubrosEstadosPagosVehiculoProduccionContainerPanelDespachoBusqueda"
        >
          <div class="buttonCenterEndDerecha">
            <strong style="margin-right: 0.5rem">{{ totaIngresos }} $</strong>
            <base-button
              icon
              type="primary"
              size="sm"
              @click="readIngresosAll()"
            >
              <span class="btn-inner--icon"
                ><i class="el-icon-search"></i
              ></span>
            </base-button>
            <base-button
              type="default"
              size="sm"
              @click="showModalAddIngreso()"
              title="REGISTRAR INGRESO"
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
          <!--<el-table-column label="" width="90">
            <template slot-scope="scope">
              <base-button
                size="sm"
                title="CONTROL VEHICULAR"
                @click="showModalControlVehicular(scope.row)"
                type="default"
                ><i class="ni ni-settings"></i
              ></base-button>
            </template>
          </el-table-column>-->

          <el-table-column prop="CodigoIngreso" label="CODIGO" width="240">
          </el-table-column>
          <el-table-column
            prop="FechaCreacionIngreso"
            label="FECHA"
            width="240"
          >
          </el-table-column>

          <el-table-column prop="NotaIngreso" label="NOTAS" width="280">
          </el-table-column>
          <el-table-column
            prop="CantidadIngreso"
            label="CANTIDAD $"
            width="200"
          >
          </el-table-column>
          <el-table-column prop="NombreSucursal" label="SUCURSAL" width="280">
          </el-table-column>
        </el-table>
      </card>

      <modal :show.sync="modalAddIngreso">
        <h5 slot="header" class="modal-title" id="modal-title-default">
          REGISTRAR NUEVO INGRESO
        </h5>
        <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
          <form
            class="needs-validation"
            @submit.prevent="handleSubmit(firstFormSubmit)"
          >
            <div class="form-row">
              <div class="col-md-6">
                <base-input
                  name="Nombre Ingreso"
                  placeholder="Nombre Ingreso"
                  prepend-icon="ni ni-single-copy-04"
                  rules="required"
                  v-model="NombreIngreso"
                >
                </base-input>
              </div>

              <div class="col-md-6">
                <el-select
                  v-model="mSelectSucursalIngresoModal"
                  placeholder="SUCURSAL"
                  clearable 
                  style="margin-bottom: 1rem; width: 100%"
                  
                >
                  <el-option
                    v-for="item in mListSucursalesIngreso"
                    :key="item.FK_Code_Sucursal"
                    :label="item.NombreSucursal"
                    :value="item.FK_Code_Sucursal"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12">
                <base-input
                  name="Cliente"
                  placeholder="Cliente"
                  prepend-icon="ni ni-circle-08"
                  rules="required"
                  v-model="NombreClienteIngreso"
                >
                </base-input>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12">
                <base-input
                  name="Cantidad"
                  placeholder="Cantidad"
                  prepend-icon="ni ni-money-coins"
                  rules="required"
                  type="number"
                  v-model="CantidadIngreso"
                >
                </base-input>
              </div>
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">DETALLES</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="DetalleIngreso"
              ></textarea>
            </div>

            <div class="text-right">
              <base-button type="danger" @click="closeModalAddIngreso()"
                >CANCELAR</base-button
              >
              <base-button
                type="primary"
                @click="insertNewIngreso()"
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
import { getFecha_dd_mm_yyyy } from "../util/fechas";

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
      tableDataVehiculos: [],
      fechaInicioIngreso: null,
      fechaFinalIngreso: null,
      token: this.$cookies.get("token"),
      mListSucursalesIngreso: [],
      mSelectSucursalIngreso: null,
      mSelectSucursalIngresoModal:null,
      totaIngresos: "0.00",
      modalAddIngreso: false,
      NombreIngreso: null,
      NombreClienteIngreso: null,
      DetalleIngreso: null,
      CantidadIngreso: null,
    };
  },
  methods: {
    closeModalAddIngreso(){
      this.modalAddIngreso = false
      this.NombreIngreso = null
      this.NombreClienteIngreso = null
      this.DetalleIngreso = null
      this.CantidadIngreso = null
      this.mSelectSucursalIngresoModal = null
    },
    showModalAddIngreso() {
      this.modalAddIngreso = true;
    },
    async readIngresosAll() {
      this.totaIngresos = "0.00";
      this.tableDataVehiculos = [];
      if (this.fechaFinalIngreso != null && this.fechaInicioIngreso != null) {
        try {
          var datos = await this.$axios.post(
            process.env.baseUrl + "/ingreso_fecha_sucursal",
            {
              token: this.token,
              sucursal:
                this.mSelectSucursalIngreso.length > 0 ? this.mSelectSucursalIngreso : "*",
              fechaI: getFecha_dd_mm_yyyy(this.fechaInicioIngreso),
              fechaF: getFecha_dd_mm_yyyy(this.fechaFinalIngreso),
            }
          );

          for (var i = 0; i < datos.data.datos.length; i++) {
            console.log(datos.data.datos[i].CantidadIngreso);
            this.totaIngresos = Number(
              parseFloat(this.totaIngresos) +
                parseFloat(datos.data.datos[i].CantidadIngreso)
            ).toFixed(2);
            console.log(this.totaIngresos);
          }

          this.tableDataVehiculos.push(...datos.data.datos);
        } catch (error) {
          alert(error.toString())
          console.log(error);
        }
      }
    },
    async insertNewIngreso() {
      try {
        if (
          this.NombreIngreso != null &&
          this.NombreClienteIngreso != null &&
          this.DetalleIngreso != null &&
          this.CantidadIngreso != null &&
          this.mSelectSucursalIngresoModal != null
        ) {
          var datos = await this.$axios.post(
            process.env.baseUrl + "/create_ingreso",
            {
              token: this.token,
              NombreIngreso: this.NombreIngreso,
              sucursal_code: this.mSelectSucursalIngresoModal,
              name_cliente: this.NombreClienteIngreso,
              cantidad: this.CantidadIngreso,
              nota: this.DetalleIngreso,
              foto: "https://www.ceupe.com/images/easyblog_articles/3967/ejemplo-factura.jpg",
            }
          );
          console.log(datos.data)
          if (datos.data.status_code != 200) {
            alert(datos.data.msm);
          } else {
            this.closeModalAddIngreso()
            this.readIngresosAll();
          }
        }
      } catch (error) {
        alert(error.toString());
      }
    },
    async readSucursales() {
      this.mListSucursalesIngreso = [];
      
      try {
        var datos = await this.$axios.post(
          process.env.baseUrl + "/list_sucursal_usuario",
          {
            token: this.token,
          }
        );

        this.mListSucursalesIngreso.push(...datos.data.data);
      } catch (error) {
        console.log(error);
      }

      // console.log(datos.data)
    },
  },
  mounted() {
    this.readSucursales();
    this.readIngresosAll();
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
