"use client";
import { useParams } from "next/navigation";

function HomeID() {
  const { id } = useParams();
  return <div className="text-black">{id}</div>;
}

export default HomeID;
