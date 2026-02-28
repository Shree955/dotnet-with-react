import { useEffect, useState } from 'react'
import { CssBaseline, Container, Box } from '@mui/material'
import './App.css'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/Activity/Dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(()=>{
    fetch('http://localhost:5281/api/activities')
      .then(response => response.json())
      .then(data => {console.log(data);setActivities(data);})
  }, []);

 const handleSelectActivity = (id: string) => {
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

 const handleDelete = (id: string) => {
  setActivities(activities.filter(activity => activity.id !== id));
}

 const handleSubmitForm = (activity: Activity) => {
  if(activity.id){
    setActivities(activities.map(x=> x.id === activity.id ? activity : x));
  }else{
    const newActivity ={...activity, id: activities.length.toString()}
    setSelectedActivity(newActivity);
    setActivities([...activities, newActivity]);
  }
  setEditMode(false);
}

  return (
    <>
      <Box sx={{bgcolor:'#eeeeee'}}>
      <CssBaseline />
      <NavBar openForm={handleFormOpen} />
      <Container maxWidth='xl' sx={{mt:3}}>
         <ActivityDashboard 
         activities={activities} 
         selectActivity={handleSelectActivity}
         cancelSelectActivity={handleCancelSelectActivity}
         selectedActivity={selectedActivity}
         editMode={editMode}
         openForm={handleFormOpen}
         closeForm={handleFormClose}
         submitForm={handleSubmitForm}
         deleteActivity={handleDelete}
         
         />
      </Container>
      </Box>
    </>
  )
}

export default App
