using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;

namespace Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Activity> Activities { get; set; }
}