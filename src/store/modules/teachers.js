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
    saveTeacher(state, item) {
      state.teachers.push(item);
    },
    updateTeacher(state, payload){
      console.log(state,payload)
    },
    deleteTeacher(state, item){
      state.teachers = state.teachers.filter(el => el.id !== item.id)
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
              lastEntry: '23.12.2020',
              password: 'asR1hWE'
            },
            {
              id: '9js312h1b91sv123v92',
              name: 'Учитель2',
              secondName: 'Учитель2',
              amtDiscipline: '14',
              lastEntry: '23.12.2020',
              password: 'ashWE'
            },
            {
              id: 's413dgf51312',
              name: 'Учитель3',
              secondName: 'Учитель3',
              amtDiscipline: '12',
              lastEntry: '23.12.2020',
              password: 'asd123'
            }, {
              id: '1s414dgf51312',
              name: 'Учитель4',
              secondName: 'Учитель4',
              amtDiscipline: '42',
              lastEntry: '23.12.2020',
              password: 'asd1'
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
    deleteTeacher({commit}, item){
      commit('deleteTeacher', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    }
  }
}