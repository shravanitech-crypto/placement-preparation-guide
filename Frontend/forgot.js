document.getElementById("forgotForm").addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("newPassword").value;

if(password.length < 6){
alert("Password must be at least 6 characters");
return;
}

try{

const res = await fetch("http://localhost:5000/api/users/reset-password",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email:email,
password:password
})

});

const data = await res.json();

if(res.ok){

alert("Password Updated Successfully");
window.location.href="login.html";

}else{

alert(data.message);

}

}catch(err){

alert("Server Error");

}

});