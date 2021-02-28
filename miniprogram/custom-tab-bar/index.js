Component({
	data: {
		active: "home",
		list: [
			{
				icon: 'refund-o',
				text: '旧衣服回收',
				url: '/pages/index/index',
				name:"home"
			},
			{
				icon: 'logistics',
				text: '家政服务',
				url: '/pages/index/index',
				name:"service"
			},
			{
				icon: 'orders-o',
				text: '订单',
				url: '/pages/order/index',
				name:"order"
			},
			{
				icon: 'manager-o',
				text: '我的',
				url: '/pages/user/index',
				name:"user"
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			const temp=this.data.list.find(item=>item.name===event.detail)
			wx.switchTab({
				url: temp.url
			});
		},
		init() {
			const page = getCurrentPages().pop();
			const temp=this.data.list.find(item => item.url === `/${page.route}`)
			this.setData({
				active: temp.name
			});
		}
	}
});
