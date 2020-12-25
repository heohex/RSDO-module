import axios from 'axios'

export default {
  namespaced: true,
  state: {
    classesWithDisciplines: []
  },
  mutations:{
    storeDisciplines(state, dataArr){
      state.classesWithDisciplines = state.classesWithDisciplines.concat(dataArr);
    },
    saveDiscipline(state, item) {
      state.classesWithDisciplines[item.classIndex].disciplines.push(item.item);
    },
    updateDiscipline(state, item){
      console.log(state,item)
    },
    deleteDiscipline(state, payload){
      state.classesWithDisciplines[payload.classIndex].disciplines = state.classesWithDisciplines[payload.classIndex].disciplines.filter(item => item.id !== payload.item.id);
    },
  },
  actions: {
    getDisciplines({commit}) {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(() => (
          // тут должны получить дату и передать в мутацию
          commit('storeDisciplines', [ { id: '17js1b9192', className: '6Б', disciplines: [ { id: 'js1b91sv123v92', name: 'Математика', amtStudents: '22', amtTeachers: '2', amtThemes: '29', }, { id: '9js312h1b91sv123v92', name: 'Физика', amtStudents: '22', amtTeachers: '1', amtThemes: '34', } ] }, { id: '5159js3v123v92', className: '8А', disciplines: [ { id: 's4dgf51312', name: 'Русский язык', amtStudents: '12', amtTeachers: '1', amtThemes: '20', }, { id: '1s414dgf51312', name: 'Литература', amtStudents: '16', amtTeachers: '4', amtThemes: '4', } ] } ])
        )).catch(error => (
        console.log(error)
      ))
    },
    updateDiscipline({commit}, item){
      commit('updateDiscipline', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
    saveDiscipline({commit}, item){
      commit('saveDiscipline', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
    deleteDiscipline({commit}, item){
      commit('deleteDiscipline', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    }
  }
}