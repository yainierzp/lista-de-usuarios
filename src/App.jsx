import { useId, useState } from "react";
import "./App.css";
import { ListaUsuarios } from "./Components/UsersList";
import { useUsers } from "./hooks/useUsers";
function App() {
  const [darColor, setDarColor] = useState(false);
  const labelCheckboxId = useId();
  const [isInput, setIsInput] = useState(false);
  const {
    resetUsers,
    users,
    handleSolicitud,
    delInput,
    solicitud,
    orderXcountry,
    deleteUser,
  } = useUsers();

  const coloreando = () => {
    setDarColor(!darColor);
  };

  return (
    <div className="App">
      <h1>Lista de Usuarios</h1>
      <header className="delheader">
        <button onClick={coloreando}>Colorear Filas</button>
        <button onClick={() => handleSolicitud("country")}>
          {solicitud ? "Restaurar-Orden" : "Ordenar por Paises"}
        </button>
        <button onClick={resetUsers}>Reset</button>
        <label style={{ color: "blueviolet" }}>Usuarios ({users.length})</label>
        <div className="laberinto">
          <label
            className="lindoLabel"
            onClick={() => setIsInput((prev) => !prev)}
            htmlFor={labelCheckboxId}
          >
            Filter x Country
          </label>
          {isInput && <input id={labelCheckboxId} onChange={delInput} />}
        </div>
      </header>

      <main>
        {/* <UsersList
          handleSolicitud={handleSolicitud}
          darColor={darColor}
          users={orderXcountry}
          deleteUser={deleteUser}
        /> */}
        <ListaUsuarios
          handleSolicitud={handleSolicitud}
          darColor={darColor}
          users={orderXcountry}
          deleteUser={deleteUser}
        />
      </main>
    </div>
  );
}

export default App;
