import { DataTable, EmailField, List, Create, Edit, SimpleForm, TextInput } from 'react-admin';

export const ClienteList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="nome" />
            <DataTable.Col source="nif" />
            <DataTable.Col source="telefone" />
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
            <DataTable.Col source="morada" />
        </DataTable>
    </List>
);

export const ClienteCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="nome" fullWidth />
            <TextInput source="nif" />
            <TextInput source="telefone" />
            <TextInput source="email" fullWidth />
            <TextInput source="morada" fullWidth />
        </SimpleForm>
    </Create>
);

export const ClienteEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="nome" fullWidth />
            <TextInput source="nif" />
            <TextInput source="telefone" />
            <TextInput source="email" fullWidth />
            <TextInput source="morada" fullWidth />
        </SimpleForm>
    </Edit>
);