using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleBackend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ReactPeopleBackend.Web.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration )
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }

        [Route("addperson")]
        [HttpPost]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }

        [Route("deleteperson")]
        [HttpPost]
        public void DeletePerson(IdObj obj)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(obj.ID);
        }

        [Route("editperson")]
        [HttpPost]
        public void EditPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.EditPerson(person);
        }
    }

    public class IdObj
    {
        public int ID { get; set; }
    }
}
