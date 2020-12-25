<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
          :headers="headers"
          :items="teachers"
      >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  Создать
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-form ref="teacherFormTab">
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                        >
                          <v-text-field
                              v-model="editedItem.name"
                              label="Имя"
                              dense
                              :rules="[v => !!v || 'Обязательное поле']"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                          <v-text-field
                              v-model="editedItem.secondName"
                              label="Фамилия"
                              dense
                              :rules="[v => !!v || 'Обязательное поле']"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            v-if="editedIndex !== -1"
                        >
                          <v-text-field
                              v-model="editedItem.password"
                              label="Пароль"
                              dense
                              :type="show ? 'text' : 'password'"
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show = !show"
                              :rules="[v => !!v || 'Обязательное поле']"
                              required
                          ></v-text-field>
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
                      @click="save()"
                  >
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Удалить учителя?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm()">Удалить</v-btn>
                  <v-spacer></v-spacer>
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
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "teachers",
  data: () => ({
    show: false,
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      name: '',
      //значение id заменить
      id: Date.now(),
      secondName: null,
      amtDiscipline: null,
      password: null,
    },
    defaultItem: {
      name: '',
      //значение id заменить
      id: Date.now(),
      secondName: null,
      amtDiscipline: null,
      password: null,
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
      {
        text: 'Последний успешный вход',
        value: 'lastEntry',
      },
      {text: '', value: 'actions', sortable: false},
    ],

  }),
  created() {
    this.$store.dispatch('teachers/getTeachers')
  },
  computed: {
    ...mapState('teachers', [
      'teachers'
    ]),
    formTitle() {
      return this.editedIndex === -1 ? 'Создать' : 'Редактировать'
    },
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
    ...mapActions('teachers', [
      'saveTeacher',
      'updateTeacher',
      'deleteTeacher'
    ]),
    editItem(item) {
      this.editedIndex = this.teachers.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.teachers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.deleteTeacher(this.editedItem)
      this.closeDelete()
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
      if (this.$refs.teacherFormTab.validate()) {
        if (this.editedIndex > -1) {
          this.updateTeacher(this.editedItem)
        } else {
          this.saveTeacher(this.editedItem);
        }
        this.close()
      }
    },
  }
}
</script>

<style scoped>

</style>