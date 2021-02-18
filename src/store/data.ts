import { Store } from "./main";
import faunadb from "faunadb";
const q = faunadb.query;
const query = { value: {} };


interface Api extends Object {
  data: object;
}

class DataStore extends Store<Api> {
  protected data(): Api {
    return {
      data: {}
    };
  }

  getData(pullAll: boolean, from: any, itemName: string|null ) {
      const client = new faunadb.Client({
        secret: process.env.VUE_APP_API
      });
      if (pullAll) {
        const query = client.query(
       q.Map(
          q.Paginate(q.Match(q.Index(from))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      );
      query.then( (response) => {
        this.state.data = response
        },
      );
      }else {
       const idk = client.query(
        q.Get(q.Match(q.Index(from), itemName || ""))
      );
      idk.then( (response) => {
        this.state.data = response
      });        

      }
  }
}

export const dataStore = new DataStore();
