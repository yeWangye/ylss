/*
 * 时间选择框以及三级联动地区弹出框调用 
 * */
(function($, doc) {
	$.init();
	var cityData=[];
	$.ajax("http://192.168.0.166:8080/scss/user/getAreaData.do", {
		data: {},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			var info = data.info;
			for(i = 0; i < info.length; i++) {
				cityData.push({ text: info[i].name });
				for(j = 0; j < info[i].citys.length; j++) {
					if(!cityData[i]["children"] ){
							cityData[i]["children"] = [];
					}
					cityData[i]["children"].push({ text: info[i].citys[j].name });
					for(k = 0; k < info[i].citys[j].areas.length; k++) {

						if(cityData[i]["children"][j]) {
							if(!cityData[i]["children"][j]["children"]){
								cityData[i]["children"][j]["children"] = [];
							}
							
							cityData[i]["children"][j]["children"].push({ text: info[i].citys[j].areas[k].name });
							
						}

					}
				}
			}
			var cityPicker3 = new $.PopPicker({
				layer: 3
			});
			cityPicker3.setData(cityData);
			var showCityPickerButton = doc.getElementById('showCityPicker3');
			showCityPickerButton.addEventListener('tap', function(event) {
				cityPicker3.show(function(items) {
					showCityPickerButton.innerText = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
					//返回 false 可以阻止选择框的关闭
					//return false;
					document.getElementById("province").value = (items[0] || {}).text;
					document.getElementById("city").value = (items[1] || {}).text;
					document.getElementById("area").value = (items[2] || {}).text;

				});
			}, false);
		},
		error: function(xhr, type, errorThrown) {
			$.toast('网络异常，请稍后再试！');
		}
	});

	var showDate = doc.getElementById('showDate');
	showDate.addEventListener('tap', function(event) {
		var dtPicker = new mui.DtPicker({ type: "date" });
		dtPicker.show(function(selectItems) {
			showDate.innerHTML = selectItems.y.text + "-" + selectItems.m.text + "-" + selectItems.d.text;
			document.getElementById('entryDate').value = selectItems.y.text + "-" + selectItems.m.text + "-" + selectItems.d.text;

		})
	})
})(mui, document);