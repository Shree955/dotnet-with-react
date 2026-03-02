import {Grid, Typography} from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "./useActivities";
import ActivityDetailsHeader from "../../features/Activity/details/ActivityDetailsHeader";
import ActivityDetailsInfo from "../../features/Activity/details/ActivityDetailsInfo";
import ActivityDetailsChat from "../../features/Activity/details/ActivityDetailsChat";
import ActivityDetailsSidebar from "../../features/Activity/details/ActivityDetailsSidebar";


export default function ActivityDetailPage(){
  const {id} = useParams();
  const {activity, isLoadingActivity} = useActivities(id);
  
 
  if(isLoadingActivity) return <Typography variant="h5">Loading...</Typography>
  if(!activity) return <Typography >Activity not found</Typography>
  
  return(
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityDetailsHeader activity={activity}/>
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat/>
      </Grid>
      <Grid size={4}>
        <ActivityDetailsSidebar/>
      </Grid>
    </Grid>
  )
}

