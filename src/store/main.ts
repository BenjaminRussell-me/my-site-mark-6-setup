import {reactive, readonly, watch, ref, Ref} from 'vue';

export abstract class Store<T extends Record<string, any>> {
  protected state: T;

    constructor(readonly storeNmae: string) {
      let data = this.data();
      this.state = reactive(data) as T;
    }

    protected abstract data(): T

    public getState(): T {
      return readonly(this.state) as T
    }
}




// import { createStore } from "vuex";
// import faunadb from "faunadb";
// const q = faunadb.query;
// export default createStore({
//   state: {
//     query: {}
//   },
//   mutations: {
//     setQuery(state, response){
//       state.query = response
//     }
//   },
//   actions: {
//     apiCall({commit}) {
//       const client = new faunadb.Client({
//       secret: process.env.VUE_APP_KEY
//     });
//     const idk = client.query(
//       q.Map(
//         q.Paginate(q.Match(q.Index("all_projects"))),
//         q.Lambda("X", q.Get(q.Var("X")))
//       )
//     );
//     idk.then(function(response) {
//       commit('setQuery',response)
//     });}
//   },
//   modules: {}
// });
