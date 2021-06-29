
const signInModal = `
<div class="modal ModalLogin" id="ModalLogin" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="closes" data-dismiss="modal" aria-label="Close">
                    <svg class="svg-inline--fa fa-times fa-w-10" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg><!-- <i class="fal fa-times"></i> -->
                </button>
            </div>
            <div class="modal-body">
                <h2 class="Title">Sign In</h2>
                <!--
                <h5>with</h5>
                <div class="SocialLogin">
                    <div class="row">
                        <div class="col-xl-6 col-12">
                            <a href="#" class="btns-blue-dark FB"><i class="fab fa-facebook-f"></i> FACEBOOK</a>
                        </div>
                        <div class="col-xl-6 col-12">
                            <a href="#" class="btns-red GP"><i class="fab fa-google"></i> GOOGLE</a>
                        </div>                                  
                    </div>
                </div>
                <h5>or</h5> -->
                <!-- action="../dologin" -->
                <form name='logInForm' id='loginForm'>
                    <div class="form-group">
                        <input type="hidden" id="cooksess" name="cooksess" value="true">
                        <input type="hidden" id="failed" name="failed" value="WebUpdatingAction.hal?action=afterlogin&amp;failed=1">
                        <input type="hidden" id="custpage" name="custpage" value="WebUpdatingAction.hal?action=afterlogin&amp;cust=1">
                        <input type="hidden" id="userpage" name="userpage" value="WebUpdatingAction.hal?action=afterlogin&amp;user=1">
                        
                        <input type="hidden" style="display:none" name='company' value='3'>
                        <input type="text" name='login' placeholder="E-mail" class="form-control" required>
                        <div class="invalid-feedback" id='logIn_usernameMessage_req'>
                            Username is required!
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="password" name='passwd' placeholder="Password" class="form-control" required>
                        <div class="invalid-feedback" id='logIn_pwMessage_req'>
                            Password is required!
                        </div>
                        <div class="invalid-feedback" id='logIn_pwMessage_incorrect'>
                            Incorrect username or password!
                        </div>
                    </div>  
                    <div class="form-group">
                        <label><div class="jq-checkbox"><input type="checkbox"><div class="jq-checkbox__div"></div></div> I agree with terms of use and privacy</label>
                    </div>
                    <div class="form-group">
                        <input id='signInBtn' style='text-align: center; width: 110px;' class="btns-white-red" value="Login" >
                    </div>   
                    <div class="form-group Last Links">
                        <a href="#" data-toggle="modal" data-dismiss="modal" data-target="#ModalForgot">Forgot password?</a>
                        <a href="#" data-toggle="modal" data-dismiss="modal" data-target="#ModalReg" onclick="console.log('not a member!')">Not a member?</a>
                    </div>                                     
                </form>
            </div>
        </div>
    </div>
</div>
`;

const registrationModal = `
<div class="modal ModalLogin" id="ModalReg" tabindex="-1" role="dialog" data-backdrop="static" aria-modal="true" >
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="closes" data-dismiss="modal" aria-label="Close">
                <svg class="svg-inline--fa fa-times fa-w-10" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg><!-- <i class="fal fa-times"></i> -->
            </button>
        </div>
        <div class="modal-body">
            <h2 class="Title">Sign Up</h2>
            <!--
            <h5>with</h5>
            <div class="SocialLogin">
                <div class="row">
                    <div class="col-xl-6 col-12">
                        <a href="#" class="btns-blue-dark FB"> <i class="fab fa-facebook-f"></i> FACEBOOK</a>
                    </div>
                    <div class="col-xl-6 col-12">
                        <a href="#" class="btns-red GP"> <i class="fab fa-google"></i> GOOGLE</a>
                    </div>                                    
                </div>
            </div>
            <h5>or</h5>  -->
            <form name="signUpForm">
                <div class="row">
                    <div class="col-xl-6 col-12">
                        <div class="form-group">
                            <input type="text" style="display:none" name='company' value='3'>
                            <input type="text" name="Username" class="form-control" placeholder="Username" required>
                                <div class="invalid-feedback" id='usernameMessage'>
                                    Username is required!
                                </div>                        
                        </div>
                        <div class="form-group">
                            <input type="password" name="Password" class="form-control" placeholder="Password" required>
                            <div class="invalid-feedback" id='passwordMessage'>
                                Password is required!
                            </div>  
                        </div>
                    </div>
                    <div class="col-xl-6 col-12">
                        <div class="form-group">
                            <input name="E-mail" type="text" class="form-control" placeholder="E-mail" required>
                            <div class="invalid-feedback" id='emailMessage_required'>
                                E-mail is required!
                            </div>
                            <div class="invalid-feedback" id='emailMessage_incorrect'>
                                Incorrect e-mail!
                            </div>
                            <div class="invalid-feedback" id='emailMessage_existsEmail'>
                                User with this e-mail already exists!
                            </div>  
                            <div class="invalid-feedback" id='emailMessage_saveError'>
                                Registration error! Contact the administrator!
                            </div>  
                        </div>
                        <div class="form-group">
                            <input type="password" name="ConfirmPassword" class="form-control" placeholder="Confirm password" required>
                            <div class="invalid-feedback" id='confPwMessage_required'>
                                Confirm password is required!
                            </div>
                            <div class="invalid-feedback" id='confPwMessage_pwMismatch'>
                                Password mismatch!
                            </div>
                        </div>     
                    </div>                                        
                </div>
                <div class="form-group">
                    <label><div class="jq-checkbox"><input type="checkbox"><div class="jq-checkbox__div"></div></div> I agree with terms of use and privacy</label>
                </div>
                <div class="form-group Last">
                    <input id='signUpSubmit' style='text-align: center; width: 120px;' class="btns-white-red" value="Sign up">
                </div>     
            </form>
        </div>
    </div>
</div>
</div>
`;

const forgotModal = `
<div class="modal ModalLogin " id="ModalForgot" tabindex="-1" role="dialog" data-backdrop="static" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="closes" data-dismiss="modal" aria-label="Close">
                    <svg class="svg-inline--fa fa-times fa-w-10" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg><!-- <i class="fal fa-times"></i> -->
                </button>
            </div>
            <div class="modal-body">
                <h2 class="Title">Reset your password</h2>
                <form>
                    <div class="formText">Enter your username, or the email address that you used to register. We’ll send you an email with your username and a link to reset your password.</div>
                    <div class="form-group">
                        <input type="text" placeholder="Enter your e-mail">
                    </div>  
                    <div class="form-group">
                        <input type="submit" class="btns-white-red" value="Reset">
                    </div>                                     
                    <div class="form-group Last Links">
                        <a href="#" data-toggle="modal" data-dismiss="modal" data-target="#ModalReg">Not a member?</a>
                    </div>                                     
                </form>
            </div>
        </div>
    </div>
</div>
`;

const changePasswordModal = `
<div class="modal ModalLogin" id="ModalChangePass" tabindex="-1" role="dialog" data-backdrop="static" aria-modal="true">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="closes" data-dismiss="modal" aria-label="Close">
                <svg class="svg-inline--fa fa-times fa-w-10" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg><!-- <i class="fal fa-times"></i> -->
            </button>
        </div>
        <div class="modal-body">
            <h2 class="Title MarginB">Your password canceled!</h2>
            <form>
                <div class="form-group">
                    <input type="password" placeholder="New password">
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Confirm password">
                </div>  
                <div class="form-group Last">
                    <input type="submit" class="btns-white-red" value="Change">
                </div>                                      
            </form>
        </div>
    </div>
</div>
</div>
`;

const thanksModal = `
<div class="modal ModalLogin" id="ModalThanks" tabindex="-1" role="dialog" data-backdrop="static" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="closes" data-dismiss="modal" aria-label="Close" id='closeThanksBtn'>
                   <i class="fal fa-times"></i> 
                </button>
            </div>
            <div class="modal-body">
                <h2 class="Title">Thanks for the registration!</h2>
                <div class="formText">
                    <p>Your account has been created and a verification email has been sent to your registered email address. Please click on the verification link included in the email to activate your account.</p>
                    <p>Having trouble accessing your account? Please contact <strong>Online Customer Support</strong>.</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const isChangePassword = `
<div class="modal ModalLogin" id="ModalIsChange" tabindex="-1" role="dialog" data-backdrop="static" aria-modal="true">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="closes" data-dismiss="modal" aria-label="Close">
                <svg class="svg-inline--fa fa-times fa-w-10" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg><!-- <i class="fal fa-times"></i> -->
            </button>
        </div>
        <div class="modal-body">
            <h2 class="Title margin100">Your password has been successfully changed!</h2>
        </div>
    </div>
</div>
</div>
`;

$(document).ready(() => {
    // $('body').append($(signInModal));
    // $('body').append($(registrationModal));
    // $('body').append($(forgotModal));
    // $('body').append($(changePasswordModal));
    // $('body').append($(thanksModal));
    // $('body').append($(isChangePassword));
    const search = window.location.search;
    if (search.indexOf('ConfirmRegistration') != -1) {
        // $('#ModalChangePass').modal('show');
        $('#ModalSetPass').modal('show');
    }

    $('#signUpSubmit').click(() => {
        validateSingUp();
    })
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        console.log('e = ', e); 
    });
    
    $('#signInBtn').click(() => {
        console.log('ckickeed');
        validateLogIn();
    });
    $('#closeThanksBtn').click(() => {
        // $('#ModalLogin').modal('show');
    });
    
    $('#agreeCheckbox').click((e) => {
        const checked = !e.target.checked;
    });

    $('#setPwBtn').click((e) => {
        onSetPwClick();
        
    });

    $('#resetPwBtn').click((e) => {
        forgotFunc();
    });

    $('#okPwOnEmailBtn').click((e) => {
        $('#ModalPwOnEmail').modal('hide');
    });
    
    $('#changePwBtn').click((e) => {
        onChangePwClick();
    });
});

const onChangePwClick = () => {
    const pw1 = $('#pw001').val();
    const pw2 = $('#pw002').val();
    if (pw1 != pw2) {
        $('#pw_mismatch_change').show();
        return;
    } else $('#pw_mismatch_change').hide();

    $.ajax({
        type: "POST",
        url: `${window.location.origin}/WebChangePassword.hal?company=3&NewPassword=${pw1}&RepeatNewPassword=${pw2}`,
        success: (data, message, res) => {
            if (res.status != 200) return;
            console.log('Changed!');
            console.log('res.responseText = ', res.responseText);
            if (res.responseText == 'Ok') {
                $('#ModalChangePass').modal('hide');
            } else {
                console.log('changePass Error');
            }
        },
        error: (e) => {
          console.log('error = ', e);
        }
    });
};

const forgotFunc = () => {
    const email = $('#emailForgot').val();
    console.log('email = ', email);
    $.ajax({
        type: "POST",
        url: `${window.location.origin}/WebRestorePasswordEmail.hal?company=3&eMail=${email}`,
        success: (data, message, res) => {
            if (res.status != 200) return;
            console.log('success');
            $('#ModalForgot').modal('hide');
            $('#ModalPwOnEmail').modal('show');
        },
        error: (e) => {
          console.log('error = ', e);
        }
    });
};

const validateSingUp = () => {
    const username = document.forms["signUpForm"]["Username"].value;
    const email = document.forms["signUpForm"]["E-mail"].value;
    // const password = document.forms["signUpForm"]["Password"].value;
    // const confirmPw = document.forms["signUpForm"]["ConfirmPassword"].value;
    // validate 
    if (!username) {
        $(document.forms["signUpForm"]["Username"]).addClass('is-invalid');
    } else $(document.forms["signUpForm"]["Username"]).removeClass('is-invalid');
    
    if (!email) {
        $(document.forms["signUpForm"]["E-mail"]).addClass('is-invalid');
        $('#emailMessage_incorrect').hide();
        $('#emailMessage_required').show();
        $('#emailMessage_existsEmail').hide();
        $('#emailMessage_saveError').hide();
    } else {
        $(document.forms["signUpForm"]["E-mail"]).removeClass('is-invalid');
        $('#emailMessage_required').hide();
        $('#emailMessage_incorrect').hide();
        $('#emailMessage_existsEmail').hide();
        $('#emailMessage_saveError').hide();
    } 
/*
    if (!password) {
        $(document.forms["signUpForm"]["Password"]).addClass('is-invalid');
        $('#passwordMessage').show();
    } else  {
        $(document.forms["signUpForm"]["Password"]).removeClass('is-invalid');
        $('#passwordMessage').hide();
    }
    
    if (!confirmPw) {
        $(document.forms["signUpForm"]["ConfirmPassword"]).addClass('is-invalid');
        $('#confPwMessage_pwMismatch').hide();
        $('#confPwMessage_required').show();
    } else {
        $(document.forms["signUpForm"]["ConfirmPassword"]).removeClass('is-invalid');
        $('#confPwMessage_required').hide();
        $('#confPwMessage_pwMismatch').hide();
    }
*/
    if (!username || !email /* || !password || !confirmPw*/) return;
    /*
    if (password !== confirmPw ) {
        let hasClass = $(document.forms["signUpForm"]["ConfirmPassword"]).hasClass('is-invalid'); 
        if (!hasClass) $(document.forms["signUpForm"]["ConfirmPassword"]).addClass('is-invalid');
        hasClass = $(document.forms["signUpForm"]["Password"]).hasClass('is-invalid');
        if (!hasClass) $(document.forms["signUpForm"]["Password"]).addClass('is-invalid');
        //
        $('#confPwMessage_required').hide();
        $('#confPwMessage_pwMismatch').show();
        $('#passwordMessage').hide();
        return;
    }*/
    const validateEmail = (mail) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    }
    if (!validateEmail(email)) {
        let hasClass = $(document.forms["signUpForm"]["E-mail"]).hasClass('is-invalid');
        if (!hasClass) $(document.forms["signUpForm"]["E-mail"]).addClass('is-invalid')
        $('#emailMessage_incorrect').show();
        $('#emailMessage_required').hide();
        $('#emailMessage_existsEmail').hide();
        $('#emailMessage_saveError').hide();
        return;
    } else {
        $(document.forms["signUpForm"]["E-mail"]).removeClass('is-invalid');
        $('#emailMessage_incorrect').hide();
        $('#emailMessage_required').hide();
        $('#emailMessage_existsEmail').hide();
        $('#emailMessage_saveError').hide();
    }

    const isAgreeReg = document.getElementById('regCheckbox').checked;
    if (!isAgreeReg) return;

    registrationFunc({ username, email });
};
const registrationFunc = (params) => {
    const { username, email } = params;

    $.ajax({
        type: "GET",
        url: `${window.location.origin}/WebHBSRegistrationCustMM.hal?company=3&E-mail=${email}&Username=${username}`, // &Password=${password}
        success: (data, message, res) => {
            console.log(1);
            if (res.status != 200) return;
            console.log('res.responseText = ', res.responseText);
            if (res.responseText == 'EmailExistError') {
                let hasClass = $(document.forms["signUpForm"]["E-mail"]).hasClass('is-invalid');
                if (!hasClass) $(document.forms["signUpForm"]["E-mail"]).addClass('is-invalid')
                $('#emailMessage_required').hide();
                $('#emailMessage_incorrect').hide();
                $('#emailMessage_existsEmail').show();
                $('#emailMessage_saveError').hide();
            } else if (res.responseText == 'CustomerSaveError' || res.responseText =='EmptyLinkError' || res.responseText == 'MailStoreError') {
                let hasClass = $(document.forms["signUpForm"]["E-mail"]).hasClass('is-invalid');
                if (!hasClass) $(document.forms["signUpForm"]["E-mail"]).addClass('is-invalid');
                $('#emailMessage_required').hide();
                $('#emailMessage_incorrect').hide();
                $('#emailMessage_existsEmail').hide();
                $('#emailMessage_saveError').show();
            } else if (res.responseText == 'Ok') {
                $('#emailMessage_required').hide();
                $('#emailMessage_incorrect').hide();
                $('#emailMessage_existsEmail').hide();
                $('#emailMessage_saveError').hide();
                
                $('#ModalReg').modal('hide');
                $('#ModalThanks').modal('show');
                console.log('REGISTERED');
            }
            console.log(2);
        },
        error: (e) => {
            console.log('error = ', e);
        }
    });
};
const onSetPwClick = () => {
    const search = window.location.search;
    let searchArray = search.split('&');

    const username = searchArray[1].split('=')[1];
    const email = searchArray[2].split('=')[1];
    const token = searchArray[3].split('=')[1];
    const pw1 = $('#pw01').val();
    const pw2 = $('#pw02').val();
   
    if(pw1 != pw2) {
        $('#pw_mismatch').show();
        return;
    }else $('#pw_mismatch').hide();

    const cooksess = document.forms["logInForm"]["cooksess"].value;
    const custpage = '';
    const userpage = document.forms["logInForm"]["userpage"].value;
   
    $.ajax({
        type: "GET",
        url: `${window.location.origin}/WebHBSStoreCustMM.hal?company=3&E-mail=${email}&Username=${username}&token=${token}&Password=${pw1}`,
        success: (data, message, res) => {
            console.log(1);
            if (res.status != 200) return;
            console.log('res.responseText = ', res.responseText);
            if (res.responseText == 'Ok') {
                const cooksess = document.forms["logInForm"]["cooksess"].value;
                const custpage = '';
                const userpage = document.forms["logInForm"]["userpage"].value;
                
                $.ajax({
                    type: "POST",
                    url: `${window.location.origin}/dologin?cooksess=${cooksess}&custpage=${custpage}&userpage=${userpage}&company=3&login=${email}&passwd=${pw1}`,
                    success: (data, message, res) => {
                        if (res.status != 200) return;
                        window.location.search = 'Ok';
                    },
                    error: (e) => {
                      console.log('error = ', e);
                    }
                });
            } else if (res.responseText == 'EmailExistsError') {
                alert('EmailExistsError');
            }

            /* if (res.responseText == 'EmailExistsError') {
                let hasClass = $(document.forms["signUpForm"]["E-mail"]).hasClass('is-invalid');
                if (!hasClass) $(document.forms["signUpForm"]["E-mail"]).addClass('is-invalid')
                $('#emailMessage_required').hide();
                $('#emailMessage_incorrect').hide();
                $('#emailMessage_existsEmail').show();
                $('#emailMessage_saveError').hide();
            } else if (res.responseText == 'CustomerSaveError') {
                let hasClass = $(document.forms["signUpForm"]["E-mail"]).hasClass('is-invalid');
                if (!hasClass) $(document.forms["signUpForm"]["E-mail"]).addClass('is-invalid')
                $('#emailMessage_required').hide();
                $('#emailMessage_incorrect').hide();
                $('#emailMessage_existsEmail').hide();
                $('#emailMessage_saveError').show();
            } else if (res.responseText == 'Ok') {
                $('#emailMessage_required').hide();
                $('#emailMessage_incorrect').hide();
                $('#emailMessage_existsEmail').hide();
                $('#emailMessage_saveError').hide();
                
                $('#ModalReg').modal('hide');
                $('#ModalThanks').modal('show');
            }*/
            console.log(2);
        },
        error: (e) => {
          console.log('error = ', e);
        }
      });
};

// action="../dologin" method="post"
const validateLogIn = (e) => {
    const name= document.forms["logInForm"]["login"].value;
    const password = document.forms["logInForm"]["passwd"].value;
    if (!name) {
        let hasClass = $(document.forms["logInForm"]["login"]).hasClass('is-invalid');
        if (!hasClass) $(document.forms["logInForm"]["login"]).addClass('is-invalid');
        $('#logIn_usernameMessage_req').show();
    } else {
        $(document.forms["logInForm"]["login"]).removeClass('is-invalid');
        $('#logIn_usernameMessage_req').hide();
    }

    if (!password) {
        let hasClass = $(document.forms["logInForm"]["passwd"]).hasClass('is-invalid');
        if (!hasClass) $(document.forms["logInForm"]["passwd"]).addClass('is-invalid');
        $('#logIn_pwMessage_incorrect').hide();
        $('#logIn_pwMessage_req').show();
    } else {
        $(document.forms["logInForm"]["passwd"]).removeClass('is-invalid');
        $('#logIn_pwMessage_incorrect').hide();
        $('#logIn_pwMessage_req').hide();
    }
    const isAgree = document.getElementById('agreeCheckbox').checked;
    if (!name || !password || !isAgree) return;
    onSubmit_logIn({ name, password})
};
const onSubmit_logIn = (params) => {
    const { name, password } = params;
    const cooksess = document.forms["logInForm"]["cooksess"].value;
    const custpage = '';
    const userpage = document.forms["logInForm"]["userpage"].value;
    $.ajax({
        type: "POST",
        url: `${window.location.origin}/dologin?cooksess=${cooksess}&custpage=${custpage}&userpage=${userpage}&company=3&login=${name}&passwd=${password}`,
        success: (data, message, res) => {
            if (res.status != 200) return;
            console.log('res.responseText = ', res.responseText);
            if (res.responseText == 'Error') {
                let hasClass = $(document.forms["logInForm"]["passwd"]).hasClass('is-invalid');
                if (!hasClass) $(document.forms["logInForm"]["passwd"]).addClass('is-invalid');
                
                hasClass = $(document.forms["logInForm"]["login"]).hasClass('is-invalid');
                if (!hasClass) $(document.forms["logInForm"]["login"]).addClass('is-invalid');
                
                $('#logIn_pwMessage_req').hide();
                $('#logIn_usernameMessage_req').hide();
                $('#logIn_pwMessage_incorrect').show();
            } else if (res.responseText == 'Ok') location.reload();
        },
        error: (e) => {
          console.log('error = ', e);
        }
      });
};
