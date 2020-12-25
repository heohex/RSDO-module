import Vue from 'vue'
import Vuex from 'vuex'
import classes from "@/store/modules/classes";
import disciplines from "@/store/modules/disciplines";
import students from "@/store/modules/students";
import teachers from "@/store/modules/teachers";
import enrollTeacher from "@/store/modules/enrollTeacher";
import transferTo from "@/store/modules/transferTo";
import transferFrom from "@/store/modules/transferFrom";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    classes,
    disciplines,
    students,
    teachers,
    enrollTeacher,
    transferTo,
    transferFrom
  }
})
