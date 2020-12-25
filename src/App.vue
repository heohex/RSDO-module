<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-tabs
                :show-arrows="$vuetify.breakpoint.mdAndDown"
            >
              <v-tab
                  v-for="tabName in tabs"
                  :key="tabName"
              >
                {{ tabName }}
              </v-tab>
              <v-tab-item
                  v-for="(tabItem,i) in componentsList"
                  :key="tabItem"
              >
                <v-card flat>
                  <v-container fluid>
                    <component :is="componentsList[i]"/>
                  </v-container>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import classList from "@/components/classes/classList";
import disciplines from "@/components/disciplines/disciplines";
import students from "@/components/students/students";
import teachers from "@/components/teachers/teachers";
import enrollTeacher from "@/components/enrollTeacher/enrollTeacher";
import transferTo from "@/components/transferTo/transferTo";
import transferFrom from "@/components/transferFrom/transferFrom";

export default {
  name: 'App',
  components: {
    classList,
    disciplines,
    students,
    teachers,
    enrollTeacher,
    transferTo,
    transferFrom,
  },
  data: () => ({
    tab: null,
    componentsList: [
      'classList',
      'disciplines',
      'students',
      'teachers',
      'enrollTeacher',
      'transferTo',
      'transferFrom'
    ],
    tabs: [
      'Классы',
      'Дисциплины',
      'Ученики',
      'Учителя',
      'Зачисление/исключение учителя',
      'Перевод ученика в другую школу',
      'Перевод ученика из другой школы'
    ],
  }),
  computed: {}
};
</script>
