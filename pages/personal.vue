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
              @click="readPersonal()"
            >
              <span class="btn-inner--icon"
                ><i class="el-icon-search"></i
              ></span>
            </base-button>
            <base-button
              type="default"
              size="sm"
              @click="showOpenModalAddPersonal()"
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

        <el-table-column label="" width="110">
            <template slot-scope="scope">
              <base-button
                size="sm"
                title="EDITAR"
                @click="showModalControlVehicular(scope.row)"
                type="default"
                ><i class="ni ni-settings"></i
              ></base-button>
            </template>
          </el-table-column>


          <el-table-column prop="CodigoEmpleado" label="CODIGO" width="250">
          </el-table-column>
          <el-table-column
            prop="NombresApellidosEmpleado"
            label="Nombres y Apellidos"
            width="250"
          >
          </el-table-column>

          <el-table-column prop="EmailEmpleado" label="EMAIL" width="250">
          </el-table-column>
          <el-table-column prop="TelefonoEmpleado" label="TELEFONO" width="250">
          </el-table-column>
          <el-table-column prop="NombreSucursal" label="SUCURSAL" width="250">
          </el-table-column>

        </el-table>
      </card>

      <modal :show.sync="modalAddPersonal">
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
                  name="DNI EMPLEADO"
                  placeholder="DNI EMPLEADO"
                  prepend-icon="ni ni-circle-08"
                  rules="required"
                  v-model="CodigoEmpleado"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  name="Nombre Empleado"
                  placeholder="Nombre Empleado"
                  prepend-icon="ni ni-circle-08"
                  rules="required"
                  v-model="NombresApellidosEmpleado"
                >
                </base-input>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6">
                <base-input
                  name="Telefono"
                  placeholder="Telefono"
                  prepend-icon="ni ni-mobile-button"
                  rules="required"
                  v-model="TelefonoEmpleado"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  prepend-icon="ni ni-email-83"
                  name="Email"
                  placeholder="Email"
                  rules="required"
                  v-model="EmailEmpleado"
                >
                </base-input>
              </div>
            </div>

            <div class="form-row">
              <div class="col-md-12">
                <base-input
                  name="Dirección Google Maps"
                  placeholder="Dirección Google Maps"
                  prepend-icon="ni ni-world"
                  rules="required"
                  v-model="DirEmpleado"
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
                @click="insertEmpleado()"
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
} from "element-ui";

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
      modalAddPersonal: false,
      tableDataProveedores: [],
      token: this.$cookies.get("token"),
      mListSucursales: [],
      mSelectSucursal: null,
      CodigoEmpleado: "",
      NombresApellidosEmpleado: "",
      DirEmpleado: "",
      TelefonoEmpleado: "",
      EmailEmpleado: "",
      FotoEmpleado:
        "https://firebasestorage.googleapis.com/v0/b/carga-colombiana.appspot.com/o/user.png?alt=media",
    };
  },
  methods: {
    showOpenModalAddPersonal() {
      this.modalAddPersonal = true;
    },
    closeModalAddPersonal() {
      this.modalAddPersonal = false;
    },
    async readPersonal() {
      this.tableDataProveedores  = []
      try {
        var datos = await this.$axios.post(
        process.env.baseUrl + "/read_empleado_all_usuario_admin",
        {
          token: this.token,
        }
      );

      this.tableDataProveedores.push(...datos.data.datos);
      } catch (error) {
        console.log(error)
      }

      // console.log(datos.data)
    },
    clearModalAddPersonal() {
      this.mSelectSucursal = null;
      this.CodigoEmpleado = "";
      this.NombresApellidosEmpleado = "";
      this.DirEmpleado = "";
      this.TelefonoEmpleado = "";
      this.EmailEmpleado = "";
    },
    async insertEmpleado() {
      if (
        this.mSelectSucursal != null &&
        this.CodigoEmpleado != "" &&
        this.NombresApellidosEmpleado != "" &&
        this.DirEmpleado != "" &&
        this.TelefonoEmpleado != "" &&
        this.EmailEmpleado != ""
      ) {
        try {
          var datos = await this.$axios.post(
            process.env.baseUrl + "/create_empleado",
            {
              token: this.token,
              CodigoEmpleado: this.CodigoEmpleado,
              NombresApellidosEmpleado: this.NombresApellidosEmpleado,
              DirEmpleado: this.DirEmpleado,
              TelefonoEmpleado: this.TelefonoEmpleado,
              EmailEmpleado: this.EmailEmpleado,
              FotoEmpleado: this.FotoEmpleado,
              sucursal: this.mSelectSucursal,
            }
          );

          console.log(datos.data)
          if (datos.data.status_code == 200) {
            this.closeModalAddPersonal();
            this.readPersonal();
          }
        } catch (error) {
          console.log(error);
        }
      }
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
  },
  mounted() {
    this.readPersonal();
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
