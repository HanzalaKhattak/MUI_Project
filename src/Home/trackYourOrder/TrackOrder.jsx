import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const TrackOrder = () => {
  const totalStages = 5;
  const currentStage = 3; // Example: stage 3 is active

  return (
    <Box
      sx={{
        bgcolor: '#eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 10,
        height: 120,
      }}
    >
      {/* Order Info */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Track Your Order
        </Typography>
        <Typography variant="body1" sx={{ textDecoration: 'underline' }}>
          Order no: 1234567
        </Typography>
        <Typography variant="body2">
          Your order is at Stage {currentStage}
        </Typography>
      </Box>

      {/* Stage Buttons with Lines */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {[...Array(totalStages)].map((_, index) => {
          const stageNumber = index + 1;
          const isActive = stageNumber === currentStage;

          return (
            <React.Fragment key={stageNumber}>
              <Button
                disableRipple
                disableElevation
                sx={{
                  textTransform: 'none',
                  bgcolor: isActive ? 'black' : 'grey.500',
                  color: 'white',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: isActive ? 'black' : 'grey.500',
                  },
                  cursor: 'default', // remove clickable effect
                }}
              >
                Stage No {stageNumber}
              </Button>

              {/* Add line except after last button */}
              {stageNumber < totalStages && (
                <Box
                  sx={{
                    width: 40,
                    height: 2,
                    bgcolor: stageNumber < currentStage ? 'black' : 'grey.400',
                    mx: 1,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default TrackOrder;