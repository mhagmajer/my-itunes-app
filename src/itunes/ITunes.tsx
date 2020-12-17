import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Stack,
  Input,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ebook } from './itunesSaga';
import { searchEbooks, selectEbooks, searchEbooksTyping } from './itunesSlice';

function EbookRow({ ebook }: { ebook: Ebook }) {
  return (
    <Tr key={ebook.trackId}>
      <Td>
        <img alt="artwork" src={ebook.artworkUrl60} />
      </Td>
      <Td>{ebook.trackName}</Td>
      <Td isNumeric>{ebook.formattedPrice}</Td>
    </Tr>
  );
}

export function ITunes() {
  const dispatch = useDispatch();
  const ebooks = useSelector(selectEbooks);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Box>
      <Stack direction="row">
        <Input
          onChange={(event) => {
            setSearchTerm(event.target.value);

            dispatch(searchEbooksTyping({ searchTerm: event.target.value }));
          }}
          value={searchTerm}
        />
        <Button
          colorScheme="blue"
          onClick={() => dispatch(searchEbooks({ searchTerm }))}
        >
          Search
        </Button>
      </Stack>
      <Table variant="simple">
        <TableCaption>iTunes e-books</TableCaption>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Track</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ebooks.map((ebook) => (
            <EbookRow ebook={ebook} key={ebook.trackId} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
