/* eslint-disable @typescript-eslint/camelcase */
import { Store } from "./main";
import faunadb from "faunadb";
const q = faunadb.query;
const query = { value: {} };

interface MyApi {

projects: object;
content: object;
[key: string]: any
}

interface Api extends Object {
  data: MyApi;
}

class DataStore extends Store<Api> {
  protected data(): Api {
    return {
      data: {
        content:{},
        projects:{}
      }
    };
  }

  getData(pullAll: boolean, from: any, source: string|null, itemName: string|null ) {
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
        if (source !== null) {
          this.state.data[source] = response
        }
        },
      );
      }else {
       const idk = client.query(
        q.Get(q.Match(q.Index(from), itemName || ""))
      );
      idk.then( (response) => {
        if(itemName !== null && source !== null){
        this.state.data[source][itemName] = response
        }
      });        

      }
  }
}

export const dataStore = new DataStore();
