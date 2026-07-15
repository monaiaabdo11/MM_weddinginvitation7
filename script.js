// ===============================
// ELEMENTS
// ===============================

const openBtn = document.getElementById("openBtn");
const hero = document.querySelector(".hero");
const invitation = document.querySelector(".invitation");
const calendar = document.querySelector(".calendar-section");
const countdown = document.querySelector(".countdown-section");
const venue = document.querySelector(".venue-section");

const flash = document.querySelector(".flash");

// ===============================
// OPEN INVITATION
// ===============================

if (openBtn) {

    openBtn.addEventListener("click", function () {
        showInvitation();

        // White Flash
        flash.classList.add("show");

        setTimeout(() => {

            flash.classList.remove("show");

        }, 350);

        // Fade Hero
        hero.style.transition = "opacity 0.8s ease";
        hero.style.opacity = "0";

        setTimeout(() => {

           hero.style.display = "none";

invitation.style.display = "block";
calendar.style.display = "flex";
countdown.style.display = "flex";
venue.style.display = "flex";
document.querySelector(".rsvp-section").style.display = "flex";
document.querySelector(".quote-section").style.display = "flex";

invitation.style.opacity = "0";

invitation.style.transform = "translateY(30px)";



setTimeout(() => {

    mainContent.style.transition = "opacity 1s ease, transform 1s ease";

    mainContent.style.opacity = "1";

    mainContent.style.transform = "translateY(0)";

},50);

            setTimeout(() => {

                invitation.style.transition = "opacity 1s ease, transform 1s ease";
                invitation.style.opacity = "1";
                invitation.style.transform = "translateY(0)";

            }, 50);

        }, 800);

    });

}




// ===========================
// Falling Petals
// ===========================

const petalsContainer = document.querySelector(".petals");

for(let i = 0; i < 30; i++){

    const petal = document.createElement("span");

    petal.style.left = Math.random()*100 + "%";

    petal.style.animationDuration =
    (8 + Math.random()*8) + "s";

    petal.style.animationDelay =
    (Math.random()*2) + "s";

    petal.style.opacity =
    .5 + Math.random()*.5;

    petal.style.width =
    (18 + Math.random()*18) + "px";

    petal.style.height =
    petal.style.width;

    petalsContainer.appendChild(petal);

}
// =====================
// Invitation Animation
// =====================

const revealItems = document.querySelectorAll(".reveal");

function showInvitation(){

    const firstSection = document.querySelector(".invitation");

    firstSection.querySelectorAll(".reveal").forEach((item,index)=>{

        setTimeout(()=>{

            item.classList.add("show");

        }, index*250);

    });

}

// ===============================
// COUNTDOWN
// ===============================

const weddingDate = new Date("October 20, 2026 19:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        daysEl.innerHTML = "0";
        hoursEl.innerHTML = "0";
        minutesEl.innerHTML = "0";

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    daysEl.innerHTML = days;

    hoursEl.innerHTML = hours;

    minutesEl.innerHTML = minutes;

}

updateCountdown();

setInterval(updateCountdown,60000);

const popup = document.getElementById("popup");

const openForm = document.getElementById("openForm");

const closePopup = document.getElementById("closePopup");

openForm.addEventListener("click",()=>{

    popup.classList.add("show");

    // إظهار الفورم مرة أخرى
    document.getElementById("fullName").style.display="block";
    document.querySelector(".attendance").style.display="flex";
    document.querySelector("textarea").style.display="block";
    document.getElementById("submitBtn").style.display="block";

    // إخفاء رسالة النجاح
    document.getElementById("successMessage").style.display="none";

    // مسح البيانات
    document.getElementById("fullName").value="";
    document.querySelector("textarea").value="";

    document.querySelectorAll('input[name="attendance"]').forEach(r=>{
        r.checked=false;
    });

    // إزالة رسائل الخطأ
    document.getElementById("nameError").style.display="none";
    document.getElementById("attendanceError").style.display="none";

    document.getElementById("fullName").classList.remove("input-error");

    document.querySelectorAll(".attendance-card").forEach(card=>{
        card.classList.remove("attendance-error");
    });

});

closePopup.addEventListener("click",()=>{

    popup.classList.remove("show");

});

popup.addEventListener("click",(e)=>{

    if(e.target===popup){

        popup.classList.remove("show");

    }

});
const rsvpContainer = document.querySelector(".rsvp-container");

const rsvpObserver = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:.3});

rsvpObserver.observe(rsvpContainer);

const venueContainer = document.querySelector(".venue-container");

const venueObserver = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:.3});

venueObserver.observe(venueContainer);
const submitBtn = document.getElementById("submitBtn");
const fullName = document.getElementById("fullName");

const nameError = document.getElementById("nameError");
const attendanceError = document.getElementById("attendanceError");

submitBtn.addEventListener("click", function (e) {

    e.preventDefault();

    let valid = true;

    // تنظيف الأخطاء القديمة
    nameError.style.display = "none";
    attendanceError.style.display = "none";

    fullName.classList.remove("input-error");

    document.querySelectorAll(".attendance-card").forEach(card=>{
        card.classList.remove("attendance-error");
    });

    // الاسم
    if(fullName.value.trim()===""){

        valid = false;

        fullName.classList.add("input-error");

        nameError.style.display="block";

        nameError.textContent="من فضلك اكتب اسمك.";

    }

    // الحضور
   const selected = document.querySelector('input[name="attendance"]:checked');

    if(!selected){

        valid=false;

        attendanceError.style.display="block";

        attendanceError.textContent="من فضلك اختر الحضور أو الاعتذار.";

        document.querySelectorAll(".attendance-card").forEach(card=>{
            card.classList.add("attendance-error");
        });

    }

    if(valid){

    const form = document.getElementById("rsvpForm");

    fetch("https://api.web3forms.com/submit",{

        method:"POST",

        body:new FormData(form)

    })

    .then(response=>response.json())

    .then(data=>{

        if(data.success){

            document.getElementById("fullName").style.display="none";

            document.querySelector(".attendance").style.display="none";

            document.querySelector("textarea").style.display="none";

            document.getElementById("submitBtn").style.display="none";

            document.getElementById("nameError").style.display="none";

            document.getElementById("attendanceError").style.display="none";

            document.getElementById("successMessage").style.display="block";

            setTimeout(()=>{

                popup.classList.remove("show");

            },3000);

        }

    })

    .catch(error=>{

        alert("حدث خطأ أثناء إرسال البيانات.");

        console.error(error);

    });

}
});
function createPetal(){

    const petal=document.createElement("img");

    petal.src="images/petal.png";

    petal.classList.add("petal");

    // يبدأ من مكان عشوائي أعلى الجزء اللي ظاهر للمستخدم
    petal.style.left=Math.random()*window.innerWidth+"px";

    petal.style.top=(window.scrollY-120)+"px";

    // حجم عشوائي
    const size=12+Math.random()*12;

    petal.style.width=size+"px";

    // مدة مختلفة لكل بتلة
    const duration = 18 + Math.random()*8;

    petal.style.animationDuration=duration+"s";

    document.body.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },duration*1000);

}

// كل 600ms بتلة جديدة
setInterval(createPetal,1600);

// ===============================
// Scroll Reveal
// ===============================

const revealSections = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:0.15

});

revealSections.forEach((item)=>{

    revealObserver.observe(item);

});