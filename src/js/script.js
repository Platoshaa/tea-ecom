import { isMobile, isWebp } from "./modules/utils.js";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "sakura-js/dist/sakura.css";
import { Sakura } from "sakura-js";
import "slick-carousel";
$(function () {
  $(".loader").removeClass("active");
  //UP
  isWebp();
  $(window).scroll(function () {
    if ($(window).scrollTop() > 250) {
      $(".scrollup").fadeIn(300);
    } else {
      $(".scrollup").fadeOut(300);
    }
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > 250) {
      $(".scrollup").fadeIn(300);
    } else {
      $(".scrollup").fadeOut(300);
    }
  });
  //POPUP
  $(".pl").click(function (event) {
    var pl = $(this).attr("href").replace("#", "");
    var v = $(this).data("vid");
    popupOpen(pl, v);
    return false;
  });

  if (location.hash) {
    var hsh = location.hash.replace("#", "");
    if ($(".popup-" + hsh).length > 0) {
      popupOpen(hsh);
    } else if ($("div." + hsh).length > 0) {
      $("body,html").animate(
        { scrollTop: $("div." + hsh).offset().top },
        500,
        function () {}
      );
    }
  }
  if (!!document.querySelector(".slider-offer")) {
    $(".slider-offer").slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      fade: true,
      dots: false,
      arrows: false,
    });
  }
  $(".header-top__burger").on("click", function (e) {
    e.stopPropagation();
    $(this).toggleClass("active");
    $(".header-main__mobile").toggleClass("active");
    $("body").toggleClass("lock");
  });
  $(".side-mobile").on("click", function (e) {
    e.stopPropagation();

    $(".side").toggleClass("active");
  });

  $(".item-cart__form .btn").on("click", (e) => {
    if (e.currentTarget.value) {
      let val = $(e.currentTarget).parent().find('input[type="number"]');
      if (e.currentTarget.value == "-1" && val[0].value <= 0) {
        val[0].value = 0;
      } else {
        val[0].value = Number(val[0].value) + Number(e.currentTarget.value);
      }
    }
  });
  function popupOpen(pl, v) {
    // console.log($(".popup-" + pl));
    $(".popup").removeClass("active").hide();
    // $(".popup-" + pl)[0].addEventListener("keydown", function (e) {
    //   console.log("asd");
    // console.log($(".popup-" + pl).childNodes);
    // if (
    //   $(".popup-" + pl)
    //     .find(".last")
    //     .is(":focus") &&
    //   (e.which || e.keyCode) == 9
    // ) {
    //   e.preventDefault();
    //   $(".popup-" + pl)
    //     .find(".first")
    //     .focus();
    // }
    // });

    if (!isMobile.any()) {
      $("body")
        .css({
          paddingRight: $(window).outerWidth() - $(".wrapper").outerWidth(),
        })
        .addClass("lock");
      $(".header-top").css({
        paddingRight: $(window).outerWidth() - $(".wrapper").outerWidth(),
      });
    }
    history.pushState("", "", "#" + pl);
    if (v != "" && v != null) {
      $(".popup-" + pl + " .popup-video__value").html(
        '<iframe src="https://www.youtube.com/embed/' +
          v +
          '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>'
      );
    }
    $(".popup-" + pl)
      .fadeIn(300)
      .delay(300)
      .addClass("active");

    if ($(".popup-" + pl).find(".slick-slider").length > 0) {
      $(".popup-" + pl)
        .find(".slick-slider")
        .slick("setPosition");
    }
  }
  function openPopupById(popup_id) {
    $("#" + popup_id)
      .fadeIn(300)
      .delay(300)
      .addClass("active");
  }
  function popupClose() {
    $(".popup").removeClass("active").fadeOut(300);
    if (!$(".menu__body").hasClass("active")) {
      if (!isMobile.any()) {
        setTimeout(function () {
          $("body").css({ paddingRight: 0 });
          $(".header-top").css({
            paddingRight: 0,
          });
          $(".pdb").css({ paddingRight: 0 });
        }, 200);
        setTimeout(function () {
          $("body").removeClass("lock");
          //$('body,html').scrollTop(parseInt($('body').data('scroll')));
        }, 200);
      } else {
        $("body").removeClass("lock");
        //$('body,html').scrollTop(parseInt($('body').data('scroll')));
      }
    }
    $(".popup-video__value").html("");

    history.pushState("", "", window.location.href.split("#")[0]);
  }
  $(".popup-close,.popup__close").click(function (event) {
    popupClose();
    return false;
  });
  $(".popup").click(function (e) {
    console.log("helo");
    if (
      !$(e.target).is(".popup>.popup-table>.cell *") ||
      $(e.target).is(".popup-close") ||
      $(e.target).is(".popup__close")
    ) {
      popupClose();
      return false;
    }
  });
  let counter = 0;
  $(".card-item__btn").on("click", function () {
    let cart = $(".header-top__cart");
    let imgtodrag = $(this).parent().find(".card-item__img");
    if (imgtodrag) {
      let imgclone = imgtodrag
        .clone()
        .offset({
          top: imgtodrag.offset().top,
          left: imgtodrag.offset().left,
        })
        .css({
          paddingTop: "0px",
          width: "150px",
          height: "150px",
          opacity: "0.8",
          position: "absolute",
          "border-radius": "50%",
          objectFit: "cover",
          "z-index": "201",
        })
        .appendTo($("body"))
        .animate(
          {
            top: cart.offset().top + 10,
            left: cart.offset().left + 10,
            width: 75,
            height: 75,
          },
          100,
          "linear"
        );

      setTimeout(function () {
        counter++;
        $(".header-top__cart-text--2").text(counter);
        cart.addClass("active");
      }, 1500);

      imgclone.animate(
        {
          width: 0,
          height: 0,
        },
        function () {
          $(this).detach();
        }
      );
    }
  });

  $(document).scroll(function () {
    if ($(document).scrollTop() >= 50) {
      $(".header-top").addClass("greybg");
    } else {
      $(" .header-top").removeClass("greybg");
    }
  });
  if (!!document.querySelector(".main-slider")) {
    $(".main-slider").slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      fade: true,
      dots: true,
      arrows: false,
    });
  }
  if (!!document.querySelector(".tea-item__slider-inner")) {
    $(".tea-item__slider-inner").slick({
      slidesToShow: 1,
      autoplay: true,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".slider-mini",
    });
  }
  if (!!document.querySelector(".slider-mini")) {
    $(".slider-mini").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: ".tea-item__slider-inner",
      dots: false,
      centerMode: true,
      focusOnSelect: true,
    });
  }
  if (!!document.querySelector(".tab-tea__btn")) {
    $(".tab-tea__btn").on("click", function () {
      $(".tab-tea__btn").removeClass("active");
      $(".content-tab__item").removeClass("active");
      $(this).addClass("active");
      let dataClass = $(this).attr("data-class");
      $("." + dataClass).addClass("active");
    });
  }

  if (!!document.querySelector(".price-input")) {
    noUiSlider.create(document.querySelector(".price-input"), {
      start: ["200", "5000"],
      range: {
        min: 0,
        max: 20000,
      },
      step: 150,
      connect: true,
      tooltips: true,
    });
  }
  new Sakura(".sakura");
  //   $(".wrapper").addClass("loaded");

  //   $(".filtr-block").on("click", function () {
  //     $(this).toggleClass("active");
  //     $(".side-content__spare").toggleClass("active");
  //   });

  //   var act = "click";
  //   if (isMobile.iOS()) {
  //     var act = "touchstart";
  //   }

  //FORMS
  // function forms() {
  //   //INPUT

  //   //SELECT
  //   if ($("select").length > 0) {
  //     function selectscrolloptions() {
  //       var scs = 100;
  //       var mss = 50;
  //       if (isMobile.any()) {
  //         scs = 10;
  //         mss = 1;
  //       }
  //       var opt = {
  //         cursorcolor: "green",
  //         cursorwidth: "12px",
  //         background: "",
  //         autohidemode: false,
  //         bouncescroll: false,
  //         cursorborderradius: "10px",
  //         scrollspeed: scs,
  //         mousescrollstep: mss,
  //         directionlockdeadzone: 0,
  //         cursorborder: "0px solid #fff",
  //       };
  //       return opt;
  //     }

  //     function select() {
  //       $.each($("select"), function (index, val) {
  //         var ind = index;
  //         $(this).hide();
  //         if ($(this).parent(".select-block").length == 0) {
  //           $(this).wrap(
  //             "<div class='select-block " +
  //               $(this).attr("class") +
  //               "-select-block'></div>"
  //           );
  //         } else {
  //           $(this).parent(".select-block").find(".select").remove();
  //         }
  //         let cl = "";
  //         var milti = "";
  //         var check = "";
  //         var sblock = $(this).parent(".select-block");
  //         var soptions =
  //           "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
  //         if ($(this).attr("multiple") == "multiple") {
  //           milti = "multiple";
  //           check = "check";
  //         }
  //         $.each($(this).find("option"), function (index, val) {
  //           if ($(this).attr("class") != "" && $(this).attr("class") != null) {
  //             let cl = $(this).attr("class");
  //           }
  //           if ($(this).attr("value") != "") {
  //             if (
  //               $(this).attr("data-icon") != "" &&
  //               $(this).attr("data-icon") != null
  //             ) {
  //               soptions =
  //                 soptions +
  //                 "<div data-value='" +
  //                 $(this).attr("value") +
  //                 "' class='select-options__value_" +
  //                 ind +
  //                 " select-options__value value_" +
  //                 $(this).val() +
  //                 " " +
  //                 cl +
  //                 " " +
  //                 check +
  //                 "'><div><img src=" +
  //                 $(this).attr("data-icon") +
  //                 ' alt=""></div><div>' +
  //                 $(this).html() +
  //                 "</div></div>";
  //             } else {
  //               soptions =
  //                 soptions +
  //                 "<div data-value='" +
  //                 $(this).attr("value") +
  //                 "' class='select-options__value_" +
  //                 ind +
  //                 " select-options__value value_" +
  //                 $(this).val() +
  //                 " " +
  //                 cl +
  //                 " " +
  //                 check +
  //                 "'>" +
  //                 $(this).html() +
  //                 "</div>";
  //             }
  //           } else if ($(this).parent().attr("data-label") == "on") {
  //             if (sblock.find(".select__label").length == 0) {
  //               sblock.prepend(
  //                 '<div class="select__label">' + $(this).html() + "</div>"
  //               );
  //             }
  //           }
  //         });
  //         soptions = soptions + "</div></div></div>";
  //         if ($(this).attr("data-type") == "search") {
  //           sblock.append(
  //             "<div data-type='search' class='select_" +
  //               ind +
  //               " select" +
  //               " " +
  //               $(this).attr("class") +
  //               "__select " +
  //               milti +
  //               "'>" +
  //               "<div class='select-title'>" +
  //               "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
  //               "<input data-value='" +
  //               $(this).find('option[selected="selected"]').html() +
  //               "' class='select-title__value value_" +
  //               $(this).find('option[selected="selected"]').val() +
  //               "' />" +
  //               "</div>" +
  //               soptions +
  //               "</div>"
  //           );
  //           $(".select_" + ind)
  //             .find("input.select-title__value")
  //             .jcOnPageFilter({
  //               parentSectionClass: "select-options_" + ind,
  //               parentLookupClass: "select-options__value_" + ind,
  //               childBlockClass: "select-options__value_" + ind,
  //             });
  //         } else if ($(this).attr("data-icon") == "true") {
  //           sblock.append(
  //             "<div class='select_" +
  //               ind +
  //               " select" +
  //               " " +
  //               $(this).attr("class") +
  //               "__select icon " +
  //               milti +
  //               "'>" +
  //               "<div class='select-title'>" +
  //               "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
  //               "<div class='select-title__value value_" +
  //               $(this).find('option[selected="selected"]').val() +
  //               "'><div><img src=" +
  //               $(this).find('option[selected="selected"]').attr("data-icon") +
  //               ' alt=""></div><div>' +
  //               $(this).find('option[selected="selected"]').html() +
  //               "</div></div>" +
  //               "</div>" +
  //               soptions +
  //               "</div>"
  //           );
  //         } else {
  //           sblock.append(
  //             "<div class='select_" +
  //               ind +
  //               " select" +
  //               " " +
  //               $(this).attr("class") +
  //               "__select " +
  //               milti +
  //               "'>" +
  //               "<div class='select-title'>" +
  //               "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
  //               "<div class='select-title__value value_" +
  //               $(this).find('option[selected="selected"]').val() +
  //               "'>" +
  //               $(this).find('option[selected="selected"]').html() +
  //               "</div>" +
  //               "</div>" +
  //               soptions +
  //               "</div>"
  //           );
  //         }
  //         if ($(this).find('option[selected="selected"]').val() != "") {
  //           sblock.find(".select").addClass("focus");
  //         }

  //         if (sblock.find(".select-options__value").length == 1) {
  //           sblock.find(".select").addClass("one");
  //         }

  //         if ($(this).attr("data-req") == "on") {
  //           $(this).addClass("req");
  //         }
  //         $(".select_" + ind + " .select-options-scroll").niceScroll(
  //           ".select-options-list",
  //           selectscrolloptions()
  //         );
  //       });
  //     }
  //     select();

  //     $("body").on("keyup", "input.select-title__value", function () {
  //       $(".select")
  //         .not($(this).parents(".select"))
  //         .removeClass("active")
  //         .find(".select-options")
  //         .slideUp(50);
  //       $(this).parents(".select").addClass("active");
  //       $(this).parents(".select").find(".select-options").slideDown(50);
  //       $(this).parents(".select-block").find("select").val("");
  //     });
  //     $("body").on("click", ".select", function () {
  //       if (!$(this).hasClass("disabled") && !$(this).hasClass("one")) {
  //         $(".select")
  //           .not(this)
  //           .removeClass("active")
  //           .find(".select-options")
  //           .slideUp(50);
  //         $(this).toggleClass("active");
  //         $(this).find(".select-options").slideToggle(50);

  //         //	var input=$(this).parent().find('select');
  //         //removeError(input);

  //         if ($(this).attr("data-type") == "search") {
  //           if (!$(this).hasClass("active")) {
  //             searchselectreset();
  //           }
  //           $(this).find(".select-options__value").show();
  //         }

  //         var cl = $.trim(
  //           $(this)
  //             .find(".select-title__value")
  //             .attr("class")
  //             .replace("select-title__value", "")
  //         );
  //         $(this)
  //           .find(".select-options__value")
  //           .show()
  //           .removeClass("hide")
  //           .removeClass("last");
  //         if (cl != "") {
  //           $(this)
  //             .find(".select-options__value." + cl)
  //             .hide()
  //             .addClass("hide");
  //         }
  //         if ($(this).find(".select-options__value").last().hasClass("hide")) {
  //           $(this).find(".select-options__value").last().prev().addClass("last");
  //         }
  //       }
  //     });
  //     $("body").on("click", ".select-options__value", function () {
  //       if ($(this).parents(".select").hasClass("multiple")) {
  //         if ($(this).hasClass("active")) {
  //           if (
  //             $(this).parents(".select").find(".select-title__value span")
  //               .length > 0
  //           ) {
  //             $(this)
  //               .parents(".select")
  //               .find(".select-title__value")
  //               .append(
  //                 '<span data-value="' +
  //                   $(this).data("value") +
  //                   '">, ' +
  //                   $(this).html() +
  //                   "</span>"
  //               );
  //           } else {
  //             $(this)
  //               .parents(".select")
  //               .find(".select-title__value")
  //               .data(
  //                 "label",
  //                 $(this).parents(".select").find(".select-title__value").html()
  //               );
  //             $(this)
  //               .parents(".select")
  //               .find(".select-title__value")
  //               .html(
  //                 '<span data-value="' +
  //                   $(this).data("value") +
  //                   '">' +
  //                   $(this).html() +
  //                   "</span>"
  //               );
  //           }
  //           $(this)
  //             .parents(".select-block")
  //             .find("select")
  //             .find("option")
  //             .eq($(this).index() + 1)
  //             .prop("selected", true);
  //           $(this).parents(".select").addClass("focus");
  //         } else {
  //           $(this)
  //             .parents(".select")
  //             .find(".select-title__value")
  //             .find('span[data-value="' + $(this).data("value") + '"]')
  //             .remove();
  //           if (
  //             $(this).parents(".select").find(".select-title__value span")
  //               .length == 0
  //           ) {
  //             $(this)
  //               .parents(".select")
  //               .find(".select-title__value")
  //               .html(
  //                 $(this)
  //                   .parents(".select")
  //                   .find(".select-title__value")
  //                   .data("label")
  //               );
  //             $(this).parents(".select").removeClass("focus");
  //           }
  //           $(this)
  //             .parents(".select-block")
  //             .find("select")
  //             .find("option")
  //             .eq($(this).index() + 1)
  //             .prop("selected", false);
  //         }
  //         return false;
  //       }

  //       if ($(this).parents(".select").attr("data-type") == "search") {
  //         $(this)
  //           .parents(".select")
  //           .find(".select-title__value")
  //           .val($(this).html());
  //         $(this)
  //           .parents(".select")
  //           .find(".select-title__value")
  //           .attr("data-value", $(this).html());
  //       } else {
  //         $(this)
  //           .parents(".select")
  //           .find(".select-title__value")
  //           .attr("class", "select-title__value value_" + $(this).data("value"));
  //         $(this)
  //           .parents(".select")
  //           .find(".select-title__value")
  //           .html($(this).html());
  //       }

  //       $(this)
  //         .parents(".select-block")
  //         .find("select")
  //         .find("option")
  //         .removeAttr("selected");
  //       if ($.trim($(this).data("value")) != "") {
  //         $(this)
  //           .parents(".select-block")
  //           .find("select")
  //           .val($(this).data("value"));
  //         $(this)
  //           .parents(".select-block")
  //           .find("select")
  //           .find('option[value="' + $(this).data("value") + '"]')
  //           .attr("selected", "selected");
  //       } else {
  //         $(this).parents(".select-block").find("select").val($(this).html());
  //         $(this)
  //           .parents(".select-block")
  //           .find("select")
  //           .find('option[value="' + $(this).html() + '"]')
  //           .attr("selected", "selected");
  //       }

  //       if ($(this).parents(".select-block").find("select").val() != "") {
  //         $(this).parents(".select-block").find(".select").addClass("focus");
  //       } else {
  //         $(this).parents(".select-block").find(".select").removeClass("focus");

  //         $(this).parents(".select-block").find(".select").removeClass("err");
  //         $(this).parents(".select-block").parent().removeClass("err");
  //         $(this)
  //           .parents(".select-block")
  //           .removeClass("err")
  //           .find(".form__error")
  //           .remove();
  //       }
  //       if (!$(this).parents(".select").data("tags") != "") {
  //         if (
  //           $(this)
  //             .parents(".form-tags")
  //             .find(
  //               '.form-tags__item[data-value="' + $(this).data("value") + '"]'
  //             ).length == 0
  //         ) {
  //           $(this)
  //             .parents(".form-tags")
  //             .find(".form-tags-items")
  //             .append(
  //               '<a data-value="' +
  //                 $(this).data("value") +
  //                 '" href="" class="form-tags__item">' +
  //                 $(this).html() +
  //                 '<span class="fa fa-times"></span></a>'
  //             );
  //         }
  //       }
  //       $(this).parents(".select-block").find("select").change();

  //       if (
  //         $(this).parents(".select-block").find("select").data("update") == "on"
  //       ) {
  //         select();
  //       }
  //     });
  //     $(document).on("click touchstart", function (e) {
  //       if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
  //         $(".select").removeClass("active");
  //         $(".select-options").slideUp(50, function () {});
  //         searchselectreset();
  //       }
  //     });
  //     $(document).on("keydown", function (e) {
  //       if (e.which == 27) {
  //         $(".select").removeClass("active");
  //         $(".select-options").slideUp(50, function () {});
  //         searchselectreset();
  //       }
  //     });
  //   }
  //   FIELDS;
  //   $("input,textarea").focus(function () {
  //     if ($(this).val() == $(this).attr("data-value")) {
  //       $(this).addClass("focus");
  //       $(this).parent().addClass("focus");
  //       if ($(this).attr("data-type") == "pass") {
  //         $(this).attr("type", "password");
  //       }
  //       $(this).val("");
  //     }
  //     removeError($(this));
  //   });
  //   $("input[data-value], textarea[data-value]").each(function () {
  //     if (this.value == "" || this.value == $(this).attr("data-value")) {
  //       if (
  //         $(this).hasClass("l") &&
  //         $(this).parent().find(".form__label").length == 0
  //       ) {
  //         $(this)
  //           .parent()
  //           .append(
  //             '<div class="form__label">' + $(this).attr("data-value") + "</div>"
  //           );
  //       } else {
  //         this.value = $(this).attr("data-value");
  //       }
  //     }
  //     if (this.value != $(this).attr("data-value") && this.value != "") {
  //       $(this).addClass("focus");
  //       $(this).parent().addClass("focus");
  //       if (
  //         $(this).hasClass("l") &&
  //         $(this).parent().find(".form__label").length == 0
  //       ) {
  //         $(this)
  //           .parent()
  //           .append(
  //             '<div class="form__label">' + $(this).attr("data-value") + "</div>"
  //           );
  //       }
  //     }

  //     $(this).click(function () {
  //       if (this.value == $(this).attr("data-value")) {
  //         if ($(this).attr("data-type") == "pass") {
  //           $(this).attr("type", "password");
  //         }
  //         this.value = "";
  //       }
  //     });
  //     $(this).blur(function () {
  //       if (this.value == "") {
  //         if (!$(this).hasClass("l")) {
  //           this.value = $(this).attr("data-value");
  //         }
  //         $(this).removeClass("focus");
  //         $(this).parent().removeClass("focus");
  //         if ($(this).attr("data-type") == "pass") {
  //           $(this).attr("type", "text");
  //         }
  //       }
  //       if ($(this).hasClass("vn")) {
  //         formValidate($(this));
  //       }
  //     });
  //   });
  //   $(".form-input__viewpass").click(function (event) {
  //     if ($(this).hasClass("active")) {
  //       $(this).parent().find("input").attr("type", "password");
  //     } else {
  //       $(this).parent().find("input").attr("type", "text");
  //     }
  //     $(this).toggleClass("active");
  //   });

  //   $.each($(".check"), function (index, val) {
  //     if ($(this).find("input").prop("checked") == true) {
  //       $(this).addClass("active");
  //     }
  //   });
  //   $("body").off("click", ".check", function (event) {});
  //   $("body").on("click", ".check", function (event) {
  //     if (!$(this).hasClass("disable")) {
  //       var target = $(event.target);
  //       if (!target.is("a")) {
  //         $(this).toggleClass("active");
  //         if ($(this).hasClass("active")) {
  //           $(this).find("input").prop("checked", true);
  //         } else {
  //           $(this).find("input").prop("checked", false);
  //         }
  //       }
  //     }
  //   });

  //   //OPTION
  //   $.each($(".option.active"), function (index, val) {
  //     $(this).find("input").prop("checked", true);
  //   });
  //   $(".option").click(function (event) {
  //     if (!$(this).hasClass("disable")) {
  //       var target = $(event.target);
  //       if (!target.is("a")) {
  //         if ($(this).hasClass("active") && $(this).hasClass("order")) {
  //           $(this).toggleClass("orderactive");
  //         }
  //         $(this).parents(".options").find(".option").removeClass("active");
  //         $(this).toggleClass("active");
  //         $(this).children("input").prop("checked", true);
  //       }
  //     }
  //   });
  //   //RATING
  //   $(".rating.edit .star").hover(
  //     function () {
  //       var block = $(this).parents(".rating");
  //       block.find(".rating__activeline").css({ width: "0%" });
  //       var ind = $(this).index() + 1;
  //       var linew = (ind / block.find(".star").length) * 100;
  //       setrating(block, linew);
  //     },
  //     function () {
  //       var block = $(this).parents(".rating");
  //       block.find(".star").removeClass("active");
  //       var ind = block.find("input").val();
  //       var linew = (ind / block.find(".star").length) * 100;
  //       setrating(block, linew);
  //     }
  //   );
  //   $(".rating.edit .star").click(function (event) {
  //     var block = $(this).parents(".rating");
  //     var re = $(this).index() + 1;
  //     block.find("input").val(re);
  //     var linew = (re / block.find(".star").length) * 100;
  //     setrating(block, linew);
  //   });
  //   $.each($(".rating"), function (index, val) {
  //     var ind = $(this).find("input").val();
  //     var linew = (ind / $(this).parent().find(".star").length) * 100;
  //     setrating($(this), linew);
  //   });
  //   function setrating(th, val) {
  //     th.find(".rating__activeline").css({ width: val + "%" });
  //   }
  //   //QUANTITY
  //   $(".quantity__btn").click(function (event) {
  //     var n = parseInt($(this).parent().find(".quantity__input").val());
  //     if ($(this).hasClass("dwn")) {
  //       n = n - 1;
  //       if (n < 1) {
  //         n = 1;
  //       }
  //     } else {
  //       n = n + 1;
  //     }
  //     $(this).parent().find(".quantity__input").val(n);
  //     return false;
  //   });
  //   //RANGE
  //   if ($("#range").length > 0) {
  //     $("#range").slider({
  //       range: true,
  //       min: 0,
  //       max: 5000,
  //       values: [0, 5000],
  //       slide: function (event, ui) {
  //         $("#rangefrom").val(ui.values[0]);
  //         $("#rangeto").val(ui.values[1]);
  //         $(this)
  //           .find(".ui-slider-handle")
  //           .eq(0)
  //           .html("<span>" + ui.values[0] + "</span>");
  //         $(this)
  //           .find(".ui-slider-handle")
  //           .eq(1)
  //           .html("<span>" + ui.values[1] + "</span>");
  //       },
  //       change: function (event, ui) {
  //         if (
  //           ui.values[0] != $("#range").slider("option", "min") ||
  //           ui.values[1] != $("#range").slider("option", "max")
  //         ) {
  //           $("#range").addClass("act");
  //         } else {
  //           $("#range").removeClass("act");
  //         }
  //       },
  //     });
  //     $("#rangefrom").val($("#range").slider("values", 0));
  //     $("#rangeto").val($("#range").slider("values", 1));

  //     $("#range")
  //       .find(".ui-slider-handle")
  //       .eq(0)
  //       .html("<span>" + $("#range").slider("option", "min") + "</span>");
  //     $("#range")
  //       .find(".ui-slider-handle")
  //       .eq(1)
  //       .html("<span>" + $("#range").slider("option", "max") + "</span>");

  //     $("#rangefrom").bind("change", function () {
  //       if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
  //         $(this).val($("#range").slider("option", "max"));
  //       }
  //       if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
  //         $(this).val($("#range").slider("option", "min"));
  //       }
  //       $("#range").slider("values", 0, $(this).val());
  //     });
  //     $("#rangeto").bind("change", function () {
  //       if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
  //         $(this).val($("#range").slider("option", "max"));
  //       }
  //       if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
  //         $(this).val($("#range").slider("option", "min"));
  //       }
  //       $("#range").slider("values", 1, $(this).val());
  //     });
  //     $("#range").find(".ui-slider-handle").eq(0).addClass("left");
  //     $("#range").find(".ui-slider-handle").eq(1).addClass("right");
  //   }
  //   //ADDFILES
  //   $(".form-addfile__input").change(function (e) {
  //     if ($(this).val() != "") {
  //       var ts = $(this);
  //       ts.parents(".form-addfile").find("ul.form-addfile-list").html("");
  //       $.each(e.target.files, function (index, val) {
  //         if (
  //           ts
  //             .parents(".form-addfile")
  //             .find(
  //               'ul.form-addfile-list>li:contains("' +
  //                 e.target.files[index].name +
  //                 '")'
  //             ).length == 0
  //         ) {
  //           ts.parents(".form-addfile")
  //             .find("ul.form-addfile-list")
  //             .append("<li>" + e.target.files[index].name + "</li>");
  //         }
  //       });
  //     }
  //   });
  // }
  // forms();

  // function digi(str) {
  //   var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  //   return r;
  // }

  // //VALIDATE FORMS
  // $("form button[type=submit]").click(function () {
  //   var er = 0;
  //   var form = $(this).parents("form");
  //   var ms = form.data("ms");
  //   $.each(form.find(".req"), function (index, val) {
  //     er += formValidate($(this));
  //   });
  //   if (er == 0) {
  //     removeFormError(form);
  //     /*
  // 			var messagehtml='';
  // 		if(form.hasClass('editprofile')){
  // 			var messagehtml='';
  // 		}
  // 		formLoad();
  // 		*/

  //     //ОПТРАВКА ФОРМЫ
  //     /*
  // 		function showResponse(html){
  // 			if(!form.hasClass('nomessage')){
  // 				showMessage(messagehtml);
  // 			}
  // 			if(!form.hasClass('noclear')){
  // 				clearForm(form);
  // 			}
  // 		}
  // 		var options={
  // 			success:showResponse
  // 		};
  // 			form.ajaxForm(options);

  // 		setTimeout(function(){
  // 			if(!form.hasClass('nomessage')){
  // 				//showMessage(messagehtml);
  // 				showMessageByClass(ms);
  // 			}
  // 			if(!form.hasClass('noclear')){
  // 				clearForm(form);
  // 			}
  // 		},0);

  // 		return false;
  // 		*/
  //     if (ms != null && ms != "") {
  //       showMessageByClass(ms);
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // });
  // function formValidate(input) {
  //   var er = 0;
  //   var form = input.parents("form");
  //   if (input.attr("name") == "email" || input.hasClass("email")) {
  //     if (input.val() != input.attr("data-value")) {
  //       var em = input.val().replace(" ", "");
  //       input.val(em);
  //     }
  //     if (
  //       !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val()) ||
  //       input.val() == input.attr("data-value")
  //     ) {
  //       er++;
  //       addError(input);
  //     } else {
  //       removeError(input);
  //     }
  //   } else {
  //     if (input.val() == "" || input.val() == input.attr("data-value")) {
  //       er++;
  //       addError(input);
  //     } else {
  //       removeError(input);
  //     }
  //   }
  //   if (input.attr("type") == "checkbox") {
  //     if (input.prop("checked") == true) {
  //       input.removeClass("err").parent().removeClass("err");
  //     } else {
  //       er++;
  //       input.addClass("err").parent().addClass("err");
  //     }
  //   }
  //   if (input.hasClass("name")) {
  //     if (!/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val())) {
  //       er++;
  //       addError(input);
  //     }
  //   }
  //   if (input.hasClass("pass-2")) {
  //     if (form.find(".pass-1").val() != form.find(".pass-2").val()) {
  //       addError(input);
  //     } else {
  //       removeError(input);
  //     }
  //   }
  //   return er;
  // }
  // function formLoad() {
  //   $(".popup").hide();
  //   $(".popup-message-body").hide();
  //   $(".popup-message .popup-body").append(
  //     '<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>'
  //   );
  //   $(".popup-message").addClass("active").fadeIn(300);
  // }
  // function showMessageByClass(ms) {
  //   $(".popup").hide();
  //   popupOpen("message." + ms, "");
  // }
  // function showMessage(html) {
  //   $(".popup-loading").remove();
  //   $(".popup-message-body").show().html(html);
  // }
  // function clearForm(form) {
  //   $.each(form.find(".input"), function (index, val) {
  //     $(this).removeClass("focus").val($(this).data("value"));
  //     $(this).parent().removeClass("focus");
  //     if ($(this).hasClass("phone")) {
  //       maskclear($(this));
  //     }
  //   });
  // }
  // function addError(input) {
  //   input.addClass("err");
  //   input.parent().addClass("err");
  //   input.parent().find(".form__error").remove();
  //   if (input.hasClass("email")) {
  //     var error = "";
  //     if (input.val() == "" || input.val() == input.attr("data-value")) {
  //       error = input.data("error");
  //     } else {
  //       error = input.data("error");
  //     }
  //     if (error != null) {
  //       input.parent().append('<div class="form__error">' + error + "</div>");
  //     }
  //   } else {
  //     if (
  //       input.data("error") != null &&
  //       input.parent().find(".form__error").length == 0
  //     ) {
  //       input
  //         .parent()
  //         .append('<div class="form__error">' + input.data("error") + "</div>");
  //     }
  //   }
  //   if (input.parents(".select-block").length > 0) {
  //     input.parents(".select-block").parent().addClass("err");
  //     input.parents(".select-block").find(".select").addClass("err");
  //   }
  // }
  // function addErrorByName(form, input__name, error_text) {
  //   var input = form.find('[name="' + input__name + '"]');
  //   input.attr("data-error", error_text);
  //   addError(input);
  // }
  // function addFormError(form, error_text) {
  //   form.find(".form__generalerror").show().html(error_text);
  // }
  // function removeFormError(form) {
  //   form.find(".form__generalerror").hide().html("");
  // }
  // function removeError(input) {
  //   input.removeClass("err");
  //   input.parent().removeClass("err");
  //   input.parent().find(".form__error").remove();

  //   if (input.parents(".select-block").length > 0) {
  //     input.parents(".select-block").parent().removeClass("err");
  //     input
  //       .parents(".select-block")
  //       .find(".select")
  //       .removeClass("err")
  //       .removeClass("active");
  //     input.parents(".select-block").find(".select-options").hide();
  //   }
  // }
  // function removeFormErrors(form) {
  //   form.find(".err").removeClass("err");
  //   form.find(".form__error").remove();
  // }
  // function maskclear(n) {
  //   if (n.val() == "") {
  //     n.inputmask("remove");
  //     if (!n.hasClass("l")) {
  //       n.val(n.attr("data-value"));
  //     }
  //     n.removeClass("focus");
  //     n.parent().removeClass("focus");
  //   }
  // }
  // function searchselectreset() {
  //   $.each($('.select[data-type="search"]'), function (index, val) {
  //     var block = $(this).parent();
  //     var select = $(this).parent().find("select");
  //     if ($(this).find(".select-options__value:visible").length == 1) {
  //       $(this).addClass("focus");
  //       $(this)
  //         .parents(".select-block")
  //         .find("select")
  //         .val($(".select-options__value:visible").data("value"));
  //       $(this)
  //         .find(".select-title__value")
  //         .val($(".select-options__value:visible").html());
  //       $(this)
  //         .find(".select-title__value")
  //         .attr("data-value", $(".select-options__value:visible").html());
  //     } else if (select.val() == "") {
  //       $(this).removeClass("focus");
  //       block
  //         .find("input.select-title__value")
  //         .val(select.find('option[selected="selected"]').html());
  //       block
  //         .find("input.select-title__value")
  //         .attr("data-value", select.find('option[selected="selected"]').html());
  //     }
  //   });
  // }

  //   // let iconMenu = document.querySelector(".icon-menu");
  //   // // let body = document.querySelector("body");
  //   // // let menuBody = document.querySelector(".menu__body");
  //   // if (iconMenu) {
  //   // 	iconMenu.addEventListener("click", function () {
  //   // 		iconMenu.classList.toggle("active");
  //   // 		// body.classList.toggle("lock");
  //   // 		// menuBody.classList.toggle("active");
  //   // 	});
  //   // }
  //   document.addEventListener("scroll", function () {
  //     const posTop = elem.getBoundingClientRect().top + 50;
  //     // elem.classList.toggle('visible', posTop < );
  //     if (posTop < window.innerHeight) {
  //       $(".scrollup").addClass("wt");
  //     } else {
  //       $(".scrollup").removeClass("wt");
  //     }
  //   });

  //   //ZOOM
  //   if ($(".gallery").length > 0) {
  //     baguetteBox.run(".gallery", {
  //       // Custom options
  //     });
  //   }
  //   $(window).scroll(function () {
  //     180 < $(this).scrollTop()
  //       ? $(".scrollup").fadeIn()
  //       : $(".scrollup").fadeOut();
  //   }),
  //     $(".scrollup").click(function () {
  //       return (
  //         $("html, body").animate(
  //           {
  //             scrollTop: 0,
  //           },
  //           600
  //         ),
  //         !1
  //       );
  //     }),
  //     /*
  // 		CLOUD-ZOOM
  // 		<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
  // 			<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
  // 		</a>
  // 		*/

  //   jQuery(
  //     '<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>'
  //   ).insertAfter(".quantity input");
  //   jQuery(".quantity").each(function () {
  //     var spinner = jQuery(this),
  //       input = spinner.find('input[type="number"]'),
  //       btnUp = spinner.find(".quantity-up"),
  //       btnDown = spinner.find(".quantity-down"),
  //       min = input.attr("min"),
  //       max = input.attr("max");

  //     btnUp.click(function () {
  //       var oldValue = parseFloat(input.val());
  //       if (oldValue >= max) {
  //         var newVal = oldValue;
  //       } else {
  //         var newVal = oldValue + 1;
  //       }
  //       spinner.find("input").val(newVal);
  //       spinner.find("input").trigger("change");
  //     });

  //     btnDown.click(function () {
  //       var oldValue = parseFloat(input.val());
  //       if (oldValue <= min) {
  //         var newVal = oldValue;
  //       } else {
  //         var newVal = oldValue - 1;
  //       }
  //       spinner.find("input").val(newVal);
  //       spinner.find("input").trigger("change");
  //     });
  //   });

  //   $(".tea-item__btn").on("click", function () {
  //     let cart = $(".header-top__cart");
  //     let notify = $(".cart-notification");
  //     let notifyClone = notify.clone().appendTo("body");
  //     notifyClone
  //       .delay(100)
  //       .animate(
  //         {
  //           top: 50,
  //         },
  //         400,
  //         "swing"
  //       )
  //       .delay(3000)
  //       .animate(
  //         {
  //           opacity: 0,
  //           width: 0,
  //           height: 0,
  //           top: cart.offset().top + 25,
  //           left: cart.offset().left + 25,
  //         },
  //         300
  //       );
  //     setTimeout(function () {
  //       counter++;
  //       $(".header-top__cart-text--2").text(counter);
  //       cart.addClass("active");
  //     }, 1500);
  //     notifyClone.animate(
  //       {
  //         width: 0,
  //         height: 0,
  //       },
  //       function () {
  //         $(this).detach();
  //       }
  //     );
  //   });
  //   $(".tab-tea__btn").on("click", function () {
  //     $(".tab-tea__btn").removeClass("active");
  //     $(".content-tab__item").removeClass("active");
  //     $(this).addClass("active");
  //     let dataClass = $(this).attr("data-class");
  //     $("." + dataClass).addClass("active");
  //   });
  //   $(".tea-item__slider-inner").slick({
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     arrows: false,
  //     fade: true,
  //     asNavFor: ".slider-mini",
  //   });
  //   $(".slider-mini").slick({
  //     slidesToShow: 3,
  //     infinity: false,
  //     slidesToScroll: 1,
  //     asNavFor: ".tea-item__slider-inner",
  //     dots: false,
  //     focusOnSelect: true,
  //     prevArrow:
  //       '<button type="button" class="slick-prev mini-arrows"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#fff" /><path d="M3 9.39999L8 4.39999L13 9.39999L11.6 10.8L8 7.19999L4.4 10.8L3 9.39999Z" fill="green" /><path d="M15 8C15 11.9 11.9 15 8 15C4.1 15 1 11.9 1 8C1 4.1 4.1 1 8 1C11.9 1 15 4.1 15 8ZM16 8C16 3.6 12.4 0 8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8Z"fill="green" /></svg></button>',
  //     nextArrow:
  //       '<button type="button" class="slick-next mini-arrows"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#fff" /><path d="M3 9.39999L8 4.39999L13 9.39999L11.6 10.8L8 7.19999L4.4 10.8L3 9.39999Z" fill="green" /><path d="M15 8C15 11.9 11.9 15 8 15C4.1 15 1 11.9 1 8C1 4.1 4.1 1 8 1C11.9 1 15 4.1 15 8ZM16 8C16 3.6 12.4 0 8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8Z"fill="green" /></svg></button>',
  //   });

  //   $(document).on("keydown", function (e) {
  //     if (e.which == 27) {
  //       popupClose();
  //     }
  //   });

  //   $(".goto").click(function () {
  //     var el = $(this).attr("href").replace("#", "");
  //     var offset = 0;
  //     $("body,html").animate(
  //       { scrollTop: $("." + el).offset().top + offset },
  //       500,
  //       function () {}
  //     );

  //     if ($(".menu__body").hasClass("active")) {
  //       $(".menu__body,.icon-menu").removeClass("active");
  //       $("body").removeClass("lock");
  //     }
  //     return false;
  //   });

  //   $(document).mouseup(function (e) {
  //     // событие клика по веб-документу
  //     var div = $(".side-content__spare"); // тут указываем ID элемента
  //     if (
  //       !div.is(e.target) && // если клик был не по нашему блоку
  //       div.has(e.target).length === 0
  //     ) {
  //       // и не по его дочерним элементам
  //       div.removeClass("active"); // скрываем его
  //     }
  //   });

  //   // function ibg() {
  //   // 	if (isIE()) {
  //   // 		let ibg = document.querySelectorAll(".ibg");
  //   // 		for (var i = 0; i < ibg.length; i++) {
  //   // 			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
  //   // 				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
  //   // 			}
  //   // 		}
  //   // 	}
  //   // }
  //   // ibg();

  //   //Клик вне области
  //   $(document).on("click touchstart", function (e) {
  //     if (!$(e.target).is(".select *")) {
  //       $(".select").removeClass("active");
  //     }
  //   });

  //   $(".polzunok-5").slider({
  //     min: 0,
  //     max: 5000,
  //     values: [2000, 3000],
  //     range: true,
  //     animate: "fast",
  //     slide: function (event, ui) {
  //       $(".polzunok-input-5-left").val(ui.values[0]);
  //       $(".polzunok-input-5-right").val(ui.values[1]);
  //     },
  //   });
  //   $(".polzunok-input-5-left").val($(".polzunok-5").slider("values", 0));
  //   $(".polzunok-input-5-right").val($(".polzunok-5").slider("values", 1));
  //   $(".polzunok-container-5 input").change(function () {
  //     var input_left = $(".polzunok-input-5-left")
  //         .val()
  //         .replace(/[^0-9]/g, ""),
  //       opt_left = $(".polzunok-5").slider("option", "min"),
  //       where_right = $(".polzunok-5").slider("values", 1),
  //       input_right = $(".polzunok-input-5-right")
  //         .val()
  //         .replace(/[^0-9]/g, ""),
  //       opt_right = $(".polzunok-5").slider("option", "max"),
  //       where_left = $(".polzunok-5").slider("values", 0);
  //     if (input_left > where_right) {
  //       input_left = where_right;
  //     }
  //     if (input_left < opt_left) {
  //       input_left = opt_left;
  //     }
  //     if (input_left == "") {
  //       input_left = 0;
  //     }
  //     if (input_right < where_left) {
  //       input_right = where_left;
  //     }
  //     if (input_right > opt_right) {
  //       input_right = opt_right;
  //     }
  //     if (input_right == "") {
  //       input_right = 0;
  //     }
  //     $(".polzunok-input-5-left").val(input_left);
  //     $(".polzunok-input-5-right").val(input_right);
  //     if (input_left != where_left) {
  //       $(".polzunok-5").slider("values", 0, input_left);
  //     }
  //     if (input_right != where_right) {
  //       $(".polzunok-5").slider("values", 1, input_right);
  //     }
  //   });
  //   // $('body').on('click', '.services-inner__box-list li', function (event) {
  //   // 	$('.services-inner__box-list li').removeClass('active')
  //   // 	$('.text-services__box').removeClass('active')
  //   // 	$(this).addClass('active')

  //   // 	a = $(this).attr("data")
  //   // 	$("#" + a).addClass('active')
  //   // })

  //   // $('body').on('click', '.tab__navitem', function (event) {
  //   // 	var eq = $(this).index();
  //   // 	if ($(this).hasClass('parent')) {
  //   // 		var eq = $(this).parent().index();
  //   // 	}
  //   // 	if (!$(this).hasClass('active')) {
  //   // 		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
  //   // 		$(this).addClass('active');
  //   // 		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
  //   // 		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
  //   // 			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
  //   // 		}
  //   // 	}
  //   // });
  //   // $.each($('.spoller.active'), function (index, val) {
  //   // 	$(this).next().show();
  //   // });
  //   // $('body').on('click', '.spoller', function (event) {
  //   // 	if ($(this).hasClass('mob') && !isMobile.any()) {
  //   // 		return false;
  //   // 	}

  //   // 	if ($(this).parents('.one').length > 0) {
  //   // 		$(this).parents('.one').find('.spoller').not($(this)).removeClass('active').next().slideUp(300);
  //   // 		$(this).parents('.one').find('.spoller').not($(this)).parent().removeClass('active');
  //   // 	}

  //   // 	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
  //   // 		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
  //   // 			$(this).removeClass('active');
  //   // 			$(this).next().slideUp(300);
  //   // 		});
  //   // 	}
  //   // 	$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
  //   // 		if ($(this).parent().find('.slick-slider').length > 0) {
  //   // 			$(this).parent().find('.slick-slider').slick('setPosition');
  //   // 		}
  //   // 	});
  //   // 	return false;
});
