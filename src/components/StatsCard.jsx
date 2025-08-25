import { Card, CardContent, Typography } from "@mui/material";

function StatsCard({ title, value }) {
  return (
    <Card
      style={{
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" color="primary" style={{ marginTop: "10px" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
