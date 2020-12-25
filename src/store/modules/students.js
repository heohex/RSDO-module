import axios from 'axios'

export default {
  namespaced: true,
  state: {
    students: [],
    unallocatedStudents: []
  },
  mutations:{
    storeStudents(state, dataArr){
      state.students = dataArr;
    },
    storeUnallocatedStudents(state, dataArr){
      state.unallocatedStudents = state.unallocatedStudents.concat(dataArr);
    },
    saveStudent(state, payload) {
      state.students[payload.classIndex].students.push(payload.item);
    },
    updateStudent(state, payload){
      console.log(state,payload)
    },
    deleteStudent(state, payload){
      state.students[payload.classIndex].students = state.students[payload.classIndex].students.filter(item => item.id !== payload.item.id);
    },
    addToClass(state, payload){
      state.unallocatedStudents = state.unallocatedStudents.filter(item => item.id !== payload.student.id);
      state.students.find(item => item.id === payload.class.id).students.push(payload.student);

    }
  },
  actions: {
    getStudents({commit}) {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(() => (
          // тут должны получить дату и передать в мутацию
          commit('storeStudents', [{ id: '17js131b9192', className: '10Б', students: [ { id: 'js1b91sv123v92', name: 'Иванов', secondName: 'Иван', amtDiscipline: '22', lastEntry: '23.12.2020', password: 'asR1hWE' }, { id: '9js312h1b91sv123v92', name: 'Петр', secondName: 'Петров', amtDiscipline: '14', lastEntry: '23.12.2020', password: 'ashWE' } ] }, { id: '5159js3v123v92', className: '11А', students: [ { id: 's413dgf51312', name: 'Илья', secondName: 'Ильин', amtDiscipline: '12', lastEntry: '23.12.2020', password: 'asd123' }, { id: '1s414dgf51312', name: 'Аркадий', secondName: 'Аркадьев', amtDiscipline: '42', lastEntry: '23.12.2020', password: 'asd1' }] }])
        )).catch(error => (
        console.log(error)
      ))
    },
    getUnallocatedStudents({commit}) {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(() => (
          // тут должны получить дату и передать в мутацию
          commit('storeUnallocatedStudents', [
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
    updateStudent({commit}, item){
      commit('updateStudent', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
    saveStudent({commit}, item){
      commit('saveStudent', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
    deleteStudent({commit}, item){
      commit('deleteStudent', item)
      // axios.post('/', item)
      //   .then(() => (
      //   )).catch(error => (
      //   console.log(error)
      // ))
    },
    addToClass({commit}, payload){
      commit('addToClass', payload)
    }
  }
}

