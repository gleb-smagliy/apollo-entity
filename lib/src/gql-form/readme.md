Api:

``` javascript
import { Form } from 'gql-form';
import gql from 'graphql-tag';


export const MyForm = () => (
    const QUERY = gql`
        {
            intro {
                firstName,
                lastName   
            }
        }
    `;

    <Form 
        query={QUERY}
        field="intro"
        loading={Loading}
        error={Error}
     >
        <Form.Field field="firstName">
            (value, onChange) => (<input type="text" onChange={onChange} value={value} />)
        <Form.Field>
        <Form.Field field="lastName">
            (value, onChange) => (<input type="text" onChange={onChange} value={value} />)
        <Form.Field>
    </Form>
);

```