// JavaScript source code
var ss = document.getElementById("uploadBtn");
	 $(ss).change(function () {
     	document.getElementById("uploadFile").value = this.value;
	 });