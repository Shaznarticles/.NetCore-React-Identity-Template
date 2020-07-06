using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Threading.Tasks;
using IdentityTemplate.Areas.Identity.Data;
using IdentityTemplate.Identity.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IdentityTemplate.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<AccountController> _logger;
        private readonly IEmailSender _emailSender;
        private readonly UrlEncoder _urlEncoder;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<AccountController> logger,
            IEmailSender emailSender,
            UrlEncoder urlEncoder)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            _urlEncoder = urlEncoder;
        }

        [AllowAnonymous]
        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return RedirectToPage("/Index");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{userId}'.");
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            var statusMessage = result.Succeeded ? "Thank you for confirming your email." : "Error confirming your email.";

            return Redirect("/Account/ConfirmEmail");

            //return Ok(new RedirectStatusResponse()
            //{
            //    Pathname = "/Account/ConfirmEmail",
            //    State = new RedirectStatusState()
            //    {
            //        Status = statusMessage
            //    }
            //});
        }

        [AllowAnonymous]
        [HttpGet("ConfirmEmailChange")]
        public async Task<IActionResult> ConfirmEmailChange(string userId, string email, string code)
        {
            if (userId == null || email == null || code == null)
            {
                return RedirectToPage("/Index");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{userId}'.");
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ChangeEmailAsync(user, email, code);
            if (!result.Succeeded)
            {
                var msg = "Error changing email.";
                return Redirect("/Account/ConfirmEmailChange");
            }

            // In our UI email and user name are one and the same, so when we update the email
            // we need to update the user name.
            var setUserNameResult = await _userManager.SetUserNameAsync(user, email);
            if (!setUserNameResult.Succeeded)
            {
                var msg = "Error changing user name.";
                return Redirect("/Account/ConfirmEmailChange");
            }

            await _signInManager.RefreshSignInAsync(user);
            var message = "Thank you for confirming your email change.";
            return Redirect("/Account/ConfirmEmailChange");
        }

                
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginInput loginInput)
        {
            if (ModelState.IsValid)
            {
                var returnUrl = loginInput.ReturnUrl ?? Url.Content("~/");

                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(loginInput.Email, loginInput.Password, loginInput.RememberMe, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");
                    return Ok(new RedirectResponse()
                    {
                        Pathname = returnUrl
                    });
                }
                if (result.RequiresTwoFactor)
                {
                    return Ok(new LoginResponse()
                    {
                        Pathname = "/Account/LoginWith2fa",
                        State = new LoginResponseState()
                        {
                            ReturnUrl = returnUrl,
                            RememberMe = loginInput.RememberMe
                        }
                    });
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning("User account locked out.");
                    return Ok(new RedirectResponse()
                    {
                        Pathname = "/Account/Lockout"
                    });
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");

                    return Ok(ModelState);
                }
            }

            // If we got this far, something failed, redisplay form
            return Ok(ModelState);
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]RegisterInput registerInput)
        {
            var returnUrl = registerInput.ReturnUrl ?? Url.Content("~/");
            var ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = registerInput.Email, Email = registerInput.Email };
                var result = await _userManager.CreateAsync(user, registerInput.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                    var callbackUrl = $"/api/Account/ConfirmEmail?userId={user.Id}&code={code}&returnUrl={returnUrl}";

                    await _emailSender.SendEmailAsync(registerInput.Email, "Confirm your email",
                        $"Please confirm your account by <a href='{callbackUrl}'>clicking here</a>.");

                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        var res = Ok(new RegisterResponse()
                        {
                            Pathname = "/Account/RegisterConfirmation",
                            State = new RegisterResponseState()
                            {
                                Email = registerInput.Email,
                                ReturnUrl = returnUrl,
                                EmailConfirmationUrl = callbackUrl
                            }
                        });

                        return res;
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return Ok(new RedirectResponse()
                        {
                            Pathname = returnUrl
                        });
                    }
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            return Ok(ModelState);
        }

        [AllowAnonymous]
        [HttpGet("ExternalLogins")]
        public async Task<IList<AuthenticationScheme>> GetExternalLogins()
        {
            return (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        [AllowAnonymous]
        [HttpPost("LoginWith2fa")]
        public async Task<IActionResult> LoginWith2fa([FromBody]LoginWith2faInput input)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }

            var returnUrl = input.ReturnUrl ?? Url.Content("~/");

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new InvalidOperationException($"Unable to load two-factor authentication user.");
            }

            var authenticatorCode = input.TwoFactorCode.Replace(" ", string.Empty).Replace("-", string.Empty);

            var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(authenticatorCode, input.RememberMe, input.RememberMachine);

            if (result.Succeeded)
            {
                _logger.LogInformation("User with ID '{UserId}' logged in with 2fa.", user.Id);
                return Ok(new RedirectResponse()
                {
                    Pathname = returnUrl
                });
            }
            else if (result.IsLockedOut)
            {
                _logger.LogWarning("User with ID '{UserId}' account locked out.", user.Id);
                return Ok(new RedirectResponse()
                {
                    Pathname = "/Account/Lockout"
                });
            }
            else
            {
                _logger.LogWarning("Invalid authenticator code entered for user with ID '{UserId}'.", user.Id);
                ModelState.AddModelError(string.Empty, "Invalid authenticator code.");
                return Ok(ModelState);
            }
        }

        [AllowAnonymous]
        [HttpPost("LoginWithRecoveryCode")]
        public async Task<IActionResult> LoginWithRecoveryCode([FromBody]LoginWithRecoveryCodeInput input)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }

            var returnUrl = input.ReturnUrl ?? Url.Content("~/");

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new InvalidOperationException($"Unable to load two-factor authentication user.");
            }

            var recoveryCode = input.RecoveryCode.Replace(" ", string.Empty);

            var result = await _signInManager.TwoFactorRecoveryCodeSignInAsync(recoveryCode);

            if (result.Succeeded)
            {
                _logger.LogInformation("User with ID '{UserId}' logged in with a recovery code.", user.Id);
                return Ok(new RedirectResponse()
                {
                    Pathname = returnUrl
                });
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning("User with ID '{UserId}' account locked out.", user.Id);
                return Ok(new RedirectResponse()
                {
                    Pathname = "/Account/Lockout"
                });
            }
            else
            {
                _logger.LogWarning("Invalid recovery code entered for user with ID '{UserId}' ", user.Id);
                ModelState.AddModelError(string.Empty, "Invalid recovery code entered.");
                return Ok(ModelState);
            }
        }

        [AllowAnonymous]
        [HttpPost("ResendEmailConfirmation")]
        public async Task<IActionResult> ResendEmailConfirmation([FromBody]ResendEmailConfirmationInput input)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(input.Email);
            if (user == null)
            {
                return Ok(new StatusResponse()
                {
                    Status = "Verification email sent. Please check your email."
                });
            }

            var userId = await _userManager.GetUserIdAsync(user);
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            var callbackUrl = $"/api/Account/ConfirmEmail?userId={userId}&code={code}";

            await _emailSender.SendEmailAsync(
                input.Email,
                "Confirm your email",
                $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

            return Ok(new StatusResponse()
            {
                Status = "Verification email sent. Please check your email."
            });
        }

        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordInput input)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(input.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return Ok(new RedirectResponse()
                    {
                        Pathname = "/Account/ForgotPasswordConfirmation"
                    });
                }

                // For more information on how to enable account confirmation and password reset please 
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var callbackUrl = $"/Account/ResetPassword?code={code}";

                await _emailSender.SendEmailAsync(
                    input.Email,
                    "Reset Password",
                    $"Please reset your password by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                return Ok(new RedirectResponse()
                {
                    Pathname = "/Account/ForgotPasswordConfirmation"
                });
            }

            return Ok(ModelState);
        }

        [AllowAnonymous]
        [HttpPost("SignedInUser")]
        public async Task<IActionResult> GetSignedInUser()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var appUser = await _userManager.GetUserAsync(User);
                return Ok(appUser);
            }

            return Ok(false);
        }




        [HttpPost("ChangeEmail")]
        public async Task<IActionResult> ChangeEmail([FromBody]ChangeEmailInput emailInput)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }

            var email = await _userManager.GetEmailAsync(user);
            if (emailInput.NewEmail != email)
            {
                var userId = await _userManager.GetUserIdAsync(user);
                var code = await _userManager.GenerateChangeEmailTokenAsync(user, emailInput.NewEmail);

                var callbackUrl = $"/api/Account/ConfirmEmailChange?userId={userId}&email={emailInput.NewEmail}&code={code}";
                await _emailSender.SendEmailAsync(
                    emailInput.NewEmail,
                    "Confirm your email",
                    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                return Ok(new StatusResponse()
                {
                    Status = "Confirmation link to change email sent. Please check your email."
                });
            }

            return Ok(new StatusResponse()
            {
                Status = "Your email is unchanged."
            });
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout([FromBody]LogoutInput logoutInput)
        {
            await _signInManager.SignOutAsync();
            var returnUrl = logoutInput.ReturnUrl;

            _logger.LogInformation("User logged out.");
            
            if (!string.IsNullOrWhiteSpace(returnUrl))
            {
                return Ok(new RedirectResponse()
                {
                    Pathname = returnUrl
                });
            }
            else
            {
                return Ok(new RedirectResponse()
                {
                    Pathname = ""
                });
            }
        }

        [HttpPost("ManageProfile")]
        public async Task<IActionResult> ManageProfile([FromBody]ManageProfileInput input)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }

            var phoneNumber = await _userManager.GetPhoneNumberAsync(user);
            if (input.PhoneNumber != phoneNumber)
            {
                var setPhoneResult = await _userManager.SetPhoneNumberAsync(user, input.PhoneNumber);
                if (!setPhoneResult.Succeeded)
                {
                    return Ok(new StatusResponse()
                    {
                        Status = "Unexpected error when trying to set phone number.",
                        AlertType = AlertType.Error
                    });
                }
            }

            await _signInManager.RefreshSignInAsync(user);
            return Ok(new StatusResponse()
            {
                Status = "Your profile has been updated"
            });
        }
       
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordInput input)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, input.OldPassword, input.NewPassword);
            if (!changePasswordResult.Succeeded)
            {
                foreach (var error in changePasswordResult.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return Ok(ModelState);
            }

            await _signInManager.RefreshSignInAsync(user);
            _logger.LogInformation("User changed their password successfully.");

            return Ok(new StatusResponse()
            {
                Status = "Your password has been changed."
            });
        }
                
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPasswordPost([FromBody]ResetPasswordInput input)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(input.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return Ok(new RedirectResponse()
                {
                    Pathname = "/Account/ResetPasswordConfirmation"
                });
            }

            var result = await _userManager.ResetPasswordAsync(user, input.Code, input.Password);
            if (result.Succeeded)
            {
                return Ok(new RedirectResponse()
                {
                    Pathname = "/Account/ResetPasswordConfirmation"
                });
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return Ok(ModelState);

        }

        [HttpPost("DeletePersonalData")]
        public async Task<IActionResult> DeletePersonalData([FromBody]DeletePersonalDataInput input)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var requirePassword = await _userManager.HasPasswordAsync(user);
            if (requirePassword)
            {
                if (!await _userManager.CheckPasswordAsync(user, input.Password))
                {
                    ModelState.AddModelError(string.Empty, "Incorrect password.");
                    return Ok(ModelState);
                }
            }

            var result = await _userManager.DeleteAsync(user);
            var userId = await _userManager.GetUserIdAsync(user);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException($"Unexpected error occurred deleting user with ID '{userId}'.");
            }

            await _signInManager.SignOutAsync();

            _logger.LogInformation("User with ID '{UserId}' deleted themselves.", userId);

            return Ok(new RedirectResponse()
            {
                Pathname = "/"
            });
        }

        

        [HttpPost("EmailConfirmed")]
        public async Task<IActionResult> IsEmailConfirmed()
        {
            var user = await _userManager.GetUserAsync(User);
            var isConfirmed = await _userManager.IsEmailConfirmedAsync(user);

            return Ok(isConfirmed);
        }

        [HttpPost("SendEmailVerification")]
        public async Task<IActionResult> SendEmailVerification()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Ok(new StatusResponse()
                {
                    Status = $"Unable to load user with ID '{_userManager.GetUserId(User)}'.",
                    AlertType = AlertType.Error
                });
            }

            var userId = await _userManager.GetUserIdAsync(user);
            var email = await _userManager.GetEmailAsync(user);
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            var callbackUrl = $"/api/Account/ConfirmEmail?userId={user.Id}&code={code}";

            await _emailSender.SendEmailAsync(
                email,
                "Confirm your email",
                $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

            return Ok(new StatusResponse()
            {
                Status = "Verification email sent. Please check your email."
            });
        }

        [HttpPost("HasPassword")]
        public async Task<IActionResult> HasPassword()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            return Ok(await _userManager.HasPasswordAsync(user));
        }

        [HttpGet("TwoFactorEnabled")]
        public async Task<IActionResult> IsTwoFactorEnabled()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                //return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
                return Ok(false);
            }

            //if (!await _userManager.GetTwoFactorEnabledAsync(user))
            //{
            //    return Ok(new StatusResponse()
            //    {
            //        IsError = true,
            //        Status = $"Cannot disable 2FA for logged in user, as it's not currently enabled."
            //    });
            //}

            var enabled = await _userManager.GetTwoFactorEnabledAsync(user);
            return Ok(enabled);
        }

        [HttpGet("HasAuthenticator")]
        public async Task<IActionResult> HasAuthenticator()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Ok(false);
            }

            var hasAuth = await _userManager.GetAuthenticatorKeyAsync(user) != null;

            return Ok(hasAuth);
        }

        [HttpGet("IsMachineRemembered")]
        public async Task<IActionResult> IsMachineRemembered()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Ok(false);
            }

            var isRemembered = await _signInManager.IsTwoFactorClientRememberedAsync(user);

            return Ok(isRemembered);
        }

        [HttpGet("RecoveryCodesLeft")]
        public async Task<IActionResult> RecoveryCodesLeft()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Ok(false);
            }

            var codesLeft = await _userManager.CountRecoveryCodesAsync(user);

            return Ok(codesLeft);
        }

        [HttpPost("ForgetBrowser")]
        public async Task<IActionResult> ForgetBrowser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            await _signInManager.ForgetTwoFactorClientAsync();
            return Ok(new StatusResponse()
            {
                Status = "The current browser has been forgotten. When you login again from this browser you will be prompted for your 2fa code."
            });
        }

        [HttpGet("LoadSharedKeyAndQRCodeUri")]
        public async Task<IActionResult> LoadSharedKeyAndQRCodeUri()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var resp = await LoadSharedKeyAndQrCodeUriAsync(user);

            return Ok(resp);
        }

        private async Task<TwoFASharedKeyQRCodeResponse> LoadSharedKeyAndQrCodeUriAsync(ApplicationUser user)
        {
            // Load the authenticator key & QR code URI to display on the form
            var unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
            if (string.IsNullOrEmpty(unformattedKey))
            {
                await _userManager.ResetAuthenticatorKeyAsync(user);
                unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
            }

            var sharedKey = FormatKey(unformattedKey);

            var email = await _userManager.GetEmailAsync(user);
            var authenticatorUri = GenerateQrCodeUri(email, unformattedKey);

            return new TwoFASharedKeyQRCodeResponse()
            {
                SharedKey = sharedKey,
                AuthenticatorUri = authenticatorUri
            };
        }

        private string FormatKey(string unformattedKey)
        {
            var result = new StringBuilder();
            int currentPosition = 0;
            while (currentPosition + 4 < unformattedKey.Length)
            {
                result.Append(unformattedKey.Substring(currentPosition, 4)).Append(" ");
                currentPosition += 4;
            }
            if (currentPosition < unformattedKey.Length)
            {
                result.Append(unformattedKey.Substring(currentPosition));
            }

            return result.ToString().ToLowerInvariant();
        }

        private const string AuthenticatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}&digits=6";

        private string GenerateQrCodeUri(string email, string unformattedKey)
        {
            return string.Format(
                AuthenticatorUriFormat,
                _urlEncoder.Encode("Identity Template"),
                _urlEncoder.Encode(email),
                unformattedKey);
        }

        [HttpPost("Verify2FACode")]
        public async Task<IActionResult> Verify2FACode([FromBody]TwoFACodeVerificationInput input)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }

            // Strip spaces and hypens
            var verificationCode = input.Code.Replace(" ", string.Empty).Replace("-", string.Empty);

            var is2faTokenValid = await _userManager.VerifyTwoFactorTokenAsync(
                user, _userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);

            if (!is2faTokenValid)
            {
                ModelState.AddModelError("Input.Code", "Verification code is invalid.");
                await LoadSharedKeyAndQrCodeUriAsync(user);
                return Ok(ModelState);
            }

            await _userManager.SetTwoFactorEnabledAsync(user, true);
            var userId = await _userManager.GetUserIdAsync(user);
            _logger.LogInformation("User with ID '{UserId}' has enabled 2FA with an authenticator app.", userId);

            var statusMessage = "Your authenticator app has been verified.";

            if (await _userManager.CountRecoveryCodesAsync(user) == 0)
            {
                var recoveryCodes = await _userManager.GenerateNewTwoFactorRecoveryCodesAsync(user, 10);

                return Ok(new Verify2FACodeResponse()
                {
                    Pathname = "/Account/Manage/ShowRecoveryCodes",
                    State = new Verify2FACodeRedirectState()
                    {
                        RecoveryCodes = recoveryCodes.ToArray(),
                        Status = new StatusResponse()
                        {
                            Status = statusMessage
                        }
                    }
                });
            }
            else
            {
                return Ok(new Verify2FACodeResponse()
                {
                    Pathname = "/Account/Manage/TwoFactorAuthentication",
                    State = new Verify2FACodeRedirectState()
                    {
                        Status = new StatusResponse()
                        {
                            Status = statusMessage
                        }
                    }
                });
            }
        }

        [HttpPost("ResetAuthenticator")]
        public async Task<IActionResult> ResetAuthenticator()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            await _userManager.SetTwoFactorEnabledAsync(user, false);
            await _userManager.ResetAuthenticatorKeyAsync(user);
            _logger.LogInformation("User with ID '{UserId}' has reset their authentication app key.", user.Id);

            await _signInManager.RefreshSignInAsync(user);

            return Ok(new RedirectStatusResponse()
            {
                Pathname = "/Account/Manage/EnableAuthenticator",
                State = new RedirectStatusState()
                {
                    Status = new StatusResponse(){
                        Status = "Your authenticator app key has been reset, you will need to configure your authenticator app using the new key."
                    }
                }
            });
        }

        [HttpPost("GenerateRecoveryCodes")]
        public async Task<IActionResult> GenerateRecoveryCodes()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var isTwoFactorEnabled = await _userManager.GetTwoFactorEnabledAsync(user);
            var userId = await _userManager.GetUserIdAsync(user);
            if (!isTwoFactorEnabled)
            {
                throw new InvalidOperationException($"Cannot generate recovery codes for user with ID '{userId}' as they do not have 2FA enabled.");
            }

            var recoveryCodes = await _userManager.GenerateNewTwoFactorRecoveryCodesAsync(user, 10);

            _logger.LogInformation("User with ID '{UserId}' has generated new 2FA recovery codes.", userId);

            return Ok(new Verify2FACodeResponse()
            {
                Pathname = "/Account/Manage/ShowRecoveryCodes",
                State = new Verify2FACodeRedirectState()
                {
                    Status = new StatusResponse()
                    {
                        Status = "You have generated new recovery codes."
                    },
                    RecoveryCodes = recoveryCodes.ToArray()
                }
            });
        }

        [HttpPost("Disable2fa")]
        public async Task<IActionResult> Disable2fa()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var disable2faResult = await _userManager.SetTwoFactorEnabledAsync(user, false);
            if (!disable2faResult.Succeeded)
            {
                throw new InvalidOperationException($"Unexpected error occurred disabling 2FA for user with ID '{_userManager.GetUserId(User)}'.");
            }

            _logger.LogInformation("User with ID '{UserId}' has disabled 2fa.", _userManager.GetUserId(User));

            var statusMessage = "2fa has been disabled. You can reenable 2fa when you setup an authenticator app";

            return Ok(new RedirectStatusResponse()
            {
                Pathname = "/Account/Manage/TwoFactorAuthentication",
                State = new RedirectStatusState()
                {
                    Status = new StatusResponse()
                    {
                        Status = statusMessage
                    }
                }
            });
        }

        [HttpGet("DownloadPersonalData")]
        public async Task<IActionResult> DownloadPersonalData()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            _logger.LogInformation("User with ID '{UserId}' asked for their personal data.", _userManager.GetUserId(User));

            // Only include personal data for download
            var personalData = new Dictionary<string, string>();
            var personalDataProps = typeof(ApplicationUser).GetProperties().Where(
                            prop => Attribute.IsDefined(prop, typeof(PersonalDataAttribute)));
            foreach (var p in personalDataProps)
            {
                personalData.Add(p.Name, p.GetValue(user)?.ToString() ?? "null");
            }

            var logins = await _userManager.GetLoginsAsync(user);
            foreach (var l in logins)
            {
                personalData.Add($"{l.LoginProvider} external login provider key", l.ProviderKey);
            }

            Response.Headers.Add("Content-Disposition", "attachment; filename=PersonalData.json");
            return new FileContentResult(JsonSerializer.SerializeToUtf8Bytes(personalData), "application/json");
        }
    }
}
