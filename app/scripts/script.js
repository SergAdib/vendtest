!function r(e,a,t){function o(n,l){if(!a[n]){if(!e[n]){var i="function"==typeof require&&require;if(!l&&i)return i(n,!0);if(s)return s(n,!0);var u=new Error("Cannot find module '"+n+"'");throw u.code="MODULE_NOT_FOUND",u}var c=a[n]={exports:{}};e[n][0].call(c.exports,function(r){var a=e[n][1][r];return o(a?a:r)},c,c.exports,r,e,a,t)}return a[n].exports}for(var s="function"==typeof require&&require,n=0;n<t.length;n++)o(t[n]);return o}({1:[function(r,e,a){"use strict";function t(r){var e=/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,a=/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/,t=/^[a-zA-Z0-9]+$/;return t.test(r)?!0:a.test(r)?!0:e.test(r)?!0:!1}$(".carousel").carousel({interval:7e3}),$(document).ready(function(){$("#sign-menu-button").on("click",function(){$("#herotool").toggleClass("hidden")}),$("#sign-button").on("click",function(r){r.preventDefault();var e=$("#sign-email"),a=$("#sign-password"),o=e.val(),s=a.val();t(o)&&s?(e.val("").attr("placeholder","Email or Username").parent().removeClass("has-error").addClass("has-success"),a.val("").attr("placeholder","Password").parent().removeClass("has-error").addClass("has-success"),alert("You are about to send form data for identifying. User: "+o+" with password: "+s)):s||t(o)?t(o)?s||(a.parent().addClass("has-error"),a.attr("placeholder","Please fill in password here")):(e.parent().addClass("has-error"),e.val("").attr("placeholder","Please put correct email or user name")):(a.parent().addClass("has-error"),e.parent().addClass("has-error"),a.attr("placeholder","Please fill in password here"),e.val("").attr("placeholder","Please put correct email or user name"))})})},{}]},{},[1]);
//# sourceMappingURL=build.js.map
