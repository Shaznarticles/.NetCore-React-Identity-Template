using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityTemplate.Identity.Models
{
    public class ConfirmEmailResponseState: IRedirectState
    {
        public string Status { get; set; }

    }
}
