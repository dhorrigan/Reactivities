using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    // https://localhost:5001/api/activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    //public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
    {
        var activities = await Mediator.Send(new GetActivityList.Query());
        //var activities = await Mediator.Send(new GetActivityList.Query(), ct);
        return Ok(activities);
    }

    // https://localhost:5001/api/activities/098e331d-7149-458b-a972-47f5829170b7
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        var activity = await Mediator.Send(new GetActivityDetails.Query { Id = id });
        if (activity == null) return NotFound();

        return Ok(activity);
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        var id = await Mediator.Send(new CreateActivity.Command { Activity = activity });
        return Ok(id);
    }

    [HttpPut]
    public async Task<ActionResult<string>> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command { Activity = activity });
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        await Mediator.Send(new DeleteActivity.Command { Id = id });
        return Ok();
    }
}
