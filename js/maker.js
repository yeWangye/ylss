	var mp = new BMap.Map("allmap");
	mp.centerAndZoom(new BMap.Point(116.3964,39.9093), 15);
	mp.enableScrollWheelZoom();
function ComplexCustomOverlay(point, imgSrc, mouseoverText) {
	this._point = point;
	this._imgSrc = imgSrc;
	this._overText = mouseoverText;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map) {
	this._map = map;
	var div = this._div = document.createElement("div");
	div.style.position = "absolute";
	div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	div.style.backgroundColor = "#EE5D5B";
	div.style.border = "1px solid #BC3B3A";
	div.style.color = "white";
	div.style.width = "25px";

	div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";

	var img = this._span = document.createElement("img");
	img.src = "./images/ylss/dhqb.png";
	img.style.width = "100%";
	div.appendChild(img);

	var that = this;

	var arrow = this._arrow = document.createElement("div");
	arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
	arrow.style.position = "absolute";
	arrow.style.width = "11px";
	arrow.style.height = "10px";
	arrow.style.top = "22px";
	arrow.style.left = "10px";
	arrow.style.overflow = "hidden";
	div.appendChild(arrow);

	div.onmouseover = function() {
		this.style.backgroundColor = "#6BADCA";
		this.style.borderColor = "#0000ff";
		this.getElementsByTagName("span")[0].innerHTML = that._overText;
		arrow.style.backgroundPosition = "0px -20px";
	}

	div.onmouseout = function() {
		this.style.backgroundColor = "#EE5D5B";
		this.style.borderColor = "#BC3B3A";
		this.getElementsByTagName("span")[0].innerHTML = that._text;
		arrow.style.backgroundPosition = "0px 0px";
	}

	mp.getPanes().labelPane.appendChild(div);

	return div;
}
ComplexCustomOverlay.prototype.toggle = function() {
	if(this._div) {
		if(this._div.style.display == "") {
			this.hide();
		} else {
			this.show();
		}
	}
}
ComplexCustomOverlay.prototype.draw = function() {
	var map = this._map;
	var pixel = map.pointToOverlayPixel(this._point);
	this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
	this._div.style.top = pixel.y - 30 + "px";
}
var txt = "银湖海岸城",
	mouseoverTxt = txt + " " + parseInt(Math.random() * 1000, 10) + "套";

var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(116.407845, 39.914101), "银湖海岸城", mouseoverTxt);