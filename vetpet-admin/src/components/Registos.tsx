import { DataTable, List, Create, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';

export const RegistoList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="notas_clinicas" />
            <DataTable.NumberCol source="id_consulta" />
            <DataTable.NumberCol source="id_animal" />
            <DataTable.NumberCol source="id_acao" />
        </DataTable>
    </List>
);

export const RegistoCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="notas_clinicas" multiline fullWidth />
            <ReferenceInput source="id_consulta" reference="consultas">
                <SelectInput optionText="data_consulta" label="Data da Consulta" fullWidth />
            </ReferenceInput>
            <ReferenceInput source="id_animal" reference="animais">
                <SelectInput optionText="nome" label="Animal" fullWidth />
            </ReferenceInput>
            <ReferenceInput source="id_acao" reference="acoes-medicas">
                <SelectInput optionText="descricao" label="Ação Médica" fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const RegistoEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="notas_clinicas" multiline fullWidth />

            <ReferenceInput source="id_consulta" reference="consultas">
                <SelectInput optionText="data_consulta" label="Data da Consulta" fullWidth />
            </ReferenceInput>

            <ReferenceInput source="id_animal" reference="animais">
                <SelectInput optionText="nome" label="Animal" fullWidth />
            </ReferenceInput>

            <ReferenceInput source="id_acao" reference="acoes-medicas">
                <SelectInput optionText="descricao" label="Ação Médica" fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);