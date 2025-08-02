function selectPlan(plan) {
    localStorage.setItem("selectedPlan", plan);
    window.location.href = "benefits.html";
  }
  
  function loadBenefits() {
    const plan = localStorage.getItem("selectedPlan");
    const title = document.getElementById("plan-title");
    const list = document.getElementById("benefit-list");
    const benefits = {
      regular: ["Regular Access: To events, meet-and-greets, or backstage experiences.", "Priority entry: To concerts, shows, or other events.", "Personalized content: From the celebrity, such as behind-the-scenes updates or personal messages.", "Special discounts: On merchandise, tickets, or other products.", "Autographed items: At events or experiences, such as priority seating or meet-and-greets.", "Exclusive updates: Receive news and updates before the general public"],
      premium: ["Regular Access: To events, meet-and-greets, or backstage experiences.", "Priority entry: To concerts, shows, or other events.", "Personalized content: From the celebrity, such as behind-the-scenes updates or personal messages.", "Special discounts: On merchandise, tickets, or other products.", "Autographed items: At events or experiences, such as priority seating or meet-and-greets.", "Exclusive updates: Receive news and updates before the general public", "Priority entry: To concerts, shows, or other event.", "Exclusive access: To events, meet-and-greet, or backstage experiences.", "Early access: To tickets, merchandise.", "Special discounts: On merchandise, tickets, or other products.", "Community perks: Access to a private fan Community or online forum.", "Personalized experience: Win contests or autions unique experience, like a private concert or dinner with your favourite celebrity.", "Collectible items: The fan card itself may become a rare ad valuable Collectible.", "Show off:Demonstrate your dedicationand enthusiasm for your husband to others."],
      vip: ["Regular Access: To events, meet-and-greets, or backstage experiences.", "Priority entry: To concerts, shows, or other events.", "Personalized content: From the celebrity, such as behind-the-scenes updates or personal messages.", "Special discounts: On merchandise, tickets, or other products.", "Autographed items: At events or experiences, such as priority seating or meet-and-greets.", "Exclusive updates: Receive news and updates before the general public", "Priority entry: To concerts, shows, or other event.", "Exclusive access: To events, meet-and-greet, or backstage experiences.", "Early access: To tickets, merchandise.", "Special discounts: On merchandise, tickets, or other products.", "Community perks: Access to a private fan Community or online forum.", "Personalized experience: Win contests or autions unique experience, like a private concert or dinner with your favourite celebrity.", "Collectible items: The fan card itself may become a rare ad valuable Collectible.", "Show off:Demonstrate your dedicationand enthusiasm for your husband to others.", "VIP treatment: At events or experiences, such as priority seating or meet-and-greet."]
    };
  
    title.textContent = plan.charAt(0).toUpperCase() + plan.slice(1) + " Plan Benefits";
    list.innerHTML = benefits[plan].map(item => `<li>${item}</li>`).join("");
  }
  
  function goToBilling() {
    window.location.href = "billing.html";
  }
  
  function saveBilling(event) {
    event.preventDefault();
    const billingInfo = {
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value
    };
    localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
    window.location.href = "payment.html";
  }
  
  function loadPaymentInfo() {
    const billing = JSON.parse(localStorage.getItem("billingInfo"));
    document.getElementById("payerEmail").value = billing?.email || "";
  }
  
  function payWithPaystack() {
    const plan = localStorage.getItem("selectedPlan");
    const billing = JSON.parse(localStorage.getItem("billingInfo"));
    const email = document.getElementById("payerEmail").value;
  
    const amounts = {
      regular: 105000,
      premium: 205000,
      vip: 305000
    };
  
    if (!email) {
      alert("Enter email to proceed with payment");
      return;
    }
  
    var handler = PaystackPop.setup({
      key: 'pk_live_81c8c92f507e0de02164c6698b1d1966febc90a1', // Replace with your public key
      email: email,
      amount: amounts[plan],
      currency: "USD",
      callback: function(response){
        alert('Payment successful! Reference: ' + response.reference);
        window.location.href = "confirmation.html";
      },
      onClose: function(){
        alert('Transaction was not completed.');
      }
    });
    handler.openIframe();
  }
  
