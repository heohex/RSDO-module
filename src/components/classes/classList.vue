<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
          :headers="headers"
          :items="classes"
          sort-by="calories"
          class="elevation-1"
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
                  <v-form ref="formAddClass">
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                        >
                          <v-text-field
                              v-model="editedItem.name"
                              label="Название класса"
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
                    Закрыть
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                  >
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Удалить класс?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
import {mapState, mapActions} from 'vuex'

export default {
  name: "classList",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Класс',
        align: 'start',
        value: 'name',
      },
      {text: 'Количество школьников', value: 'amtStudents'},
      {text: 'Количество преподавателей', value: 'amtTeachers'},
      {text: '', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      amtStudents: null,
      amtTeachers: null,
    },
    defaultItem: {
      name: '',
      amtStudents: null,
      amtTeachers: null,
    },
  }),
  created() {
    this.$store.dispatch('classes/getClasses');
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Создать' : 'Редактировать'
    },
    ...mapState('classes', [
      'classes'
    ])
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    ...mapActions('classes', [
      'saveClass',
      'updateClass',
      'deleteClass'
    ]),
    editItem(item) {
      this.editedIndex = this.classes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.classes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteClass(this.editedItem);
      this.closeDelete();
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      })
    },
    save() {
      if(this.$refs.formAddClass.validate()) {
        if (this.editedIndex > -1) {
          this.updateClass(this.editedItem)
        } else {
          this.saveClass(this.editedItem)
        }
        this.close();
      }
    },
  },
}
</script>

<style scoped>

</style>