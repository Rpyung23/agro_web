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
              @click="readProveedores()"
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
          height="calc(100vh - 8.5rem)"
          ref="filterTable"
          :data="tableDataProveedores"
          style="width: 100%"
        >
        <el-table-column label="" width="110">
            <template slot-scope="scope">
              <base-button
                size="sm"
                title="EDITAR"
                @click="showAddEditPersonal(scope.row)"
                type="default"
                ><i class="ni ni-settings"></i
              ></base-button>
            </template>
          </el-table-column>

          <el-table-column prop="CodigoProveedor" label="CODIGO" width="150">
          </el-table-column>
          <el-table-column
            prop="NombresApellidosProveedor"
            label="Nombres y Apellidos"
            width="350"
          >
          </el-table-column>

          <el-table-column prop="AtienddeProveedor" label="ATIENDE" width="250">
          </el-table-column>

          <el-table-column prop="EmailProveedor" label="EMAIL" width="250">
          </el-table-column>

          <el-table-column prop="DomicilioGoogle" label="DOMICIO GOOGLE" width="250">
          </el-table-column>

        </el-table>
      </card>

      <modal :show.sync="isModalAddPersonal">
        <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
          <form
            class="needs-validation"
            @submit.prevent="handleSubmit(firstFormSubmit)"
          >
            <div class="form-row">
              <div class="col-md-6">
                <base-input
                  name="Nombre Empresa"
                  placeholder="Nombre Empresa"
                  prepend-icon="ni ni-circle-08"
                  rules="required"
                  v-model="NombreEmpresa"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  name="Nombre Atiende"
                  placeholder="Nombre Atiende"
                  prepend-icon="ni ni-circle-08"
                  rules="required"
                  v-model="NombreAtiende"
                >
                </base-input>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6">
                <base-input
                  name="Telefono Empresa"
                  placeholder="Telefono Empresa"
                  prepend-icon="ni ni-circle-08"
                  rules="required"
                  v-model="TelefonoEmpresa"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  prepend-icon="ni ni-credit-card"
                  name="Cuenta Bancaria"
                  placeholder="Cuenta Bancaria"
                  rules="required"
                  v-model="CuentaBancaria"
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
                  v-model="Telefono"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  prepend-icon="ni ni-email-83"
                  name="Email"
                  placeholder="Email"
                  rules="required"
                  v-model="EmailProveedor"
                >
                </base-input>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12">
                <base-input
                  name="Dirección"
                  placeholder="Dirección"
                  prepend-icon="ni ni-world"
                  rules="required"
                  v-model="Direccion"
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
                  v-model="DireccionGoogle"
                >
                </base-input>
              </div>
            </div>
            <div class="text-right">
              <base-button
                type="danger"
                @click="closeOpenModalAddPersonal()"
                >CANCELAR</base-button
              >
              <base-button
                type="primary"
                @click="insertProveedor()"
                native-type="submit"
                >GUARDAR</base-button
              >
            </div>
          </form>
        </validation-observer>
      </modal>

      <modal :show.sync="isModalEditPersonal">
        <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
          <form
            class="needs-validation"
            @submit.prevent="handleSubmit(firstFormSubmit)"
          >
            <div class="form-row">
              <div class="col-md-6">
                <base-input
                  name="Nombre Empresa"
                  placeholder="Nombre Empresa"
                  prepend-icon="ni ni-circle-08"
                  rules="required"
                  v-model="NombreEmpresa"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  name="Nombre Atiende"
                  placeholder="Nombre Atiende"
                  prepend-icon="ni ni-circle-08"
                  rules="required"
                  v-model="NombreAtiende"
                >
                </base-input>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6">
                <base-input
                  name="Telefono Empresa"
                  placeholder="Telefono Empresa"
                  prepend-icon="ni ni-circle-08"
                  rules="required"
                  v-model="TelefonoEmpresa"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  prepend-icon="ni ni-credit-card"
                  name="Cuenta Bancaria"
                  placeholder="Cuenta Bancaria"
                  rules="required"
                  v-model="CuentaBancaria"
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
                  v-model="Telefono"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  prepend-icon="ni ni-email-83"
                  name="Email"
                  placeholder="Email"
                  rules="required"
                  v-model="EmailProveedor"
                >
                </base-input>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12">
                <base-input
                  name="Dirección"
                  placeholder="Dirección"
                  prepend-icon="ni ni-world"
                  rules="required"
                  v-model="Direccion"
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
                  v-model="DireccionGoogle"
                >
                </base-input>
              </div>
            </div>
            <div class="text-right">
              <base-button
                type="danger"
                @click="closeOpenModalEditPersonal()"
                >CANCELAR</base-button
              >
              <base-button
                type="primary"
                @click="updateProveedor()"
                native-type="submit"
                >ACTUALIZAR</base-button
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
import { throws } from "assert";
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
      tableDataProveedores: [],
      mListSucursales: [],
      token: this.$cookies.get("token"),
      isModalAddPersonal: false,
      isModalEditPersonal:false,
      CodeProveedor:null,
      NombreEmpresa: null,
      NombreAtiende: null,
      TelefonoEmpresa: null,
      Telefono: null,
      EmailProveedor: null,
      CuentaBancaria: null,
      Direccion: null,
      DireccionGoogle: null,
      FotoProveedor:
        "https://firebasestorage.googleapis.com/v0/b/carga-colombiana.appspot.com/o/user.png?alt=media",
    };
  },
  methods: {
    showAddEditPersonal(item){
      this.isModalEditPersonal = true
      this.CodeProveedor = item.CodigoProveedor
      this.NombreEmpresa = item.NombresApellidosProveedor
      this.NombreAtiende = item.AtienddeProveedor
      this.TelefonoEmpresa = item.TelefonoEmpresa
      this.Telefono = item.TelefonoProveedor
      this.EmailProveedor = item.EmailProveedor
      this.CuentaBancaria = item.CuentaBancaria
      this.Direccion = item.DirProveedor
      this.DireccionGoogle = item.DomicilioGoogle
    },
    closeOpenModalEditPersonal(){
      this.isModalEditPersonal = false
      this.NombreEmpresa = null
      this.NombreAtiende = null
      this.TelefonoEmpresa = null
      this.Telefono = null
      this.EmailProveedor = null
      this.CuentaBancaria = null
      this.Direccion = null
      this.DireccionGoogle = null
    },
    async updateProveedor() {
      if (
        this.NombreEmpresa != null &&
        this.NombreAtiende != null &&
        this.TelefonoEmpresa != null &&
        this.Telefono != null &&
        this.EmailProveedor != null &&
        this.CuentaBancaria != null &&
        this.Direccion != null &&
        this.DireccionGoogle != null
      ) {
        try {
          var datos = await this.$axios.put(
            process.env.baseUrl + "/update_detalle_proveedor",
            {
              token: this.token,
              CodigoProveedor: this.CodeProveedor,
              FotoProveedor: this.FotoProveedor,
              NombresApellidosProveedor: this.NombreEmpresa,
              DirProveedor: this.Direccion,
              TelefonoProveedor: this.Telefono,
              EmailProveedor: this.EmailProveedor,
              CuentaBancaria: this.CuentaBancaria,
              AtienddeProveedor: this.NombreAtiende,
              TelefonoEmpresa: this.TelefonoEmpresa,
              DomicilioGoogle: this.DireccionGoogle,
            }
          );

          if(datos.data.status_code == 200)
          {
            this.closeOpenModalEditPersonal()
            this.readProveedores()
            this.clearModalAgenda()
          }else{
            alert(datos.data.msm)
          }
          console.log(datos.data);
        } catch (error) {
          alert(error.toString())
          console.log(error);
        }
      }
    },
    closeOpenModalAddPersonal(){
      this.isModalAddPersonal = false
      this.NombreEmpresa = null
      this.NombreAtiende = null
      this.TelefonoEmpresa = null
      this.Telefono = null
      this.EmailProveedor = null
      this.CuentaBancaria = null
      this.Direccion = null
      this.DireccionGoogle = null
    },
    async readProveedores() {
      this.tableDataProveedores = []
      try {
        var datos = await this.$axios.post(
        process.env.baseUrl + "/list_proveedor_empresa",
        {
          token: this.token,
        }
      );

      this.tableDataProveedores.push(...datos.data.data);
      } catch (error) {
         console.log(error)
      }

      // console.log(datos.data)
    },
    /*async readAllSucursalesUser() {
      this.mListSucursales = [];

      try {
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
    },*/
    showOpenModalAddPersonal() {
      this.isModalAddPersonal = true;
      this.NombreEmpresa = null
      this.NombreAtiende = null
      this.TelefonoEmpresa = null
      this.Telefono = null
      this.EmailProveedor = null
      this.CuentaBancaria = null
      this.Direccion = null
      this.DireccionGoogle = null
    },
    async insertProveedor() {
      if (
        this.NombreEmpresa != null &&
        this.NombreAtiende != null &&
        this.TelefonoEmpresa != null &&
        this.Telefono != null &&
        this.EmailProveedor != null &&
        this.CuentaBancaria != null &&
        this.Direccion != null &&
        this.DireccionGoogle != null
      ) {
        try {
          var datos = await this.$axios.post(
            process.env.baseUrl + "/create_Proveedor",
            {
              token: this.token,
              FotoProveedor: this.FotoProveedor,
              sucursal: this.mSelectSucursalNewPersonal,
              NombresApellidosProveedor: this.NombreEmpresa,
              DirProveedor: this.Direccion,
              TelefonoProveedor: this.Telefono,
              EmailProveedor: this.EmailProveedor,
              CuentaBancaria: this.CuentaBancaria,
              AtienddeProveedor: this.NombreAtiende,
              TelefonoEmpresa: this.TelefonoEmpresa,
              DomicilioGoogle: this.DireccionGoogle,
            }
          );

          if(datos.data.status_code == 200)
          {
            this.closeOpenModalAddPersonal()
            this.readProveedores()
            this.clearModalAgenda()
          }
          console.log(datos.data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    clearModalAgenda() {
      this.NombreEmpresa = "";
      this.NombreAtiende = "";
      this.TelefonoEmpresa = "";
      this.Telefono = "";
      this.EmailProveedor = "";
      this.CuentaBancaria = "";
      this.Direccion = "";
      this.DireccionGoogle = "";
    },
  },
  mounted() {
    /*this.readAllSucursalesUser();*/
    this.readProveedores();
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
  height: calc(100vh - 8.5rem);
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
