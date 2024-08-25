document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle.querySelector("span");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // Update the theme icon
    if (document.body.classList.contains("dark-theme")) {
      themeIcon.textContent = "🌜";
    } else {
      themeIcon.textContent = "🌞";
    }
  });
});

let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.style.top = "-100px"; // Hide the header by moving it out of view
  } else {
    // Scrolling up
    header.style.top = "0"; // Show the header
  }

  lastScrollTop = scrollTop;
});

var myScrollFunc = function () {
  var elements = document.getElementsByClassName("about-meDiv");

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var rect = element.getBoundingClientRect();

    // Check if the element is within the viewport
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      (function (i) {
        setTimeout(function () {
          elements[i].classList.add("showAboutme");
          elements[i].classList.remove("hideAboutMe");
        }, i * 200); // Adjust delay between each element's appearance
      })(i);
    }
  }
};

window.addEventListener("scroll", myScrollFunc);

var myScrollFunc = function () {
  var elements = document.getElementsByClassName("serviceDiv");

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      (function (i) {
        setTimeout(function () {
          elements[i].classList.add("showService");
          elements[i].classList.remove("hideService");
        }, i * 200);
      })(i);
    }
  }
};

window.addEventListener("scroll", myScrollFunc);

// Animation
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 130 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

// Initialize EmailJS with your user ID
emailjs.init("wVj3ZR4Rvw-J4KoI_"); // Replace with your actual EmailJS user ID

// Add event listener to the form
document
  .getElementById("contact-form") // Ensure this matches the form's ID in your HTML
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Send form data using EmailJS
    emailjs.sendForm("service_ozveyww", "template_xoxuqbn", this).then(
      function (response) {
        alert("Email sent successfully!");
      },
      function (error) {
        alert("Failed to send email. Please try again.");
      }
    );
  });
