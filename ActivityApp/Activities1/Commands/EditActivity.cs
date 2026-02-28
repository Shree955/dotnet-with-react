using Persistence;
using MediatR;
using Domain;
using System.Net;

namespace ActivityApp.Activities1.Commands;

public class EditActivity
{
    public class Command : IRequest<Unit>   // ✅ MUST be generic
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context) 
        : IRequestHandler<Command, Unit>    // ✅ MUST match
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(
                new object[] { request.Activity.Id },
                cancellationToken
            );

            if (activity == null)
            {
                throw new Exception("Activity not found");
            }

            activity.Title = request.Activity.Title;
            activity.Description = request.Activity.Description;
            activity.Category = request.Activity.Category;
            activity.Date = request.Activity.Date;
            activity.City = request.Activity.City;
            activity.Venue = request.Activity.Venue;

            var success = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!success)
                throw new Exception("Problem saving changes");

            return Unit.Value;   // ✅ required
        }
    }
}