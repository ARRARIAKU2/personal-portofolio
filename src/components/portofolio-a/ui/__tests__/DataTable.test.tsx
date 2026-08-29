import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/portofolio-a/ui/DataTable";

interface Row {
  name: string;
  company: string;
}

const rows: Row[] = [
  { name: "Ada Okonkwo", company: "Harbor & Finch" },
  { name: "Mateo Rivas", company: "Meridian Freight" },
];

const columns: ColumnDef<Row, unknown>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "company", header: "Company" },
];

describe("DataTable (leads-style table)", () => {
  it("renders every row", () => {
    render(<DataTable data={rows} columns={columns} />);
    expect(screen.getByText("Ada Okonkwo")).toBeInTheDocument();
    expect(screen.getByText("Mateo Rivas")).toBeInTheDocument();
  });

  it("filters rows by the global search box", async () => {
    const user = userEvent.setup();
    render(<DataTable data={rows} columns={columns} />);

    await user.type(screen.getByLabelText("Search table"), "Ada");

    const table = screen.getByRole("table");
    expect(within(table).getByText("Ada Okonkwo")).toBeInTheDocument();
    expect(within(table).queryByText("Mateo Rivas")).not.toBeInTheDocument();
  });

  it("shows the empty slot when no rows match", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={rows}
        columns={columns}
        empty={<p>No results here</p>}
      />
    );
    await user.type(screen.getByLabelText("Search table"), "zzzzz");
    expect(screen.getByText("No results here")).toBeInTheDocument();
  });
});
