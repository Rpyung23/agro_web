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
        </div>

        <div
          class="cardSelectRubrosEstadosPagosVehiculoProduccionContainerPanelDespachoBusqueda"
        >
          <div class="buttonCenterEndDerecha">
            <base-button icon type="primary" size="sm" @click="readSueldos()">
              <span class="btn-inner--icon"
                ><i class="el-icon-search"></i
              ></span>
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
          <el-table-column label="" width="130">
            <template slot-scope="scope">
              <base-button
                size="sm"
                title=""
                @click="generarSueldo(scope.row)"
                type="default"
                >PAGAR</base-button
              >
            </template>
          </el-table-column>

          <el-table-column prop="FKCodigoEmpleado" label="CODIGO" width="180">
          </el-table-column>
          <el-table-column
            prop="NombresApellidosEmpleado"
            label="Nombres y Apellidos"
            width="250"
          >
          </el-table-column>

          <el-table-column prop="NombreSucursal" label="SUCURSAL" width="220">
          </el-table-column>

          <el-table-column
            prop="dias_trabajados"
            label="D. Laborables"
            width="170"
          >
          </el-table-column>
          <el-table-column prop="salario_ganado" label="SALARIO" width="200">
            <template slot-scope="scope">
              <strong>{{ scope.row.salario_ganado }}</strong>
            </template>
          </el-table-column>
          <el-table-column prop="fechaIngreso" label="F. INGRESO" width="150">
          </el-table-column>
          <el-table-column prop="fechaSalida" label="F. SALIDA" width="150">
          </el-table-column>
        </el-table>
      </card>

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

import { convertDateTime } from "../util/fechas";
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
      token: this.$cookies.get("token"),
      mListSucursalesIngreso: [],
      mSelectSucursalIngreso: null,
    };
  },
  methods: {
    async readSueldos() {
      this.tableDataProveedores = [];
      try {
        var datos = await this.$axios.post(
          process.env.baseUrl + "/read_sueldos",
          {
            token: this.token,
            sucursal:
              this.mSelectSucursalIngreso.length > 0
                ? this.mSelectSucursalIngreso
                : "*",
          }
        );

        this.tableDataProveedores.push(...datos.data.datos);
      } catch (error) {
        console.log(error);
      }

      // console.log(datos.data)
    },
    async readSucursales() {
      try {
        this.mListSucursalesIngreso = [];
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
    async generarSueldo(item) 
    {
      console.log("------------------------------")
      console.log(item.FKCodigoEmpleado);


      try {
        var datos = await this.$axios.put(
          process.env.baseUrl + "/generarCobro",
          {
            token: this.token,
            empleado: item.FKCodigoEmpleado
          }
        )

        if(datos.data.status_code == 400)
        {
          alert(datos.data.msm)
        }else{
          this.readSueldos()
        }

      } catch (error) {
        console.log(error);
        alert(error.toString())
      }

    },
  },
  mounted() {
    this.readSueldos();
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
