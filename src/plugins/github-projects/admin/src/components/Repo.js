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
  Link,
  Flex,
  IconButton,
} from "@strapi/design-system";
import { useFetchClient } from "@strapi/helper-plugin";
import { Pencil, Plus, Trash } from "@strapi/icons";

const Repo = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const COL_COUNT = 5;
  const ROW_COUNT = repos.length;

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
        <Tbody>
          {repos.map((repo) => {
            const { id, name, shortDescription, url, projectId } = repo;
            return (
              <Tr key={id}>
                <Td>
                  <BaseCheckbox aria-label={`Select ${id}`} />
                </Td>
                <Td>
                  <Typography textColor="neutral800">{name}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {shortDescription}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    <Link href={url} isExternal>
                      {url}
                    </Link>
                  </Typography>
                </Td>
                <Td>
                  {projectId ? (
                    <Flex>
                      <IconButton
                        onClick={() => console.log("edit")}
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                      />
                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => console.log("delete")}
                          label="Delete"
                          noBorder
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  ) : (
                    <IconButton
                      onClick={() => console.log("add")}
                      label="Add"
                      noBorder
                      icon={<Plus />}
                    />
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Repo;
