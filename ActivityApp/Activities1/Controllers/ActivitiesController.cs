using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using Application.Activities.DTOs;
using MediatR;
using ActivityApp.Activities1.Commands;
using Application.Activities1.Queries;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMediator _mediator;

    public ActivitiesController(AppDbContext context, IMediator mediator)
    {
        _context = context;
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await _context.Activities.ToListAsync();
    }
     // GET BY ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {   
      var result = await _mediator.Send(
        new GetActivityDetails.Query { Id = id });

    if (result.IsSuccess && result.Value != null)
        return Ok(result.Value);

    return NotFound(result.Error);

    }


[HttpPut("{id}")]
public async Task<ActionResult> EditActivity(Guid id, EditActivityDto activity)
{
    activity.Id = id.ToString();

    await _mediator.Send(new EditActivity.Command
    {
        ActivityDto = activity
    });

    return NoContent();
}
   

    [HttpPost]
public async Task<IActionResult> CreateActivity(CreateActivityDto activityDto)
{
    await _mediator.Send(new CreateActivity.Command
    {
        ActivityDto = activityDto
    });

    return Ok();
}
}