import {Card , CardContent, CardMedia, CardActions,Typography, Button} from "@mui/material";
import { useActivities } from "../../../lib/types/hooks/useActivities";

type Props ={
  selectedActivity: Activity
  cancelSelectActivity: () => void;
  openForm: (id?: string) => void;
}

export default function ActivityDetail({selectedActivity, cancelSelectActivity, openForm}: Props){
  const {activities} = useActivities();
  const activity = activities?.find(x => x.id === selectedActivity.id);

  if(!activity) return <Typography variant="h5" color='error'>Activity not found</Typography>
  


  return(
    <Card sx={{borderRadius: 3}}>
      <CardMedia 
         component='img'
         src={`/images/categoryImages/${selectedActivity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{selectedActivity.title}</Typography>
        <Typography variant="subtitle1" fontWeight='light'>{selectedActivity.date}</Typography>
        <Typography variant="body1">{selectedActivity.description}</Typography>
      </CardContent>
      <CardActions>
         <Button onClick={() => openForm(selectedActivity.id)} color="primary">Edit</Button>
         <Button onClick={cancelSelectActivity} color="inherit">Cancel</Button>
      </CardActions>
    </Card>
  )
}