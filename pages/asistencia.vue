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
            <base-button
              icon
              type="primary"
              size="sm"
              @click="readAsistencia()"
            >
              <span class="btn-inner--icon"
                ><i class="el-icon-search"></i
              ></span>
            </base-button>
            <base-button
              type="default"
              size="sm"
              @click="showOpenmodalAddAsistencia()"
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
          height="calc(100vh - 8.3rem)"
          ref="filterTable"
          :data="tableDataProveedores"
          style="width: 100%"
        >
          <!--<el-table-column label="" width="110">
            <template slot-scope="scope">
              <base-button
                size="sm"
                title="EDITAR"
                @click="showModalControlVehicular(scope.row)"
                type="default"
                ><i class="ni ni-settings"></i
              ></base-button>
            </template>
          </el-table-column>-->

          <el-table-column prop="CodigoEmpleado" label="CODIGO" width="180">
          </el-table-column>
          <el-table-column
            prop="NombresApellidosEmpleado"
            label="Nombres y Apellidos"
            width="250"
          >
          </el-table-column>

          <el-table-column prop="fechaIngreso" label="F. INGRESO" width="230">
          </el-table-column>
          <el-table-column prop="fechaSalida" label="F. SALIDA" width="230">
          </el-table-column>
          <el-table-column prop="HLaborables" label="H. Laborables" width="200">
          </el-table-column>
          <el-table-column prop="NombreSucursal" label="SUCURSAL" width="250">
          </el-table-column>
        </el-table>
      </card>

      <modal :show.sync="modalAddAsistencia">
        <form
            class="needs-validation"
          >
            <div class="form-row">
              <div class="col-md-12">
                <el-select
                  v-model="mSelectEmpleado"
                  style="margin-bottom: 1rem; width: 100%"
                  placeholder="EMPLEADOS"
                >
                  <el-option
                    v-for="item in mListEmpleados"
                    :key="item.NombresApellidosEmpleado"
                    :label="item.NombresApellidosEmpleado"
                    :value="item.CodigoEmpleado"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="form-row" style="margin-bottom: 1rem">
              <div class="col-md-6">
                <el-date-picker
                  type="datetime"
                  placeholder="FECHA INICIO"
                  v-model="fechaInicio"
                >
                </el-date-picker>
              </div>
              <div class="col-md-6">
                <el-date-picker
                  type="datetime"
                  placeholder="FECHA FINALIZO"
                  v-model="fechaFin"
                >
                </el-date-picker>
              </div>
            </div>

            <div class="form-row" style="margin-bottom: 1rem">
              <div class="col-md-6">
                <el-date-picker
                  type="datetime"
                  placeholder="FECHA PERMISO"
                  v-model="fechaPermiso"
                >
                </el-date-picker>
              </div>
              <div class="col-md-6">
                <el-select v-model="mSelectTipoPermiso" placeholder="TIPO PERMISO">
                  <el-option label="ENFERMDAD" value="1"> </el-option>
                  <el-option label="PERMISO" value="2"> </el-option>
                </el-select>
              </div>
            </div>

            <div class="form-row">
              <div class="col-md-12">
                <base-input
                  name="NOTAS"
                  placeholder="NOTAS"
                  prepend-icon="ni ni-single-copy-04"
                  v-model="notasPermiso"
                >
                </base-input>
              </div>
            </div>
            <div class="text-right">
              <base-button type="danger" @click="closemodalAddAsistencia()"
                >CANCELAR</base-button
              >
              <base-button
                type="primary"
                @click="insertAsistencia()"
                >GUARDAR</base-button
              >
            </div>
          </form>
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
} from "element-ui";


import {convertDateTime} from '../util/fechas'
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
  },
  data() {
    return {
      modalAddAsistencia: false,
      tableDataProveedores: [],
      token: this.$cookies.get("token"),
      mListEmpleados: [],
      mSelectEmpleado: null,
      mSelectTipoPermiso: null,
      fechaInicio:null,
      fechaFin:null,
      fechaPermiso:null,
      notasPermiso:''

    };
  },
  methods: {
    showOpenmodalAddAsistencia() {
      this.modalAddAsistencia = true;
    },
    closemodalAddAsistencia() {
      this.modalAddAsistencia = false;
    },
    async readAsistencia() {
      this.tableDataProveedores = [];
      try {
        var datos = await this.$axios.post(
          process.env.baseUrl + "/list_asistencia",
          {
            token: this.token,
          }
        );

        this.tableDataProveedores.push(...datos.data.data);
      } catch (error) {
        console.log(error);
      }

      // console.log(datos.data)
    },
    clearmodalAddAsistencia() {
      this.mSelectEmpleado = null;
      this.EmailEmpleado = "";
    },
    async insertAsistencia() {
      if (
        this.mSelectEmpleado != null &&
        this.fechaInicio != null &&
        this.fechaFin != null
      ) {
        console.log(this.mSelectEmpleado)
        try {
          var datos = await this.$axios.post(
            process.env.baseUrl + "/empleado_asistencia",
            {
              token: this.token,
              empleado: this.mSelectEmpleado,
              fechaIngreso: convertDateTime(this.fechaInicio),
              fechaSalida: convertDateTime(this.fechaFin),
              fotoHistorialEmpleado: '',
              notaHistorialEmpleado: this.notasPermiso,
              idTipoPermiso: this.mSelectTipoPermiso == null ? 0 : this.mSelectTipoPermiso,
              fechaHistorialPermiso: this.fechaPermiso == null ? '1998-06-11 00:00:00' : convertDateTime(this.fechaPermiso),
            }
          );

          console.log(datos.data);
          if (datos.data.status_code == 200) {
            this.closemodalAddAsistencia();
            this.readAsistencia();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async readEmpleados() {
      try {
        this.mListEmpleados = [];
        var datos = await this.$axios.post(
          process.env.baseUrl + "/read_empleado_all_usuario_admin",
          {
            token: this.token,
          }
        );

        this.mListEmpleados.push(...datos.data.datos);
      } catch (error) {
        console.log(error);
      }

      // console.log(datos.data)
    },
  },
  mounted() {
    this.readAsistencia();
    this.readEmpleados();
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
