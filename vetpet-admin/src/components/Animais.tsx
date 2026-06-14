import { DataTable, List, Create, Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput } from 'react-admin';

export const AnimalList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="nome" />
            <DataTable.Col source="especie" />
            <DataTable.Col source="raca" />
            <DataTable.NumberCol source="ano_nascimento" />
            <DataTable.Col source="sexo" />
            <DataTable.Col source="estado_saude" />
            <DataTable.NumberCol source="id_cliente" />
        </DataTable>
    </List>
);

export const AnimalCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="nome" fullWidth />
            <TextInput source="especie" />
            <TextInput source="raca" />
            <NumberInput source="ano_nascimento" />
            <TextInput source="sexo" />
            <TextInput source="estado_saude" fullWidth />
            <ReferenceInput source="id_cliente" reference="clientes">
                <SelectInput optionText="nome" label="Dono do Animal" fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const AnimalEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="nome" fullWidth />
            <TextInput source="especie" />
            <TextInput source="raca" />
            <NumberInput source="ano_nascimento" />
            <TextInput source="sexo" />
            <TextInput source="estado_saude" fullWidth />    
            <ReferenceInput source="id_cliente" reference="clientes">
                <SelectInput optionText="nome" label="Dono do Animal" fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);