import { useEffect, useRef, useState, useMemo } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const originalUsers = useRef([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    //Cuando el componente se monta, useEffect hace un
    //  fetch, convierte la respuesta a JSON y guarda los datos
    // en el estado.
    /*01:16:59 */

    try {
      fetch("https://randomuser.me/api/?results=100")
        .then(async (res) => await res.json())
        .then((res) => {
          setUsers(res.results);
          originalUsers.current = res.results;
        });
    } catch (Error) {
      throw new Error("Erron en la solicitud");
    }
  }, []);

  const resetUsers = () => {
    setUsers(originalUsers.current);
  };
  const deleteUser = (email) => {
    const borrado = users.filter((user) => user.email !== email);
    setUsers(borrado);
  };

  const [solicitud, setSolicitud] = useState(
    "country" | "name" | "lastName" | "" /*01:21:01*/
  );
  const handleSolicitud = (newSolicitud) => {
    if (solicitud === newSolicitud) return setSolicitud("");
    setSolicitud(newSolicitud);
  }; /*01:24:22 */

  const filterxCountry = useMemo(() => {
    console.log("Muestrame");

    return search /*filterCountry */
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      : users;
  }, [users, search]);

  const orderXcountry = useMemo(() => {
    if (!solicitud) return filterxCountry;

    const list = [...filterxCountry];

    switch (solicitud) {
      case "country":
        return list.sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        );
      case "name":
        return list.sort((a, b) => a.name.first.localeCompare(b.name.first));
      case "lastName":
        return list.sort((a, b) => a.name.last.localeCompare(b.name.last));
      default:
        return filterxCountry;
    }
  }, [filterxCountry, solicitud]);
  const delInput = (e) => {
    setSearch(e.target.value);
  };

  return {
    users,
    resetUsers,
    orderXcountry,
    handleSolicitud,
    delInput,
    solicitud,
    deleteUser,
  };
}
