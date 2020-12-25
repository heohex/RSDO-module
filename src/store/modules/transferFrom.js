import axios from 'axios'

export default {
  namespaced: true,
  state: {
    students: [],
  },
  mutations:{
    storeStudents(state, payload){
      state.students = payload;
    },
    transferStudent(state, payload){
      console.log(state,payload)
    }
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
              school: 'МОУ СОШ №3',
              classFrom: '7Б',
              classTo: '7Б',
            },
            {
              id: '9js312h1b9bnssv1sv123v92',
              name: 'Петр1',
              secondName: 'Петров1',
              school: 'МОУ СОШ №3',
              classFrom: '8Б',
              classTo: '8Б',
            },
            {
              id: 's413dgfaskj551312',
              name: 'Илья1',
              secondName: 'Ильин1',
              school: 'МОУ СОШ №3',
              classFrom: '9Б',
              classTo: '9A',
            },
            {
              id: '1s414dg6mjmf51312',
              name: 'Аркадий1',
              secondName: 'Аркадьев1',
              school: 'МОУ СОШ №3',
              classFrom: '6Б',
              classTo: '6Б',
            }])
        )).catch(error => (
        console.log(error)
      ))
    },
    transferStudent({commit}, payload){
      commit('transferStudent', payload)
    }
  }
}

