using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace ReactPeopleBackend.Data
{
    public class PeopleRepository
    {
        private string _connectionString;
        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void DeletePerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE ID = {id}");
        }

        public void DeleteMany(List<int> ids)
        {
            using var context = new PeopleDataContext(_connectionString);
            foreach(var id in ids)
            {
                context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE ID = {id}"); 
            }
            
        }
        public void EditPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE People SET FirstName = {person.FirstName}, LastName = {person.LastName}, Age = {person.Age} WHERE ID = {person.ID}");
        }
    }
}
