import { withRouter } from 'react-router-dom';
import Manage from './Manage';
import ChangePasswordComp from './ChangePassword';
import DeletePersonalDataComp from './DeletePersonalData';
import Disable2faComp from './Disable2fa';
import DownloadPersonalDataComp from './DownloadPersonalData';
import EmailComp from './Email';
import EnableAuthenitcatorComp from './EnableAuthenticator';
import ExternalLoginsComp from './ExternalLogins';
import GenerateRecoveryCodesComp from './GenerateRecoveryCodes';
import ManageIndexComp from './ManageIndex';
import ManageNavComp from './ManageNav';
import PersonalDataComp from './PersonalData';
import ResetAuthenticatorComp from './ResetAuthenticator';
import SetPasswordComp from './SetPassword';
import ShowRecoveryCodesComp from './ShowRecoveryCodes';
import TwoFactorAuthenticationComp from './TwoFactorAuthentication';
import ManageAccountLayout from './ManageLayout';


export default Manage;
export const ChangePassword = withRouter(ChangePasswordComp);
export const DeletePersonalData = withRouter(DeletePersonalDataComp);
export const Disable2fa = withRouter(Disable2faComp);
export const DownloadPersonalData = withRouter(DownloadPersonalDataComp);
export const Email = withRouter(EmailComp);
export const EnableAuthenitcator = withRouter(EnableAuthenitcatorComp);
export const ExternalLogins = withRouter(ExternalLoginsComp);
export const GenerateRecoveryCodes = withRouter(GenerateRecoveryCodesComp);
export const ManageIndex = withRouter(ManageIndexComp);
export const ManageNav = withRouter(ManageNavComp);
export const PersonalData = withRouter(PersonalDataComp);
export const ResetAuthenticator = withRouter(ResetAuthenticatorComp);
export const SetPassword = withRouter(SetPasswordComp);
export const ShowRecoveryCodes = withRouter(ShowRecoveryCodesComp);
export const TwoFactorAuthentication = withRouter(TwoFactorAuthenticationComp);

export const ManageLayout = withRouter(ManageAccountLayout);
