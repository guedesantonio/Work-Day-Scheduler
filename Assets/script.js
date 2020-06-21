//text box array
var textboxArray = $(".form-control");
//name of array forEach funct that will go through each element in the array
//the function and I am passing in the elements in the array
textboxArray.forEach(function(myElement){{
          if ( this.moment === "ago" ) {
            this.classList.remove('.future');
            this.classList.remove('.present');
            this.classList.add (".past");
            
            
          } 
            else if (this.moment === "from now") {
                this.classList.remove('.past');
                this.classList.remove('.present');
                this.classList.add (".future");
                }
                else {
                    this.classList.remove('.future');
                    this.classList.remove('.past');
                    this.classList.add (".future");
                }
            
        };
      });



//text box array
var textboxArray = $(".form-control");
for (let i = 0; i < textboxArray.length; i++) {
    let val = getCookie("box" + i);
    textboxArray[i].value = val != null ? val : "";
  }
   
  document.getElementById("date").innerHTML = moment();
   
  console.log(moment())
  function test(box) {
    setCookie("box" + box, textboxArray[box].value);
  }

  function setCookie(name, value) {
    document.cookie = name + "=" + value + ";path=/;";

  }
   
  function getCookie(name) {
    var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  }