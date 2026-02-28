using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence;

public class Seed
{
    public static async Task SeedData(AppDbContext context)
    {
        if (await context.Activities.AnyAsync()) return;

        var activities = new List<Activity>
        {
            new Activity
            {
                Id = Guid.NewGuid(),
                Title = "Past Activity 1",
                Date = DateTime.Now.AddMonths(-2),
                Category = "Drinks",
                Description = "Activity 2 months ago",
                City = "London",
                Venue = "Pub"
            },
            new Activity
            {
                Id = Guid.NewGuid(),
                Title = "Future Activity 1",
                Date = DateTime.Now.AddMonths(1),
                Category = "Culture",
                Description = "Future activity",
                City = "Paris",
                Venue = "Louvre"
            }
        };

        await context.Activities.AddRangeAsync(activities);
        await context.SaveChangesAsync();
    }
}