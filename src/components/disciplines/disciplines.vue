<template>
  <v-row>
    <v-col cols="12">
      <v-expansion-panels
          multiple
      >
        <v-expansion-panel v-for="(item, index) in classesWithDisciplines" :key="item.id">
          <v-expansion-panel-header class="title">
            {{ item.className }} класс
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
                :headers="headers"
                :items="item.disciplines"
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
                        <v-form ref="formDisciplinesTab">
                          <v-container>
                            <v-row>
                              <v-col
                                  cols="12"
                              >
                                <v-text-field
                                    v-model="editedItem.name"
                                    label="Название дисциплины"
                                    dense
                                    :rules="[v => !!v || 'Обязательное поле']"
                                    required
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  v-if="editedIndex === -1"
                              >
                                <v-text-field
                                    v-model="editedItem.amtThemes"
                                    label="К-во тем"
                                    dense
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
                            @click="save(index)"
                        >
                          Сохранить
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Удалить дисциплину?</v-card-title>
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
  </v-row>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "disciplines",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      name: '',
      //значение id заменить
      id: Date.now(),
      amtThemes: null,
      amtStudents: null,
      amtTeachers: null,
    },
    defaultItem: {
      name: '',
      //значение id заменить
      id: Date.now(),
      amtThemes: null,
      amtStudents: null,
      amtTeachers: null,
    },
    expanded: [],
    headers: [
      {
        text: 'Дисциплина',
        align: 'start',
        value: 'name',
      },
      {
        text: 'К-во студентов',
        value: 'amtStudents',
      },
      {
        text: 'К-во учителей',
        value: 'amtTeachers',
      },
      {
        text: 'К-во тем',
        value: 'amtThemes',
      },
      {text: '', value: 'actions', sortable: false},
    ],

  }),
  created() {
    this.$store.dispatch('disciplines/getDisciplines')
  },
  computed: {
    ...mapState('disciplines', [
      'classesWithDisciplines'
    ]),
    formTitle() {
      return this.editedIndex === -1 ? 'Создать десциплину' : 'Редактировать десциплину'
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
    ...mapActions('disciplines', [
      'saveDiscipline',
      'updateDiscipline',
      'deleteDiscipline'
    ]),
    editItem(item, index) {
      this.editedIndex = this.classesWithDisciplines[index].disciplines.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.dialog = true
    },
    deleteItem(item, index) {
      this.editedIndex = this.classesWithDisciplines[index].disciplines.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm(index) {
      this.deleteDiscipline({item: this.editedItem, classIndex: index})
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
    save(index) {
      if (this.$refs.formDisciplinesTab[0].validate()) {
        if (this.editedIndex > -1) {
          this.updateDiscipline({item: this.editedItem, classIndex: index})
        } else {
          this.saveDiscipline({item: this.editedItem, classIndex: index});
        }
        this.close()
      }
    },
  }
}
</script>

<style scoped>
</style>