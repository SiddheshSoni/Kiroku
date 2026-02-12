const API_Key = import.meta.env.VITE_FIREBASE_KEY;

const Authenticate = async (username, email, password, authMode) =>{
    console.log(authMode);
    let authEndPoint = authMode ? "signUp" : "signInWithPassword";

    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${authEndPoint}?key=${API_Key}`, {
            method:'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken:true,
            }),
            headers:{
                'Content-Type':'application/json',
            },
        });

        const data = await res.json();

        if(!res.ok){
            let errorMessage = "Failed to Authenticate!";
            if(data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            return { ok: false, error: errorMessage };
        }

        localStorage.setItem('idToken', data.idToken);
        const userId = email.replace(/[.#$[\]]/g, "_");
        localStorage.setItem('user', userId);
        
        return{data: data, ok: true};
    }catch(error){
        return {ok:false, error: error}
    }
};

export default Authenticate;