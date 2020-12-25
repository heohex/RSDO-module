import axios from 'axios'

export default {
  namespaced: true,
  state: {
    students: [],
  },
  mutations:{
    storeStudents(state, dataArr){
      state.students = dataArr;
    },
    transferStudent(state, payload){
      state.students = state.students.filter(item => item.id !== payload.id)
    },
  },
  actions: {
    getStudents({commit}) {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(() => (
          // тут должны получить дату и передать в мутацию
          commit('storeStudents', [
            {
              id: 'js1b91sv161623v92',
              name: 'Иванов1',
              secondName: 'Иван1',
              password: 'asR1hWE'
            },
            {
              id: '9js312h1b9bnssv1sv123v92',
              name: 'Петр1',
              secondName: 'Петров1',
              password: 'ashWE'
            },
            {
              id: 's413dgfaskj551312',
              name: 'Илья1',
              secondName: 'Ильин1',
              password: 'asd123'
            },
            {
              id: '1s414dg6mjmf51312',
              name: 'Аркадий1',
              secondName: 'Аркадьев1',
              password: 'asd1'
            }])
        )).catch(error => (
        console.log(error)
      ))
    },
    transferStudent({commit}, payload){
      commit('transferStudent', payload)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
  }
}

