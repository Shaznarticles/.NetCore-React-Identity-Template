using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityTemplate.Identity.Models
{
    public class RedirectResponse
    {
        public string Pathname { get; set; }
    }

    public class RedirectStatusResponse
    {
        public string Pathname { get; set; }

        public RedirectStatusState State { get; set; }
    }

    public class RedirectStatusState
    {
        public StatusResponse Status { get; set; }
    }
}
