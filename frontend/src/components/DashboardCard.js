import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import './DashboardCard.css'
function DashboardCard(props) {
  return (
    <Grid container  spacing={2}>
      <Grid item xs={12} md={6}>
        <Card  className='card' onClick={()=>props.handleClickedCard('bookings')}>
          <CardContent>
            <Typography variant="h6" component="div">
              Today's Bookings
            </Typography>
            <Typography variant="h4" component="div">
              {props.noOfBookings}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className='card' onClick={()=>props.handleClickedCard('seats')}>
          <CardContent>
            <Typography variant="h6" component="div">
              Total Available Seats Today
            </Typography>
            <Typography variant="h4" component="div">
              {props.noOfEmptySeats}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DashboardCard