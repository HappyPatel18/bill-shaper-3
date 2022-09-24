// Nav
const nav = document.querySelector(".nav-menu");
const navigation = document.querySelector(".navigation");
const openBtn = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close");

const navLeft = nav.getBoundingClientRect().left;
openBtn.addEventListener("click", () => {
  if (navLeft < 0) {
    navigation.classList.add("show");
    nav.classList.add("show");
    document.body.classList.add("show");
  }
});

closeBtn.addEventListener("click", () => {
  if (navLeft < 0) {
    navigation.classList.remove("show");
    nav.classList.remove("show");
    document.body.classList.remove("show");
  }
});

// Fixed Nav
const navBar = document.querySelector(".navigation");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});


let modeltriger = document.getElementById("modeltriger");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("closemodel")[0];
let modelbtn = document.getElementById("modelbtn");
const radios =  document.querySelectorAll('input[name="question"]');
// const msgbox =  document.querySelectorAll('.msgbox');


for (const radio of radios) {
  radio.addEventListener('click', function onClick() {
    modeltriger.disabled = false;

    // inside model
    document.getElementById("modelprovider").onchange = function () {
      document.getElementById("ifothers").style.display = "block";
      if (this[this.selectedIndex].value === "Others") {
        document.getElementById("forouthers").style.display ="block";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
      }
      else if(this[this.selectedIndex].value === "Comcast Xfinity" && radio.value == "question1" ){
        document.getElementById("visibleforq1").style.display = "block";
        modelbtn.style.display = "block";
        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
      }
      else if(this[this.selectedIndex].value === "Comcast Xfinity" && radio.value == "question2" ){
        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq2").style.display = "block";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
        modelbtn.style.display = "block";
      }
      else if(this[this.selectedIndex].value === "Comcast Xfinity" && radio.value == "question3" ){
        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "block";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
        modelbtn.style.display = "block";
        if(this[this.selectedIndex].value === "Others"){
          modelbtn.style.display ="none";
        }
      }
      else if(this[this.selectedIndex].value === "Comcast Xfinity" && radio.value == "question4" ){
        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("visibleforq4").style.display = "block";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
        modelbtn.style.display = "block";
        if(this[this.selectedIndex].value === "Others"){
          modelbtn.style.display ="none";
        }
      }
      else if(this[this.selectedIndex].value === "Comcast Xfinity" && radio.value == "question5" ){
        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "block";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
        modelbtn.style.display = "block";
        if(this[this.selectedIndex].value === "Others"){
          modelbtn.style.display ="none";
        }
      }
      else if(this[this.selectedIndex].value === "Comcast Xfinity" && radio.value == "question6" ){
        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("visibleforq6").style.display = "block";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
        modelbtn.style.display = "block";
        if(this[this.selectedIndex].value === "Others"){
          modelbtn.style.display ="none";
        }
      }
      else if(this[this.selectedIndex].value === "Comcast Xfinity" && radio.value == "question7" ){
        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "block";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
        modelbtn.style.display = "block";
        if(this[this.selectedIndex].value === "Others"){
          modelbtn.style.display ="none";
        }
      }
      else if(this[this.selectedIndex].value !== "Comcast Xfinity" && radio.value == "question1" ){
  
        document.getElementById("User_Provider1").value =this[this.selectedIndex].value;

        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "block";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
      }
      else if(this[this.selectedIndex].value !== "Comcast Xfinity" && radio.value == "question2" ){

        document.getElementById("User_Provider2").value =this[this.selectedIndex].value;

        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "block";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
      }
      else if(this[this.selectedIndex].value !== "Comcast Xfinity" && radio.value == "question3" ){

        document.getElementById("User_Provider3").value =this[this.selectedIndex].value;

        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "block";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
      }
      else if(this[this.selectedIndex].value !== "Comcast Xfinity" && radio.value == "question4" ){

        document.getElementById("User_Provider4").value =this[this.selectedIndex].value;

        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "block";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
      }
      else if(this[this.selectedIndex].value !== "Comcast Xfinity" && radio.value == "question5" ){

        document.getElementById("User_Provider5").value =this[this.selectedIndex].value;

        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "block";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "none";
      }
      else if(this[this.selectedIndex].value !== "Comcast Xfinity" && radio.value == "question6" ){

        document.getElementById("User_Provider6").value =this[this.selectedIndex].value;

        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "block";
        document.getElementById("forotherprovider7").style.display = "none";
      }
      else if(this[this.selectedIndex].value !== "Comcast Xfinity" && radio.value == "question7" ){

        document.getElementById("User_Provider7").value =this[this.selectedIndex].value;

        document.getElementById("forouthers").style.display ="none";
        document.getElementById("visibleforq1").style.display = "none";
        document.getElementById("visibleforq2").style.display = "none";
        document.getElementById("visibleforq3").style.display = "none";
        document.getElementById("visibleforq4").style.display = "none";
        document.getElementById("visibleforq5").style.display = "none";
        document.getElementById("visibleforq6").style.display = "none";
        document.getElementById("visibleforq7").style.display = "none";
        document.getElementById("forotherprovider1").style.display = "none";
        document.getElementById("forotherprovider2").style.display = "none";
        document.getElementById("forotherprovider3").style.display = "none";
        document.getElementById("forotherprovider4").style.display = "none";
        document.getElementById("forotherprovider5").style.display = "none";
        document.getElementById("forotherprovider6").style.display = "none";
        document.getElementById("forotherprovider7").style.display = "block";
      } 

       else {
        document.getElementById("ifothers").style.display ="none";
        modelbtn.style.display = "None";
        
      }
  };

  });
}

modeltriger.onclick = function(){
  modal.style.display = "block";
  modal.classList.add("fadein");
}
span.onclick = function() {
  modal.style.display = "none";
  document.getElementById("qform").reset(); 
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("qform").reset(); 
  }
}

document.getElementById("year").innerText = new Date().getFullYear();


