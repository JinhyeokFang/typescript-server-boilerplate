
        let gauth;
        const xhr = new XMLHttpRequest();
        let loginBtn = document.querySelector('.button');
        loginBtn.addEventListener('click', login);

        function login() {
            gapi.load('auth2', function () {
                gauth = gapi.auth2.init({
                    client_id: '546712292410-8q584dg9sfv8e54fmuu3a1hq1b1vo4us.apps.googleusercontent.com'
                });

                gauth.signIn().then(result => {
                    let user = gauth.currentUser.get();
                    let userName = user.getBasicProfile().getName();
                    let userInfo_it = result.getAuthResponse().id_token;

                    xhr.open('post', 'http://localhost:8080/auth/google', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === xhr.DONE) {
                            if (xhr.status === 200 || xhr.status === 201) {
                                console.dir(xhr.response);
                                let payload = JSON.parse(xhr.responseText);
                                window.location.href = './successWow';
                                localStorage.setItem('token', payload.token);
                                localStorage.setItem('name', userName)
                            } else {
                                console.error(xhr.responseText);
                            }
                        }
                    };
                    xhr.send("token=" + userInfo_it);
                });
            });
        }