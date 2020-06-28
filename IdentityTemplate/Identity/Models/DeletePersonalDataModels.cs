using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityTemplate.Identity.Models
{
    public class DeletePersonalDataInput
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
