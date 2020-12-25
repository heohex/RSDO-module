<template>
  <v-col cols="12">
    <v-data-table
        :headers="headers"
        :items="students"
        :search="search"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              single-line
              label="Поиск"
              hide-details
          ></v-text-field>
          <v-spacer/>
          <v-dialog v-model="transferDialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">Переводим ученика в нашу школу?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeTransfer">Отмена</v-btn>
                <v-btn color="blue darken-1" text @click="transferConfirm">Перевести</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            @click="showTransferDialog(item)"
        >
          mdi-arrow-right-bold
        </v-icon>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "transferFrom",
  data: () => ({
    search: '',
    transferDialog: false,
    editedItem: null,
    headers: [
      {
        text: 'Имя',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Фамилия', value: 'secondName'},
      {text: 'Перевод из школы', value: 'school'},
      {text: 'Перевод из класса', value: 'classFrom'},
      {text: 'Перевод в класс', value: 'classTo'},
      {text: '', value: 'actions', sortable: false},
    ],
  }),

  computed: {
    ...mapState('transferFrom', [
      'students'
    ]),
  },

  created() {
    this.$store.dispatch('transferFrom/getStudents');
  },

  methods: {
    ...mapActions('transferFrom', [
      'transferStudent'
    ]),
    showTransferDialog(item){
      this.editedItem = Object.assign({}, item);
      this.transferDialog = true;
    },

    transferConfirm() {
      this.transferStudent(this.editedItem);
      this.editedItem = null;
    },
    closeTransfer(){
      this.editedItem = null;
      this.transferDialog = false;
    }

  },
}
</script>

<style scoped>

</style>