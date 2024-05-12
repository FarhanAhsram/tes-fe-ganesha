"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Input, Pagination, Table } from "@mantine/core";

interface Pokemon {
  name: string;
  url: string;
}

export default function Home() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const getData = (offset: number) => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
      )
      .then((response) => {
        // console.log(response.data.results);
        setData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getData((page - 1) * itemsPerPage);
  };

  useEffect(() => {
    getData(0);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  const rows = data.map((pokemon, index) => (
    <Table.Tr key={index} className="">
      <Table.Td>{startIndex + index}</Table.Td>
      <Table.Td>{pokemon.name}</Table.Td>
      <Table.Td>{pokemon.url}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-400">
        <div className="bg-white border rounded-md w-2/3 p-5 shadow-xl">
          <div className="flex justify-between mb-2">
            <h1 className="text-xl font-semibold">Data Pokemon</h1>
            <Input placeholder="Search" />
          </div>
          <Table>
            <Table.Thead className="bg-blue-400">
              <Table.Tr>
                <Table.Th>No.</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>URL</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          <div className="flex justify-end mt-4">
            <Pagination
              total={8}
              value={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
