import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";

export default function InputFields(props: InputProps) {
  return (
    <InputGroup>
      {" "}
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.300" />}
      />
      <Input {...props} />
    </InputGroup>
  );
}
