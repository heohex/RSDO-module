import axios from 'axios'

export default {
  namespaced: true,
  state: {
    classes: []
  },
  mutations: {
    saveClasses(state, dataArray){
      state.classes = dataArray;
    },
    updateClass(state, classItem){
      console.log(state, classItem)
    },
    saveClass(state, classItem){
      state.classes.push(classItem)
    },
    deleteClass(state, classItem){
      state.classes = state.classes.filter(item => item.id !== classItem.id)
    }
  },
  actions: {
    getClasses({commit}) {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(() => (
          // тут должны получить дату и передать в мутацию
          commit('saveClasses', [ { id: 1, name: '6Б', amtStudents: '24', amtTeachers: '2', }, { id: 2, name: '7Б', amtStudents: '211', amtTeachers: '122', }, { id: 3, name: '8Б', amtStudents: '223', amtTeachers: '422', }, { id: 4, name: '9Б', amtStudents: '2413', amtTeachers: '223', }, ])
        )).catch(error => (
          console.log(error)
        ))
    },
    updateClass({commit}, item){
      commit('updateClass', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
    saveClass({commit}, item){
      // тут еще нужен будет commit что бы запушить в disciplines/classesWithDisciplines
      commit('saveClass', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
    deleteClass({commit}, item){
      commit('deleteClass', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    }
  },
}