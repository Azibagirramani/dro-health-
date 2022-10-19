import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableProps,
  Skeleton,
  Flex,
  Badge,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  PopoverBody,
  PopoverHeader,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import { SmallAddIcon, CheckIcon } from "@chakra-ui/icons";

import { SECONDARYCOLOR, PRIMARYCOLOR, DARKTEXT } from "../../util/colors";
import type { IBooks, IField, ITable } from "../../types";

const TableComponent = ({
  fields,
  rows,
  TableLoading = false,
}: ITable & TableProps) => {
  return (
    <Skeleton fadeDuration={4} isLoaded={TableLoading}>
      <TableContainer>
        <Table size="lg">
          <Thead bg={SECONDARYCOLOR}>
            <Tr>
              {fields.map((fields: IField, index: number) => {
                return (
                  <Th color={DARKTEXT} key={index}>
                    {fields.label}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((tableContent: IBooks, index) => {
              return (
                <Tr key={index}>
                  <Td color={DARKTEXT}>
                    <Flex direction={"column"}>
                      <span>{tableContent.name}</span>
                      <span className="text-sm">
                        Number of pages:{" "}
                        <Badge
                          ml="1"
                          fontSize="0.7rem"
                          color={"white"}
                          bg={PRIMARYCOLOR}
                        >
                          {tableContent.numberOfPages}
                        </Badge>
                      </span>
                    </Flex>
                  </Td>
                  <Td color={DARKTEXT}>
                    <Flex direction={"column"}>
                      <span>{tableContent.publisher}</span>
                      <span className="text-sm">
                        Country:{" "}
                        <span className="text-primary">
                          <Badge ml="1" fontSize="0.7rem" bg={"#F4F2FF"}>
                            {tableContent.country}
                          </Badge>
                        </span>
                      </span>
                    </Flex>
                  </Td>
                  <Td color={DARKTEXT}>{tableContent.isbn}</Td>
                  <Td color={DARKTEXT}>
                    <Popover>
                      <PopoverTrigger>
                        <Button>
                          {" "}
                          {tableContent.authors[0]} <SmallAddIcon ml={"2"} />
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverHeader>Authors and Characters</PopoverHeader>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <h5 className="fw-bold">Authors</h5>
                            <List spacing={3}>
                              {tableContent.authors.map(
                                (name: string, index: number) => (
                                  <ListItem key={index}>
                                    <CheckIcon mr={"2"} color={"green"} />
                                    {name}
                                  </ListItem>
                                )
                              )}
                            </List>
                            <Divider />
                            <h5 className="mt-2 link fw-bold">Characters</h5>
                            <List spacing={3}>
                              {tableContent.characters.map(
                                (name: string, index: number) => (
                                  <ListItem key={index}>
                                    {" "}
                                    {name && (
                                      <CheckIcon mr={"2"} color={"green"} />
                                    )}
                                    {name}
                                  </ListItem>
                                )
                              )}
                            </List>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </Td>
                  <Td color={DARKTEXT}>{tableContent.released}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Skeleton>
  );
};

export default TableComponent;
