using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityTemplate.Identity.Models
{
    public class ResendEmailConfirmationInput
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
