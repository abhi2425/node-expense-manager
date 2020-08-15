// const signupform = document.querySelector(".signupform")
// const btn = document.querySelector(".btn")
// btn.addEventListener("click", (e) => {

//     const firstname = document.querySelector("#firstname").value.toLowerCase().trim()
//     const lastname = document.querySelector("#lastname").value.toLowerCase().trim()
//     const email = document.querySelector("#email").value.toLowerCase().trim()
//     const password = document.querySelector("#password").value
//     const confirmpassword = document.querySelector("#confirmpassword").value
//     e.preventDefault()

//     const data = {
//         firstname,
//         lastname,
//         email,
//         password,
//         confirmpassword
//     }
//     const Option = {
//         method: "POST",
//         headers: {
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify(data)
//     }
//     fetch("/", Option).then((response) => {
//         response.json().then((data) => {
//             console.log(data.error)
//         })
//     }).catch((error) => {
//         console.log(error)
//     })

// })