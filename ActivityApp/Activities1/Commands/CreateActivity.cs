using MediatR;
using Persistence;
using Domain;
using Application.Activities.DTOs;
using AutoMapper;
using FluentValidation;

namespace ActivityApp.Activities1.Commands;

public class CreateActivity
{
    public class Command : IRequest<Unit>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) 
        : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities.Add(activity);

            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;   
        }
    }
}