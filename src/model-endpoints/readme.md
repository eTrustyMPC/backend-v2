# Model Endpoints

This directory contains settings for default CRUD operations of the models.

## Docs

- Creating CRUD APIs: <https://loopback.io/doc/en/lb4/Creating-crud-rest-apis.html>
- Defining a custom repository: <https://loopback.io/doc/en/lb4/Dynamic-models-repositories-controllers.html>

```js
/*import {CRUDApiConfig} from "loopback-component-crud";
import {User} from '../models';
import {UserRepository} from '../repositories';
//import {UserController} from '../controllers';

module.exports = {
  model: User,
  pattern: "CRUD",
  dataSource: "db",
  basePath: "/users",
  create: {},
  read: {},
  update: {},
  delete: {},
  //controller: UserController,
  repository: UserRepository,
} as CRUDApiConfig;

import {CRUDApiConfig} from "loopback-component-crud";
import {Tender} from '../models';
import {TenderRepository} from '../repositories';
//import {TenderController} from '../controllers';

module.exports = {
  model: Tender,
  pattern: "CRUD",
  dataSource: "db",
  basePath: "/tenders",
  create: {},
  read: {},
  update: {},
  delete: {},
  //controller: TenderController,
  repository: TenderRepository,
} as CRUDApiConfig;

*/
```
