import {Card , CardContent, CardMedia, CardActions,Typography, Button} from "@mui/material";
import {Link} from "react-router";
import {useNavigate} from "react-router";
import { useParams } from "react-router";
import { useActivities } from "../../lib/types/useActivities";

export default function ActivityDetail(){
  const {id} = useParams();
  const {activity, isLoadingActivity} = useActivities(id);
  const navigate = useNavigate();
 
  if(isLoadingActivity) return <Typography variant="h5">Loading...</Typography>
  if(!activity) return <Typography >Activity not found</Typography>
  
  return(
    <Card sx={{borderRadius: 3}}>
      <CardMedia 
         component='img'
         src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
         <Button component={Link} to={`/manage/${activity.id}`} color="primary">Edit</Button>
         <Button onClick={()=> navigate('/activities')} color="inherit">Cancel</Button>
      </CardActions>
    </Card>
  )
}