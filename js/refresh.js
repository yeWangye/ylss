var refresh = {
	page: 1,
	rows: 8,
	callback:{},
	init: function(callback) {
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					callback: this.pulldownRefresh,
					height: 50, //可选,默认50.触发下拉刷新拖动距离,
					auto: true, //可选,默认false.首次加载自动下拉刷新一次
					contentdown: "刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
					contentover: "释放刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
					contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
				},
				up: {
					height: 50,
					contentrefresh: '正在加载...',
					callback: this.pullupRefresh,
					contentnomore: "没有更多文章了",
					auto: false
				}
			},
			gestureConfig: {
				tap: true, //默认为true
				doubletap: true, //默认为false
				longtap: true, //默认为false
				swipe: true, //默认为true
				drag: true, //默认为true
				hold: false, //默认为false，不监听
				release: false //默认为false，不监听
			}
		});
		_this=this;
		_this.callback=callback;
	},
	endPulldownToRefresh: function() {
		
		_this.page = 2;
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		mui('#pullrefresh').pullRefresh().refresh(true);
	},
	endPullupToRefresh: function(flag) {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(flag); //refresh completed
	},
	pulldownRefresh: function() {
		
		
		_this.callback({
			callback: _this.endPulldownToRefresh,
			page: 1,
			rows: _this.rows,
			flag: "down",
			
		});
	},
	pullupRefresh: function() {
		
		_this.callback({
			page: _this.page,
			rows: _this.rows,
			callback: _this.endPullupToRefresh,
			flag: "up",
			
		});
		_this.page++;
	},
	
}