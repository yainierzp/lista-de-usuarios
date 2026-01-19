function UsersList({ darColor, users, deleteUser, handleSolicitud }) {
  return (
    <>
      <table width="100%">
        <thead>
          <tr>
            <th>Foto</th>

            <th onClick={() => handleSolicitud("name")}>Nombre</th>

            <th onClick={() => handleSolicitud("lastName")}>Apellido</th>

            <th onClick={() => handleSolicitud("country")}>País</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const backgrounColor = index % 2 === 0 ? "#333" : "#555";
            const color = darColor ? backgrounColor : "";
            return (
              <tr key={user.email} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(user.email);
                    }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
function NoResult() {
  return (
    <p style={{ color: "red", fontSize: "36px" }}>
      No se encontraron resultado
    </p>
  );
}
export function ListaUsuarios({
  darColor,
  users,
  deleteUser,
  handleSolicitud,
}) {
  const hasUsers = users.length > 0;
  return hasUsers ? (
    <UsersList
      users={users}
      darColor={darColor}
      deleteUser={deleteUser}
      handleSolicitud={handleSolicitud}
    />
  ) : (
    <NoResult />
  );
}
