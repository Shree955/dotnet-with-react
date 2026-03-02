import { Box , Paper} from "@mui/material";
import { MenuList, MenuItem, ListItemText, Typography, } from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import {Event} from "@mui/icons-material"
export default function ActivityFilters() {
  return (
    <Box sx={{display:'flex', flexDirection:'column', gap:3, borderRadius:3}}>
       <Paper sx={{p:3, borderRadius:3}}>
        <Box sx={{width:'100%'}}>
          <Typography variant="h6" sx={{display:'flex', alignments:'center',mb:1, color:'primary.main'}}>Filters</Typography>
          <MenuList>
            <MenuItem>
              <ListItemText primary='All events'/>
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm going"/>
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm hosting"/>
            </MenuItem>
          </MenuList>
        </Box>

       </Paper>
       <Box component={Paper} sx={{width:'100%', p:3, borderRadius:3}}>
        <Typography variant="h6" sx={{display:'flex', alignItems:'center', mb:1}}>
          <Event sx={{mr:1}}/>
          Select date
        </Typography>
        <Calendar/>
       </Box>
    </Box>
  )
}
