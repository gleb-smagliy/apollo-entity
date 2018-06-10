import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Entity from 'apollo-entity';
import FieldInput from './field-input'
import SaveMemberButton from './save-member-button';

import './member-form.css';

const GET_MEMBER = gql`
  query members($id: Int!) {
    member: members(id: $id) @client {  
      firstName
      lastName
      email
    }
  }
`;

const alphabetic = str => /^[A-z]*?$/.test(str);

const isEmail = str => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);

const isStringNullOrWhitespace = str => !str || str.trim() === '';

const isMemberEmpty = member =>
{
  return isStringNullOrWhitespace(member.firstName) && isStringNullOrWhitespace(member.lastName) && isStringNullOrWhitespace(member.email);
};

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
    <div className="member__row">
      <Entity.Map>
        {member => (
          <div className="edit-member-form__save_button">
            <SaveMemberButton member={member} disabled={isMemberEmpty(member)}/>
            {
              isMemberEmpty(member) ?
                (<div className="edit-member-form__empty-member-message">{EMPTY_MEMBER}</div>) :
                null
            }
          </div>
        )}
      </Entity.Map>
    </div>
  </Entity>
);

// export default () => (
//   <Query query={GET_MEMBER} variables={{ id: 1 }}>
//     {
//       props =>
//       {
//         const { data: { member }, loading } = props;
//
//         console.log('props:', props);
//
//         if(loading || !member)
//         {
//           return (<div>Loading...</div>);
//         }
//
//         return (
//           <div>
//             <div className="member__row">
//               <div className="member__field">
//                 Last name: {member.firstName}
//               </div>
//               <div className="member__field">
//                 FirstName: {member.lastName}
//               </div>
//             </div>
//             <div className="member__row">
//               <div className="member__field">
//                 Email: {member.email}
//               </div>
//             </div>
//             <div className="member__row">
//               <div className="member__field">
//                 Level: {member.level}
//               </div>
//             </div>
//           </div>
//         );
//       }
//     }
//   </Query>
// );