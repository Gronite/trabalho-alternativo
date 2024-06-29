using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TarefasController : ControllerBase
  {
    private readonly TarefaService _tarefaService;

    public TarefasController(TarefaService tarefaService)
    {
      _tarefaService = tarefaService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Tarefa>> Get()
    {
      return Ok(_tarefaService.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<Tarefa> Get(int id)
    {
      var tarefa = _tarefaService.GetById(id);
      if (tarefa == null)
      {
        return NotFound();
      }
      return Ok(tarefa);
    }

    [HttpPost]
    public ActionResult Post([FromBody] Tarefa tarefa)
    {
      _tarefaService.Add(tarefa);
      return CreatedAtAction(nameof(Get), new { id = tarefa.Id }, tarefa);
    }

    [HttpPut("{id}")]
    public ActionResult Put(int id, [FromBody] Tarefa tarefa)
    {
      if (id != tarefa.Id)
      {
        return BadRequest();
      }

      _tarefaService.Update(tarefa);
      return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
      _tarefaService.Delete(id);
      return NoContent();
    }
  }
}
