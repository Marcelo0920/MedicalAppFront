import React from "react";
import RevisionCard from "./RevisionCard";

const RevisionCardList = ({ diagnosticos }) => {
  const revisions = [
    {
      type: "Radiografía Torax",
      date: "07-08-2024",
      doctor: "Jose Kennedy",
      codigo: "09898989898",
      hospital: "Jose Kennedy Hospital",
    },
    {
      type: "Radiografía Torax",
      date: "07-08-2024",
      doctor: "Jose Kennedy",
      codigo: "09898989898",
      hospital: "Jose Kennedy Hospital",
    },
    {
      type: "Radiografía Torax",
      date: "07-08-2024",
      doctor: "Jose Kennedy",
      codigo: "09898989898",
      hospital: "Jose Kennedy Hospital",
    },
    {
      type: "Radiografía Torax",
      date: "07-08-2024",
      doctor: "Jose Kennedy",
      codigo: "09898989898",
      hospital: "Jose Kennedy Hospital",
    },
    {
      type: "Radiografía Torax",
      date: "07-08-2024",
      doctor: "Jose Kennedy",
      codigo: "09898989898",
      hospital: "Jose Kennedy Hospital",
    },
  ];

  console.log(diagnosticos);

  return (
    <div className="revisions-grid">
      {diagnosticos.map((revision, index) => (
        <RevisionCard revision={revision} key={index} cod={index} />
      ))}
    </div>
  );
};

export default RevisionCardList;
