# apollo-entity

This lib provides you with a set of primitives allowing you to 
gracefully handle local apollo cache changes.

Primitives currently exported as an API:

* Entity - allows you to specify query to get your entity by graphql query
* Entity.Field - use to retrieve/edit entity field in apollo cache. 
Also allows you to specify `allow` callback to check if input is appropriate.  
* Entity.Map - use to retrieve entity. 
Also allows you to specify `map` callback to map entity to something useful.
 
This lib was primarily motivated by the need of handling forms.
 
Here is the example of simple form allowing admin to add a user (member of his community):
 
 ## Entity
 ```javascript
 import { Entity } from 'apollo-entity';
 import gql from 'graphql-tag';
 
 const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 const ALPHABETIC_REGEXP = /^[A-z]*?$/;
 
 
 const GET_MEMBER = gql`
  query member($id: Int!){
    member(id: $id) {
      firstName,
      lastName,
      email,
      category
    }
  }
 `;
 
 const FieldInput = ({
   name,
   allow
 }) => (
   <Entity.Field name={name} allow={allow}>
     {(value, change) => (
       <input type="text" value={value} onChange={e => change(e.target.value)} />
     )}
   </Entity.Field>
 );
 
const alphabetic = str => ALPHABETIC_REGEXP.test(str);
const isEmail = str => EMAIL_REGEXP.test(str);
 
const INVALID_EMAIL = 'Email is not valid!';
const EMPTY_MEMBER = 'Member is empty!';
 
 export default () => (
   <Entity name="member" query={GET_MEMBER} variables={{ id: 1 }}>
       <div className="member__row">
         <FieldInput name="firstName" allow={alphabetic} />
         <FieldInput name="lastName" allow={alphabetic} />
       </div>
       <div className="member__row">
         <FieldInput name="email" />
         <Entity.Map map={({ email }) => isEmail(email)}>
           {valid => (
             valid ?
               null :
               <div className="edit-member-form__invalid-email-message">{INVALID_EMAIL}</div>
           )}
         </Entity.Map>
       </div>
     </Entity>
 );
 ```