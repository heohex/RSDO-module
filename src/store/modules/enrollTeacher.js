import axios from 'axios'

export default {
  namespaced: true,
  state: {
    teachers: []
  },
  mutations:{
    storeTeachers(state, dataArr){
      state.teachers = dataArr;
    },
    updateTeacher(state, payload){
      state.teachers.find(item => item.id === payload.id).disciplines = payload.disciplines;
    },
  },
  actions: {
    getTeachers({commit}) {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(() => (
          // тут должны получить дату и передать в мутацию
          commit('storeTeachers', [
            {
              id: 'js1b91sv123v92',
              name: 'Учитель1',
              secondName: 'Учитель1',
              amtDiscipline: '22',
              disciplines: ['Русский язык']
            },
            {
              id: '9js312h1b91sv123v92',
              name: 'Учитель2',
              secondName: 'Учитель2',
              amtDiscipline: '14',
              disciplines: ['Математика']
            },
            {
              id: 's413dgf51312',
              name: 'Учитель3',
              secondName: 'Учитель3',
              amtDiscipline: '12',
              disciplines: ['Физика']
            }, {
              id: '1s414dgf51312',
              name: 'Учитель4',
              secondName: 'Учитель4',
              amtDiscipline: '42',
              disciplines: ['Английский']
            }
          ])
        )).catch(error => (
        console.log(error)
      ))
    },
    updateTeacher({commit}, item){
      commit('updateTeacher', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
    saveTeacher({commit}, item){
      commit('saveTeacher', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
  }
}