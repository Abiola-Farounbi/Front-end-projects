document.getElementById("loan-form").addEventListener("submit", function(e){

    document.getElementById("results").style.display=("none");
    
    document.getElementById("loading").style.display=("block");
    setTimeout(calculateResults,2000)

e.preventDefault();
});

function calculateResults(){
    const amount=document.getElementById("amount");
    const interest=document.getElementById("interest");
    const years=document.getElementById("years");
    const monthlyPayment=document.getElementById("monthly-payment");
    const totalPayment=document.getElementById("total-payment");
    const totalInterest=document.getElementById("total-interest");

   const principal=parseFloat(amount.value);
   const interests=(parseFloat(interest.value) /100 /12 );
   const time=(parseFloat(years.value)*12);
   const total=( principal * (Math.pow(1+interests, time)))
   
   if (isFinite(total)){
       totalPayment.value=total.toFixed(2);
       monthlyPayment.value=(total / time ).toFixed(2);
       totalInterest.value=(total - principal).toFixed(2);
       document.getElementById("results").style.display=("block");
    
       document.getElementById("loading").style.display=("none");
   }
   else{
       showError("please check your amount");
   }   
    

}
function showError(error){
    document.getElementById("results").style.display=("none");
    
    document.getElementById("loading").style.display=("none");
    const errorDiv=document.createElement("div");
    const card=document.querySelector(".card")
    const heading=document.querySelector(".heading");
    errorDiv.className="alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv,heading);
    setTimeout(clearError,3000);
}
function clearError(){
    document.querySelector('.alert').remove();
}

