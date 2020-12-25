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
          <v-dialog
              v-model="dialog"
              max-width="500px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Перевод в другую школу</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="formTransferTo">
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                      >
                        <v-text-field
                            v-model="editedItem.name"
                            label="Имя"
                            readonly
                            dense
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                      >
                        <v-text-field
                            v-model="editedItem.secondName"
                            label="Фамилия"
                            readonly
                            dense
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                      >
                        <v-text-field
                            v-model="editedItem.school"
                            label="Школа"
                            dense
                            :rules="[v => !!v || 'Обязательное поле']"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                      >
                        <v-text-field
                            v-model="editedItem.class"
                            label="Класс"
                            dense
                            :rules="[v => !!v || 'Обязательное поле']"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                      >
                        <v-radio-group
                            v-model="editedItem.howSendDown"
                            column
                            :rules="[v => !!v || 'Обязательно выбрать']"
                            required
                        >
                          <v-radio
                              label="Отчислить в начале перевода"
                              value="1"
                          ></v-radio>
                          <v-radio
                              label="Отчислить после принятия перевода другой школой"
                              value="2"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                  Отмена
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="transfer"
                >
                  Перевести
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: "transferTo",
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      {
        text: 'Фамилия',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Имя', value: 'secondName'},
      {text: '', value: 'actions', sortable: false},
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      secondName: 0,
      school: '',
      howSendDown: '',
      class: ''
    },
    defaultItem: {
      name: '',
      secondName: 0,
      school: '',
      howSendDown: '',
      class: ''
    },
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  created() {
    this.$store.dispatch('transferTo/getStudents');
  },
  computed: {
    ...mapState('transferTo', [
      'students'
    ]),
  },
  methods: {
    ...mapActions('transferTo', [
      'transferStudent'
    ]),
    editItem(item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    transfer() {
      if (this.$refs.formTransferTo.validate()) {
        this.transferStudent(this.editedItem);
        this.close();
      }
    },
  },
}
</script>

<style scoped>
</style>