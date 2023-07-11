using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Exceptions
{
    public class ProjectNumberAlreadyExistsException : Exception
    {
        public ProjectNumberAlreadyExistsException() : base("The project number already exists. Please select a different project number.")
        {
        }

        public ProjectNumberAlreadyExistsException(string message)
        {
            message = "The project number already exists. Please select a different project number.";
        }
    }
}
