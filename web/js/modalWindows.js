
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
                <h5>with</h5>
                <div class="SocialLogin">
                    <div class="row">
                        <div class="col-xl-6 col-12">
                            <a href="#" class="btns-blue-dark FB"><svg class="svg-inline--fa fa-facebook-f fa-w-10" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg><!-- <i class="fab fa-facebook-f"></i> --> FACEBOOK</a>
                        </div>
                        <div class="col-xl-6 col-12">
                            <a href="#" class="btns-red GP"><svg class="svg-inline--fa fa-google fa-w-16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" data-fa-i2svg=""><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg><!-- <i class="fab fa-google"></i> --> GOOGLE</a>
                        </div>                                    
                    </div>
                </div>
                <h5>or</h5>
                <form action="../dologin" method="post">
                    <div class="form-group">
                        <input type="text" style="display:none" name='company' value='3'>
                        <input type="text" name='login' placeholder="Username">
                    </div>
                    <div class="form-group">
                        <input type="password" name='passwd' placeholder="Password">
                        <input type="text" style="display:none" name='custpage' value=${window.location.pathname}>
                    </div>  
                    <div class="form-group">
                        <label><div class="jq-checkbox"><input type="checkbox"><div class="jq-checkbox__div"></div></div> I agree with terms of use and privacy</label>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btns-white-red" value="Login" >
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
            <h5>with</h5>
            <div class="SocialLogin">
                <div class="row">
                    <div class="col-xl-6 col-12">
                        <a href="#" class="btns-blue-dark FB"><svg class="svg-inline--fa fa-facebook-f fa-w-10" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg><!-- <i class="fab fa-facebook-f"></i> --> FACEBOOK</a>
                    </div>
                    <div class="col-xl-6 col-12">
                        <a href="#" class="btns-red GP"><svg class="svg-inline--fa fa-google fa-w-16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" data-fa-i2svg=""><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg><!-- <i class="fab fa-google"></i> --> GOOGLE</a>
                    </div>                                    
                </div>
            </div>
            <h5>or</h5>
            <form>
                <div class="row">
                    <div class="col-xl-6 col-12">
                        <div class="form-group">
                            <input type="text" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <input type="password" placeholder="Password">
                        </div>     
                    </div>
                    <div class="col-xl-6 col-12">
                        <div class="form-group">
                            <input type="text" placeholder="E-mail">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Confirm password">
                        </div>     
                    </div>                                        
                </div>
                <div class="form-group">
                    <label><div class="jq-checkbox"><input type="checkbox"><div class="jq-checkbox__div"></div></div> I agree with terms of use and privacy</label>
                </div>
                <div class="form-group Last">
                    <input type="submit" class="btns-white-red" value="Sign up">
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
                <button type="button" class="closes" data-dismiss="modal" aria-label="Close">
                    <svg class="svg-inline--fa fa-times fa-w-10" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg><!-- <i class="fal fa-times"></i> -->
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
    $('body').append($(signInModal));
    $('body').append($(registrationModal));
    $('body').append($(forgotModal));
    $('body').append($(changePasswordModal));
    $('body').append($(thanksModal));
    $('body').append($(isChangePassword));
});