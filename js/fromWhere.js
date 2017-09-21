(function(){
		var url = window.location.search;
		var _temp=url.split("?")[1];
		_temp = _temp.substring(_temp.indexOf("=") + 1, _temp.length);
		mui(".backBtn")[0].setAttribute("href", _temp);
})();
