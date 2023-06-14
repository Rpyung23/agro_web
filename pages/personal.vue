<template>
  <card style="margin: 2.5rem">
    <div>
      <el-button @click="" style="margin-bottom: 1rem;">AGREGAR PERSONAL</el-button>
      <el-table  height="calc(100vh - 15.5rem)" ref="filterTable" :data="tableDataProveedores" style="width: 100%">
        <el-table-column prop="CodigoEmpleado" label="CODIGO" width="250">
        </el-table-column>
        <el-table-column prop="NombresApellidosEmpleado" label="Nombres y Apellidos" width="250">
        </el-table-column>
        
        <el-table-column prop="EmailEmpleado" label="EMAIL" width="250">
        </el-table-column>
        <el-table-column prop="TelefonoEmpleado" label="TELEFONO" width="250">
        </el-table-column>
        <el-table-column prop="NombreSucursal" label="SUCURSAL" width="250">
        </el-table-column>
        <el-table-column
      label="Operaciones" width="250">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="">Editar</el-button>
        <el-button
          size="mini"
          type="danger"
          v-if="scope.row.EstadoEmpleado == 1"
          @click="">Eliminar</el-button>

          
          <el-button
          size="mini"
          type="success"
          v-if="scope.row.EstadoEmpleado == 0"
          @click="">Activar</el-button>

      </template>
    </el-table-column>
      </el-table>
    </div>
  </card>
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
      tableDataProveedores: [],
      token: this.$cookies.get("token"),
    };
  },
  methods: {
    async readPersonal() {
      var datos = await this.$axios.post(process.env.baseUrl+"/read_empleado_all_usuario_admin",{
        token: this.token
      })

      this.tableDataProveedores.push(...datos.data.datos)

     // console.log(datos.data)
    }
  },
  mounted() {
    this.readPersonal();
  },
};
</script>
<style></style>
