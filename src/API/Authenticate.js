const API_Key = import.meta.env.VITE_FIREBASE_KEY;

const Authenticate = async (email, password, authMode) =>{
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
        localStorage.setItem('user', userId); // Store the derived userId in localStorage
        
        return{data: { ...data, userId: userId }, ok: true}; // Return derived userId in the data object
    }catch(error){
        return {ok:false, error: error.message || "An unknown error occurred during authentication."} // Return error message
    }
};

export default Authenticate;