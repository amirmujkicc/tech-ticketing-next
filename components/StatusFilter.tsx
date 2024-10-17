"use client";

import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "Open / Started" },
  { label: "Open", value: "OPEN" },
  { label: "Started", value: "STARTED" },
  { label: "Closed", value: "CLOSED" },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <label htmlFor="status-filter">Filter by status</label>
      <select
        id="status-filter"
        defaultValue={searchParams.get("status") || ""}
        onChange={(e) => {
          const params = new URLSearchParams();
          const status = e.target.value;

          if (status) params.append("status", status);

          const query = params.size ? `?${params.toString()}` : "0";
          router.push(`/tickets${query}`);
        }}
      >
        {statuses.map((status, i) => (
          <option key={i} value={status.value || "0"}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;
