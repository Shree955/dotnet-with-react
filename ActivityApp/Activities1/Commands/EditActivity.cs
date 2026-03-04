using Persistence;
using MediatR;
using Domain;
using System.Net;
using Application.Activities.DTOs;

namespace ActivityApp.Activities1.Commands;

public class EditActivity
{
    public class Command : IRequest<Unit>   // ✅ MUST be generic
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context) 
        : IRequestHandler<Command, Unit>    // ✅ MUST match
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(
                new object[] { request.ActivityDto.Id },
                cancellationToken
            );

            if (activity == null)
            {
                throw new Exception("Activity not found");
            }

            activity.Title = request.ActivityDto.Title;
            activity.Description = request.ActivityDto.Description;
            activity.Category = request.ActivityDto.Category;
            activity.Date = request.ActivityDto.Date;
            activity.City = request.ActivityDto.City;
            activity.Venue = request.ActivityDto.Venue;

            var success = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!success)
                throw new Exception("Problem saving changes");

            return Unit.Value;   // ✅ required
        }
    }
}