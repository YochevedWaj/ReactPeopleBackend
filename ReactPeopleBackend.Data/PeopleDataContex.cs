namespace ReactPeopleBackend.Data
{
    internal class PeopleDataContex
    {
        private string connectionString;

        public PeopleDataContex(string connectionString)
        {
            this.connectionString = connectionString;
        }
    }
}