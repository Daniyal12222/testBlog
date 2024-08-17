import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc, addDoc, collection ,getDocs, deleteDoc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
// import{collection, addDoc , } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
// import { updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";



const firebaseConfig = {
    //YOUR COPIED FIREBASE PART SHOULD BE HERE
    apiKey: "AIzaSyBZAI02pI8CUWyP8YEjEjNv1nXlb8VZ6bc",
    authDomain: "test-43a6f.firebaseapp.com",
    projectId: "test-43a6f",
    storageBucket: "test-43a6f.appspot.com",
    messagingSenderId: "922853907642",
    appId: "1:922853907642:web:1c059ffed834fb1d76b683"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app );

let d_name = document.getElementById('loggedUserFName');
let d_email = document.getElementById('loggedUserEmail');
let d_lastn = document.getElementById('loggedUserLName');
let d_u = document.getElementById('User');
let u_ui;
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        // console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    u_ui = userData.fullName
                    // document.getElementById('loggedUserFName').innerText=userData.firstName.slice(0,1);
                    // document.getElementById('loggedUserEmail').innerText=userData.email;
                    // document.getElementById('loggedUserLName').innerText=userData.lastName;
                    // d_name.innerText = userData.firstName
                    d_u.innerText = userData.fullName.slice(0, 1).toUpperCase();
                    // console.log(user.uid);

                }
                else {
                    console.log("no document found matching id")
                }
            })
            .catch((error) => {
                console.log("Error getting document");
            })
    }
    else {
        console.log("User Id not Found in Local storage")
    }
})

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
})

// =========================================================== //

let add_blog = document.getElementById('add_blog');
let blog_box = document.getElementById('box_add');

add_blog.addEventListener('click', async () => {

    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Message",
        inputPlaceholder: "Type your message here...",
        inputAttributes: {
            "aria-label": "Type your message here"
        },
        showCancelButton: true
    });
    if (text) {
        // Swal.fire(text);
        let blog_text = text;
        
        // const docRef = await addDoc(collection(db, "data"), {
        //     name : u_ui,
        //     btext: blog_text,
        // });
        // console.log("Document written with ID: ", docRef.id);
        try {
            const docRef = await addDoc(collection(db, "blog"), {
              first: u_ui,
              btext: blog_text,

            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        


    }
});

setTimeout(async ()=>{
    blog_box.innerHTML=''
    const querySnapshot = await getDocs(collection(db, "blog"));
    querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    let docdata = doc.data()
    blog_box.innerHTML += ` <div class="box w-[90%]  p-4 bg-gray-400 mt-3 rounded  ">
                <div class="w-full flex flex-col items-center h-full p-4 rounded bg-blue-100 ">
                    <p><h2 class="font-bold">${docdata.first} :</h2> ${docdata.btext}</p>
                <button id="del" class="w-[20%] h-[6vh] rounded  bg-gray-700 text-white"> delet </button>
                    </div>
            </div>`
    })
},1000)


let belb = document.getElementById('del');

delb.addEventListener('click',async ()=>{

    await deleteDoc(doc(db, "cities", "DC"));
})









