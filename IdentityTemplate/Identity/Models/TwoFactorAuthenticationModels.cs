using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityTemplate.Identity.Models
{
    public class TwoFACodeVerificationInput
    {
        [Required]
        [StringLength(7, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Text)]
        [Display(Name = "Verification Code")]
        public string Code { get; set; }
    }

    public class TwoFASharedKeyQRCodeResponse
    {
        public string SharedKey { get; set; }
        public string AuthenticatorUri { get; set; }
    }

    public class Verify2FACodeResponse
    {
        public string Pathname { get; set; }

        public Verify2FACodeRedirectState State { get; set; }
    }

    public class Verify2FACodeRedirectState
    {
        public StatusResponse Status { get; set; }

        public string[] RecoveryCodes { get; set; }
    }
        
}
