import { Admin, Resource } from "react-admin";
import lb4Provider from "react-admin-lb4";
import { ClienteList, ClienteCreate, ClienteEdit } from "./components/Clientes";
import { AnimalList, AnimalCreate, AnimalEdit } from "./components/Animais";
import { VeterinarioList, VeterinarioCreate, VeterinarioEdit } from "./components/Veterinarios";
import { AcaoList, AcaoCreate, AcaoEdit } from "./components/Acoes";
import { ConsultaList, ConsultaCreate, ConsultaEdit } from "./components/Consultas";
import { RegistoList, RegistoCreate, RegistoEdit } from "./components/Registos";

const dataProvider = lb4Provider("http://localhost:3000");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="clientes" list={ClienteList} create={ClienteCreate} edit={ClienteEdit} />
    <Resource name="animais" list={AnimalList} create={AnimalCreate} edit={AnimalEdit} />
    <Resource name="veterinarios" list={VeterinarioList} create={VeterinarioCreate} edit={VeterinarioEdit} />
    <Resource name="acoes-medicas" list={AcaoList} create={AcaoCreate} edit={AcaoEdit} />
    <Resource name="consultas" list={ConsultaList} create={ConsultaCreate} edit={ConsultaEdit} />
    <Resource name="registos-tratamentos" list={RegistoList} create={RegistoCreate} edit={RegistoEdit} />
  </Admin>
);

export default App;