<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
          :headers="headers"
          :items="teachers"
          :search="search"
          :custom-filter="customFilter"
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
                  <span class="headline">Добавление/удаление дисциплины</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                      >
                        <v-select
                            v-model="editedItem.disciplines"
                            :items="disciplinesList"
                            label="Дисциплины"
                            multiple
                            chips
                            persistent-hint
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
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
                      @click="save()"
                  >
                    Сохранить
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
  </v-row>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "enrollTeacher",
  data: () => ({
    search: '',
    disciplinesList: [
        'Русский язык',
        'Математика',
        'Физика',
        'Английский',
    ],
    show: false,
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      name: '',
      //значение id заменить
      id: Date.now(),
      secondName: '',
      amtDiscipline: null,
      disciplines: []
    },
    defaultItem: {
      name: '',
      //значение id заменить
      id: Date.now(),
      secondName: '',
      amtDiscipline: null,
      disciplines: []
    },
    headers: [
      {
        text: 'Имя',
        align: 'start',
        value: 'name',
      },
      {
        text: 'Фамилия',
        value: 'secondName',
      },
      {
        text: 'К-во десциплин',
        value: 'amtDiscipline',
      },
      {text: '', value: 'actions', sortable: false},
    ],

  }),
  created() {
    this.$store.dispatch('enrollTeacher/getTeachers')
  },
  computed: {
    ...mapState('enrollTeacher', [
      'teachers'
    ]),
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    ...mapActions('enrollTeacher', [
      'updateTeacher',
    ]),
    customFilter(value, search, item){
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          item.disciplines.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ||
          value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
    },
    editItem(item) {
      this.editedIndex = this.teachers.indexOf(item)
      this.editedItem = Object.assign({}, item);
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
    save() {
      this.updateTeacher(this.editedItem)
      this.close()
    },
  }
}
</script>

<style scoped>

</style>