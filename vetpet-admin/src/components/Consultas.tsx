import { DataTable, List, Create, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, DateInput, TimeInput } from 'react-admin';

export const ConsultaList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="estado_consulta" />
            <DataTable.Col source="data_consulta" />
            <DataTable.Col source="hora_consulta" />
            <DataTable.NumberCol source="id_animal" />
            <DataTable.NumberCol source="id_veterinario" />
        </DataTable>
    </List>
);

export const ConsultaCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="estado_consulta" label="Estado (ex: Marcada, Concluída)" fullWidth />
            <DateInput source="data_consulta" label="Data" />
            <TimeInput source="hora_consulta" label="Hora" />
            <ReferenceInput source="id_animal" reference="animais">
                <SelectInput optionText="nome" label="Animal" fullWidth />
            </ReferenceInput>
            <ReferenceInput source="id_veterinario" reference="veterinarios">
                <SelectInput optionText="nome" label="Veterinário" fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const ConsultaEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="estado_consulta" label="Estado (ex: Marcada, Concluída)" fullWidth />
            <DateInput source="data_consulta" label="Data" />
            <TimeInput source="hora_consulta" label="Hora" />            
            <ReferenceInput source="id_animal" reference="animais">
                <SelectInput optionText="nome" label="Animal" fullWidth />
            </ReferenceInput>
            <ReferenceInput source="id_veterinario" reference="veterinarios">
                <SelectInput optionText="nome" label="Veterinário" fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);