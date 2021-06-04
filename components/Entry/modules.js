import {db,auth} from '../../firebase/init'

export const registerUser = async (data) =>{
    let user = null;
    try {
        await auth.createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential)=>{
            console.log("success in registeration");
            user = userCredential.user;
            let dbuser = {
                email:user.email,
                uid:user.uid,
                emailVerified:user.emailVerified
            }
            db.ref('/users/' + user.uid).set(dbuser);
        })
        .catch(e=>{
            console.log(e.code, e.message);
        })
    } catch (error) {
        console.log(error);
    }
    return user;
}

export const sendVerificationEmail = async (user) =>{
    let success = false;
    try {
    await user.sendEmailVerification().then(function() {
        success = true;
        }).catch(function(error) {
        success = false;
        });
    } catch (error) {
        console.log(error);
    }
    return success;
}

export const deleteUser = async (user) =>{
    let {uid} = user;
    user.delete().then(res=>{
        db.ref('/users/' + uid).remove();
    }).catch(e=>console.log("not deleted: ", e));
}