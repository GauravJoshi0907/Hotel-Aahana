const navBtn = document.getElementById('nav-btn');
const cancelBtn = document.getElementById('cancel-btn');
const sideNav = document.getElementById('sidenav');
const modal = document.getElementById('modal');


navBtn.addEventListener("click", function(){
    sideNav.classList.add('show');
    modal.classList.add('showModal');
});

cancelBtn.addEventListener('click', function(){
    sideNav.classList.remove('show');
    modal.classList.remove('showModal');
});

window.addEventListener('click', function(event){
    if(event.target === modal){
        sideNav.classList.remove('show');
        modal.classList.remove('showModal');
    }
});


function showForm(room_no) {
  const form = document.getElementById('form');
  const book = document.getElementById('bookk');

  this.bookedRoom =room_no;

  if (form.style.display === 'none') {
    form.style.display = 'block';
    book.style.height='120vh'; 
  }

/* Sending the formData object using Fetch */
  this.postData = function(){
    const form = document.getElementById('form');
    let name = document.forms['form']['userName'].value;
    let contact = document.forms['form']['contact'].value;
    let address = document.forms['form']['address'].value;
    console.log(name , contact, address, bookedRoom)

    fetch('http://localhost:8000/users', {
    method: 'POST',
    headers: {
        "content-type": 'application/json',
    },
    body: JSON.stringify({
        userName:name,
        contact:contact,
        address:address,
        roomNo:bookedRoom
        })
    })
    .then(res => res.json())
    .then(data => console.log(data));

    //Updating isBooked field to true 
    fetch(`http://localhost:8000/rooms/${bookedRoom}`, {
      method: 'Put',
      headers: {
          "content-type": 'application/json',
      },})
      .then(res => res.json())
      .then(data => console.log(data));
}
};

// matching user's details from the database
function validateUser()
{
  const form = document.getElementById('edit-form');
    let contact = document.forms['edit-form']['contact'].value;
    let roomnumber = document.forms['edit-form']['roomnumber'].value;
    
    
    fetch(`http://localhost:8000/users/${contact}`, {
    method: 'GET',
    headers: {
        "content-type": 'application/json',
    },})
    .then(res => res.json())
    .then(data => console.log(data));

    if(res.message=="Data Matched Successfully")
    {
      
    }
    else{

    }
};


//Getting all unbooked rooms from database
var roomNumbers = [];
async function getData(){
     const res =  await fetch('http://localhost:8000/rooms', {
        method: 'GET',
        headers: {
            "content-type": 'application/json',
        }
        })
     const data = await res.json()
      roomNumbers = data;
      document.getElementById('clicknow').innerHTML = roomNumbers.map(el => `<button class="roomcta" onclick="showForm(${el.roomNo})">${el.roomNo}</button>`
      ).join('')
}


const btn = document.getElementById('book');

btn.addEventListener('click', () => {
  const form = document.getElementById('clicknow');
  const book=document.getElementById('bookk');

  if (form.style.display === 'none') {
    form.style.display = 'block';
    book.style.height='80vh';
  }
});

const but = document.getElementById('editdetails');

but.addEventListener('click', () => {
  const formm = document.getElementById('edit-form');
  const book=document.getElementById('bookk');

  if (formm.style.display === 'none') {
    formm.style.display = 'block';
    book.style.height='70vh';
    
  }
});
