using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace IdentityTemplate.Identity.Models
{
    public class StatusResponse
    {
        public string Status { get; set; }

        [JsonIgnore]
        public AlertType AlertType { get; set; } = AlertType.Success;

        public string AlertColor
        {
            get
            {
                switch (AlertType)
                {
                    case AlertType.Error:
                        return "danger";
                    default:
                        return AlertType.ToString().ToLower();
                }
            }
        }
    }

    public enum AlertType
    {
        Primary,
        Secondary,
        Success,
        Error,
        Danger,
        Warning,
        Info,
        Light,
        Dark
    }
}
