import React from 'react';
import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';

const SAVE_MEMBER = gql`
  mutation saveMember($member: MemberInput) {
    saveMember(member: $member) @client
  }
`;

export default ({ disabled, member }) => (
  <Mutation mutation={SAVE_MEMBER} variables={{ member }}>
    {(save, { loading }) => (
        <button onClick={save} disabled={disabled || loading}>Save!</button>
    )}
  </Mutation>
);