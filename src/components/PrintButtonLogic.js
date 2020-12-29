import { reactive, computed } from 'vue'

function logicFactory() {
	const order = new reactive({ items: [], takeAway: false })

	const payBtnLabel = computed(() => {
		if (order.items.find(i => !i.sent)) return "print"
		if (order.items.length === 0) return "print"
		return "pay"
	});

	const payBtnClickable = computed(() => {
		if (order.items.length === 0) return false
		return true
	});

	return { order, payBtnLabel, payBtnClickable }
}

export default logicFactory
