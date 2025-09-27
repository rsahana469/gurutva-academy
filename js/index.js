var applydatabse=firebase.database().ref("gurutva_apply_details");

function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

  function login(){
    //make modal block for delayed processing :
    document.getElementById('myModal').style.display="block";
    document.getElementById("message").innerHTML="Verifying Credentials, Please wait!";
    document.getElementById("message").style.color="white";
    var email=document.getElementById("email_id").value;
    var pwd=document.getElementById("password").value;
     //login to the server

    firebase.auth().signInWithEmailAndPassword(email,pwd).then((success)=>{
      document.getElementById('myModal').style.display="none";
      window.location.reload();
     
    }).catch((error)=>{
      document.getElementById("message").innerHTML="Login Failed! Please try again";
      document.getElementById("message").style.color="red";
      document.getElementById('myModal').style.display="none";
     
    });

  }

  function logout(){
    firebase.auth().signOut();
    window.location.reload();
  }
  function reset(){
    document.getElementById("message").style.display="none";
  }

  var databse=firebase.database().ref("gurutva_contact_details");
  function submitenq(){
    document.getElementById('myModal').style.display="block";
    var name=document.getElementById("fullname").value;
    var email=document.getElementById("email").value;
    var contact=document.getElementById("contactno").value;
    var clg=document.getElementById("college").value;
    var sem=document.getElementById("sem").value;
    // insert data in databse

    if(empty(name)|| empty(email)|| empty(contact)|| empty(clg)|| empty(sem)){
      alert("Incomplete Details");
      document.getElementById('myModal').style.display="none";
    }
    else{

      var data=databse.push();
      data.set({
        name:name,
        email:email,
        contact:contact,
        college:clg,
        semester:sem
      });

      alert("Details submitted successfully ");
      document.getElementById('myModal').style.display="none";
      window.location.reload();

    }

  }

  function empty(value){
    if(value==""){
      return true;
    }
    return false;
  }
  
  function submitapply(){
    document.getElementById('myModal').style.display="block";
    var name=document.getElementById("applyfullname").value;
    var email=document.getElementById("applyemail").value;
    var contact=document.getElementById("applycontactno").value;
    var clg=document.getElementById("applycollege").value;
    var sem=document.getElementById("applysem").value;
    // insert data in databse

    if(empty(name)|| empty(email)|| empty(contact)|| empty(clg)|| empty(sem)){
      alert("Incomplete Details");
      document.getElementById('myModal').style.display="none";
    }
    else{

      var applydata=applydatabse.push();
      applydata.set({
        name:name,
        email:email,
        contact:contact,
        college:clg,
        semester:sem
      });

      alert("Details submitted successfully ");
      document.getElementById('myModal').style.display="none";
      window.location.reload();

    }
  }

  function fetchcontactdata(){
      document.getElementById('myModal').style.display="block";
      var table=document.getElementById("contact_details_table");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);

      cell1.style.fontWeight = 'bold';
      cell2.style.fontWeight = 'bold';
      cell3.style.fontWeight = 'bold';
      cell4.style.fontWeight = 'bold';
      cell5.style.fontWeight = 'bold';
      cell6.style.fontWeight = 'bold';
    
    
      cell1.innerHTML = "FullName";
      cell2.innerHTML = "Email";
      cell3.innerHTML = "ContactNumber";
      cell4.innerHTML = "College";
      cell5.innerHTML = "Semester";
      cell6.innerHTML = "Status";
     
       var j=0;
       var i=1;
 
      firebase.database().ref("gurutva_contact_details").once('value',function(childsnapshot){
      console.log("fetchingdaa");
      childsnapshot.forEach(function(childsnapshot){
        var name=childsnapshot.val().name;
        var email=childsnapshot.val().email;
        var contact=childsnapshot.val().contact;
        var clg=childsnapshot.val().college;
        var sem=childsnapshot.val().semester;
       if(email != "DEL"){
        //set into table
          j++;  
          var row = table.insertRow(j);

            var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
      
      
        
          cell1.innerHTML =name;
          cell2.innerHTML =email;
          cell3.innerHTML =contact;
          cell4.innerHTML=clg;
          cell5.innerHTML=sem;

          let button = document.createElement('button');
          button.innerText = 'Delete';
          button.style.backgroundColor="red";
          button.style.border="none";
          button.style.color="white";
          button.style.width='80%';

          button.setAttribute('onclick', `sayprodelete(${i})`);  
      
          cell6.appendChild(button);
          
          cell7.innerHTML = email;
          i++;
          cell7.style.display = "none";      
      }
      });
      document.getElementById('myModal').style.display="none";

    });
    document.getElementById('myModal').style.display="none"; 
  }


  function sayprodelete(data) {
    document.getElementById('myModal').style.display="block";
    let table = document.getElementById('contact_details_table');
    let rows = table.rows;
    // Extract first & last Name
    let link = rows[data]['cells'][1].innerText;
    console.log(link);
    firebase.database().ref('gurutva_contact_details').once('value',function(snapshot3){
		snapshot3.forEach(function(childsnapshot3){ 
           var dbemail=childsnapshot3.val().email;
           if(dbemail==link){
           	childsnapshot3.ref.update({'email':"DEL"});
             document.getElementById('myModal').style.display="none";
           	window.location.reload();
           
        }            	        
		});	
	});  
}

  function fetchapplydata(){

    //code for clearningthe cache 
    document.getElementById('myModal').style.display="block";

    var table=document.getElementById("apply_details_table");
    var row = table.insertRow(0);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    cell1.style.fontWeight = 'bold';
    cell2.style.fontWeight = 'bold';
    cell3.style.fontWeight = 'bold';
    cell4.style.fontWeight = 'bold';
    cell5.style.fontWeight = 'bold';
    cell6.style.fontWeight = 'bold';
  
  
    cell1.innerHTML = "FullName";
    cell2.innerHTML = "Email";
    cell3.innerHTML = "ContactNumber";
    cell4.innerHTML = "College";
    cell5.innerHTML = "Semester";
    cell6.innerHTML = "Status";
   
     var j=0;
     var i=1;

    firebase.database().ref("gurutva_apply_details").once('value',function(childsnapshot){
    console.log("fetchingdaa");
    childsnapshot.forEach(function(childsnapshot){
      var name=childsnapshot.val().name;
      var email=childsnapshot.val().email;
      var contact=childsnapshot.val().contact;
      var clg=childsnapshot.val().college;
      var sem=childsnapshot.val().semester;
     if(email != "DEL"){
      //set into table
        j++;  
        var row = table.insertRow(j);

          var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        cell1.innerHTML =name;
        cell2.innerHTML =email;
        cell3.innerHTML =contact;
        cell4.innerHTML=clg;
        cell5.innerHTML=sem;

        let button = document.createElement('button');
        button.innerText = 'Delete';
        button.style.backgroundColor="red";
        button.style.border="none";
        button.style.color="white";
        button.style.width='80%';

        button.setAttribute('onclick', `sayapplydelete(${i})`);  
    
        cell6.appendChild(button);
        
        cell7.innerHTML = email;
        i++;
        cell7.style.display = "none";      
    }
    });
    document.getElementById('myModal').style.display="none";
  });
  document.getElementById('myModal').style.display="none";
  }


  function sayapplydelete(data) {
    document.getElementById('myModal').style.display="block";
    let table = document.getElementById('apply_details_table');
    let rows = table.rows;
    // Extract first & last Name
    let link = rows[data]['cells'][1].innerText;
    console.log(link);
    firebase.database().ref('gurutva_apply_details').once('value',function(snapshot3){
		snapshot3.forEach(function(childsnapshot3){ 
           var dbemail=childsnapshot3.val().email;
           if(dbemail==link){
           	childsnapshot3.ref.update({'email':"DEL"});
             document.getElementById('myModal').style.display="none";
            //reload the page
            window.location.reload();
            fetchapplydataactivate();

        }            	        
		});
	});    
}

function fetchcontactdataActivate(){
  //play with container
  document.getElementById('c_table').style.display='block';
  document.getElementById('a_table').style.display='none';
  document.getElementById('c_btn').style.backgroundColor='inherit';
  document.getElementById('c_btn').style.color='white';
  document.getElementById('a_btn').style.backgroundColor='white';
  document.getElementById('a_btn').style.color='black';

  


}

function fetchapplydataactivate(){
  document.getElementById('a_btn').style.backgroundColor='inherit';
  document.getElementById('a_btn').style.color='white'
 document.getElementById('c_btn').style.backgroundColor='white';
  document.getElementById('c_btn').style.color='black';
    //play with container
  document.getElementById('a_table').style.display='block';
  document.getElementById('c_table').style.display='none';
}

