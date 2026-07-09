import React from "react";
import Card from "../common/Card";
import LED from "../common/LED";

export default function StatusPanel() {
  return (
    <Card title="SYSTEM STATUS">
      <LED active={true} />

      <Card title="HYDRA CORE">
        ONLINE
      </Card>
    </Card>
  );
}