using MediatR;
using Persistence;
using Domain;

namespace ActivityApp.Activities1.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Unit>
    {
        public Guid Id { get; set; }
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
            var activity = await _context.Activities.FindAsync(request.Id);

            if (activity == null)
                throw new Exception("Activity not found");

            _context.Activities.Remove(activity);

            var success = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!success)
                throw new Exception("Problem deleting activity");

            return Unit.Value;
        }
    }
}