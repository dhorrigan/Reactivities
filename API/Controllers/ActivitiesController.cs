using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{
    // https://localhost:5001/api/activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        var activities = await context.Activities.ToListAsync();
        return Ok(activities);
    }

    // https://localhost:5001/api/activities/098e331d-7149-458b-a972-47f5829170b7
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        var activity = await context.Activities.FindAsync(id);
        if (activity == null) return NotFound();

        return Ok(activity);
    }

}
