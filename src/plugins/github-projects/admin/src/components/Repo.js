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
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [alert, setAlert] = useState(undefined);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(undefined);
    }, 5000);
  };

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
      .catch((error) =>
        showAlert({
          title: "Error fetching repositories",
          message: error.toString(),
          variant: "danger",
        })
      );
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  // we do have some repos
  console.log(repos);

  const allChecked = selectedRepos.length === repos.length;
  const isIndeterminate = selectedRepos.length > 0 && !allChecked; // some repos selected, but not all

  const createProject = async (repo) => {
    const response = await client.post("/github-projects/project", repo);
    console.log(response);
    if (response?.data) {
      setRepos(
        repos.map((item) =>
          item.id !== repo.id
            ? item
            : {
                ...item,
                projectId: response.data.id,
              }
        )
      );

      showAlert({
        title: "Project created",
        message: `Successfully created project ${response.data.title}`,
        variant: "success",
      });
    } else {
      showAlert({
        title: "An error occured",
        message: error.toString(),
        variant: "danger",
      });
    }
  };

  return (
    <Box padding={8} background="neutral100">
      {alert && (
        <Alert
          closeLabel="Close"
          title={alert.title}
          variant={alert.variant}
          onClose={() => {
            setAlert(undefined);
          }}
          style={{ position: "absolute", top: 0, left: "14%", zIndex: 10 }}
        >
          {alert.message}
        </Alert>
      )}
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
        <Thead>
          <Tr>
            <Th>
              <BaseCheckbox
                aria-label="Select all entries"
                value={allChecked}
                indeterminate={isIndeterminate}
                onValueChange={(value) =>
                  value
                    ? setSelectedRepos(repos.map((repo) => repo.id))
                    : setSelectedRepos([])
                }
              />
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
                  <BaseCheckbox
                    aria-label={`Select ${id}`}
                    value={selectedRepos && selectedRepos.includes(id)}
                    onValueChange={(value) => {
                      const newSelectedRepos = value
                        ? [...selectedRepos, id]
                        : selectedRepos.filter((item) => item !== id);
                      setSelectedRepos(newSelectedRepos);
                    }}
                  />
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
                      <Link
                        to={`/content-manager/collectionType/plugin::github-projects.project/${projectId}`}
                      >
                        <IconButton
                          onClick={() => console.log("edit")}
                          label="Edit"
                          noBorder
                          icon={<Pencil />}
                        />
                      </Link>
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
                      onClick={() => createProject(repo)}
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
