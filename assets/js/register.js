$(function(){
    $("#register_button").on("click",function (){

        let notyf = new Notyf({duration: 1000, position: {x: 'right', y: 'top',}});

        let username = $("#username").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let confirm_password = $("#confirm_password").val();
        let user_role = $("#user_role").val();

        if(username.trim() === "" && password.trim() === "" && email.trim() === "" && confirm_password.trim() === ""){
            notyf.error("All fields are required");
            return;
        }

        if (username.trim() === ""){
            notyf.error("Username is required");
            return;
        }

        if (email.trim() === ""){
            notyf.error("Email is required");
            return;
        }

        if (!validateEmail(email)){
            notyf.error("Email is not valid");
            return;
        }

        if(password.trim() === ""){
            notyf.error("Password is required");
            return;
        }

        if(confirm_password.trim() === ""){
            notyf.error("Confirm Password is required");
            return;
        }

        if(password.trim() !== confirm_password.trim()){
            notyf.error("Password does not match");
            return;
        }


        password = CryptoJS.SHA512(password).toString();
        confirm_password =  CryptoJS.SHA512(confirm_password).toString();

        $.ajax({
            url: "ajax.php",
            type: "POST",
            data: {
                action: "userRegister",
                username: username,
                email: email,
                password: password,
                confirm_password: confirm_password,
                user_role: user_role
            },
            beforeSend: function(){
                //TODO: add before send on register
            },
            success: function(response){

                var res = JSON.parse(response);
                if(res.success){
                    notyf.success(res.message)
                    setTimeout(() => {
                        window.location = 'login.php';
                    }, 3000);
                } else {
                    notyf.error(res.message)
                }


            }
        })
    });
});

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

