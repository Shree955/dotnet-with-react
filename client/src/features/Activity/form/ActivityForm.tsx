import { Box, Button, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { activitySchema, type ActivitySchema } from '../../../lib/types/schema/activitySchema';
import TextInput from '../../../app/shared/components/TextInput';
import SelectInput from '../../../app/shared/components/SelectInput';
import DateTimeInput from '../../../app/shared/components/DateTimeInput';
import { categoryOptions } from './categoryOptions';
import { useActivities } from '../../../lib/types/useActivities';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapActivityToForm(activity: any): ActivitySchema {
  return {
    title: activity.title ?? '',
    description: activity.description ?? '',
    category: activity.category ?? '',
    date: activity.date ? new Date(activity.date) : new Date(),
    city: activity.city ?? '',
    venue: activity.venue ?? ''
  };
}

export default function ActivityForm() {
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: 'onTouched',
    resolver: zodResolver(activitySchema),
    defaultValues: {
        title: '',
        description: '',
        category: '',
        date: new Date(),
        city: '',
        venue: ''
    }
  });

  useEffect(() => {
    if (activity) {
      reset(mapActivityToForm(activity));
    }
  }, [activity, reset]);

  const onSubmit: SubmitHandler<ActivitySchema> = (data) => {
  // Create the submission object that matches the 'Activity' type exactly
  const activityToSubmit = {
    ...activity,    // Includes id, latitude, longitude, isCancelled
    ...data,        // Overwrites title, description, category, etc.
    date: data.date.toISOString(), // Fix: Convert Date object to string
  };

  if (id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateActivity.mutate(activityToSubmit as any);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createActivity.mutate(activityToSubmit as any);
  }
};

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? 'Edit Activity' : 'Create Activity'}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
       
        <TextInput name="title" control={control} label="Title" />
        <TextInput name="description" control={control} label="Description" multiline rows={3} />
        <SelectInput name="category" control={control} label="Category" items={categoryOptions} />
        <DateTimeInput name="date" control={control} label="Date" />
        <TextInput name="city" control={control} label="City" />
        <TextInput name="venue" control={control} label="Venue" />

        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit">Cancel</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}