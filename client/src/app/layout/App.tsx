import {  useState } from 'react'
import { CssBaseline, Container, Box, Typography } from '@mui/material'
import './App.css'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/Activity/Dashboard/ActivityDashboard';
import { useActivities } from '../../lib/types/hooks/useActivities';



function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending} = useActivities();
 

 const handleSelectActivity = (id: string) => {
  if (!activities) return;
  setSelectedActivity(activities.find(x => x.id === id));
 }

 const handleCancelSelectActivity = () => {
  setSelectedActivity(undefined);
 }

 const handleFormOpen = (id?: string) => {
  if (id) handleSelectActivity(id);
  else handleCancelSelectActivity();
  setEditMode(true);
 }

 const handleFormClose = () => {
  setEditMode(false);
 }

 

 const handleSubmitForm = (activity: Activity) => {
  // if(activity.id){
  //   setActivities(activities.map(x=> x.id === activity.id ? activity : x));
  // }else{
  //   const newActivity ={...activity, id: activities.length.toString()}
  //   setSelectedActivity(newActivity);
  //   setActivities([...activities, newActivity]);
  // }
  console.log(activity);
  setEditMode(false);
}

  return (
    <>
      <Box sx={{bgcolor:'#eeeeee', minHeight:'100vh'}}>
      <CssBaseline />
      <NavBar openForm={handleFormOpen} />
      <Container maxWidth='xl' sx={{mt:3}}>
        {!activities || isPending? (
          <Typography>Loading...</Typography>
        ):(
          <ActivityDashboard 
         activities={activities} 
         selectActivity={handleSelectActivity}
         cancelSelectActivity={handleCancelSelectActivity}
         selectedActivity={selectedActivity}
         editMode={editMode}
         openForm={handleFormOpen}
         closeForm={handleFormClose}
         submitForm={handleSubmitForm}
         
         
         />
        )}
         
      </Container>
      </Box>
    </>
  )
}

export default App
