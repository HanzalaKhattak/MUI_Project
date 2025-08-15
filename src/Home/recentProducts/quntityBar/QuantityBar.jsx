import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

export default function QuantityBar({ available, total }) {
  const percentage = (available / total) * 100;

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 5,
          mt: 0.5,
        }}
      />
      <Typography variant="body2" color="text.secondary">
        Available only: {available}Kg
      </Typography>
    </Box>
  );
}
