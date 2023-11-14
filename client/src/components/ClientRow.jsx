import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const ClientRow = ({ client }) => {
  // useMutation hook, return deleteClient function where will be called on delete button clicked
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    // Take in id of the client that passed in as props
    variables: { id: client.id },
    // Update the cache for optimized performance
    // Prevents frequent data refetching operation
    update(cache, { data: { deleteClient } }) {
      // cache of clients get from gql query
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      // update the cache by filter out the deleted client from the list of clients in cache
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
