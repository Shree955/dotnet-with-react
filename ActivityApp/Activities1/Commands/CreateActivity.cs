using System;
using System.Net;
using MediatR;
using Persistence;
using Domain;

namespace ActivityApp.Activities1.Commands;
public class CreateActivity
{
    public class Command : IRequest<Unit>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command, Unit>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            request.Activity.Id = Guid.NewGuid();  // ✅ Correct

            _context.Activities.Add(request.Activity);

            var success = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!success)
                throw new Exception("Problem saving activity");

            return Unit.Value;
        }
    }
}