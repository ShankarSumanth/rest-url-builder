# rest-url-builder

Build rest urls by substituting the named and  query parameters.

# Installation
`yarn add rest-url-builder` *(recommended)* || `npm install --save rest-url-builder`.

# Description

Build better rest url's by substituting the parameters using the provided context. Few advantages are 
- It's easier to understand when you have many parameters.
- Maintainable, All url's can be maintained at one place.
- logic free No need to check if a query parameter exists or not. If it exists then it will be on the url else it is removed from the final url

# Usage

```
import { RestURLBuilder } from 'rest-url-builder
// const RestURLBuilder = require('rest-url-builder);

let urlBuilder = new RestURLBuilder();
urlBuilder.buildRestURL('urlString');
urlBuilder.setNamedParameter('parameterName', parameterValue);
urlBuilder.setQueryParameter('parameterName', queryParameterValue);
urlBuilder.get();
```

# Examples
All examples are [Typescript](https://www.typescriptlang.org/) based.

Example 1: Get users

// user-rest-api.service.ts
```typescript
import { RestURLBuilder } from 'rest-url-builder';
class UserRestAPI {

 private usersURL = 'https://fromsomewhere.com/users/:userId';
 
 private urlBuilder = new RestURLBuilder();
 
  getUsers(userId: number) { // userId = 4
    let builder = this.urlBuilder.buildRestURL(this.userURL);
    builder.setNamedParameter('userId', ''+userId );
    let finalURL =  builder.get(); // produces https://fromsomewhere.com/users/4
    http.get(finalURL); // psuedo 
    
  }
} 
```
Example 2: (build on top of example 1) getUsers of a certain organization
```typescript
private organizationUsersURL = 'https://fromsomewhere.com/organizations/:organizationId/users/:userId';

 getUsers(organizationId: number, userId: number) {
    let builder = this.urlBuilder.buildRestURL(this.organizationUsersURL);
    builder.setNamedParameter('userId', ''+userId); 
    builder.setNamedParameter('organizationId', ''+organizationId);
    let finalURL =  builder.get(); // produces https://fromsomewhere.com/organizations/3/users/110
    http.get(finalURL); // psuedo 
 }

```
Example 3: query parameter example - The advantage here is the unused query parameters are removed from the final url. No need to check with `if else` or run it with `for (queryParam in queryParams)`. Produces nice urls.

```typescript
private filterUserByRoleAndName = 'https://fromsomewhere.com/organizations/:organizationId/users?role=:role&name=:name';

 getUsers(organizationId: number, role: string, name: string) { // organizationId = 3, role ="manager", name=null
    let builder = this.urlBuilder.buildRestURL(this.filterUserByRoleAndName);
    builder.setNamedParameter('organizationId', organizationId);
    builder.setQueryParameter('role', role);
    builder.setQueryParameter('name', name);
    let finalURL =  builder.get(); // produces https://fromsomewhere.com/organizations/3/users?role=manager (since name is null, it will not get appeneded to the url)
    http.get(finalURL); // psuedo 
 }
```

# Licence
MIT
