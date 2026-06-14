import { DataTable, List, Create, Edit, SimpleForm, TextInput } from 'react-admin';

export const VeterinarioList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="nome" />
            <DataTable.Col source="especialidade" />
            <DataTable.Col source="contacto" />
        </DataTable>
    </List>
);

export const VeterinarioCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="nome" fullWidth />
            <TextInput source="especialidade" />
            <TextInput source="contacto" />
        </SimpleForm>
    </Create>
);

export const VeterinarioEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="nome" fullWidth />
            <TextInput source="especialidade" />
            <TextInput source="contacto" />
        </SimpleForm>
    </Edit>
);