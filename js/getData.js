/*
 * 数据更新保存接口调用 
 * */
(function($, doc) {
	$.init();
	doc.getElementById("save").addEventListener("tap", function() {

		var mId = doc.getElementById("hunfou").value,
			rId = doc.getElementById("comeTo").value,
			sId = doc.getElementById("subject").value,
			eId = doc.getElementById("education").value,
			sex = doc.getElementById("sex").value,
			height = doc.getElementById("height").value,
			weight = doc.getElementById("weight").value,
			entryDate = doc.getElementById("entryDate").value,
			age = doc.getElementById("age").value,
			province = doc.getElementById("province").value,
			city = doc.getElementById("city").value,
			area = doc.getElementById("area").value;
		if(mId != "" & rId != "" & sId != "" & eId != "" & sex != "" & height != "" & weight != "" & entryDate != "" & age != "" & province != "" & city != "" & area != "") {

			$.ajax("http://192.168.0.166:8080/scss/user/completeData.do", {
				data: {
					userId: "289",
					deviceToken: "11",
					deviceType: "android",
					mId: mId,
					rId: rId,
					sId: sId,
					eId: eId,
					sex: sex,
					height: height,
					weight: weight,
					entryDate: entryDate,
					age: age,
					province: province,
					city: city,
					area: area
				},
				dataType: 'json',
				type: 'post',
				timeout: 10000,
				success: function(data) {
					console.log(data);
					if(data.code == "1") {
						$.toast('保存成功！');
					}

				},
				error: function(xhr, type, errorThrown) {
					$.toast('网络异常，请稍后再试！');
				}
			});
		} else {
			$.alert("请补全信息再保存！", "提示", "确认", function() {});
		}

	}, false)
	$.ajax("http://192.168.0.166:8080/scss/user/getCommonData.do", {
		data: {
			userId: "289",
			deviceToken: "11",
			deviceType: "android"
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			var hunfou = data["mInfo"],
				comeTo = data["rInfo"],
				subject = data["sInfo"],
				education = data["eInfo"];

			loopData(hunfou, "mName");
			loopData(comeTo, "rName");
			loopData(subject, "sName");
			loopData(education, "eName");

		},
		error: function(xhr, type, errorThrown) {
			$.toast('网络异常，请稍后再试！');
		}
	});

	function loopData(arr, src) {
		for(i = 0; i < arr.length; i++) {

			switch(src) {
				case "mName":
					doc.getElementById("hunfou").innerHTML += "<option value=" + arr[i]["mId"] + ">" + arr[i][src] + "</option>";
					break;
				case "rName":
					doc.getElementById("comeTo").innerHTML += "<option value=" + arr[i]["rId"] + ">" + arr[i][src] + "</option>";
					break;
				case "eName":
					doc.getElementById("education").innerHTML += "<option value=" + arr[i]["eId"] + ">" + arr[i][src] + "</option>";
					break;
				case "sName":
					doc.getElementById("subject").innerHTML += "<option value=" + arr[i]["sId"] + ">" + arr[i][src] + "</option>";
					break;

			}
		}
	}
})(mui, document);