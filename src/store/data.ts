import {Store} from "./main";
import faunadb from "faunadb";
const q = faunadb.query;

interface Result extends Object {
    resultData: Record<string, any>
}

class DataStore extends Store<Result> {
    protected data (): Result {
        return {
            resultData: {
                test: 0
            }
        };
    }
    apiCall() {
        const client = new faunadb.Client({
        secret: process.env.VUE_APP_KEY
      });
      const idk = client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_projects"))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      );
      idk.then((response) => {
        this.state.resultData = response
      });}
}

export const dataStore: DataStore = new DataStore()