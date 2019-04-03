document.addEventListener('DOMContentLoaded', function () {

            let Modalelem = document.getElementById('modal1');
            let instance = M.Modal.init(Modalelem);
            if (sessionStorage.getItem("user_name") === null) {
                instance.open();
            }
            let accept_button = document.getElementById("accept_username");
            accept_button.addEventListener('click', function () {

                let user_name_input = document.getElementById("user_name");
                let user_name = user_name_input.value;
                if (user_name === '') {
                    user_name = 'Anonymus';
                }
                sessionStorage.setItem('user_name', user_name)

            })

});




