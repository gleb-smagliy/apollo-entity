import Entity from 'apollo-entity';
import gql from 'graphql-tag';

const MEMBER_QUERY = gql`
  query MemberById($id: ID!) {
    member(id: $id) {
      firstName,
      lastName,
      email,
      level
    }
  }
`;

const isEmail = str => str.test(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const alphanumeric = str => str.test(/[A-z]*?/);

const FieldInput = ({
  validate,
  allow,
  name
}) => (
  <Entity.Field name={name} allow={allow} validate={validate}>
    {(firstName, change, valid) => (
      <input
        type="text"
        className={classname({ 'invalid': !valid })}
        value={firstName}
        onChange={e => change(e.target.value)}
      />
    )}
  </Entity.Field>
);

export default EditMemberForm = ({
  id,
  labels: {
    LOADING_ERROR,
    EMPTY_MEMBER,
    INVALID_EMAIL
  }
}) => (
  <Entity
    query={MEMBER_QUERY}
    variables={{ id }}
    name="member"
    loading={(data) => <div className="loader member__loader" />}
    loadingError={(data) => <div className="error member__loading-error">{LOADING_ERROR}</div>}
  >
    <div className="edit-member-form__row">
      <FieldInput name="firstName" allow={alphanumeric} />
      <FieldInput name="lastName" allow={alphanumeric} />
    </div>
    <div className="edit-member-form__row">
      <FieldInput name="email" />
      <Entity.Map map={({ email }) => isEmail(email)}>
        {valid => (
          valid ?
            null :
            <div className="edit-member-form__invalid-email-message">{INVALID_EMAIL}</div>
        )}
      </Entity.Map>
    </div>
    <div className="edit-member-form__row">
      <FieldInput name="level" allow={alphanumeric} />
    </div>
    <div className="edit-member-form__row">
      <Entity.Map>
        {member => (
          <div className="edit-member-form__save_button">
            <SaveMemberButton member={member} />
            {
              isEmpty(member) ?
                (<div className="edit-member-form__empty-member-message">{EMPTY_MEMBER}</div>) :
                null
            }
          </div>
        )}
      </Entity.Map>
    </div>
  </Entity>
);