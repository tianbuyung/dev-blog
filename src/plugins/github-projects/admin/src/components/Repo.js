import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  BaseCheckbox,
  Typography,
  VisuallyHidden,
  Loader,
  Alert,
} from "@strapi/design-system";
import { useFetchClient } from "@strapi/helper-plugin";

const COL_COUNT = 5;
const ROW_COUNT = 6;

const Repo = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const client = useFetchClient();
  console.log("Initialized client");

  useEffect(() => {
    setLoading(true);
    // fetch data
    client
      .get("/github-projects/repositories")
      .then((response) => setRepos(response.data))
      .catch((error) => setError(error));
    setLoading(false);
  }, []);

  if (error)
    return (
      <Alert
        closeLabel="Close"
        title="Error Fetching Repositories"
        variant="danger"
      >
        {error.toString()}
      </Alert>
    );

  if (loading) return <Loader />;

  // we do have some repos
  console.log(repos);

  return (
    <Box padding={8} background="neutral100">
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
        <Thead>
          <Tr>
            <Th>
              <BaseCheckbox aria-label="Select all entries" />
            </Th>
            <Th>
              <Typography variant="sigma">Name</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Description</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Url</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
      </Table>
    </Box>
  );
};

export default Repo;
