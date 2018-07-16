/**
 * @author V_T
 */
var array=[];
var d = new Date();

function chatSupporter () {
  document.getElementsByClassName("chatbox")[0].style.display = "block";
  check_online();
  supporter();
  reply();
}

function minimize() {
	document.getElementsByClassName("chatbox")[0].style.display = "none";
	
	// var parent = document.getElementsByClassName("subchat")[0];
	// for (var i =0; i < document.getElementsByClassName("user1").length; i++){
	// var child = document.getElementsByClassName("user1")[i];
	// parent.removeChild(child);
	// }

}

function check_online (){
  axios.get('http://51.15.59.130:46260/start')
  .then(function (response) {
    console.log(response);
    
    var is_online = response.data.start.success;
    
  })
  .catch(function (error) {
    console.log(error);
  });

}
var pic;
function supporter(){
  axios.get('http://51.15.59.130:46260/support')
  .then(function (response) {
    console.log(response);
    
  var name = response.data.support.first;
  var last = response.data.support.last;
  pic = response.data.support.picture;
  
  // var sup = document.createElement("p");
  // var node = document.createTextNode("This is"+ name+" "+ last);
  // sup.appendChild(node);
  document.getElementById("name").innerHTML = name+" "+ last;
  document.getElementById("sup_img").src = pic;
  document.getElementById("date").innerHTML = d;
  })
  .catch(function (error) {
    console.log(error);
  });
  
}
// https://test-chat.fandogh.org
function reply() {
	
   axios.get('http://51.15.59.130:46260/fetch')
  .then(function (response) {
    console.log(response);
    
    var resp = response.data.responses[0].message;
    // document.getElementById("sup1").innerHTML = resp;
    var img1 = document.createElement("img");
    var element = document.getElementsByClassName("subchat")[0];
	element.appendChild(img1);
	img1.className = "user1";
	img1.src = pic;
	img1.style.cssFloat = "right";
	img1.style.width = "40px";
	img1.style.height ="40px";
	img1.style.borderRadius = "100px";
    
    
    var sup1 = document.createElement("div");
    var node = document.createTextNode(resp);
    sup1.appendChild(node);
    var element = document.getElementsByClassName("subchat")[0];
	element.appendChild(sup1);
	sup1.className = "user1";
	sup1.style.color = "black";
	sup1.style.padding = "15px";
	sup1.style.margin = "15px";
	sup1.style.borderRadius = "5px";
	sup1.style.backgroundColor = "white";
    
    array.push(resp);
    })
  .catch(function (error) {
    console.log(error);
  });
}

setInterval(reply, 3000);

var msg;
function send() {
	
  axios.post('http://51.15.59.130:46260/send',{message: msg})
  .then(function (response) {
    console.log(response);
    
    var uimg1 = document.createElement("img");
    var element = document.getElementsByClassName("subchat")[0];
	element.appendChild(uimg1);
	uimg1.className = "user1";
	uimg1.src ="avator.png";
	uimg1.style.cssFloat = "left";
	uimg1.style.width = "40px";
	uimg1.style.height ="40px";
	uimg1.style.borderRadius = "100px";
    
    var user1 = document.createElement("div");
    var node = document.createTextNode(msg);
    user1.appendChild(node);
    var element = document.getElementsByClassName("subchat")[0];
	element.appendChild(user1);
	user1.className = "user1";
	user1.style.color = "black";
	user1.style.padding = "15px";
	user1.style.margin = "15px";
	user1.style.borderRadius = "5px";
	user1.style.backgroundColor = "white";
	
  })
  .catch(function (error) {
    console.log(error);
  });
}

function sendSupporter() {
	msg = document.getElementById("in").value;
	send();
}


