import { DataTable, List, Create, Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const AcaoList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="descricao" />
            <DataTable.NumberCol source="preco" />
        </DataTable>
    </List>
);

export const AcaoCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="descricao" fullWidth />
            <NumberInput source="preco" />
        </SimpleForm>
    </Create>
);

export const AcaoEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="descricao" fullWidth />
            <NumberInput source="preco" />
        </SimpleForm>
    </Edit>
);