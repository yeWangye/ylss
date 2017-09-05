/*
 * 头像上传接口调用
 * */
document.getElementById('touxiang').addEventListener('tap', function() {
	if(mui.os.plus) {
		var a = [{
			title: "拍照"
		}, {
			title: "从手机相册选择"
		}];
		plus.nativeUI.actionSheet({
			title: "修改用户头像",
			cancel: "取消",
			buttons: a
		}, function(b) { /*actionSheet 按钮点击事件*/
			switch(b.index) {
				case 0:
					break;
				case 1:
					getImage(); /*拍照*/
					break;
				case 2:
					galleryImg(); /*打开相册*/
					break;
				default:
					break;
			}
		})
	}
}, false);
//拍照 
function getImage() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			//              	自定义文件url
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			uploadHead(s); /*上传图片*/
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("错误" + s);
	}, {
		filename: "_doc/head.png"
	})
}
//本地相册选择 
function galleryImg() {
	plus.gallery.pick(function(a) {
		//          	通过URL参数获取目录对象或文件对象
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("head.png", {}, function(file) {
					//文件已存在 
					file.remove(function() {
						console.log("删除成功");
						entry.copyTo(root, 'head.png', function(e) {
								var e = e.fullPath + "?version=" + new Date().getTime();
								uploadHead(e); /*上传图片*/

							},
							function(e) {
								console.log('复制图片失败:' + e.message);
							});
					}, function() {
						console.log("删除图片失败:" + e.message);
					});
				}, function() {
					//文件不存在 
					entry.copyTo(root, 'head.png', function(e) {
							var path = e.fullPath + "?version=" + new Date().getTime();
							uploadHead(path); /*上传图片*/
						},
						function(e) {
							console.log('复制图片出错:' + e.message);
						});
				});
			}, function(e) {
				console.log("get _www folder fail");
			})
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(a) {}, {
		filter: "image"
	})
};
//上传头像图片 
function uploadHead(imgPath) {
	console.log("imgPath = " + imgPath);
	var mainImage = document.getElementById("headImage");
	mainImage.src = imgPath;
	mainImage.style.width = "60px";
	mainImage.style.height = "60px";

	var image = new Image();
	image.src = imgPath;
	image.onload = function() {
		console.log('开始上传...');
		var imgData = getBase64Image(image);
		console.log("imgData:" + imgData);
		/*在这里调用上传接口*/
		mui.ajax("http://192.168.0.166:8080/scss/user/saveImageUrl.do", {
			data: {
				userId: "289",
				deviceToken: "11",
				deviceType: "android",
				headImage: imgData
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				mui.ajax("http://192.168.0.166:8080/scss/user/uploadUserHead.do", {
					data: {
						userId: "289",
						userHead: imgPath
					},
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data) {
						mui.toast('上传成功');
					},
					error: function(xhr, type, errorThrown) {
						mui.toast('网络异常，请稍后再试！');
					}
				});
				console.log('上传成功');
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('网络异常，请稍后再试！');
			}
		});
	}
}
//将图片压缩转成base64 
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	// 计算宽高
	if(width > height) {
		if(width > 100) {
			height = Math.round(height *= 100 / width);
			width = 100;
		}
	} else {
		if(height > 100) {
			width = Math.round(width *= 100 / height);
			height = 100;
		}
	}
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.8);
	return dataURL.replace("data:image/png;base64,", "");
}