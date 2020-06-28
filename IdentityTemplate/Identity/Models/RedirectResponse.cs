using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityTemplate.Identity.Models
{
    public class RedirectResponse
    {
        public string Pathname { get; set; }

        public IRedirectState State { get; set; }
    }

    public interface IRedirectState { }    
}
