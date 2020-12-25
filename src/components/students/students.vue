<template>
  <v-row>
    <v-col cols="12">
      <v-expansion-panels
          multiple
      >
        <v-expansion-panel v-for="(item, index) in students" :key="item.id">
          <v-expansion-panel-header class="title">
            {{ item.className }} класс
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
                :headers="headers"
                :items="item.students"
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
                        <v-form ref="studentForm">


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
                            @click="save(index)"
                        >
                          Сохранить
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Удалить ученика?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm(index)">Удалить</v-btn>
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
                    @click="editItem(item, index)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item, index)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>


    <v-col cols="12">
      <h3>Нераспределенные ученики</h3>
    </v-col>
    <v-col cols="12">
      <v-data-table
          :headers="unallocatedStudentsHeaders"
          :items="unallocatedStudents"
      >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-spacer></v-spacer>
            <v-dialog
                v-model="allocatedDialog"
                max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">Добавление в класс</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="classForm">
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                        >
                          <v-select
                              v-model="selectedClass"
                              :items="classes"
                              item-text="name"
                              item-value="id"
                              label="Класс"
                              persistent-hint
                              return-object
                              single-line
                              :rules="[v => !!v || 'Обязательное поле']"
                              required
                          ></v-select>
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
                      @click="closeAllocatedDialog"
                  >
                    Отмена
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="replaceStudent()"
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
              @click="editAllocateItem(item)"
          >
            mdi-arrow-right-bold
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "students",
  data: () => ({
    classes: [
      {name: '10Б', id: '17js131b9192'},
      {name: '11А', id: '5159js3v123v92'},
    ],
    show: false,
    dialog: false,
    dialogDelete: false,
    allocatedDialog: false,
    editedIndex: -1,
    selectedClass: null,
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
    unallocatedItem: {
      name: '',
      secondName: null,
      id: Date.now(),
      password: null,
    },
    defaultUnallocatedItem: {
      name: '',
      secondName: null,
      id: Date.now(),
      password: null,
    },
    expanded: [],
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
    unallocatedStudentsHeaders: [
      {
        text: 'Имя',
        align: 'start',
        value: 'name',
      },
      {
        text: 'Фамилия',
        value: 'secondName',
      },
      {text: '', value: 'actions', sortable: false},
    ],

  }),
  created() {
    this.$store.dispatch('students/getStudents');
    this.$store.dispatch('students/getUnallocatedStudents');
  },
  computed: {
    ...mapState('students', [
      'students',
      'unallocatedStudents'
    ]),
    formTitle() {
      return this.editedIndex === -1 ? 'Создать ученика' : 'Редактировать ученика'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    allocatedDialog(val) {
      val || this.closeAllocatedDialog()
    },
  },
  methods: {
    ...mapActions('students', [
      'saveStudent',
      'updateStudent',
      'deleteStudent',
      'addToClass'
    ]),
    editItem(item, index) {
      this.editedIndex = this.students[index].students.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.dialog = true
    },
    editAllocateItem(item) {
      this.unallocatedItem = Object.assign({}, item);
      this.allocatedDialog = true;
    },
    deleteItem(item, index) {
      this.editedIndex = this.students[index].students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm(index) {
      this.deleteStudent({item: this.editedItem, classIndex: index})
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeAllocatedDialog() {
      this.allocatedDialog = false
      this.selectedClass = null;
      this.$nextTick(() => {
        this.unallocatedItem = Object.assign({}, this.defaultUnallocatedItem)
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save(index) {
      if (this.$refs.studentForm[0].validate()) {
        if (this.editedIndex > -1) {
          this.updateStudent({item: this.editedItem, classIndex: index})
        } else {
          this.saveStudent({item: this.editedItem, classIndex: index});
        }
        this.close()
      }
    },
    replaceStudent() {
      if (this.$refs.classForm.validate()) {
        this.addToClass({class: this.selectedClass, student: this.unallocatedItem})
        this.closeAllocatedDialog();
      }
    },
  }
}
</script>

<style scoped>

</style>