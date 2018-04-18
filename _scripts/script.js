window.onload = function(){

	/*=== Buttons ===*/
	let createContact = document.getElementById('createContact');
	let addContact = document.getElementById('addContact');
	let showForm = document.querySelector('.infoForm');
	let showEditForm = document.querySelector('.editForm');
	let showDetails = document.querySelector('.info');
	let contactList = document.querySelector('.left');

	/*=== Form Fields ===*/
	let name = document.getElementById('name');
	let phone = document.getElementById('phone');
	let email = document.getElementById('email');

	/*=== Storage Array ===*/
	var addressBook = [];

	/*=== Event Listeners ===*/
	createContact.onclick = function() {
		clearForm();
		showDetails.style.display = "none";
		showEditForm.style.display = "none";
		showForm.style.display = "block";
	};

	function jsonConst(name, phone, email) {
		this.name = name;
		this.phone = phone;
		this.email = email;
	}

	let clearForm = function() {
		let formInputs = document.getElementsByTagName('input');
		for(var i in formInputs) {
			formInputs[i].value = '';
		}
	}

	function showContact(){
		if(localStorage['addbook'] === undefined) {
			localStorage['addbook'] = "[]";
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			contactList.innerHTML = '';
			for(var j in addressBook) {
				let str = '<section class="contact">';
					str += '<h4>' + addressBook[j].name + '<nobr class="view" data-id="' + j +'" >View Detials</nobr></h4>';
					str += '<p>' + addressBook[j].phone + '</p>';
					str += '</section>';
					contactList.innerHTML += str;
			};
		};
	}showContact();

	addContact.onclick = function(){
		let isFilled = name.value!='' && phone.value!='' && email.value!='';
		if(isFilled){
			let formObj = new jsonConst(name.value, phone.value, email.value);
			addressBook.push(formObj);
			localStorage['addbook'] = JSON.stringify(addressBook);

			//hide form panel
			showForm.style.display = "none";
			showEditForm.style.display = "none";
			//Clear form inputs
			clearForm();
			showContact();
		};
	};

	contactList.onclick = function(e){
		if(e.target.classList.contains("view")){
			let datID = e.target.getAttribute('data-id');
			showDetails.style.display = "block";
			showForm.style.display = "none";
			showEditForm.style.display = "none";
			showDetails.innerHTML = '';
			
			let details = '<section class="detailsTab">';
				details += '<h4>Name: </h4>';
				details += '<p>' + addressBook[datID].name + '</p>';
				details += '</section>';
				details += '<section class="detailsTab">';
				details += '<h4>Phone: </h4>';
				details += '<p>' + addressBook[datID].phone + '</p>';
				details += '</section>';
				details += '<section class="detailsTab">';
				details += '<h4>Email: </h4>';
				details += '<p>' + addressBook[datID].email + '</p>';
				details += '</section>';
				details += '<section class="button">';
				details += '<button class="editContact"' +' data-id="'+ datID +'">Edit Contact</button>';
				details += '<button class="deleteContact"' +' data-id="'+ datID +'">Delete Contact</button>';
				details += '</section>';
				showDetails.innerHTML += details;
		};
	};

	showDetails.addEventListener("click", editContact);
	showDetails.addEventListener("click", deleteContact);
	showEditForm.addEventListener("click", saveEdit);

	function editContact(e) {
		if(e.target.classList.contains("editContact")){
			let datID = e.target.getAttribute('data-id');
			showDetails.style.display = "none";
			showForm.style.display = "none";
			showEditForm.style.display = "block";
			showEditForm.innerHTML = '';
			
			let edit = '<section class="infoTab">';
				edit += '<h4>Name: </h4>';
				edit += '<input value="' + addressBook[datID].name + '" type="text" id="name">';
				edit += '</section>';
				edit += '<section class="infoTab">';
				edit += '<h4>Phone: </h4>';
				edit += '<input value="' + addressBook[datID].phone + '" type="text" id="phone">';
				edit += '</section>';
				edit += '<section class="infoTab">';
				edit += '<h4>Email: </h4>';
				edit += '<input value="' + addressBook[datID].email + '" type="text" id="email">';
				edit += '</section>';
				edit += '<section class="button">';
				edit += '<button class="saveEdit"' +' data-id="'+ datID +'">Save</button>';
				edit += '</section>';
				showEditForm.innerHTML += edit;
			
		};
	};

	function deleteContact(e){
		if(e.target.classList.contains("deleteContact")){
			var datID = e.target.getAttribute("data-id");
			addressBook.splice(datID, 1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showContact();
			showDetails.style.display = "none";
			showForm.style.display = "none";
			showEditForm.style.display = "none";
		};
	};

	function saveEdit(e){
		if(e.target.classList.contains("saveEdit")){
			let datID = e.target.getAttribute('data-id');
			console.log("edit ");
			addressBook = JSON.parse(localStorage['addbook']);
			let formObj = new jsonConst(name.value, phone.value, email.value);
			console.log(formObj.name);
			console.log(addressBook[datID].name);
			/*for (var i = addressBook[datID].length; i >= 0; i++) {
				addressBook[datID].name = formObj.name;
				addressBook[datID].phone = formObj.phone;
				addressBook[datID].email = formObj.email;
			}
			localStorage['addbook'] = JSON.stringify(addressBook);
			console.log(addressBook[datID].name);

			//hide form panel
			showDetails.style.display = "block";
			showForm.style.display = "none";
			showEditForm.style.display = "none";
			//Clear form inputs
			clearForm();
			showContact();*/
			
		};
	};


};

window.onbeforeunload = function() {
	localStorage.removeItem("addbook");
};