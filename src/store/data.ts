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

  getData() {
      const client = new faunadb.Client({
        secret: process.env.VUE_APP_KEY
      });
      const idk = client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_projects"))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      );
      idk.then( (response) => {
        this.state.data = response
        },
      );
  }
}

export const dataStore = new DataStore();
