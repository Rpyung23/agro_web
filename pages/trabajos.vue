<template>
  <card style="margin: 2.5rem">
    <div>
      <el-button @click="" style="margin-bottom: 1rem"
        >AGREGAR TRABAJOS</el-button
      >
      <el-table
        height="calc(100vh - 15.5rem)"
        ref="filterTable"
        :data="tableDataProveedores"
        style="width: 100%"
      >
        <el-table-column label="Operaciones" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="">Editar</el-button>

            <el-button size="mini" type="success" @click="">Ver</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="NameTrabajo" label="TRABAJO" width="150">
        </el-table-column>
        <el-table-column prop="fechaInicio" label="F. INICIO" width="200">
        </el-table-column>

        <el-table-column prop="fechaFin" label="F. FIN" width="150">
        </el-table-column>
        <el-table-column prop="fechaLimite" label="F. LIMITE" width="150">
        </el-table-column>
        <el-table-column prop="detalle" label="ESTADO" width="170">
        </el-table-column>
        <el-table-column prop="NombreSucursal" label="SUCURSAL" width="250">
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
    async readTrabajos() {
      var datos = await this.$axios.post(
        process.env.baseUrl + "/trabajos_usuarios_all",
        {
          token: this.token,
        }
      );

      this.tableDataProveedores.push(...datos.data.datos);

      // console.log(datos.data)
    },
  },
  mounted() {
    this.readTrabajos();
  },
};
</script>
<style></style>
