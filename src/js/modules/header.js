// ////////////////ADAPTIVE
// $(window).resize(function (event) {
//   adaptive_function();
// });
// function adaptive_header(w, h) {
//   let menuMobile = $(".header-main__mobile");
//   let headerForm = $(".header-main__form");
//   let headerContacts = $(".header-main__contacts");
//   let header = $(".header-main__inner");

//   if (w <= 500) {
//     headerForm.appendTo(menuMobile);
//     headerContacts.appendTo(menuMobile);
//   } else {
//     menuMobile.removeClass("active");
//     headerForm.appendTo(header);
//     headerContacts.appendTo(header);
//   }
// }
// function adaptive_function() {
//   var w = $(window).outerWidth();
//   var h = $(window).outerHeight();
//   adaptive_header(w, h);
// }
// adaptive_function();

// // //////////////////////////////MOBILE MENU SUBMENUS
// document.querySelectorAll(".header__list-link--mobile").forEach((el) => {
//   el.addEventListener("click", (e) => {
//     let isActive = e.target.classList.contains("active");

//     document.querySelectorAll(".header__subcolumn").forEach((elem) => {
//       elem.classList.remove("mobile-active");
//     });
//     document.querySelectorAll(".header__list-link").forEach((elem) => {
//       elem.classList.remove("active");
//     });
//     if (e.target.nextElementSibling) {
//       if (!isActive) {
//         e.target.classList.add("active");
//         e.target.nextElementSibling.classList.toggle("mobile-active");
//       }
//       e.preventDefault();
//     }
//   });
// });
