import { useState, useMemo } from "react";
import { Box, Button, Container, Flex, useToast } from "@chakra-ui/react";

import BaseTable from "./components/table/Table";
import BaseInput from "./components/forms/input";

import usePromise from "./api/usePromise";
import { filterFn } from "./util/methods";

import { PRIMARYCOLOR, SECONDARYCOLOR } from "../src/util/colors";

import type { IBooks, IField } from "./types";

function App() {
  const [searchKey, setSearchKey]: any = useState<string>("");
  const [filteredData, setFilteredData] = useState<IBooks[]>([]);

  // hook for loading data
  const [data, error, isLoading] = usePromise();

  const toast = useToast();
  const TableFields: IField[] = [
    {
      label: "Name",
      key: "name",
      className: "",
    },
    {
      label: "Publisher",
      key: "publisher",
    },
    {
      label: "ISBN",
      key: "isbn",
    },
    {
      label: "Authors",
      key: "authors",
    },
    {
      label: "End Date",
      key: "released",
    },
  ];

  useMemo(() => {
    const filtered: IBooks[] = data.filter((items) =>
      filterFn(items, searchKey.trim())
    );
    setFilteredData(filtered);
  }, [searchKey, data]);

  if (error)
    toast({
      title: "Loading failed",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  return (
    <Container
      minWidth="7xl"
      borderWidth={"thin"}
      paddingBlock={"8"}
      rounded={"md"}
      marginTop={"10"}
    >
      <Flex align={"center"} justify={"end"} marginBottom={"5"}>
        <BaseInput
          type="search"
          name="search"
          width="3xl"
          bgColor={SECONDARYCOLOR}
          placeholder="Search by Name, Authors, Characters Name, Date Released, Publisher, Isbn and culture"
          value={searchKey}
          size="md"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Box>
          <Button
            loadingText="Fetching books"
            bg={PRIMARYCOLOR}
            color={"white"}
            id="activity-button"
            isLoading={isLoading}
          >
            Total Books ({filteredData.length})
          </Button>
        </Box>
      </Flex>

      <Box marginTop={"5"}>
        <BaseTable
          fields={TableFields}
          rows={filteredData}
          TableLoading={!isLoading}
          colorScheme="blackAlpha"
        />
      </Box>
    </Container>
  );
}

export default App;
